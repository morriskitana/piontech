"use strict";
/**
 * Probe Openverse for modern stock photographs of Black people suitable for the
 * avatar / headshot slots, then build a numbered contact sheet so every candidate
 * can be checked by eye before it is written to the site.
 *
 *   node tools/probe-people.js                  # search + download + contact sheet
 *   node tools/probe-people.js --apply=3,7,12  # write the picked candidates to avatar_1..N
 *
 * Outputs:
 *   tools/probe-cache/<n>.<ext>   downloaded candidate files
 *   tools/probe-contact-sheet.jpg  numbered grid (index printed on each tile)
 *   tools/people-candidates.json   index -> metadata (title, source, licence, urls)
 *
 * The picker must be verified visually: Openverse titles are descriptive but a
 * stock photo titled "portrait" is not guaranteed to show the subject we need.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const S = require("./lib/sources");
const ST = require("./lib/skintone");

const TOOLS = __dirname;
const CACHE = path.join(TOOLS, "probe-cache");
const JSON_OUT = path.join(TOOLS, "people-candidates.json");
const SHEET = path.join(TOOLS, "probe-contact-sheet.jpg");

const QUERIES = [
  "african businessman",
  "african businesswoman",
  "black entrepreneur",
  "black professional",
  "african professional",
  "black office man",
  "black office woman",
  "businessman portrait",
  "businesswoman portrait",
  "entrepreneur",
  "business meeting",
  "office worker",
  "business suit",
  "african office",
  "black suit",
  "corporate portrait",
  "man suit office",
  "woman suit office",
  "african man portrait",
  "african woman portrait",
  "black man portrait",
  "black woman portrait",
  "africanamerican",
  "african american professional",
  "black professional woman",
  "black professional man",
  "nigerian business",
  "kenyan professional",
  "ghana businesswoman",
  "african engineer",
  "african manager",
  "african doctor",
  "african teacher",
  "african developer",
  "african lawyer",
  "business portrait",
  "professional woman",
  "professional man",
  "office portrait",
  "corporate office",
];

const SOURCES = ["stocksnap", "rawpixel", "wordpress", "flickr"];
const USE_OPENVERSE = process.argv.includes("--openverse");
const KEEP = 60;
const COLS = 6;
const CELL = 250;

// Title tokens that make a candidate a plausible professional headshot.
const GOOD = /\b(portrait|headshot|bust|man|woman|businessman|businesswoman|professional|office|business|smile|suit|corporate|person|face|author|consultant|engineer|manager|entrepreneur|technician)\b/i;
// Title tokens that disqualify: groups, children, non-professional scenes.
// Ethnicity tokens are NOT here: "african woman portrait" is exactly what we want.
const BAD = /\b(group|team|crowd|family|children|kids|baby|child|couple|wedding|friends|students|girls|boys|dance|sport|fitness|food|travel|nature|landscape|city|street|dog|cat|festival|concert|market|sign|drawing|painting|illustration|logo|statue|monument|historical|museum|traditional|vintage|retro|elderly)\b/i;
// Explicit ethnicity tokens - these are the highest-signal matches.
const ETHNIC = /\b(black|african|afro|negro|africa|ethnic)\b/i;

async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      try { out[idx] = await worker(items[idx], idx); }
      catch (e) { out[idx] = { error: e.message }; }
    }
  });
  await Promise.all(runners);
  return out;
}

function scoreTitle(t) {
  const s = String(t || "");
  if (!GOOD.test(s)) return -1;
  if (BAD.test(s)) return -1;
  let sc = 0;
  if (ETHNIC.test(s)) sc += 40;
  if (/portrait|headshot|bust/i.test(s)) sc += 18;
  if (/businessman|businesswoman|professional|consultant|engineer|manager|author/i.test(s)) sc += 10;
  if (/man\b|woman\b/i.test(s)) sc += 6;
  if (/suit|corporate|smile|office|business/i.test(s)) sc += 4;
  return sc;
}

/**
 * Score a candidate from its StockSnap keyword tags. The tags are far more
 * reliable than the human title: a photo titled "woman black" carries tags
 * like [woman, black, portrait, face, dark skin], which is exactly the signal
 * a headshot hunt needs.
 */
