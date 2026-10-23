"use strict";
/**
 * Harvest a cache of candidate photos with tags and skin measurements.
 *
 * Downloads are the slow part of the avatar hunt, so this script caches every
 * candidate it fetches (image bytes + metadata + measurements) under
 * tools/skin-cache/. Downstream analysis then runs over the cache without
 * touching the network, which makes label-rule iteration cheap.
 *
 * Run: node tools/harvest-skin.js [more]
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const S = require("./lib/sources");
const ST = require("./lib/skintone");

const TOOLS = __dirname;
const CACHE = path.join(TOOLS, "skin-cache");
const INDEX = path.join(CACHE, "index.json");

const QUERIES = [
  // Ethnicity-targeted.
  "africanamerican", "african man portrait", "african woman portrait",
  "black man portrait", "black woman portrait", "african professional",
  "black professional", "africanamerican man", "africanamerican woman",
  // Professional context.
  "businessman portrait", "businesswoman portrait", "business portrait",
  "professional man", "professional woman", "office portrait", "corporate portrait",
  "entrepreneur", "business suit", "man suit office", "woman suit office",
  "african businessman", "african businesswoman", "black businessman",
  "black businesswoman", "black entrepreneur", "african office",
  "business meeting", "office worker", "ceo", "executive", "manager portrait",
  // Control groups, used to validate the skin heuristic.
  "caucasian man portrait", "caucasian woman portrait", "asian man portrait",
  "latina woman portrait", "white man portrait", "white woman portrait",
  // Broad pool.
  "portrait", "man portrait", "woman portrait", "people",
];

async function main() {
  fs.mkdirSync(CACHE, { recursive: true });
  let index = [];
  if (fs.existsSync(INDEX)) {
    index = JSON.parse(fs.readFileSync(INDEX, "utf8"));
    console.log(`loaded ${index.length} cached entries`);
  }
  const have = new Set(index.map((r) => r.id));

  const seen = new Map();
  for (const q of QUERIES) {
    const rows = await S.searchStockSnap(q, { limit: 60, pages: 2, resolve: false }).catch(() => []);
    for (const r of rows) {
      if (!r.fileTitle || seen.has(r.fileTitle)) continue;
      seen.set(r.fileTitle, r);
    }
    process.stdout.write(`\r  search ${q} -> ${seen.size} unique`);
  }
  console.log(`\nunique candidates: ${seen.size}`);

  let done = 0;
  for (const r of seen.values()) {
    if (have.has(r.id)) { done++; continue; }
    const meta = await S.stockSnapMeta(r.pageUrl).catch(() => null);
    if (!meta || !meta.contentUrl) continue;
    let buf;
    try {
      buf = (await S.fetchBuf(meta.contentUrl, { timeoutMs: 20000, retries: 1 })).body;
    } catch { continue; }
    const file = path.join(CACHE, `${r.id}.jpg`);
    fs.writeFileSync(file, buf);
    const skin = await ST.skinStatsBest(buf);
    const v = ST.verdict(skin);
    let w = 0, h = 0;
    try { const m = await sharp(buf, { failOn: "none" }).metadata(); w = m.width || 0; h = m.height || 0; } catch { }
    index.push({
      id: r.id,
      title: meta.title || "",
      creator: meta.creator || "",
      creatorUrl: meta.creatorUrl || "",
      pageUrl: meta.pageUrl || r.pageUrl,
      downloadUrl: meta.contentUrl,
      file,
      tags: r.tags || [],
      width: w, height: h,
      skin: { dark: +skin.dark.toFixed(4), any: +skin.any.toFixed(4), lum: +skin.lum.toFixed(1) },
      region: skin.region,
      face: v.face, darkSkin: v.darkSkin, darkShare: +v.darkShare.toFixed(3),
    });
    done++;
    process.stdout.write(`\r  cached ${done}/${seen.size}  (new ${index.length})`);
  }
  console.log("");
  fs.writeFileSync(INDEX, JSON.stringify(index, null, 2));
  console.log(`cache entries: ${index.length} -> ${INDEX}`);
}

main();
