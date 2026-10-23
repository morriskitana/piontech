"use strict";
/**
 * Choose the final 11 avatars from the ranked candidate pool.
 *
 * The site needs eleven avatars in four size classes:
 *   avatar_1..3   200x200    hero social-proof stack
 *   avatar_4..7   1320x1520  testimonial portraits
 *   avatar_8       600x600   blog author
 *   avatar_9..11   320x320   blog authors
 *
 * Selection prefers corporate signals (suit, blazer, business, office) over
 * fashion-editorial signals, and balances the roster so the team page does not
 * read as a single demographic.
 *
 * Run: node tools/select-avatars.js
 */
const fs = require("fs");
const path = require("path");

const IN = path.join(__dirname, process.env.IN || "people-ranked.json");
const OUT = path.join(__dirname, process.env.OUT || "avatar-selection.json");

const norm = (tags) => (tags || []).map((t) => t.toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
const has = (t, arr) => t.some((x) => arr.includes(x));

const CORPORATE = ["suit", "blazer", "necktie", "tie", "business", "businessman", "businesswoman", "corporate", "office", "executive", "professional", "entrepreneur", "ceo", "manager", "director", "consultant", "boardroom", "conference", "presentation", "handshake", "briefcase", "smart", "formal"];
const EDITORIAL = ["model", "fashion", "beauty", "vogue", "sexy", "pose", "runway", "editorial", "glamour", "makeup", "lipstick", "jewerly", "jewelry"];
const MALE = ["man", "men", "male", "guy", "gentleman", "boy", "businessman", "father", "dad", "husband", "mr"];
const FEMALE = ["woman", "women", "female", "lady", "girl", "businesswoman", "mother", "mom", "wife", "mrs", "ms"];

function gender(t) {
  const m = has(t, MALE);
  const f = has(t, FEMALE);
  if (m && !f) return "m";
  if (f && !m) return "f";
  return "?";
}

function rescore(r) {
  const t = norm(r.tags);
  let s = r.total;
  const corp = t.filter((x) => CORPORATE.includes(x));
  const edit = t.filter((x) => EDITORIAL.includes(x));
  s += corp.length * 9;
  s -= edit.length * 7;
  if (t.includes("portrait")) s += 6;
  if (t.includes("smiling") || t.includes("smile")) s += 5;
  if (t.includes("confident")) s += 4;
  if (t.includes("sunglasses") || t.includes("shades")) s -= 25;
  if (t.includes("hat") || t.includes("cap")) s -= 15;
  if (t.includes("backpack") || t.includes("bag")) s -= 10;
  if (t.includes("texting") || t.includes("smartphone") || t.includes("mobile")) s -= 20;
  if (t.includes("laptop") || t.includes("macbook") || t.includes("tablet") || t.includes("computer")) s -= 12;
  if (t.includes("headphones")) s -= 15;
  if (t.includes("couch")) s -= 10;
  if (t.includes("traditional") || t.includes("tribal")) s -= 8;
  // Prefer frames that are portrait-ish or square; very wide crops lose the head.
  const ar = r.width / r.height;
  if (ar > 1.4) s -= 12;
  if (ar < 0.6) s -= 6;
  return { s, corp, edit, gender: gender(t) };
}

const rows = JSON.parse(fs.readFileSync(IN, "utf8"));
const scored = rows.map((r) => {
  const x = rescore(r);
  return { ...r, finalScore: x.s, corp: x.corp, edit: x.edit, gender: x.gender };
});
scored.sort((a, b) => b.finalScore - a.finalScore);

const unique = scored;
console.log(`ranked ${scored.length}`);

// Target roster: 6 men, 5 women, matching the eleven avatar slots.
const want = { m: 6, f: 5 };
const picked = [];
const take = (g) => {
  for (const r of unique) {
    if (picked.length >= 11) return;
    if (picked.includes(r)) continue;
    if (r.gender !== g) continue;
    if (picked.filter((p) => p.gender === g).length >= want[g]) return;
    picked.push(r);
  }
};
take("m");
take("f");
// Fill any shortfall from the remaining pool regardless of gender.
for (const r of unique) {
  if (picked.length >= 11) break;
  if (!picked.includes(r)) picked.push(r);
}

const SLOTS = [
  { file: "avatar_1.webp", w: 200, h: 200 },
  { file: "avatar_2.webp", w: 200, h: 200 },
  { file: "avatar_3.webp", w: 200, h: 200 },
  { file: "avatar_4.webp", w: 1320, h: 1520 },
  { file: "avatar_5.webp", w: 1320, h: 1520 },
  { file: "avatar_6.webp", w: 1320, h: 1520 },
  { file: "avatar_7.webp", w: 1320, h: 1520 },
  { file: "avatar_8.webp", w: 600, h: 600 },
  { file: "avatar_9.webp", w: 320, h: 320 },
  { file: "avatar_10.webp", w: 320, h: 320 },
  { file: "avatar_11.webp", w: 320, h: 320 },
];

// Assign by aspect-ratio fit so a landscape frame never lands in a tall slot.
// Target aspects: tall 1320/1520 = 0.87, square = 1.0.
const aspect = (r) => r.width / r.height;
const fit = (r, target) => Math.abs(Math.log(aspect(r) / target));

const tallSlots = [3, 4, 5, 6];   // avatar_4..7, target aspect 0.87
const squareSlots = [7, 8, 9, 10]; // avatar_8..11, target aspect 1.0
const smallSlots = [0, 1, 2];      // avatar_1..3, target aspect 1.0

const remaining = [...picked];
const takeBest = (slots, target) => {
  const chosen = [];
  for (const slot of slots) {
    if (!remaining.length) break;
    let bestIdx = 0;
    let bestFit = Infinity;
    remaining.forEach((r, i) => {
      // Prefer fit, but keep the score in play so a slightly worse fit with a
      // much better subject still wins.
      const f = fit(r, target) - r.finalScore / 400;
      if (f < bestFit) { bestFit = f; bestIdx = i; }
    });
    chosen.push([slot, remaining.splice(bestIdx, 1)[0]]);
  }
  return chosen;
};

const assignment = [];
const put = (slotIdx, r) => {
  if (!r) return;
  assignment.push({
    slot: SLOTS[slotIdx].file, width: SLOTS[slotIdx].w, height: SLOTS[slotIdx].h,
    id: r.id, title: r.title, creator: r.creator, creatorUrl: r.creatorUrl,
    pageUrl: r.pageUrl, downloadUrl: r.downloadUrl, file: r.file,
    srcWidth: r.width, srcHeight: r.height, tags: r.tags,
    skin: r.skin, gender: r.gender, finalScore: r.finalScore,
  });
};

// Tall slots first (most constrained), then squares.
for (const [slot, r] of takeBest(tallSlots, 1320 / 1520)) put(slot, r);
for (const [slot, r] of takeBest(squareSlots, 1)) put(slot, r);
for (const [slot, r] of takeBest(smallSlots, 1)) put(slot, r);
assignment.sort((a, b) => SLOTS.findIndex((s) => s.file === a.slot) - SLOTS.findIndex((s) => s.file === b.slot));

fs.writeFileSync(OUT, JSON.stringify(assignment, null, 2));
console.log(`-> ${OUT}\n`);
for (const a of assignment) {
  console.log(
    `${a.slot.padEnd(15)} ${String(a.width).padStart(4)}x${String(a.height).padEnd(4)} ` +
    `src ${String(a.srcWidth).padStart(4)}x${String(a.srcHeight).padEnd(4)} ` +
    `${a.gender} ${String(a.finalScore).padStart(4)} ${a.tags.slice(0, 9).join(",")}`
  );
}
