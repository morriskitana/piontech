"use strict";
/**
 * Shared source-discovery + scoring helpers for replacing PionTech placeholder images
 * with real, commercially-licensed photographs.
 *
 * Sources (all keyless, all commercially usable):
 *   - wikimedia (via Wikimedia Commons API) -> high-resolution originals + thumbnail at any width
 *   - flickry/openverse aggregations       -> Openverse index over Flickr, StockSnap, Rawpixel, ...
 *   - stocksnap (via Openverse)            -> CC0 professional stock photography
 *
 * Licensing policy: only cc0 / pdm / by / by-sa are accepted. by-nd is rejected because
 * cropping/resizing constitutes a derivative work.
 */
const https = require("https");
const { URL } = require("url");

const UA = "PionTechSiteBuilder/1.0 (piontech website rebuild; contact: hello@piontech.co.ke)";
const ALLOWED_LICENSES = new Set(["cc0", "pdm", "by", "by-sa"]);

function fetchBuf(url, { timeoutMs = 12000, retries = 2, redirects = 4 } = {}) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      let settled = false;
      const req = https.get(url, { headers: { "User-Agent": UA, "Accept": "*/*" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects > 0) {
          res.resume();
          return resolve(fetchBuf(new URL(res.headers.location, url).toString(), { timeoutMs, retries, redirects: redirects - 1 }));
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (settled) return;
          settled = true;
          if (res.statusCode !== 200) {
            if (n > 0) return setTimeout(() => attempt(n - 1), 900 * (2 - n));
            return reject(new Error(`HTTP ${res.statusCode} ${url.slice(0, 90)}`));
          }
          resolve({ body: Buffer.concat(chunks), headers: res.headers, finalUrl: url });
        });
      });
      req.setTimeout(timeoutMs, () => { req.destroy(new Error("timeout " + timeoutMs + "ms")); });
      req.on("error", (e) => {
        if (settled) return;
        settled = true;
        if (n > 0) return setTimeout(() => attempt(n - 1), 900 * (2 - n));
        reject(e);
      });
    };
    attempt(retries);
  });
}

const fetchJson = async (url, opts) => JSON.parse((await fetchBuf(url, opts)).body.toString());

/* ------------------------------------------------------------------ *
 * Text normalisation + scoring
 * ------------------------------------------------------------------ */
const STOP = new Set(["a", "an", "the", "of", "and", "or", "in", "on", "at", "for", "to", "with", "by", "from", "photo", "image", "picture", "stock"]);

// Curated synonyms so that search vocabulary matches photo metadata vocabulary.
const SYN = {
  datacenter: ["server", "rack", "datacenter", "servers"],
  centre: ["center", "centre"],
  photovoltaic: ["solar", "photovoltaic", "pv"],
  cctv: ["cctv", "surveillance", "camera", "security"],
  fibre: ["fiber", "fibre", "optic", "cable"],
  telecom: ["telecom", "telecommunication", "telecommunications", "antenna", "mast", "tower"],
  callcentre: ["call", "centre", "center", "operator", "headset", "support"],
  biometric: ["biometric", "fingerprint", "recognition", "access", "control", "scanner"],
  warehouse: ["warehouse", "logistics", "distribution", "storage", "shelves"],
  iot: ["iot", "sensor", "embedded", "device", "circuit", "electronics"],
  portrait: ["portrait", "man", "woman", "person", "face", "professional", "businessman", "businesswoman"],
  engineer: ["engineer", "team", "technician", "staff", "colleagues"],
  analytics: ["analytics", "dashboard", "data", "chart", "report", "monitor", "screen"],
  design: ["designer", "design", "creative", "studio", "workspace", "sketch"],
  handshake: ["handshake", "partnership", "agreement", "deal", "contract", "meeting"],
  skyline: ["skyline", "city", "skyscraper", "buildings", "business", "district"],
  camera: ["camera", "cctv", "surveillance", "video"],
  access: ["access", "control", "gate", "barrier", "turnstile", "security"],
  fleet: ["fleet", "truck", "lorry", "vehicle", "logistics", "transport", "warehouse"],
  screen: ["screen", "monitor", "display", "dashboard", "control"],
  software: ["software", "developer", "code", "programming", "coding", "laptop", "computer"],
  engineeringsite: ["engineer", "site", "construction", "installation", "field"],
  office: ["office", "desk", "workplace", "workspace", "company"],
};

