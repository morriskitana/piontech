/**
 * Shared helpers for fetching brand logos from vendor websites.
 *
 * A logo is only accepted when the page it came from really belongs to the
 * brand: the brand name must appear in the page title, og:site_name or h1,
 * or in the final domain. That guard is what stops a search hit from quietly
 * substituting a different company's logo.
 */
const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const absolutise = (href, base) => {
    try {
        return new URL(href, base).href;
    } catch {
        return null;
    }
};

async function fetchPage(url, redirects = 0) {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 20000);
    const r = await fetch(url, {
        signal: ctl.signal,
        redirect: 'follow',
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml,*/*' }
    });
    clearTimeout(t);
    if (r.status >= 300 && r.status < 400 && r.headers.get('location') && redirects < 4) {
        return fetchPage(absolutise(r.headers.get('location'), url), redirects + 1);
    }
    return r;
}

/**
 * fetch with retry: Wikimedia and a few vendor CDNs answer 429/503 when hit
 * in a burst, and a plain fetch then silently loses the logo.
 */
async function fetchRetry(url, opts = {}, tries = 4) {
    let wait = 800;
    for (let i = 0; i < tries; i++) {
        try {
            const r = await fetch(url, {
                ...opts,
                headers: { 'user-agent': UA, accept: '*/*', ...(opts.headers || {}) }
            });
            if (r.status === 429 || r.status === 503) {
                const ra = parseInt(r.headers.get('retry-after') || '0', 10);
                await sleep(ra ? ra * 1000 : wait);
                wait *= 2;
                continue;
            }
            return r;
        } catch (e) {
            if (i === tries - 1) throw e;
            await sleep(wait);
            wait *= 2;
        }
    }
    return null;
}

/**
 * Pull candidate logo URLs out of a page, best first.
 *
 * A candidate qualifies when the markup, filename or alt text mentions the
 * brand or the word "logo". Vendors frequently name their wordmark after the
 * product rather than the file (e.g. Telit_Cint_Logo_White.png), so matching
 * on the brand token matters as much as matching on "logo".
 */
function extractCandidates(html, baseUrl, brandTokens = []) {
    const out = [];
    const toks = brandTokens.map((t) => String(t).toLowerCase());
    const mentionsBrand = (s) => toks.length > 0 && toks.some((t) => String(s).toLowerCase().includes(t));

    const push = (href, kind, extra = {}) => {
        if (!href) return;
        const abs = absolutise(href, baseUrl);
        if (!abs) return;
        if (!/^https?:/i.test(abs)) return;
        out.push({ url: abs, kind, ...extra });
    };

    // apple-touch-icon: usually the largest square mark the vendor ships
    for (const m of html.matchAll(/<link[^>]+rel=["']apple-touch-icon[^"']*["'][^>]*>/gi)) {
        const href = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
        const size = (m[0].match(/sizes=["'](\d+)x(\d+)/i) || [])[1];
        push(href, 'apple-touch-icon', { size: size ? Number(size) : 0 });
    }
    // og:image - often the wordmark, but sometimes a social share card
    for (const m of html.matchAll(/<meta[^>]+property=["']og:image(?::secure_url|:url)?["'][^>]*>/gi)) {
        push((m[0].match(/content=["']([^"']+)["']/i) || [])[1], 'og:image');
    }
    // header <img> that looks like a logo
    for (const m of html.matchAll(/<img[^>]*>/gi)) {
        const tag = m[0];
        const src = (tag.match(/src=["']([^"']+)["']/i) || [])[1];
        if (!src) continue;
        const alt = (tag.match(/alt=["']([^"']*)["']/i) || [])[1] || '';
        const ctx = (tag + ' ' + html.slice(Math.max(0, m.index - 220), m.index)).toLowerCase();
        if (/placeholder|spacer|blank|1x1|pixel|sprite|avatar|testimonial/i.test(ctx)) continue;
        const looksLikeLogo = /logo|brand/.test(ctx) || mentionsBrand(src) || mentionsBrand(alt);
        if (!looksLikeLogo) continue;
        push(src, 'img-logo');
        // prefer the largest srcset variant of the same artwork
        for (const sm of tag.matchAll(/srcset=["']([^"']+)["']/gi)) {
            const variants = sm[1]
                .split(',')
                .map((p) => p.trim().split(/\s+/))
                .map(([u, d]) => ({ u, w: parseInt(d || '0', 10) }))
                .filter((v) => v.u && v.w)
                .sort((a, b) => b.w - a.w);
            if (variants.length) push(variants[0].u, 'img-logo');
        }
    }
    // inline svg marked as a logo
    for (const m of html.matchAll(/<svg[^>]*(?:id|class)=["'][^"']*logo[^"']*["'][^>]*>/gi)) {
        const end = html.indexOf('</svg>', m.index);
        if (end === -1) continue;
        out.push({ inlineSvg: html.slice(m.index, end + 6), kind: 'inline-svg' });
    }
    // favicon - last resort
    for (const m of html.matchAll(/<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/gi)) {
        const href = (m[0].match(/href=["']([^"']+)["']/i) || [])[1];
        const size = (m[0].match(/sizes=["'](\d+)x(\d+)/i) || [])[1];
        push(href, 'icon', { size: size ? Number(size) : 0 });
    }

    // og:image is often a 1200x630 social share card rather than a logo, so it
    // ranks below the site's own logo assets.
    const rank = { 'apple-touch-icon': 0, 'img-logo': 1, 'inline-svg': 2, 'og:image': 3, icon: 4 };
    return out.sort((a, b) => (rank[a.kind] ?? 9) - (rank[b.kind] ?? 9));
}

/** Does this page look like it really belongs to the brand? */
function verifyPage(html, brandTokens) {
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
    const ogSite = (html.match(/<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i) || [])[1] || '';
    const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
    const hay = `${title} ${ogSite} ${h1}`.replace(/<[^>]+>/g, ' ').toLowerCase();
    const hit = brandTokens.filter((t) => hay.includes(t.toLowerCase()));
    return { hay, hit, ok: hit.length > 0, title: title.replace(/\s+/g, ' ').trim().slice(0, 90) };
}

module.exports = { fetchPage, extractCandidates, verifyPage, absolutise, sleep, UA, fetchRetry };
