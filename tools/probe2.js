const https = require("https");
function get(url, tries = 3) {
  return new Promise((resolve, reject) => {
    const go = (n) => {
      https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location, tries));
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode !== 200) {
            if (n > 0) return setTimeout(() => go(n - 1), 1500 * (3 - n));
            return reject(new Error("HTTP " + res.statusCode + " " + body.toString().slice(0, 80)));
          }
          resolve({ status: res.statusCode, body });
        });
      }).on("error", (e) => { if (n > 0) setTimeout(() => go(n - 1), 1500); else reject(e); });
    };
    go(tries);
  });
}
const j = async (u) => JSON.parse((await get(u)).body.toString());

(async () => {
  // full shape of one result
  const one = await j("https://api.openverse.org/v1/images/?q=team%20meeting&page_size=1&license=cc0,pdm,by,by-sa");
  console.log("=== RESULT FIELDS ===");
  console.log(JSON.stringify(one.results[0], null, 2).slice(0, 2200));

  // nappy alone
  for (const q of ["business", "professional", "office team", "portrait"]) {
    try {
      const r = await j(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=4&source=nappy`);
      console.log(`\n=== nappy "${q}" -> ${r.result_count}`);
      for (const it of r.results || []) console.log(`  [${it.license}] ${it.width}x${it.height} | ${String(it.title || "").slice(0, 50)} | ${it.url.slice(0, 95)}`);
    } catch (e) { console.log(`\n=== nappy "${q}" ERROR ${e.message}`); }
  }
  // stocksnap on infra topics
  for (const q of ["server", "network cables", "solar panels", "security camera", "call center", "technician"]) {
    try {
      const r = await j(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&page_size=4&source=stocksnap`);
      console.log(`\n=== stocksnap "${q}" -> ${r.result_count}`);
      for (const it of r.results || []) console.log(`  [${it.license}] ${it.width}x${it.height} | ${String(it.title || "").slice(0, 50)}`);
    } catch (e) { console.log(`\n=== stocksnap "${q}" ERROR ${e.message}`); }
  }
})();
