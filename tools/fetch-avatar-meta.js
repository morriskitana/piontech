"use strict";
/**
 * Resolve photographer + title for every ranked candidate.
 *
 * The StockSnap search API omits the author, so the only way to know who shot
 * a frame is to read its photo page. Results are cached in
 * tools/avatar-meta.json so this only costs one pass.
 *
 * Run: node tools/fetch-avatar-meta.js
 */
const fs = require("fs");
const path = require("path");
const S = require("./lib/sources");

const IN = path.join(__dirname, process.env.IN || "people-ranked2.json");
const OUT = path.join(__dirname, "avatar-meta.json");
const CONC = 6;

(async () => {
  const rows = JSON.parse(fs.readFileSync(IN, "utf8"));
  const meta = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
  const todo = rows.filter((r) => !meta[r.id]);
  console.log(`${rows.length} rows, ${todo.length} to resolve`);

  let done = 0;
  const worker = async () => {
    while (todo.length) {
      const r = todo.shift();
      const m = await S.stockSnapMeta(r.pageUrl).catch(() => null);
      meta[r.id] = m
        ? { creator: m.creator || "", creatorUrl: m.creatorUrl || "", title: m.title || "", contentUrl: m.contentUrl || "" }
        : { creator: "", creatorUrl: "", title: "", contentUrl: "" };
      done++;
      if (done % 10 === 0) process.stdout.write(`\r  ${done}`);
      if (done % 25 === 0) fs.writeFileSync(OUT, JSON.stringify(meta, null, 1));
    }
  };
  await Promise.all(Array.from({ length: CONC }, worker));
  fs.writeFileSync(OUT, JSON.stringify(meta, null, 1));
  console.log(`\n-> ${OUT}`);

  const counts = {};
  for (const r of rows) {
    const c = (meta[r.id] && meta[r.id].creator) || "(unknown)";
    counts[c] = (counts[c] || 0) + 1;
  }
  console.log("\ncreators:");
  Object.entries(counts).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)} ${k}`));
})();
