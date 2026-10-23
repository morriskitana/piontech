"use strict";
/**
 * Repair the skin cache after an id-field bug.
 *
 * The harvest wrote every image to the same `undefined.jpg` because it read
 * `r.id` while StockSnap rows expose `fileTitle`. The metadata (page URL,
 * download URL, tags, title, creator) was stored correctly, so this script
 * rebuilds the cache from those URLs instead of re-running the searches.
 *
 * Run: node tools/repair-cache.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const S = require("./lib/sources");
const ST = require("./lib/skintone");

const CACHE = path.join(__dirname, "skin-cache");
const INDEX = path.join(CACHE, "index.json");

const idFromUrl = (u) => {
  const m = /\/photo\/(?:.*-)?([A-Z0-9]{10})\/?$/.exec(u || "");
  return m ? m[1] : null;
};

(async () => {
  const old = JSON.parse(fs.readFileSync(INDEX, "utf8"));
  const byUrl = new Map();
  for (const r of old) {
    if (!r.pageUrl || !r.downloadUrl) continue;
    if (!byUrl.has(r.pageUrl)) byUrl.set(r.pageUrl, r);
  }
  console.log(`unique photos: ${byUrl.size}`);

  const out = [];
  let n = 0;
  for (const r of byUrl.values()) {
    const id = idFromUrl(r.pageUrl);
    if (!id) continue;
    const file = path.join(CACHE, `${id}.jpg`);
    let buf;
    if (fs.existsSync(file) && fs.statSync(file).size > 5000) {
      buf = fs.readFileSync(file);
    } else {
      try {
        buf = (await S.fetchBuf(r.downloadUrl, { timeoutMs: 20000, retries: 1 })).body;
        fs.writeFileSync(file, buf);
      } catch { continue; }
    }
    let w = 0, h = 0;
    try { const m = await sharp(buf, { failOn: "none" }).metadata(); w = m.width || 0; h = m.height || 0; } catch { }
    const skin = await ST.skinStatsBest(buf);
    const band = await ST.skinStatsPortrait(buf);
    const v = ST.verdict(skin);
    out.push({
      id,
      title: r.title || "",
      creator: r.creator || "",
      creatorUrl: r.creatorUrl || "",
      pageUrl: r.pageUrl,
      downloadUrl: r.downloadUrl,
      file,
      tags: r.tags || [],
      width: w, height: h,
      skin: { dark: +skin.dark.toFixed(4), any: +skin.any.toFixed(4), lum: +skin.lum.toFixed(1) },
      pband: { dark: +band.dark.toFixed(4), any: +band.any.toFixed(4), lum: +band.lum.toFixed(1) },
      region: skin.region,
      face: v.face, darkSkin: v.darkSkin, darkShare: +v.darkShare.toFixed(3),
    });
    n++;
    if (n % 25 === 0) process.stdout.write(`\r  ${n}/${byUrl.size}`);
  }
  console.log(`\nrebuilt ${out.length}`);
  fs.writeFileSync(INDEX, JSON.stringify(out, null, 2));
  console.log(`-> ${INDEX}`);
})();