function scoreTags(tags) {
  const t = (tags || []).map((x) => String(x).toLowerCase());
  const s = t.join(", ");
  if (!t.length) return -1;
  const has = (re) => re.test(s);

  // Must depict a person.
  if (!has(/\b(man|woman|male|female|person|people|guy|lady|boy|girl|businessman|businesswoman|portrait|face|model|entrepreneur|entrepreneur|gentleman)\b/)) return -1;

  // Hard disqualifiers: content that cannot work as a corporate headshot.
  const DISQUALIFY = [
    /\b(family|families|parent|parents|mother|father|dad|mom|daughter|son|child|children|kid|kids|childhood|parenthood|parenting|motherhood|fatherhood|together|couple|sibling)\b/,
    /\b(model|fashion|vogue|beauty|makeup|haircut|hairstyle|hairstyles|brunette|makeover|stylish|style|streetwear|fashionable|lingerie|bikini|runway)\b/,
    /\b(musician|guitar|singer|songwriter|rapper|hiphop|rap|performer|album|vinyl|concert|stage)\b/,
    /\b(traditional|tribal|culture|cultural|africanwear|beaded|bracelets|jewelry|jewellery|jewerly|accessories|earrings|chain)\b/,
    /\b(outdoor|outdoors|outside|park|forest|beach|street|sidewalk|neighborhood|rural|fence|chainlink|bricks|brick|brickwork|wall|building|buildings|trees|tree|snow|winter|field)\b/,
    /\b(food|chocolate|coffee|cafe|tea|drink|dessert)\b/,
    /\b(phone|smartphone|texting|browsing|computer|laptop|keyboard|book|reading|studying|studying)\b/,
    /\b(sports?|football|basketball|running|hiking|yoga|gym|fitness|dance|cycling|swimming)\b/,
    /\b(dog|cat|bird|animal|puppy|kitten|pet|horse|cow|sheep)\b/,
    /\b(shadow|shadows|wallpaper|abstract|background|texture)\b/,
    /\b(kid|child|toddler|baby)\b/,
  ];
  for (const re of DISQUALIFY) if (has(re)) return -1;

  let sc = 0;
  // Ethnicity signal is the point of this search.
  if (has(/\b(black|african|africanamerican|afro|darker skin|dark skin|negro)\b/)) sc += 50;
  // A single, close, professional-looking subject.
  if (has(/\b(portrait|headshot|closeup|face|bust)\b/)) sc += 22;
  // Professional context.
  if (has(/\b(businessman|businesswoman|entrepreneur|business|professional|office|corporate|executive|ceo|founder|consultant|engineer|developer|technician|doctor|teacher|lawyer|architect|accountant|manager|director|desk|working|indoors|workplace|coworking|meeting)\b/)) sc += 30;
  if (has(/\b(suit|blazer|tie|shirt|formal|smart|professional clothing)\b/)) sc += 12;
  if (has(/\b(smiling|smile|confident|looking at camera|serious)\b/)) sc += 6;
  if (has(/\b(adult|man|woman|male|female|guy|lady|gentleman)\b/)) sc += 8;
  // Penalise shots that read as lifestyle rather than portrait.
  if (has(/\b(lifestyle|attractive|pretty|beautiful|cheerful|happy|fun|play|relaxing|leisure|casual|vogue)\b/)) sc -= 14;
  if (has(/\b(young|girl|boy)\b/) && !has(/\b(adult|man|woman|male|female|portrait)\b/)) sc -= 10;
  return sc;
}

async function download(c) {
  // StockSnap rows are fetched with resolve:false, so the CDN filename (which
  // needs the slug) is resolved here from the photo page.
  let url = c.downloadUrl;
  if (!url && c.source === "stocksnap" && c.fileTitle) {
    const meta = await S.stockSnapMeta(c.pageUrl).catch(() => null);
    if (meta) {
      url = meta.contentUrl;
      if (!c.title && meta.title) c.title = meta.title;
      if (!c.creator && meta.creator) c.creator = meta.creator;
      if (!c.creatorUrl && meta.creatorUrl) c.creatorUrl = meta.creatorUrl;
    }
  }
  if (!url) return null;
  const urls = [url];
  const m = url.match(/^(https:\/\/live\.staticflickr\.com\/.+?)_([a-z])\.jpg(\?.*)?$/i);
  if (m) urls.unshift(`${m[1]}_b.jpg${m[3] || ""}`);
  for (const u of urls) {
    try {
      const res = await S.fetchBuf(u, { timeoutMs: 20000, retries: 1 });
      return res.body;
    } catch (e) { /* next url */ }
  }
  return null;
}

/**
 * Resolve real pixel dimensions for a candidate. StockSnap rows carry no
 * width/height, so the file is fetched and measured instead of trusting the
 * index metadata.
 */
async function measure(buf) {
  try {
    const m = await sharp(buf, { failOn: "none" }).metadata();
    return { w: m.width || 0, h: m.height || 0 };
  } catch {
    return { w: 0, h: 0 };
  }
}

