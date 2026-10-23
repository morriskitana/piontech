"use strict";
/**
 * Re-measure every cached candidate with the portrait-band crop.
 *
 * The cache already holds the image bytes, so this is local-only and fast.
 * It adds `pband` (upper-centre skin measurement) alongside the existing
 * whole-frame `skin` numbers, then rewrites the index.
 *
 * Run: node tools/remeasure.js
 */
const fs = require("fs");
const path = require("path");
const ST = require("./lib/skintone");

const INDEX = path.join(__dirname, "skin-cache", "index.json");

(async () => {
  const rows = JSON.parse(fs.readFileSync(INDEX, "utf8"));
  let n = 0;
  for (const r of rows) {
    if (!r.file || !fs.existsSync(r.file)) continue;
    const buf = fs.readFileSync(r.file);
    const band = await ST.skinStatsPortrait(buf);
    r.pband = {
      dark: +band.dark.toFixed(4),
      any: +band.any.toFixed(4),
      lum: +band.lum.toFixed(1),
    };
    n++;
    if (n % 50 === 0) process.stdout.write(`\r  ${n}/${rows.length}`);
  }
  console.log(`\nremeasured ${n}`);
  fs.writeFileSync(INDEX, JSON.stringify(rows, null, 2));
  console.log(`-> ${INDEX}`);
})();
