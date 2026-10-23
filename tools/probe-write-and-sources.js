// Test: can sharp write directly into public/images? And probe stock sources for people/tech topics.
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = "C:/Users/ADMIN/Documents/Projects/pion";

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location));
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks), headers: res.headers }));
    }).on("error", reject);
  });
}

(async () => {
  // ---- 1. write test: new file + overwrite of an existing file, via sharp.toFile
  const t1 = path.join(ROOT, "public/images/__wtest_new.webp");
  const t2 = path.join(ROOT, "public/images/__wtest_over.webp");
  try {
    await sharp({ create: { width: 40, height: 20, channels: 3, background: { r: 10, g: 20, b: 30 } } }).webp().toFile(t1);
    console.log("WRITE NEW FILE      :", fs.existsSync(t1) ? "OK" : "FAIL");
  } catch (e) { console.log("WRITE NEW FILE      : FAIL", e.message); }
  try {
    await sharp({ create: { width: 40, height: 20, channels: 3, background: { r: 90, g: 20, b: 30 } } }).webp().toFile(t2);
    console.log("WRITE NEW FILE 2    :", fs.existsSync(t2) ? "OK" : "FAIL");
    await sharp({ create: { width: 50, height: 25, channels: 3, background: { r: 1, g: 2, b: 3 } } }).webp().toFile(t2);
    console.log("OVERWRITE EXISTING  : OK");
  } catch (e) { console.log("OVERWRITE EXISTING  : FAIL", e.message); }
  // fs.writeFileSync onto an existing file
  try {
    fs.writeFileSync(t2, Buffer.from([1, 2, 3, 4]));
    console.log("fs.writeFileSync ovw: OK");
  } catch (e) { console.log("fs.writeFileSync ovw: FAIL", e.code, e.message); }
  for (const f of [t1, t2]) { try { fs.unlinkSync(f); } catch (e) {} }

  // ---- 2. source quality probe
  const probes = [
    { q: "business team meeting office", src: "stocksnap" },
    { q: "african business professional portrait", src: "nappy" },
    { q: "server room network", src: "rawpixel" },
    { q: "solar panel farm", src: "stocksnap" },
  ];
  for (const p of probes) {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(p.q)}&page_size=5&source=${p.src}&license=cc0,pdm,by,by-sa&mature=false`;
    const r = await get(url);
    const j = JSON.parse(r.body.toString());
    console.log(`\n=== [${p.src}] ${p.q} -> ${j.result_count} results`);
    for (const it of (j.results || []).slice(0, 5)) {
      console.log(`  [${it.license}] ${it.width}x${it.height} | ${String(it.title || "").slice(0, 58)}`);
      console.log(`      ${String(it.url).slice(0, 120)}`);
    }
  }
})();