async function buildSheet(items) {
  const rows = Math.ceil(items.length / COLS);
  const W = COLS * CELL, H = rows * CELL;
  const tiles = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const label = `<svg width="${CELL}" height="${CELL}">
      <rect x="0" y="0" width="${CELL}" height="${CELL}" fill="#111827"/>
      <rect x="0" y="0" width="46" height="30" fill="#f9fafb"/>
      <text x="6" y="22" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="bold" fill="#111827">${it.index}</text>
    </svg>`;
    const overlay = Buffer.from(label);
    let photo;
    try {
      photo = await sharp(it.file, { failOn: "none", density: 300 })
        .resize(CELL - 4, CELL - 4, { fit: "cover", position: "attention" })
        .jpeg({ quality: 82 })
        .toBuffer();
    } catch (e) {
      photo = await sharp({ create: { width: CELL - 4, height: CELL - 4, channels: 3, background: "#374151" } }).jpeg().toBuffer();
    }
    tiles.push({ photo, overlay, left: (i % COLS) * CELL, top: Math.floor(i / COLS) * CELL });
  }
  const composites = tiles.map((t) => ({ input: t.photo, left: t.left + 2, top: t.top + 2 }));
  for (const t of tiles) {
    composites.push({ input: t.overlay, left: t.left, top: t.top });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: "#0b1220" } })
    .composite(composites)
    .jpeg({ quality: 84 })
    .toFile(SHEET);
}

