/**
 * Download official brand logos for the Partners page.
 *
 * For every brand in brand-map.js all known sources are tried and the
 * best-looking result wins:
 *   1. simpleicons  - clean CC0 vector wordmarks
 *   2. vendor site  - the logo the vendor itself publishes
 *   3. Wikipedia    - article lead image
 *   4. Commons      - infobox / Commons file (vector, but licence-check it)
 *   5. favicon      - last resort, usually too small to be useful
 *
 * Usage:  node tools/brand-logos/download-logos.js [brand substring ...]
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { fetchPage, extractCandidates, verifyPage, sleep, fetchRetry } = require('./logo-fetch');
const { tryCommons, slugify, qualityOf, STAGE } = require('./commons-logo');
const BRANDS = require('./brand-map');

// Pages that show someone else's logo are never a valid source.
const BAD_URL = /(client|customer|case-stud|partner-logo|our-clients|client-logo|logo-wall|trusted-by)/i;

/** Words that must appear on the page for it to be accepted as this brand. */
function brandTokens(brand) {
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
                    'solutions',
                    'media',
                    'by',
                    'from'
                ].includes(w)
        );
}

/** Output filename stem for a brand, honouring an explicit slug override. */
function outStem(brand, entry = {}) {
    return entry.slug || slugify(brand);
}

async function download(url) {
    try {
        const r = await fetchRetry(url, { redirect: 'follow', headers: { accept: 'image/*,*/*' } });
        if (!r || !r.ok) return null;
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.length < 200) return null;
        return buf;
    } catch {
        return null;
    }
}

/** Some vendor SVGs use xlink:href without declaring the namespace -> sharp rejects them. */
function sanitiseSvg(buf) {
    let svg = buf.toString('utf8');
    if (!/xmlns:xlink/.test(svg)) {
        svg = svg.replace(/<svg\b([^>]*)>/i, (m, attrs) => `<svg${attrs} xmlns:xlink="http://www.w3.org/1999/xlink">`);
    }
    return Buffer.from(svg, 'utf8');
}

