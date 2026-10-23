"use strict";
/**
 * Replaces PionTech placeholder artwork with real, commercially-licensed photographs.
 *
 *   node tools/fetch-images.js --dry-run              # resolve + score only, print table
 *   node tools/fetch-images.js --apply                # download, resize to exact dims, write files
 *   node tools/fetch-images.js --apply --only=case/   # limit to a path prefix
 *
 * Every candidate is scored on keyword relevance, licence and resolution headroom.
 * Replacements are rendered at the EXACT pixel dimensions of the asset they replace.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const { MANIFEST, sourcesFor } = require("./manifest");
const S = require("./lib/sources");

const ROOT = "C:/Users/ADMIN/Documents/Projects/pion";
const IMAGES = path.join(ROOT, "public/images");
const TSV = path.join(ROOT, "tools/image-analysis.tsv");
const BACKUP = path.join(ROOT, "tools/backup-images");
const RESULTS = path.join(ROOT, "tools/replacements.json");
const ATTRIB = path.join(ROOT, "tools/image-sources.md");

const argv = process.argv.slice(2);
const DRY = argv.includes("--dry-run");
const APPLY = argv.includes("--apply");
const ONLY = (argv.find((a) => a.startsWith("--only=")) || "").slice(7);
// --only accepts a comma separated list of path fragments, e.g. --only=avatar/,about/about_image_6
const ONLY_PARTS = ONLY ? ONLY.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean) : [];
const QUALITY = 82;

/* ---------------- dimensions ----------------
 * Sizes come from tools/image-dims.js: existing assets read their size from the
 * image-analysis.tsv snapshot, and the newly added per-service detail photos read
 * their declared size from the same module.
 */
const { targets: allTargets } = require("./image-dims");

function loadDims() {
  return allTargets();
}

/* ---------------- Kenya flag (special case) ---------------- */
const KENYA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000" preserveAspectRatio="none">
<rect x="0" y="0" width="1000" height="1000" fill="#000000"/>
<rect x="0" y="0" width="1000" height="357.14" fill="#000000"/>
<rect x="0" y="357.14" width="1000" height="285.72" fill="#BB0000"/>
<rect x="0" y="642.86" width="1000" height="357.14" fill="#006600"/>
<rect x="0" y="339.29" width="1000" height="17.85" fill="#FFFFFF"/>
<rect x="0" y="642.86" width="1000" height="17.85" fill="#FFFFFF"/>
<g fill="#FFFFFF" transform="translate(500,500)">
  <path d="M0,-118 L46,-70 L46,40 Q46,96 0,124 Q-46,96 -46,40 L-46,-70 Z"/>
  <path d="M-4,-104 L4,-104 L4,52 L-4,52 Z"/>
  <path d="M-78,-150 L78,150 L66,166 L-90,-134 Z"/>
  <path d="M78,-150 L-78,150 L-66,166 L90,-134 Z"/>
  <circle cx="0" cy="-18" r="26" fill="#BB0000"/>
  <circle cx="0" cy="-18" r="15" fill="#FFFFFF"/>