(async () => {
  const applyArg = (process.argv.find((a) => a.startsWith("--apply=")) || "").slice(8);

  if (applyArg) {
    const picks = applyArg.split(",").map((x) => parseInt(x, 10)).filter((n) => Number.isFinite(n));
    const all = JSON.parse(fs.readFileSync(JSON_OUT, "utf8"));
    const byIndex = new Map(all.map((x) => [x.index, x]));
    const DIM = require("./image-dims");
    const targets = DIM.avatarTargets();
    if (picks.length !== targets.length) {
      console.error(`need ${targets.length} picks, got ${picks.length}`);
      process.exit(1);
    }
    const applied = [];
    for (let i = 0; i < picks.length; i++) {
      const c = byIndex.get(picks[i]);
      if (!c) { console.error(`missing candidate ${picks[i]}`); process.exit(1); }
      const t = targets[i];
      const buf = fs.readFileSync(c.file);
      const bak = path.join(TOOLS, "backup-images", t.target);
      const dest = path.join("C:/Users/ADMIN/Documents/Projects/pion/public/images", t.target);
      if (fs.existsSync(dest) && !fs.existsSync(bak)) {
        fs.mkdirSync(path.dirname(bak), { recursive: true });
        fs.copyFileSync(dest, bak);
      }
      const out = await sharp(buf, { failOn: "none", density: 300 })
        .resize(t.w, t.h, { fit: "cover", position: "attention" })
        .webp({ quality: 82, effort: 5, smartSubsample: true })
        .toBuffer();
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, out);
      const check = await sharp(out).metadata();
      if (check.width !== t.w || check.height !== t.h) throw new Error(`dim mismatch ${t.target}`);
      applied.push({ target: t.target, candidate: picks[i], title: c.title, source: c.source, license: c.license, creator: c.creator, pageUrl: c.pageUrl });
      console.log(`  [WROTE] ${t.target.padEnd(26)} ${t.w}x${t.h}  <- #${picks[i]} ${String(c.title).slice(0, 48)}`);
    }
    const lines = [
      "# Image sources & attribution", "",
      "All photographs below are used under licences that permit commercial use (CC0 / PDM / CC BY / CC BY-SA).",
      "CC BY and CC BY-SA images require attribution and, for BY-SA, share-alike on derivative works.", "",
      "| File | Subject | Source | Licence | Author | Source page |", "|---|---|---|---|---|---|",
    ];
    for (const a of applied) {
      lines.push(`| \`${a.target}\` | ${String(a.title).replace(/\|/g, "/")} | ${a.source} | ${a.license} | ${String(a.creator || "unknown").replace(/\|/g, "/")} | ${a.pageUrl} |`);
    }
    fs.writeFileSync(path.join(TOOLS, "avatar-attribution.md"), lines.join("\n"));
    console.log(`\nApplied ${applied.length} avatars -> tools/avatar-attribution.md`);
    return;
  }

  /* ---------------- search ---------------- */
  fs.rmSync(CACHE, { recursive: true, force: true });
  fs.mkdirSync(CACHE, { recursive: true });

  console.log(`Searching ${QUERIES.length} queries via StockSnap${USE_OPENVERSE ? " (+ Openverse fallback)" : ""}...`);
  const chunks = await pool(QUERIES, 6, async (q) => {
    const out = [];
    // StockSnap's JSON search endpoint is queried directly: it supports
    // pagination, returns structured rows with tags and true dimensions, and
    // every photo is CC0. Openverse is an opt-in fallback (--openverse)
    // because its API intermittently returns 504 and stalls every query.
    const ss = await S.searchStockSnap(q, { limit: 80, pages: 3, resolve: false }).catch(() => []);
    out.push(...ss.map((x) => ({ ...x, query: q })));
    if (USE_OPENVERSE) {
      const ov = await S.searchOpenverse(q, { pageSize: 20, sources: SOURCES }).catch(() => []);
      out.push(...ov.map((x) => ({ ...x, query: q })));
    }
    return out;
  });

  const seen = new Set();
  const cands = [];
  for (const c of chunks) {
    if (!Array.isArray(c)) continue;
    for (const x of c) {
      // Dedupe on the photo ID, not the title: StockSnap returns the same photo
      // under many queries and title-based dedupe collapsed the pool to 12.
      const k = x.fileTitle || x.pageUrl || (x.title || "").toLowerCase().trim();
      if (!k || seen.has(k)) continue;
      seen.add(k);
      // Tag score is primary; the title score breaks ties for non-StockSnap
      // rows (Openverse) that carry no keyword tags.
      const tagSc = scoreTags(x.tags);
      const titleSc = scoreTitle(x.title);
      const sc = tagSc >= 0 ? tagSc : titleSc;
      if (sc < 0) continue;
      cands.push({ ...x, _score: sc, _tagScore: tagSc });
    }
  }
  console.log(`scored candidates: ${cands.length}`);

  // Download every candidate, then let the skin-tone measurement decide the
  // order. Measuring first is the only way to rank a Black headshot above a
  // light-skinned one whose title merely says "portrait".
  const measured = [];
  for (const c of cands) {
    const buf = await download(c);
    if (!buf) continue;
    const dims = await measure(buf);
    if (dims.w < 400 || dims.h < 400) continue;
    // Scan for the densest face-sized skin region, so the numbers are
    // comparable across differently framed photographs.
    const skin = await ST.skinStatsBest(buf);
    const v = ST.verdict(skin);
    measured.push({ c, buf, dims, skin, v });
  }
  console.log(`downloaded + measured: ${measured.length}`);

  // Rank: verified dark-skin headshots first, then tag score, then skin coverage.
  measured.sort((a, b) => {
    const fa = a.v.face && a.v.darkSkin ? 1 : 0;
    const fb = b.v.face && b.v.darkSkin ? 1 : 0;
    if (fa !== fb) return fb - fa;
    if (a.c._score !== b.c._score) return b.c._score - a.c._score;
    return b.skin.dark - a.skin.dark;
  });

  const items = [];
  for (const m of measured) {
    if (items.length >= KEEP) break;
    const c = m.c;
    const buf = m.buf;
    let ext = ".jpg";
    try {
      const mm = await sharp(buf, { failOn: "none" }).metadata();
      if (mm.format === "png") ext = ".png";
      if (mm.format === "webp") ext = ".webp";
    } catch (e) { continue; }
    const file = path.join(CACHE, `${items.length + 1}${ext}`);
    fs.writeFileSync(file, buf);

    // StockSnap names the photographer on the detail page's JSON-LD block.
    let creator = c.creator || "";
    if (c.source === "stocksnap" && !creator && c.pageUrl) {
      const meta = await S.stockSnapMeta(c.pageUrl).catch(() => null);
      if (meta) creator = meta.creator || "";
    }
    const title = c.title || (c.tags || []).slice(0, 4).join(", ") || c.fileTitle;

    items.push({
      index: items.length + 1, file, title, source: c.source, license: c.license,
      creator, creatorUrl: c.creatorUrl || "", pageUrl: c.pageUrl, downloadUrl: c.downloadUrl,
      width: m.dims.w, height: m.dims.h, query: c.query, licenseUrl: c.licenseUrl,
      tags: c.tags || [],
      skin: { dark: +m.skin.dark.toFixed(4), any: +m.skin.any.toFixed(4), lum: +m.skin.lum.toFixed(1) },
      region: m.skin.region || null,
      face: m.v.face, darkSkin: m.v.darkSkin, darkShare: +m.v.darkShare.toFixed(3),
    });
    process.stdout.write(`\r  saved ${items.length}/${KEEP}`);
  }
  console.log("");

  fs.writeFileSync(JSON_OUT, JSON.stringify(items, null, 2));
  await buildSheet(items);
  console.log(`\n${items.length} candidates -> ${JSON_OUT}`);
  console.log(`contact sheet -> ${SHEET}`);
  items.forEach((it) => console.log(
    `  ${String(it.index).padStart(2)}. ${String(it.width).padStart(4)}x${String(it.height).padEnd(4)}` +
    ` dark=${it.skin.dark.toFixed(3)} skin=${it.skin.any.toFixed(3)} share=${it.darkShare.toFixed(2)}` +
    ` ${it.face && it.darkSkin ? "OK " : "-- "} ${it.title}`
  ));
})();
