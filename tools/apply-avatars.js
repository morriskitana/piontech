"use strict";
/**
 * Download, crop and install the eleven avatar replacements.
 *
 * Each slot is cropped with sharp's attention strategy so the face stays in
 * frame when a tall source is squeezed into a square (or a square source into
 * a tall testimonial slot). Originals are copied to tools/backup-images/avatar/
 * before anything is overwritten, and every source is recorded for attribution.
 *
 * Run: node tools/apply-avatars.js [--dry-run]
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const S = require("./lib/sources");

const DRY = process.argv.includes("--dry-run");
const ROOT = path.join(__dirname, "..");
const DEST = path.join(ROOT, "public", "images", "avatar");
const BACKUP = path.join(__dirname, "backup-images", "avatar");
const ATTR = path.join(__dirname, "avatar-attribution.md");

// Hand-picked from tools/people-ranked2.json. Six men, five women, and eleven
// distinct shoots across five photographers so the roster does not read as one
// model repeated. Every frame is a tagged portrait of a dark-skinned adult in a
// professional or clean studio setting.
const PICKS = [
  { slot: "avatar_1.webp", w: 200, h: 200, id: "J5WDVQRQ6Y" },   // Kristin Hardwick, woman portrait
  { slot: "avatar_2.webp", w: 200, h: 200, id: "Y9UAO6CRX3" },   // William Stitt, blazer + necktie
  { slot: "avatar_3.webp", w: 200, h: 200, id: "1GPF6ZLW2U" },   // Candace McDaniel, smiling woman
  { slot: "avatar_4.webp", w: 1320, h: 1520, id: "LLBULYYEGR" }, // Kristin Hardwick, male professional
  { slot: "avatar_5.webp", w: 1320, h: 1520, id: "YJCNCQVUOD" }, // William Stitt, suit + necktie
  { slot: "avatar_6.webp", w: 1320, h: 1520, id: "ZFPXOOR8JW" }, // Matt Moloney, urban woman portrait
  { slot: "avatar_7.webp", w: 1320, h: 1520, id: "N8PRBYJ7BA" }, // Candace McDaniel, woman portrait
  { slot: "avatar_8.webp", w: 600, h: 600, id: "T8VNJRQH7F" },   // Kristin Hardwick, confident portrait
  { slot: "avatar_9.webp", w: 320, h: 320, id: "OIO01RKMXU" },   // Olu Eletu, man in suit
  { slot: "avatar_10.webp", w: 320, h: 320, id: "DC75ZJVABT" },  // Kristin Hardwick, young entrepreneur
  { slot: "avatar_11.webp", w: 320, h: 320, id: "MG0QIAULKC" },  // Candace McDaniel, woman portrait
];

(async () => {
  fs.mkdirSync(BACKUP, { recursive: true });
  const rows = [];

  for (const p of PICKS) {
    const pageUrl = `https://stocksnap.io/photo/${p.id}`;
    const meta = await S.stockSnapMeta(pageUrl).catch(() => null);
    if (!meta || !meta.contentUrl) {
      console.log(`SKIP ${p.slot}: no metadata for ${p.id}`);
      continue;
    }
    const buf = (await S.fetchBuf(meta.contentUrl, { timeoutMs: 30000, retries: 2 })).body;
    const out = await sharp(buf, { failOn: "none" })
      .resize(p.w, p.h, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 88, effort: 5 })
      .toBuffer();

    const dest = path.join(DEST, p.slot);
    const bak = path.join(BACKUP, p.slot);
    if (!DRY) {
      if (fs.existsSync(dest) && !fs.existsSync(bak)) fs.copyFileSync(dest, bak);
      fs.writeFileSync(dest, out);
    }
    const m = await sharp(out).metadata();
    console.log(
      `${p.slot.padEnd(15)} ${m.width}x${m.height} ${String(Math.round(out.length / 1024)).padStart(4)}KB  ${meta.creator}`
    );
    rows.push({ ...p, ...meta, pageUrl, bytes: out.length });
  }

  if (!DRY) {
    const lines = [
      "# Avatar sources",
      "",
      "All avatars are StockSnap photos under the StockSnap licence (free for",
      "commercial use, no attribution required). Attribution is recorded anyway.",
      "",
      "| File | Size | Photographer | Title | Source |",
      "| --- | --- | --- | --- | --- |",
    ];
    for (const r of rows) {
      lines.push(
        `| \`${r.slot}\` | ${r.w}x${r.h} | ${r.creator || "unknown"} | ${(r.title || "").replace(/\|/g, "/")} | ${r.pageUrl} |`
      );
    }
    fs.writeFileSync(ATTR, lines.join("\n") + "\n");
    console.log(`\n-> ${ATTR}`);
  }
})();
