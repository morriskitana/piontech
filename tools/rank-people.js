"use strict";
/**
 * Rank StockSnap candidates for use as Black-professional avatars.
 *
 * Strategy
 * --------
 * Photographer tags are the primary signal. They are human-authored per photo,
 * so "africanamerican" or "businessman" is far more trustworthy than any pixel
 * heuristic, and they carry the professional context the avatars need.
 *
 * The pixel measurement is a cross-check only: it confirms the frame actually
 * contains a substantial region of dark skin, which rejects photos that are
 * tagged for a person but framed on an object, a scene, or the back of a head.
 *
 * Hard blocks are deliberately narrow. A headshot can legitimately be tagged
 * "sitting", "wall", "book" or "coffee"; only tags that change what the photo
 * IS (a medical scene, a wedding, a sports event, an animal) disqualify it.
 *
 * Run: node tools/rank-people.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const S = require("./lib/sources");
const ST = require("./lib/skintone");

const POOL = path.join(__dirname, process.env.POOL || "_pool.json");
const CACHE = path.join(__dirname, "avatar-cache");
const OUT = path.join(__dirname, process.env.OUT || "people-ranked.json");

const norm = (tags) => (tags || []).map((t) => t.toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
const has = (t, arr) => t.some((x) => arr.includes(x));

// --- ethnicity -----------------------------------------------------------
const DARK = [
  "africanamerican", "african", "afro", "darkskin", "darkperson",
  "blackperson", "blackman", "blackwoman", "blackpeople", "blackmale", "blackfemale",
];
const MONO = ["blackandwhite", "monochrome", "bw"];

// --- people --------------------------------------------------------------
const PERSON = [
  "man", "woman", "men", "women", "people", "person", "portrait", "face",
  "boy", "girl", "lady", "guy", "gentleman", "female", "male", "human",
  "adult", "young", "businessman", "businesswoman", "businessperson", "businesspeople",
];

// --- professional context ------------------------------------------------
const PROFESSIONAL = [
  "business", "businessman", "businesswoman", "businesspeople", "businessperson",
  "professional", "corporate", "office", "executive", "entrepreneur", "ceo",
  "founder", "manager", "director", "consultant", "engineer", "developer",
  "lawyer", "accountant", "analyst", "team", "meeting", "networking", "finance",
  "bank", "startup", "freelancer", "coach", "speaker", "workshop", "colleague",
  "client", "desk", "laptop", "presentation", "handshake", "career",
  "recruitment", "staff", "boardroom", "conference", "suit", "briefcase",
  "smile", "smiling", "confident", "thinking", "looking", "closeup", "glasses",
  "tie", "smart", "success", "job", "work", "working", "worker", "employee",
  "intern", "leadership", "strategy", "innovation", "portrait", "headshot",
];

// --- hard blocks: these change what the photo is -------------------------
const BLOCK = [
  // medical
  "hospital", "doctor", "doctors", "medical", "medicine", "patient", "patients",
  "nurse", "nurses", "disease", "illness", "coronavirus", "covid", "virus",
  "xray", "surgery", "surgical", "vaccine", "vaccination", "laboratory",
  "pharmacy", "clinical", "clinic", "diagnosis", "mask", "pandemic", "quarantine",
  "healthcare", "dentist", "veterinary", "stethoscope",
  // family / children
  "baby", "babies", "newborn", "infant", "child", "children", "kid", "kids",
  "toddler", "family", "pregnant", "pregnancy", "wedding", "bride", "groom",
  "married", "marriage", "funeral",
  // sport / leisure
  "basketball", "football", "soccer", "baseball", "tennis", "golf", "boxing",
  "marathon", "athlete", "gym", "fitness", "yoga", "workout", "swimsuit",
  "bikini", "beach", "surfing", "skateboard", "skateboarding", "camping",
  "hiking", "fishing", "hunting",
  // entertainment / editorial
  "concert", "festival", "party", "nightclub", "rave", "singer", "musician",
  "band", "guitar", "piano", "drum", "dj", "rapper", "actor", "actress",
  "protest", "riot", "police", "soldier", "military", "prison", "weapon", "gun",
  // animals / nature / objects
  "animal", "animals", "bird", "birds", "dog", "cat", "horse", "cow", "fish",
  "insect", "butterfly", "wildlife", "elephant", "lion", "zebra", "giraffe",
  "safari", "rhino", "hippo", "monkey", "lemur", "antelope", "impala", "deer",
  "food", "restaurant", "cafe", "coffee", "recipe", "cooking", "kitchen",
  "meal", "dessert", "cake", "fruit", "vegetable", "flower", "flowers",
  "tree", "forest", "jungle", "landscape", "mountain", "desert", "sunset",
  "sunrise", "waterfall", "ocean", "underwater", "space", "planet", "moon",
  "star", "sky", "cloud", "sun", "fire", "flame", "smoke", "rain", "snow",
  "winter", "leaf", "leaves", "grass", "field", "farm", "harvest", "plant",
  "church", "mosque", "temple", "praying", "religion", "god",
  // nudity / vice
  "nude", "nsfw", "smoking", "cigarette", "vape", "alcohol", "beer", "wine",
  "cannabis", "weed",
  // monochrome treatment
  "blackandwhite", "monochrome",
];

// --- soft penalties: reduce rank but do not reject -----------------------
const SOFT = [
  "sunglasses", "shades", "hat", "cap", "backpack", "graffiti", "mural",
  "bricks", "bench", "walking", "jumping", "tuxedo", "polkadot", "earrings",
  "lipstick", "curly", "braids", "dreadlocks", "necklace", "newspaper",
  "reading", "bar", "drink", "glass", "cup", "model", "fashion", "casual",
  "street", "urban", "travel", "summer", "vacation", "nature", "outdoor",
  "outside", "bokeh", "blur", "old", "elderly", "senior", "aged", "wrinkles",
  "phone", "smartphone", "camera", "selfie", "laptop", "computer", "screen",
  "code", "coding", "keyboard", "desk", "sitting", "chair", "wall",
];

function ethnicity(t) {
  if (has(t, MONO)) return null;
  if (has(t, DARK)) return "dark";
  if (t.includes("black") && has(t, PERSON)) return "dark";
  return null;
}

/**
 * 64-bit difference hash. Two frames of the same shoot hash within a few bits
 * of each other, which lets us drop near-duplicates without trusting titles
 * (StockSnap titles are generic and repeat across unrelated photos).
 */
