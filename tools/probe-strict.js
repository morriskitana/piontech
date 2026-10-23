const https = require("https");
function get(url, tries = 2) {
  return new Promise((resolve, reject) => {
    const go = (n) => {
      const req = https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location, tries));
        const c = []; res.on("data", (d) => c.push(d));
        res.on("end", () => {
          const b = Buffer.concat(c);
          if (res.statusCode !== 200) { if (n > 0) return setTimeout(() => go(n - 1), 1000); return reject(new Error("HTTP " + res.statusCode)); }
          resolve(b.toString());
        });
      });
      req.setTimeout(15000, () => req.destroy(new Error("timeout")));
      req.on("error", (e) => { if (n > 0) setTimeout(() => go(n - 1), 1000); else reject(e); });
    };
    go(tries);
  });
}
const j = async (u) => JSON.parse(await get(u));

(async () => {
  console.log("########## NAPPY CATALOG SAMPLE ##########");
  try {
    const r = await j("https://api.openverse.org/v1/images/?source=nappy&page_size=20&license=cc0,pdm,by,by-sa");
    console.log("count:", r.result_count);
    for (const it of r.results || []) console.log(`  [${it.license}] ${it.width}x${it.height} | ${String(it.title || "").slice(0, 60)} | tags:${(it.tags||[]).map(t=>t.name).join(",").slice(0,60)}`);
  } catch (e) { console.log("nappy err", e.message); }

  console.log("\n########## STOCKSNAP: people / business / tech ##########");
  const SNAP = [
    "businessman", "business woman", "african business team", "office team",
    "developer coding", "server", "solar panel", "cctv camera", "networking",
    "engineer working", "meeting handshake", "city skyline", "warehouse",
    "call center", "biometric", "smart home device", "telecom tower",
  ];
  for (const q of SNAP) {
    try {
      const r = await j(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=12&source=stocksnap&license=cc0,pdm,by,by-sa`);
      console.log(`\n--- stocksnap "${q}" (${r.result_count})`);
      for (const it of (r.results || []).slice(0, 8)) console.log(`   ${String(it.width).padStart(5)}x${String(it.height).padEnd(5)} ${String(it.title || "").slice(0, 58)}`);
    } catch (e) { console.log(`--- stocksnap "${q}" ERR ${e.message}`); }
  }

  console.log("\n########## WORDPRESS (WP Photo Directory) ##########");
  for (const q of ["businessman portrait", "african woman office", "data center server", "solar panels", "cctv camera", "developer laptop"]) {
    try {
      const r = await j(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=10&source=wordpress&license=cc0,pdm,by,by-sa`);
      console.log(`\n--- wordpress "${q}" (${r.result_count})`);
      for (const it of (r.results || []).slice(0, 8)) console.log(`   ${String(it.width).padStart(5)}x${String(it.height).padEnd(5)} ${String(it.title || "").slice(0, 58)}`);
    } catch (e) { console.log(`--- wordpress "${q}" ERR ${e.message}`); }
  }
})();
