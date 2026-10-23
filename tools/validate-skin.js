"use strict";
/**
 * Validate the skin-tone heuristic against StockSnap's photographer tags.
 *
 * Ground truth comes from tags that unambiguously describe a SUBJECT'S skin
 * tone. Earlier attempts matched bare words like "white" or "black", which
 * also describe shirts, backgrounds, animals and monochrome photos, so the
 * labels were wrong. Here a tag only counts when it names a person:
 *
 *   dark  : africanamerican, afro, black-person, dark-skinned, ...
 *   light : caucasian, scandinavian, blond, redhead, ...
 *
 * Photos tagged only "white"/"black" without a person noun are discarded
 * instead of being guessed at.
 *
 * Run: node tools/validate-skin.js
 */
const fs = require("fs");
const path = require("path");

const INDEX = path.join(__dirname, "skin-cache", "index.json");

// Terms that name a person and their skin tone, unambiguously.
const DARK_PERSON = [
  "africanamerican", "african", "afro", "darkskin", "darkskinned",
  "blackpeople", "blackperson", "blackman", "blackwoman", "blackpeople",
  "darkperson", "negro",
];
const LIGHT_PERSON = [
  "caucasian", "scandinavian", "blond", "blonde", "redhead", "fairskin",
  "paleskin", "latino", "latina", "latino", "hispanic",
];

const toks = (s) => (s || "").toLowerCase().replace(/[^a-z]/g, "").split(/(?=[A-Z])|_|\s+/).filter(Boolean);

function labelOf(tags) {
  const t = tags.map((x) => x.toLowerCase().replace(/[^a-z]/g, ""));
  const joined = t.join(" ");
  const has = (arr) => arr.some((k) => t.includes(k) || joined.includes(k));
  // "blackandwhite" must never count as an ethnicity signal.
  const mono = t.includes("blackandwhite") || t.includes("monochrome") || t.includes("bw");
  const dark = has(DARK_PERSON);
  const light = has(LIGHT_PERSON);
  if (dark && !light && !mono) return "dark";
  if (light && !dark) return "light";
  return null;
}

const rows = JSON.parse(fs.readFileSync(INDEX, "utf8"));
const labelled = rows.map((r) => ({ ...r, label: labelOf(r.tags) })).filter((r) => r.label);

const dark = labelled.filter((r) => r.label === "dark");
const light = labelled.filter((r) => r.label === "light");

const stat = (arr, k) => {
  const v = arr.map((r) => (k === "dark" || k === "any" ? r.skin[k] : r[k])).sort((a, b) => a - b);
  if (!v.length) return null;
  const q = (p) => +v[Math.min(v.length - 1, Math.floor(v.length * p))].toFixed(3);
  return { n: v.length, min: +v[0].toFixed(3), p25: q(0.25), med: q(0.5), p75: q(0.75), max: +v[v.length - 1].toFixed(3) };
};

console.log(`cache entries      : ${rows.length}`);
console.log(`labelled photos    : ${labelled.length}  (dark ${dark.length}, light ${light.length})`);
console.log("\nskin.dark (fraction of best face-region matching the dark band)");
console.log("  tag=dark ", JSON.stringify(stat(dark, "dark")));
console.log("  tag=light", JSON.stringify(stat(light, "dark")));

console.log("\nskin.any  (fraction of best face-region that is skin at all)");
console.log("  tag=dark ", JSON.stringify(stat(dark, "any")));
console.log("  tag=light", JSON.stringify(stat(light, "any")));

// Threshold sweep on the raw dark fraction.
let best = null;
for (let t = 0.02; t <= 0.98; t += 0.01) {
  let tp = 0, fp = 0;
  for (const r of dark) if (r.skin.dark >= t) tp++;
  for (const r of light) if (r.skin.dark >= t) fp++;
  const acc = (tp + (light.length - fp)) / (dark.length + light.length);
  if (!best || acc > best.acc) best = { t: +t.toFixed(2), acc, tp, fp };
}
console.log(`\nbest single threshold on skin.dark: >= ${best.t}`);
console.log(`  accuracy ${(best.acc * 100).toFixed(1)}%  (${best.tp}/${dark.length} dark caught, ${best.fp} false positives of ${light.length})`);

// Two-feature rule: the dark fraction must be high AND it must dominate the
// skin found in the region (a genuinely dark face is mostly dark skin).
let best2 = null;
for (let td = 0.05; td <= 0.95; td += 0.05) {
  for (let ts = 0.4; ts <= 1.0; ts += 0.05) {
    let tp = 0, fp = 0;
    const hit = (r) => r.skin.dark >= td && r.darkShare >= ts;
    for (const r of dark) if (hit(r)) tp++;
    for (const r of light) if (hit(r)) fp++;
    const acc = (tp + (light.length - fp)) / (dark.length + light.length);
    if (!best2 || acc > best2.acc) best2 = { td: +td.toFixed(2), ts: +ts.toFixed(2), acc, tp, fp };
  }
}
console.log(`\nbest two-feature rule: skin.dark >= ${best2.td} AND darkShare >= ${best2.ts}`);
console.log(`  accuracy ${(best2.acc * 100).toFixed(1)}%  (${best2.tp}/${dark.length} dark caught, ${best2.fp} false positives of ${light.length})`);

// Which dark-labelled photos are missed, and which light ones leak through.
const miss = dark.filter((r) => r.skin.dark < best.t);
const leak = light.filter((r) => r.skin.dark >= best.t);
console.log(`\ndark-labelled misses at threshold ${best.t}: ${miss.length}`);
for (const r of miss.slice(0, 12)) {
  console.log(`  ${r.id} dark=${r.skin.dark.toFixed(3)} any=${r.skin.any.toFixed(3)} ${r.tags.slice(0, 8).join(",")}`);
}
console.log(`\nlight-labelled false positives at threshold ${best.t}: ${leak.length}`);
for (const r of leak.slice(0, 12)) {
  console.log(`  ${r.id} dark=${r.skin.dark.toFixed(3)} any=${r.skin.any.toFixed(3)} ${r.tags.slice(0, 8).join(",")}`);
}

fs.writeFileSync(path.join(__dirname, "skin-validation.json"), JSON.stringify(labelled, null, 2));
console.log(`\n-> tools/skin-validation.json`);
