// Probe Openverse: response shape, relevance and license quality for our topics
const https = require("https");

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0 (site rebuild)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(get(res.headers.location));
      }
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => resolve({ status: res.statusCode, body: d }));
    }).on("error", reject);
  });
}

const topics = process.argv.slice(2);
if (!topics.length) topics.push("server room network rack");

(async () => {
  for (const t of topics) {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(t)}&page_size=8&license_type=commercial&mature=false`;
    try {
      const r = await get(url);
      console.log(`\n=== ${t} (HTTP ${r.status}) ===`);
      const j = JSON.parse(r.body);
      console.log(`  total: ${j.result_count}`);
      for (const it of (j.results || [])) {
        console.log(
          `  [${it.license}] ${it.source} | ${String(it.title || "").slice(0, 52)} | ${it.width}x${it.height} | ${String(it.creator || "").slice(0, 22)}\n      ${String(it.url).slice(0, 110)}`
        );
      }
    } catch (e) {
      console.log(`\n=== ${t} ERROR: ${e.message}`);
    }
  }
})();