/** Write a rasterised PNG to staging, trimmed of transparent padding. */
async function savePng(buf, outName) {
    const isSvg = buf.slice(0, 400).toString('utf8').includes('<svg');
    const input = isSvg ? sanitiseSvg(buf) : buf;
    // render vectors large so they stay crisp when the browser scales them
    const density = isSvg ? 1200 : 300;

    let meta;
    try {
        meta = await sharp(input, { density }).metadata();
    } catch {
        return null;
    }
    if (!meta.width || !meta.height) return null;
    if (meta.width < 24 || meta.height < 24) return null; // too small to be a real logo

    let img = sharp(input, { density }).ensureAlpha();

    // trim transparent border so the artwork is tight in the tile
    try {
        const trimmed = await img.trim({ threshold: 2 }).toBuffer();
        const tm = await sharp(trimmed).metadata();
        if (tm.width >= 24 && tm.height >= 24) img = sharp(trimmed);
    } catch {
        /* keep untrimmed */
    }

    // cap the longest edge at 900px, keep aspect
    try {
        const m2 = await img.metadata();
        const longest = Math.max(m2.width, m2.height);
        if (longest > 900) {
            img = img.resize({
                width: m2.width >= m2.height ? 900 : null,
                height: m2.height > m2.width ? 900 : null,
                fit: 'inside',
                withoutEnlargement: true
            });
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
    const finalMeta = await sharp(out).metadata();
    return { file: out, width: finalMeta.width, height: finalMeta.height };
}

async function trySimpleIcons(brand, slugs) {
    for (const slug of slugs) {
        const url = `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`;
        try {
            const r = await fetchRetry(url);
            if (!r || !r.ok) continue;
            const text = await r.text();
            if (!text.includes('<svg')) continue;
            const saved = await savePng(Buffer.from(text), `${outStem(brand, entry)}--simpleicons.png`);
            if (saved) return { ...saved, source: 'simpleicons', url, detail: `slug=${slug}` };
        } catch {
            /* next slug */
        }
        await sleep(120);
    }
    return null;
}

async function tryOfficialSite(brand, entry) {
    const tokens = brandTokens(brand);

    // Known asset URLs (e.g. a vendor CDN) win outright - no page parsing needed.
    for (const asset of entry.assets || []) {
        const buf = await download(asset);
        if (!buf) continue;
        const saved = await savePng(buf, `${outStem(brand, entry)}--asset.png`);
        if (saved) return { ...saved, source: 'site-asset', url: asset, detail: 'known asset' };
        await sleep(120);
    }

    for (const dom of entry.domains || []) {
        for (const base of [`https://www.${dom}/`, `https://${dom}/`, `http://${dom}/`]) {
            let r;
            try {
                r = await fetchPage(base);
            } catch {
                continue;
            }
            if (!r || !r.ok) continue;
            let html;
            try {
                html = await r.text();
            } catch {
                continue;
            }
            const v = verifyPage(html, tokens);
            const domHasToken = tokens.some((t) => r.url.toLowerCase().includes(t));
            const trusted = v.ok || domHasToken;
            if (!trusted) continue; // wrong company - keep looking

            const cands = extractCandidates(html, r.url, tokens).filter((c) => !c.url || !BAD_URL.test(c.url));
            // prefer candidates whose URL mentions the brand
            cands.sort((a, b) => {
                const aHit = a.url ? tokens.some((t) => a.url.toLowerCase().includes(t)) : false;
                const bHit = b.url ? tokens.some((t) => b.url.toLowerCase().includes(t)) : false;
                if (aHit !== bHit) return aHit ? -1 : 1;
                return 0;
            });

            // Evaluate every candidate and keep the best-looking one. The first
            // hit is often a 32px apple-touch-icon while the real wordmark sits
            // further down the list.
            let best = null;
            let n = 0;
            for (const c of cands.slice(0, 12)) {
                let saved = null;
                let kind = c.kind;
                if (c.inlineSvg) {
                    saved = await savePng(Buffer.from(c.inlineSvg), `${outStem(brand, entry)}--site-${n}.png`);
                    kind = 'inline-svg';
                } else {
                    if (!/\.(svg|png|jpe?g|webp|gif)(\?|$)/i.test(c.url)) continue;
                    // a 1200x630 / 1200x600 asset is a social share card, not a logo
                    if (c.kind === 'og:image' && /1200x(630|600)/i.test(c.url)) continue;
                    const buf = await download(c.url);
                    if (!buf) continue;
                    saved = await savePng(buf, `${outStem(brand, entry)}--site-${n}.png`);
                }
                n++;
                if (!saved) continue;
                const cand = { ...saved, source: `site-${kind}`, url: c.url || r.url, detail: r.url };
                if (!best || qualityOf(cand) > qualityOf(best)) best = cand;
                await sleep(100);
            }
            if (best) return best;
            break; // domain resolved but nothing usable
        }
    }
    return null;
}

async function tryWiki(brand, title) {
    if (!title) return null;
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=${encodeURIComponent(title)}`;
        const r = await fetchRetry(url);
        if (!r || !r.ok) return null;
        const j = await r.json();
        const p = Object.values(j.query?.pages || {})[0];
        const src = p?.original?.source;
        if (!src) return null;
        if (!/\.(svg|png|jpe?g)$/i.test(src)) return null;
        const buf = await download(src);
        if (!buf) return null;
        const saved = await savePng(buf, `${outStem(brand, entry)}--wiki.png`);
        if (saved) return { ...saved, source: 'wikipedia', url: src, detail: title };
    } catch {
        /* next */
    }
    return null;
}

async function tryFavicon(brand, entry) {
    for (const dom of entry.domains || []) {
        const url = `https://unavatar.io/${dom}?size=256&format=png`;
        const buf = await download(url);
        if (!buf) continue;
        const saved = await savePng(buf, `${outStem(brand, entry)}--favicon.png`);
        if (saved) return { ...saved, source: 'favicon', url, detail: dom };
        await sleep(120);
    }
    return null;
}

/** Quality plus a bonus for how trustworthy the source is. */
function score(c) {
    if (!c) return -1;
    let s = qualityOf(c);
    if (c.source === 'simpleicons') s += 100; // clean CC0 vector
    if (c.source === 'commons') s += 60; // usually a vector wordmark, but licence-check it
    if (c.source === 'favicon') s -= 20; // last resort
    return s;
}

/** Publish the winning candidate under the canonical <slug>.png name. */
function publish(winner, brand, entry) {
    const canonical = path.join(STAGE, `${outStem(brand, entry)}.png`);
    try {
        fs.copyFileSync(winner.file, canonical);
        return canonical;
    } catch {
        return winner.file;
    }
}

(async () => {
    fs.mkdirSync(STAGE, { recursive: true });
    const results = [];
    const only = process.argv.slice(2).map((s) => s.toLowerCase());
    const names = Object.keys(BRANDS).filter((n) => !only.length || only.some((o) => n.toLowerCase().includes(o)));

    for (const brand of names) {
        const entry = BRANDS[brand];
        const attempts = [];
        const cands = [];

        const icon = await trySimpleIcons(brand, entry.slugs || []);
        attempts.push(`simpleicons=${icon ? 'OK' : 'no'}`);
        if (icon) cands.push(icon);

        const site = await tryOfficialSite(brand, entry);
        attempts.push(`site=${site ? 'OK' : 'no'}`);
        if (site) cands.push(site);

        const wiki = await tryWiki(brand, entry.wiki);
        attempts.push(`wiki=${wiki ? 'OK' : 'no'}`);
        if (wiki) cands.push(wiki);

        const commons = await tryCommons(brand, entry.wiki ? [entry.wiki] : []);
        attempts.push(`commons=${commons ? 'OK' : 'no'}`);
        if (commons) cands.push(commons);

        const fav = await tryFavicon(brand, entry);
        attempts.push(`favicon=${fav ? 'OK' : 'no'}`);
        if (fav) cands.push(fav);

        cands.forEach((c) => (c.ar = Number((c.width / c.height).toFixed(2))));

        if (!cands.length) {
            console.log(`FAIL  ${brand.padEnd(38)} ${attempts.join(' ')}`);
            results.push({ brand, ok: false, attempts: attempts.join(' ') });
            await sleep(250);
            continue;
        }

        cands.sort((a, b) => score(b) - score(a));
        const got = cands[0];
        const s = score(got);
        const q = s >= 60 ? 'good' : s >= 20 ? 'fair' : 'LOW';
        const published = publish(got, brand, entry);
        console.log(
            `OK    ${brand.padEnd(38)} ${String(got.width).padStart(4)}x${String(got.height).padEnd(4)} ar=${String(got.ar).padStart(5)} ${q.padEnd(5)} ${got.source.padEnd(16)} ${attempts.join(' ')}`
        );
        results.push({
            brand,
            ok: true,
            ...got,
            published,
            license: got.source === 'commons' ? 'CHECK-commons' : got.source === 'simpleicons' ? 'CC0' : 'vendor-site'
        });
        await sleep(250);
    }

    const out = path.join(STAGE, '_results.json');
    const prev = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : [];
    const merged = new Map(prev.map((r) => [r.brand, r]));
    for (const r of results) merged.set(r.brand, r);
    fs.writeFileSync(out, JSON.stringify([...merged.values()], null, 2));

    const ok = results.filter((r) => r.ok).length;
    const low = results.filter((r) => r.ok && score(r) < 20).length;
    console.log(`\n${ok}/${results.length} fetched  (${low} low-resolution, need a better source)`);
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
