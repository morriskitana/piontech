"use strict";
/**
 * Build a large candidate pool from professional-context searches.
 *
 * StockSnap's Black-professional library is small, so instead of searching
 * only ethnicity terms this sweeps a wide set of workplace vocabulary and
 * keeps whatever comes back tagged for a dark-skinned person. That finds
 * photos whose titles never mention ethnicity but whose tags do.
 *
 * Run: node tools/build-pool.js
 */
const fs = require("fs");
const path = require("path");
const S = require("./lib/sources");

const OUT = path.join(__dirname, "_pool2.json");

const QUERIES = [
  // workplace nouns
  "business", "office", "corporate", "professional", "executive", "meeting",
  "suit", "entrepreneur", "manager", "team", "colleague", "workplace",
  "career", "job", "interview", "handshake", "conference", "presentation",
  "boardroom", "startup", "finance", "consultant", "engineer", "developer",
  "lawyer", "accountant", "analyst", "ceo", "founder", "leader", "leadership",
  "staff", "employee", "recruitment", "networking", "businessman",
  "businesswoman", "businesspeople", "coworker", "coworkers", "desk",
  "briefcase", "blazer", "necktie", "smart casual", "work", "working",
  "worker", "profession", "occupation", "company", "firm", "agency",
  "director", "supervisor", "specialist", "advisor", "partner", "client",
  "success", "ambition", "confidence", "portrait", "headshot", "smiling",
  "smile", "face", "closeup", "people", "person", "man", "woman",
  // ethnicity terms that do work
  "black man", "black woman", "black people", "black person", "african man",
  "african woman", "african people", "african portrait", "black portrait",
  "black businessman", "black businesswoman", "black professional",
  "black office", "black business", "african business", "black entrepreneur",
  "black man suit", "black man office", "black woman office", "black man smiling",
  "black woman smiling", "black man glasses", "black man beard", "black woman hair",
  "black man portrait", "african american man", "black team", "black meeting",
  "black man laptop", "black woman laptop", "black man desk", "black woman desk",
  "black man tie", "black woman blazer", "black man blazer", "black woman suit",
  "african executive", "african manager", "african engineer", "african doctor",
  "black doctor", "black engineer", "black lawyer", "black teacher",
];

(async () => {
  const seen = new Map();
  if (fs.existsSync(OUT)) {
    for (const r of JSON.parse(fs.readFileSync(OUT, "utf8"))) seen.set(r.fileTitle, r);
    console.log(`resuming with ${seen.size}`);
  }
  for (const q of QUERIES) {
    const rows = await S.searchStockSnap(q, { limit: 400, pages: 10, sort: "relevance", resolve: false }).catch(() => []);
    let n = 0;
    for (const r of rows) {
      if (!r.fileTitle || seen.has(r.fileTitle)) continue;
      seen.set(r.fileTitle, r);
      n++;
    }
    console.log(`${q.padEnd(24)} ${String(rows.length).padStart(4)} new ${String(n).padStart(4)} pool ${seen.size}`);
    await new Promise((r) => setTimeout(r, 300));
  }
  fs.writeFileSync(OUT, JSON.stringify([...seen.values()], null, 1));
  console.log(`POOL ${seen.size} -> ${OUT}`);
})();