async function dhash(buf) {
  const { data } = await sharp(buf, { failOn: "none" })
    .greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let bits = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      bits += data[y * 9 + x] < data[y * 9 + x + 1] ? "1" : "0";
    }
  }
  return bits;
}

const hamming = (a, b) => {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
};

function tagScore(t) {
  let s = 0;
  const why = [];
  if (has(t, PROFESSIONAL)) { s += 40; why.push("professional"); }
  if (has(t, PERSON)) { s += 20; why.push("person"); }
  if (t.includes("portrait")) { s += 15; why.push("portrait"); }
  if (t.includes("headshot")) { s += 25; why.push("headshot"); }
  if (t.includes("closeup") || t.includes("face")) { s += 10; why.push("closeup"); }
  if (t.includes("smile") || t.includes("smiling")) { s += 8; why.push("smile"); }
  if (t.includes("confident")) { s += 6; why.push("confident"); }
  if (t.includes("businessman") || t.includes("businesswoman")) { s += 10; why.push("business-person"); }
  if (t.includes("office") || t.includes("boardroom") || t.includes("corporate")) { s += 8; why.push("office"); }
  if (t.includes("suit") || t.includes("tie")) { s += 6; why.push("suit"); }
  if (t.includes("africanamerican")) { s += 12; why.push("africanamerican"); }
  if (t.includes("man") || t.includes("woman") || t.includes("male") || t.includes("female")) { s += 6; }
  const soft = t.filter((x) => SOFT.includes(x));
  if (soft.length) { s -= soft.length * 4; why.push("soft:" + soft.join("|")); }
  return { s, why };
}