function norm(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
function tokens(s) {
  return norm(s).split(" ").filter((t) => t && !STOP.has(t));
}
function expand(toks) {
  const out = new Set(toks);
  for (const t of toks) for (const s of SYN[t] || []) out.add(s);
  return out;
}

/* ------------------------------------------------------------------ *
 * Title-first relevance scoring
 *
 * Archives like Wikimedia Commons mix modern photographs with historical
 * portraits, scans, diagrams and academic figures. Matching on the title
 * (and only weakly on tags/description) plus an explicit blocklist keeps
 * placeholder art out of the final site.
 * ------------------------------------------------------------------ */

// Titles containing these are scanned documents, artwork, diagrams or screenshots.
// Matched on word boundaries so "table" does not block "acceptable" and
// "actor" does not block "factor".
const TITLE_BLOCK = [
  "magazine", "poster", "cover", "drawing", "painting", "engraving", "lithograph",
  "etching", "illustration", "woodcut", "map", "diagram", "blueprint", "screenshot",
  "newspaper", "advertisement", "logo", "emblem", "coat of arms", "stamp", "coin",
  "banknote", "comic", "storyboard", "emulator", "interface", "desktop",
  "menu", "certificate", "table", "figure", "statistic", "infographic",
  "chart", "top", "best", "leading", "actress", "actor", "silent film",
  "nineteenth century", "eighteenth century", "twentieth century", "century",
  "elevation", "section", "schematic", "portrait of", "photograph of", "photo of",
];

// Subjects that do not belong on a corporate ICT / energy website.
const DOMAIN_BLOCK = [
  "navy", "military", "army", "air force", "airforce", "squadron", "aircraft",
  "airplane", "aeroplane", "helicopter", "fighter", "bomber", "warship", "submarine",
  "soldier", "regiment", "troop", "parade", "battlefield", "spartan", "stadium",
  "football club", "premier league", "wembley", "torpedo", "artillery", "regal",
  "baseball", "basketball", "soccer", "rugby", "cricket", "hockey", "volleyball",
  "athlete", "olympic", "marathon",
  "president", "medal of", "national medal", "chamberlain", "memorial", "monument",
  "statue", "cathedral", "church", "mosque", "temple", "palace", "castle",
  "ovahimba", "tribe", "tribal", "ethnic", "ceremony", "festival",
];

// Subjects that match a service keyword but are the wrong thing entirely.
// These are the false positives that keyword scoring cannot tell apart:
// a "diesel generator" query returning a train interior, an "integration"
// query returning a rocket, a "monitoring" query returning a space station.
const SUBJECT_BLOCK = [
  // transport that is not the subject
  "train", "railway", "locomotive", "tram", "subway", "metro", "carriage",
  "bus", "truck", "lorry", "motorcycle", "bicycle", "yacht", "cruise",
  // space
  "rocket", "spacecraft", "spaceship", "space station", "astronaut", "nasa",
  "orion", "apollo", "shuttle", "satellite launch", "launch abort", "lunar",
  // screenshots and error states
  "blue screen", "error message", "kernel panic", "crash dump", "screen shot",
  "screen shots", "screenshots", "screen capture", "screencap",
  // graphic design rather than photography
  "typography", "lettering", "calligraphy", "word cloud", "font", "typeface",
  "clipart", "clip art", "vector art", "icon set",
  // industrial hazards and military logistics
  "chemical", "pilot plant", "agent destruction", "marine", "mlg",
  "battalion", "brigade", "corps", "ordnance", "explosive",
  // demolition and salvage rather than installation
  "dismantling", "dismantle", "demolition", "scrapping", "salvage",
  // unrelated professions and venues that share a keyword
  "soil conservation", "conservation technician", "disney", "theme park",
  // recognisable public figures do not belong on a company site
  "second gentleman", "first lady", "senator", "governor", "congressman",
  "congresswoman", "emhoff", "biden", "trump", "obama", "prime minister",
  "foreign secretary", "secretary of state", "speech at", "keynote",
  "roller coaster", "teacup",
  // toys and fiction
  "toy", "lego", "doll", "cartoon", "anime", "meme", "emoji", "cosplay",
];

// Sources that never carry usable modern marketing photography: museum catalogues,
// natural-history archives, 3D-print repositories and 3D model libraries.
const SOURCE_BLOCK = new Set([
  "svgsilh", "sketchfab", "thingiverse", "spacex", "sciencemuseum", "woc_tech",
  "memorable", "bio_diversity", "biodiversityheritage", "phylopic", "inaturalist",
  "museumnz", "nypl", "smithsonian_portrait_gallery", "animaldiversity", "flora",
  "geographorguk", "flickr_nappy", "flickr_raster", "nasa", "justtakeitfree",
  "brooklynmuseum", "clevelandmuseum", "digitaltmuseum", "europeana", "met",
  "museumsvictoria", "rijksmuseum", "smk", "wellcome_collection", "wrms",
  "finnish_heritage_agency", "finnish_satakunnan_museum", "national_museum_of_finland",
  "katmai_nps",
  "smithsonian_air_and_space_museum", "smithsonian_american_art_museum",
  "smithsonian_american_history_museum", "smithsonian_american_indian_museum",
  "smithsonian_gardens", "smithsonian_anacostia_museum", "smithsonian_digital_library",
  "smithsonian_freer_gallery_of_art", "smithsonian_hirshhorn_museum",
  "smithsonian_institution_archives", "smithsonian_libraries", "smithsonian_zoo_and_conservation",
]);

const BLOCK_RE = new RegExp(
  `\\b(${TITLE_BLOCK.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "i"
);
const DOMAIN_RE = new RegExp(
  `\\b(${DOMAIN_BLOCK.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "i"
);
const SUBJECT_RE = new RegExp(
  `\\b(${SUBJECT_BLOCK.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "i"
);
// A year in the title means an archive scan rather than a modern photograph.
const YEAR_RE = /\b(1[0-9]\d{2})\b/;

function isBlocked(c) {
  if (SOURCE_BLOCK.has(c.source)) return true;
  // Normalise separators so "screen-shots" and "screen_shots" match the same
  // phrases as "screen shots".
  const title = String(c.title || "").replace(/[-_]+/g, " ");
  if (BLOCK_RE.test(title)) return true;
  if (DOMAIN_RE.test(title)) return true;
  if (SUBJECT_RE.test(title)) return true;
  if (YEAR_RE.test(title)) return true;
  // Flickr titles are often user captions; block obvious non-corporate subjects.
  if (c.source === "flickr") {
    const t = title.toLowerCase();
    if (/\b(baby|child|kid|wedding|bride|groom|pet|dog|cat|bird|flower|garden|beach|sunset|landscape|mountain|lake|river|forest|tree|food|recipe|cake|restaurant|hotel|resort|vacation|holiday|travel|tourist|museum|art gallery|painting|sculpture)\b/.test(t)) return true;
  }
  return false;
}

/**
 * Score a candidate against a topic.
 * topic: { strong: string[], weak: string[], need?: {w,h}, sources?: string[] }
 * A strong token must appear in the TITLE (or failing that, the tags) or the
 * candidate is rejected outright.
 */
function scoreCandidate(c, topic) {
  if (isBlocked(c)) return -1;
  if (topic.sources && topic.sources.length && !topic.sources.includes(c.source)) return -1;

  const titleTok = expand(tokens(c.title));
  const tagTok = expand(tokens((c.tags || []).join(" ")));
  const descTok = expand(tokens(c.description));

  const strong = expand(tokens((topic.strong || []).join(" ")));
  const weak = expand(tokens((topic.weak || []).join(" ")));

  const countIn = (set, target) => { let n = 0; for (const t of target) if (set.has(t)) n++; return n; };

  const tHits = countIn(titleTok, strong);
  const gHits = countIn(tagTok, strong);
  const dHits = countIn(descTok, strong);

  // The title must carry the subject. Tag or description matches alone are how
  // unrelated archive files sneak in, so they are never enough.
  if (tHits === 0) return -1;

  // Title match is the signal we trust; tag matches count less.
  let score = tHits * 12 + gHits * 3 + dHits * 0.5;
  score += countIn(titleTok, weak) * 4 + countIn(tagTok, weak) * 1;

  // licence preference: cc0 / pdm need no attribution
  if (c.license === "cc0" || c.license === "pdm") score += 6;
  else if (c.license === "by") score += 3;
  else if (c.license === "by-sa") score += 1;

  // resolution headroom. A source that has to be blown up by more than 30% to
  // cover the target looks soft on a retina display, so reject it outright
  // rather than letting a keyword-perfect but tiny image win.
  if (c.width && c.height && topic.need) {
    const scale = Math.max(topic.need.w / c.width, topic.need.h / c.height);
    const maxScale = topic.allowUpscale || 1.3;
    if (scale > maxScale) return -1;
    if (scale <= 1.0) score += 8;
    else if (scale <= 1.15) score += 4;
    else score -= 4;
  }

  // aspect similarity
  if (c.width && c.height && topic.need) {
    const ar = c.width / c.height;
    const want = topic.need.w / topic.need.h;
    score += Math.max(0, 6 - Math.abs(ar - want) * 4);
  }

  // Commons originals can be fetched at any width -> preferred for large targets
  if (c.source === "wikimedia" && topic.need && topic.need.w >= 1200) score += 4;
  if (c.source === "stocksnap") score += 2;

  return score;
}

/* ------------------------------------------------------------------ *
 * Openverse
 * ------------------------------------------------------------------ */
async function searchOpenverse(query, { pageSize = 20, sources = null } = {}) {
  const p = new URLSearchParams({
    q: query,
    page_size: String(pageSize),
    license: "cc0,pdm,by,by-sa",
    mature: "false",
  });
  if (sources && sources.length) p.set("source", sources.join(","));
  const j = await fetchJson(`https://api.openverse.org/v1/images/?${p.toString()}`, { timeoutMs: 15000 });
  return (j.results || [])
    .filter((r) => ALLOWED_LICENSES.has(r.license))
    .map((r) => ({
      source: r.source,
      title: r.title || "",
      description: "",
      tags: (r.tags || []).map((t) => t.name),
      license: r.license,
      licenseVersion: r.license_version,
      licenseUrl: r.license_url,
      creator: r.creator || "",
      creatorUrl: r.creator_url || "",
      attribution: r.attribution || "",
      width: r.width || 0,
      height: r.height || 0,
      pageUrl: r.foreign_landing_url || "",
      downloadUrl: r.url,
      fileTitle: null,
    }));
}

/* ------------------------------------------------------------------ *
 * Wikimedia Commons
 * ------------------------------------------------------------------ */
function stripHtml(s) {
  return String(s || "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#\d+;/g, " ").replace(/\s+/g, " ").trim();
}

async function searchCommons(query, { limit = 20, thumbWidth = 1600 } = {}) {
  const gs = `filetype:bitmap ${query}`;
  const p = new URLSearchParams({
    action: "query", format: "json", generator: "search",
    gsrsearch: gs, gsrnamespace: "6", gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: String(thumbWidth),
  });
  const j = await fetchJson(`https://commons.wikimedia.org/w/api.php?${p.toString()}`, { timeoutMs: 20000 });
  const pages = Object.values(j.query?.pages || {});
  const out = [];
  for (const pg of pages) {
    const ii = pg.imageinfo?.[0];
    if (!ii || !/^image\/(jpeg|png)$/.test(ii.mime || "")) continue;
    const em = ii.extmetadata || {};
    const lic = stripHtml(em.LicenseShortName?.value || "");
    const licId = (em.License?.value || "").toLowerCase();
    const mapped = /public domain|^pd$|cc0|cc-zero/i.test(lic + " " + licId) ? "cc0"
      : /cc by-sa/i.test(lic) ? "by-sa"
      : /cc by/i.test(lic) ? "by" : null;
    if (!mapped) continue;
    out.push({
      source: "wikimedia",
      title: String(pg.title || "").replace(/^File:/, ""),
      description: stripHtml(em.ImageDescription?.value || "") + " " + stripHtml(em.Categories?.value || ""),
      // Commons categories are a long, noisy blob - they are deliberately NOT
      // exposed as tags so they cannot masquerade as a topical title match.
      tags: [],
      license: mapped,
      licenseVersion: stripHtml(em.LicenseVersion?.value || ""),
      licenseUrl: stripHtml(em.LicenseUrl?.value || ""),
      creator: stripHtml(em.Artist?.value || ""),
      creatorUrl: "",
      attribution: `${String(pg.title || "").replace(/^File:/, "")} — ${stripHtml(em.Artist?.value || "unknown")} — ${lic}`,
      width: ii.thumbwidth || ii.width || 0,
      height: ii.thumbheight || ii.height || 0,
      origWidth: ii.width,
      origHeight: ii.height,
      pageUrl: `https://commons.wikimedia.org/wiki/${encodeURIComponent(pg.title)}`,
      downloadUrl: ii.thumburl,
      fileTitle: pg.title,
    });
  }
  return out;
}

/** Re-request a Commons file's thumbnail at the exact width needed. */
async function commonsThumbAtWidth(fileTitle, width) {
  const p = new URLSearchParams({
    action: "query", format: "json", titles: fileTitle,
    prop: "imageinfo", iiprop: "url|size", iiurlwidth: String(width),
  });
  const j = await fetchJson(`https://commons.wikimedia.org/w/api.php?${p.toString()}`, { timeoutMs: 15000 });
  const pg = Object.values(j.query?.pages || {})[0];
  const ii = pg?.imageinfo?.[0];
  return ii ? { thumbUrl: ii.thumburl, w: ii.thumbwidth, h: ii.thumbheight } : null;
}

/* ------------------------------------------------------------------ *
 * StockSnap (direct)
 *
 * Openverse's index intermittently returns 504, and its StockSnap rows only
 * expose the 960w CDN derivative. StockSnap's own search page is fast, always
 * available, and carries the photographer's name plus the CC0 licence in the
 * page's JSON-LD block. The CDN caps out at 960w, so this source is used for
 * people and office subjects (square-ish crops) rather than wide banners.
 * ------------------------------------------------------------------ */
const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

async function searchStockSnap(query, { limit = 24, pages = 1, sort = "relevance", resolve = true } = {}) {
  const q = String(query).trim();
  if (!q) return [];
  // StockSnap's HTML search page truncates at ~40 results and its ranking is
  // OR-based, so multi-word queries return noise. The site's own JSON endpoint
  // (the one the "load more" button calls) supports pagination and returns
  // structured rows with tags, true pixel dimensions and download counts.
  // The rows carry no slug, so the CDN filename is resolved per candidate from
  // /photo/<id>, which also yields the title and the photographer's credit.
  const out = [];
  const seen = new Set();
  for (let p = 1; p <= pages; p++) {
    const url = `https://stocksnap.io/api/search-photos/${encodeURIComponent(q)}/${sort}/desc/${p}`;
    let json;
    try {
      json = JSON.parse((await fetchBuf(url, { timeoutMs: 20000, retries: 1 })).body.toString());
    } catch {
      break;
    }
    const rows = Array.isArray(json.results) ? json.results : [];
    if (!rows.length) break;
    for (const r of rows) {
      const id = r.img_id;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const keywords = Array.isArray(r.keywords) ? r.keywords : [];
      const cand = {
        source: "stocksnap",
        title: "",
        description: "",
        tags: keywords,
        license: "cc0",
        licenseVersion: "1.0",
        licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
        creator: r.author_name && r.author_name !== "undefined" ? r.author_name : "",
        creatorUrl: r.author_profile && r.author_profile !== "https://stocksnap.io/author/undefined" ? r.author_profile : "",
        attribution: "",
        width: r.img_width || 0,
        height: r.img_height || 0,
        pageUrl: `https://stocksnap.io/photo/${id}`,
        downloadUrl: "",
        fileTitle: id,
        pendingAuthor: !(r.author_name && r.author_name !== "undefined"),
        downloads: r.downloads || 0,
        relevance: r.relevance || 0,
      };
      if (resolve) {
        const meta = await stockSnapMeta(cand.pageUrl);
        if (meta) {
          cand.title = meta.title;
          cand.downloadUrl = meta.contentUrl;
          if (meta.creator) cand.creator = meta.creator;
          if (meta.creatorUrl) cand.creatorUrl = meta.creatorUrl;
          cand.pendingAuthor = !cand.creator;
        }
        if (!cand.downloadUrl) continue;
      } else {
        cand.title = "";
        cand.downloadUrl = `https://cdn.stocksnap.io/img-thumbs/960w/${id}.jpg`;
      }
      out.push(cand);
      if (out.length >= limit) return out;
    }
    if (!json.nextPage) break;
  }
  return out;
}

/**
 * Read a StockSnap photo's metadata from its detail page. The page exposes the
 * CDN derivative in its og:image tag and the photographer's name in the
 * JSON-LD block. /photo/<id> resolves by ID, so no slug lookup is needed.
 */
async function stockSnapMeta(pageUrl) {
  try {
    const html = (await fetchBuf(pageUrl, { timeoutMs: 20000, retries: 1 })).body.toString();
    const og = html.match(/property="og:image" content="([^"]+)"/);
    const jm = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    let creator = "", creatorUrl = "", title = "", description = "";
    if (jm) {
      const j = JSON.parse(jm[1]);
      creator = j.author || j.creator?.name || "";
      creatorUrl = j.author?.url || j.creator?.url || "";
      title = j.name || "";
      description = j.description || "";
    }
    if (!title) {
      const tm = html.match(/<title>([^<]+?)\s*Free Stock Photo/);
      if (tm) title = tm[1];
    }
    const urlm = html.match(/property="og:url" content="([^"]+)"/);
    return {
      creator, creatorUrl, title, description,
      contentUrl: og ? og[1] : "",
      pageUrl: urlm ? urlm[1] : pageUrl,
      license: "https://creativecommons.org/publicdomain/zero/1.0/",
    };
  } catch {
    return null;
  }
}

module.exports = {
  UA, ALLOWED_LICENSES,
  fetchBuf, fetchJson,
  norm, tokens, expand, scoreCandidate,
  searchOpenverse, searchCommons, commonsThumbAtWidth, stripHtml,
  searchStockSnap, stockSnapMeta,
};