</g>
</svg>`;

/* ---------------- helpers ---------------- */
async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let i = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      try { out[idx] = await worker(items[idx], idx); }
      catch (e) { out[idx] = { error: e.message, target: items[idx][0] }; }
    }
  });
  await Promise.all(runners);
  return out;
}

function flickrUpgrade(url, needW) {
  // Flickr: _b=1024, _c=800, _h=1600, _k=2048, _o=original
  const m = url.match(/^(https:\/\/live\.staticflickr\.com\/.+?)_([a-z])\.jpg(\?.*)?$/i);
  if (!m) return null;
  const base = m[1], tail = m[3] || "";
  const order = needW > 1600 ? ["k", "h", "o", "b"] : needW > 1024 ? ["h", "k", "o", "b"] : ["b", "c", "h", "k"];
  return order.map((s) => `${base}_${s}.jpg${tail}`);
}

function commonsFileTitleFromUrl(u) {
  const m = u.match(/commons\.wikimedia\.org\/wiki\/File:(.+)$/i);
  return m ? decodeURIComponent(m[1]) : null;
}

/* ---------------- main ---------------- */
(async () => {
  const dims = loadDims();
  let targets = MANIFEST.map(([target, strong, weak, queries, sources, opts]) => ({
    target, strong, weak, queries, sources: sources || sourcesFor(target, strong), opts: opts || {},
  }));
  if (ONLY_PARTS.length) targets = targets.filter((t) => ONLY_PARTS.some((p) => t.target.toLowerCase().includes(p)));

  // Special case: the testimonial block renders a flag with alt="Kenya Flag" but the file
  // was ukraine_flag.webp. Generate the correct Kenyan flag instead of searching for it.
  const FLAG_TARGET = "flag/ukraine_flag.webp";
  const flagDims = dims.get(FLAG_TARGET) || { w: 80, h: 80 };
  const useFlag = !ONLY_PARTS.length || ONLY_PARTS.some((p) => FLAG_TARGET.toLowerCase().includes(p));

  console.log(`Mode: ${DRY ? "DRY-RUN" : APPLY ? "APPLY" : "(none - pass --dry-run or --apply)"}`);
  console.log(`Targets: ${targets.length}\n`);

  const results = [];
  const CHUNK = 8;

  for (let c = 0; c < targets.length; c += CHUNK) {
    const slice = targets.slice(c, c + CHUNK);
    const resolved = await pool(slice, 6, async (t) => {
      const d = dims.get(t.target);
      if (!d) throw new Error("no dimensions in TSV for " + t.target);
      const topic = { strong: t.strong, weak: t.weak, need: d, aspect: d.w / d.h, sources: t.sources, allowUpscale: t.opts.allowUpscale };

      // gather candidates from every query across both sources
      const cand = [];
      await pool(t.queries, 3, async (q) => {
        // Openverse is queried with the allowed source filter; Commons is queried
        // separately and filtered by scoreCandidate because its own source list
        // cannot be narrowed server-side.
        const openverseSources = (t.sources || []).filter((s) => s !== "wikimedia" && s !== "stocksnap");
        const tasks = [
          openverseSources.length
            ? S.searchOpenverse(q, { pageSize: 20, sources: openverseSources }).catch(() => [])
            : Promise.resolve([]),
          (t.sources || []).includes("stocksnap")
            ? S.searchStockSnap(q, { limit: 24 }).catch(() => [])
            : Promise.resolve([]),
          (t.sources || []).includes("wikimedia")
            ? S.searchCommons(q, { limit: 20, thumbWidth: Math.min(2400, Math.max(1200, Math.round(d.w * 1.15))) }).catch(() => [])
            : Promise.resolve([]),
        ];
        const [ov, ss, cm] = await Promise.all(tasks);
        cand.push(...ov, ...ss, ...cm);
      });

      // de-dupe by url
      const seen = new Set();
      const uniq = cand.filter((x) => {
        const k = (x.downloadUrl || "") + "|" + (x.title || "");
        if (seen.has(k)) return false;
        seen.add(k); return true;
      });

      let best = null;
      for (const cd of uniq) {
        const sc = S.scoreCandidate(cd, topic);
        if (sc < 0) continue;
        cd._score = sc;
        if (!best || cd._score > best._score) best = cd;
      }
      return { ...t, dim: d, best, considered: uniq.length };
    });

  for (const r of resolved) {
    if (!r || r.error) { console.log(`  [ERR ] ${r?.target || "?"} :: ${r?.error}`); results.push({ target: r?.target, error: r?.error }); continue; }
    const b = r.best;
    if (!b) { console.log(`  [MISS] ${r.target} (${r.considered} candidates, none relevant)`); results.push({ target: r.target, error: "no relevant candidate" }); continue; }
    const src = `${b.source}/${b.license}`;
    const dimsSrc = `${b.width}x${b.height}`;
    console.log(`  [OK  ] ${r.target.padEnd(44)} ${String(r.dim.w).padStart(4)}x${String(r.dim.h).padEnd(4)} <- ${src.padEnd(18)} ${dimsSrc.padStart(10)}  "${String(b.title).slice(0, 44)}"`);
    results.push({
      target: r.target, w: r.dim.w, h: r.dim.h,
      source: b.source, license: b.license, licenseVersion: b.licenseVersion, licenseUrl: b.licenseUrl,
      title: b.title, creator: b.creator, creatorUrl: b.creatorUrl,
      pageUrl: b.pageUrl, downloadUrl: b.downloadUrl, fileTitle: b.fileTitle,
      attribution: b.attribution, score: b._score, origW: b.origWidth, origH: b.origHeight,
    });
  }

  if (useFlag) {
    results.push({
      target: FLAG_TARGET, w: flagDims.w, h: flagDims.h,
      source: "generated", license: "public domain (Kenyan national flag)",
      title: "Flag of Kenya", creator: "PionTech (generated)", pageUrl: "https://en.wikipedia.org/wiki/Flag_of_Kenya",
      downloadUrl: "generated://kenya-flag", attribution: "Flag of Kenya - public domain",
    });
    console.log(`  [OK  ] ${FLAG_TARGET.padEnd(44)} ${flagDims.w}x${flagDims.h} <- generated (Kenyan national flag)`);
  }
  }

  if (!APPLY) {
    fs.writeFileSync(RESULTS, JSON.stringify(results, null, 2));
    console.log(`\nDry run complete -> ${RESULTS}`);
    return;
  }

  /* ---------------- download + render ---------------- */
  fs.mkdirSync(BACKUP, { recursive: true });
  let ok = 0, fail = 0;
  const applied = [];

  for (const r of results.slice()) {
    if (r.error) { fail++; continue; }
    const dest = path.join(IMAGES, r.target);
    try {
      let buf;
      let srcUrl = r.downloadUrl;
      let credit = r;

      if (r.source === "generated") {
        buf = Buffer.from(KENYA_SVG);
      } else {
        // upgrade to a high-resolution variant where possible
        const needW = r.w;
        let urls = [];
        if (r.source === "wikimedia" && r.fileTitle) {
          const t = await S.commonsThumbAtWidth(r.fileTitle, Math.min(2400, Math.round(needW * 1.15))).catch(() => null);
          if (t && t.thumbUrl) urls.push(t.thumbUrl);
        } else if (r.source === "wikimedia") {
          const ft = commonsFileTitleFromUrl(r.pageUrl);
          if (ft) {
            const t = await S.commonsThumbAtWidth(ft, Math.min(2400, Math.round(needW * 1.15))).catch(() => null);
            if (t && t.thumbUrl) urls.push(t.thumbUrl);
          }
        } else if (r.source === "flickr") {
          const up = flickrUpgrade(r.downloadUrl, needW);
          if (up) urls.push(...up);
          urls.push(r.downloadUrl);
        } else {
          urls.push(r.downloadUrl);
        }
        if (r.downloadUrl) urls.push(r.downloadUrl);

        let got = null;
        for (const u of urls) {
          try { const res = await S.fetchBuf(u, { timeoutMs: 25000, retries: 1 }); got = res.body; srcUrl = res.finalUrl || u; break; }
          catch (e) { /* try next */ }
        }
        if (!got) throw new Error("all download URLs failed");
        buf = got;
      }

      // backup original once
      const bak = path.join(BACKUP, r.target);
      if (fs.existsSync(dest) && !fs.existsSync(bak)) {
        fs.mkdirSync(path.dirname(bak), { recursive: true });
        fs.copyFileSync(dest, bak);
      }

      // render at the EXACT original dimensions
      const img = sharp(buf, { failOn: "none", density: 300 });
      const meta = await img.metadata();
      let pipeline = sharp(buf, { failOn: "none", density: 300 }).resize(r.w, r.h, { fit: "cover", position: "attention" });
      const out = await pipeline.webp({ quality: QUALITY, effort: 5, smartSubsample: true }).toBuffer();
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, out);

      const check = await sharp(out).metadata();
      if (check.width !== r.w || check.height !== r.h) throw new Error(`dimension mismatch ${check.width}x${check.height}`);

      applied.push({ ...r, srcUrl, bytes: out.length, srcBytes: buf.length, srcDims: `${meta.width}x${meta.height}` });
      console.log(`  [WROTE] ${r.target.padEnd(44)} ${r.w}x${r.h}  ${(out.length / 1024).toFixed(0)}KB  <- ${r.title.slice(0, 40)}`);
      ok++;
    } catch (e) {
      console.log(`  [FAIL ] ${r.target} :: ${e.message}`);
      results.push({ target: r.target, error: e.message });
      fail++;
    }
  }

  fs.writeFileSync(RESULTS, JSON.stringify({ applied, results }, null, 2));

  // attribution file - merge into the existing table so earlier runs are not lost
  const HEADER = [
    "# Image sources & attribution",
    "",
    "All photographs below are used under licences that permit commercial use (CC0 / PDM / CC BY / CC BY-SA).",
    "CC BY and CC BY-SA images require attribution and, for BY-SA, share-alike on derivative works.",
    "",
    "| File | Subject | Source | Licence | Author | Source page |",
    "|---|---|---|---|---|---|",
  ];
  const rowFor = (a) =>
    `| \`${a.target}\` | ${String(a.title).replace(/\|/g, "/")} | ${a.source} | ${a.license}${a.licenseVersion ? " " + a.licenseVersion : ""} | ${String(a.creator || "unknown").replace(/\|/g, "/")} | ${a.pageUrl} |`;

  // keep every row already recorded, keyed by the file it describes
  const rows = new Map();
  if (fs.existsSync(ATTRIB)) {
    for (const line of fs.readFileSync(ATTRIB, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\|\s*`([^`]+)`\s*\|/);
      if (m) rows.set(m[1], line);
    }
  }
  for (const a of applied) rows.set(a.target, rowFor(a));

  const lines = [...HEADER, ...[...rows.keys()].sort().map((k) => rows.get(k))];
  fs.writeFileSync(ATTRIB, lines.join("\n") + "\n");
  console.log(`\nApplied ${ok}, failed ${fail} -> ${RESULTS}`);
  console.log(`Attribution -> ${ATTRIB} (${rows.size} rows)`);
})();