async function main() {
  fs.mkdirSync(CACHE, { recursive: true });
  const pool = JSON.parse(fs.readFileSync(POOL, "utf8"));
  console.log(`pool: ${pool.length}`);

  // Stage 1: tag filter (no network).
  const shortlist = [];
  for (const r of pool) {
    const t = norm(r.tags);
    if (ethnicity(t) !== "dark") continue;
    if (!has(t, PERSON)) continue;
    if (!has(t, PROFESSIONAL)) continue;
    if (has(t, BLOCK)) continue;
    const { s, why } = tagScore(t);
    shortlist.push({ ...r, tagScore: s, why });
  }
  console.log(`tag shortlist: ${shortlist.length}`);

  // Stage 2: download + measure.
  const measured = [];
  let n = 0;
  for (const r of shortlist) {
    const file = path.join(CACHE, `${r.fileTitle}.jpg`);
    let buf;
    if (fs.existsSync(file) && fs.statSync(file).size > 5000) {
      buf = fs.readFileSync(file);
    } else {
      const meta = await S.stockSnapMeta(r.pageUrl).catch(() => null);
      if (!meta || !meta.contentUrl) continue;
      try {
        buf = (await S.fetchBuf(meta.contentUrl, { timeoutMs: 20000, retries: 1 })).body;
        fs.writeFileSync(file, buf);
      } catch { continue; }
      r.downloadUrl = meta.contentUrl;
      r.title = meta.title || "";
      r.creator = meta.creator || r.creator;
      r.creatorUrl = meta.creatorUrl || r.creatorUrl;
    }
    let w = 0, h = 0;
    try { const m = await sharp(buf, { failOn: "none" }).metadata(); w = m.width || 0; h = m.height || 0; } catch { }
    if (w < 500 || h < 500) continue;
    const skin = await ST.skinStatsBest(buf);
    const band = await ST.skinStatsPortrait(buf);
    const hash = await dhash(buf).catch(() => null);
    measured.push({ ...r, file, width: w, height: h, skin, band, hash });
    n++;
    if (n % 10 === 0) process.stdout.write(`\r  measured ${n}/${shortlist.length}`);
  }
  console.log(`\nmeasured: ${measured.length}`);

  // Stage 3: pixel gate + rank.
  const passing = [];
  for (const r of measured) {
    const darkOk = r.skin.dark >= 0.15;
    const anyOk = r.skin.any >= 0.25;
    const shareOk = r.skin.any > 0 ? r.skin.dark / r.skin.any >= 0.45 : false;
    if (!(darkOk && anyOk && shareOk)) continue;
    const pixel = (darkOk ? 10 : 0) + (anyOk ? 10 : 0) + (shareOk ? 10 : 0);
    passing.push({ ...r, pixel, total: r.tagScore + pixel });
  }
  passing.sort((a, b) => b.total - a.total);
  console.log(`passing pixel gate: ${passing.length}`);

  // Stage 4: drop near-duplicate frames of the same shoot.
  const deduped = [];
  for (const r of passing) {
    if (r.hash && deduped.some((d) => d.hash && hamming(d.hash, r.hash) <= 6)) continue;
    deduped.push(r);
  }
  console.log(`after dedup: ${deduped.length}`);
  passing.length = 0;
  passing.push(...deduped);

  const out = passing.map((r, i) => ({
    index: i + 1, id: r.fileTitle, title: r.title, creator: r.creator,
    creatorUrl: r.creatorUrl, pageUrl: r.pageUrl, downloadUrl: r.downloadUrl,
    file: r.file, width: r.width, height: r.height, tags: r.tags,
    skin: { dark: +r.skin.dark.toFixed(4), any: +r.skin.any.toFixed(4) },
    band: { dark: +r.band.dark.toFixed(4), any: +r.band.any.toFixed(4) },
    region: r.skin.region,
    tagScore: r.tagScore, pixelScore: r.pixel, total: r.total, why: r.why,
  }));
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log(`-> ${OUT}`);

  for (const r of out.slice(0, 50)) {
    console.log(
      `  ${String(r.index).padStart(2)}. ${String(r.total).padStart(3)} ` +
      `${String(r.width).padStart(4)}x${String(r.height).padEnd(4)} ` +
      `dark=${r.skin.dark.toFixed(2)} any=${r.skin.any.toFixed(2)} ` +
      `${r.tags.slice(0, 10).join(",")}`
    );
  }
}

main();
