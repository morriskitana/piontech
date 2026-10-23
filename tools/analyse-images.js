const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = "C:/Users/ADMIN/Documents/Projects/pion";
const IMG = path.join(ROOT, "public/images");
const IMGFX = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);

async function analyse(f) {
  const meta = await sharp(f).metadata();
  const { data, info } = await sharp(f).resize(64, 64, { fit: "fill" }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const seen = new Set();
  let sum = 0, sum2 = 0;
  const n = info.width * info.height;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    seen.add((r << 16) | (g << 8) | b);
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    sum += lum; sum2 += lum * lum;
  }
  const mean = sum / n;
  const std = Math.sqrt(Math.max(0, sum2 / n - mean * mean));
  const px = await sharp(f).resize(32, 32, { fit: "fill" }).removeAlpha().raw().toBuffer();
  const hash = crypto.createHash("sha1").update(px).digest("hex").slice(0, 12);
  return { w: meta.width, h: meta.height, fmt: meta.format, bytes: fs.statSync(f).size, colors: seen.size, std: Math.round(std * 10) / 10, hash };
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (IMGFX.has(path.extname(e.name).toLowerCase())) out.push(p);
  }
  return out;
}

(async () => {
  const files = walk(IMG).sort();
  const byHash = new Map();
  const rows = [];
  for (const f of files) {
    const rel = path.relative(IMG, f).replace(/\\/g, "/");
    let a;
    try { a = await analyse(f); } catch (e) { console.error("ERR", rel, e.message); continue; }
    if (!byHash.has(a.hash)) byHash.set(a.hash, []);
    byHash.get(a.hash).push(rel);
    rows.push({ rel, ...a });
  }
  const out = path.join(ROOT, "tools", "image-analysis.tsv");
  const lines = ["path\tw\th\tbytes\tfmt\tcolors\tstd\tphash\tdupes"];
  for (const r of rows) {
    const grp = byHash.get(r.hash);
    lines.push([r.rel, r.w, r.h, r.bytes, r.fmt, r.colors, r.std, r.hash, grp.length > 1 ? grp.length : ""].join("\t"));
  }
  fs.writeFileSync(out, lines.join("\n"));
  console.log("wrote " + out + " (" + rows.length + " rows)");
})();
