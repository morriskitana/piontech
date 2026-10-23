/**
 * Wikimedia Commons / Wikipedia logo finder.
 *
 * This is the reliable path for large vendors whose own sites block automated
 * fetches (Hikvision, Hisense, Arista, Rafael). Two strategies:
 *   1. read the `| logo =` field out of the Wikipedia article's wikitext
 *   2. search Commons for files whose name mentions the brand and "logo"
 *
 * Commons artwork is not CC0 by default - results are tagged CHECK-commons so
 * the licence can be reviewed before the logo ships.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { sleep, fetchRetry } = require('./logo-fetch');

const STAGE = path.join(__dirname, '..', '..', '.logo-staging');

const slugify = (s) =>
    s
        .toLowerCase()
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

function tokensOf(brand) {
    return brand
        .toLowerCase()
        .replace(/&/g, ' and ')
        .split(/[^a-z0-9]+/)
        .filter(
            (w) =>
                w.length > 2 &&
                ![
                    'the',
                    'and',
                    'intelligence',
                    'biometrics',
                    'security',
                    'technologies',
                    'technology',
                    'software',
                    'monitoring',
                    'analysis',
                    'developments',
                    'communications',
                    'distributions',
                    'systems',
                    'solutions'
                ].includes(w)
        );
}

/** Appearance-only score: bigger and more wordmark-like wins. */
function qualityOf(c) {
    if (!c || !c.width || !c.height) return -1;
    const ar = c.width / c.height;
    const longest = Math.max(c.width, c.height);
    let s = 0;
    if (longest >= 200) s += 50;
    else if (longest >= 96) s += 20;
    else if (longest >= 48) s += 5;
    else s -= 30;
    if (ar >= 1.8) s += 30;
    else if (ar < 1.2) s += 10;
    return s;
}

async function commonsSearch(query, limit = 12) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=${limit}&gsrsearch=${encodeURIComponent(query)}&prop=imageinfo&iiprop=url|size|mime`;
    const r = await fetchRetry(url);
    if (!r || !r.ok) return [];
    const j = await r.json();
    return Object.values(j.query?.pages || {});
}

/** Pull the infobox logo filename out of a Wikipedia article's wikitext. */
async function wikiInfoboxLogo(title) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(title)}&prop=wikitext`;
    const r = await fetchRetry(url);
    if (!r || !r.ok) return null;
    const j = await r.json();
    const wt = j.parse?.wikitext?.['*'] || '';
    const m = wt.match(/\|\s*logo\s*=\s*(.+)/i);
    if (!m) return null;
    let file = m[1].trim();
    file = file.replace(/\[\[|\]\]/g, '').split('|')[0].trim();
    if (!/\.(svg|png|jpe?g)$/i.test(file)) return null;

    const iu = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(`File:${file}`)}&prop=imageinfo&iiprop=url|size`;
    const r2 = await fetchRetry(iu);
    if (!r2 || !r2.ok) return null;
    const j2 = await r2.json();
    const p = Object.values(j2.query?.pages || {})[0];
    const src = p?.imageinfo?.[0]?.url || null;
    // drop the analytics query the API appends
    return src ? src.split('?')[0] : null;
}

async function savePng(buf, outName) {
    const isSvg = buf.slice(0, 400).toString('utf8').includes('<svg');
    let input = buf;
    if (isSvg) {
        let svg = buf.toString('utf8');
        if (!/xmlns:xlink/.test(svg)) {
            svg = svg.replace(/<svg\b([^>]*)>/i, (m, a) => `<svg${a} xmlns:xlink="http://www.w3.org/1999/xlink">`);
        }
        input = Buffer.from(svg, 'utf8');
    }
    const density = isSvg ? 1200 : 300;
    let img = sharp(input, { density }).ensureAlpha();
    try {
        const trimmed = await img.trim({ threshold: 2 }).toBuffer();
        const tm = await sharp(trimmed).metadata();
        if (tm.width >= 40 && tm.height >= 40) img = sharp(trimmed);
    } catch {
        /* keep */
    }
    try {
        const m2 = await img.metadata();
        const longest = Math.max(m2.width, m2.height);
        if (longest > 900) {
            img = img.resize(
                m2.width >= m2.height
                    ? { width: 900, fit: 'inside', withoutEnlargement: true }
                    : { height: 900, fit: 'inside', withoutEnlargement: true }
            );
        }
    } catch {
        /* keep */
    }
    const out = path.join(STAGE, outName);
    try {
        await img.png().toFile(out);
    } catch {
        return null;
    }
    const fm = await sharp(out).metadata();
    return { file: out, width: fm.width, height: fm.height };
}

async function download(url) {
    try {
        const r = await fetchRetry(url);
        if (!r || !r.ok) return null;
        const b = Buffer.from(await r.arrayBuffer());
        return b.length > 400 ? b : null;
    } catch {
        return null;
    }
}

/**
 * @param {string} brand   display name
 * @param {string[]} queries Wikipedia article titles to try
 */
async function tryCommons(brand, queries = []) {
    const tokens = tokensOf(brand);
    const cands = [];

    // 1. the article's infobox logo is the most accurate match
    for (const title of queries) {
        const url = await wikiInfoboxLogo(title);
        if (url) cands.push({ url, title });
        await sleep(450);
    }

    // 2. Commons file search
    for (const q of [`${brand} logo`, ...queries.map((x) => `${x} logo`)]) {
        const pages = await commonsSearch(q);
        for (const p of pages) {
            const ii = p.imageinfo?.[0];
            if (!ii) continue;
            const fname = (p.title || '').toLowerCase();
            if (!/\.(svg|png)$/i.test(fname)) continue;
            if (!fname.includes('logo')) continue;
            const hit = tokens.some((t) => fname.includes(t));
            if (!hit) continue; // unrelated file
            cands.push({ url: ii.url.split('?')[0], title: p.title });
        }
        await sleep(450);
    }

    // Download every candidate and keep the largest/most wordmark-like one.
    let best = null;
    let n = 0;
    for (const c of cands) {
        const buf = await download(c.url);
        if (!buf) continue;
        const saved = await savePng(buf, `${slugify(brand)}--commons-${n}.png`);
        n++;
        if (!saved) continue;
        const cand = { ...saved, source: 'commons', url: c.url, detail: c.title };
        if (!best || qualityOf(cand) > qualityOf(best)) best = cand;
        await sleep(120);
    }
    return best;
}

module.exports = { tryCommons, slugify, tokensOf, savePng, download, wikiInfoboxLogo, commonsSearch, qualityOf, STAGE };
