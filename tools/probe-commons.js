const https = require("https");
function get(url, tries = 3) {
  return new Promise((resolve, reject) => {
    const go = (n) => {
      https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0 (piontech site rebuild)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location, tries));
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode !== 200) {
            if (n > 0) return setTimeout(() => go(n - 1), 1200);
            return reject(new Error("HTTP " + res.statusCode));
          }
          resolve({ status: res.statusCode, body, headers: res.headers });
        });
      }).on("error", (e) => { if (n > 0) setTimeout(() => go(n - 1), 1200); else reject(e); });
    };
    go(tries);
  });
}
const j = async (u) => JSON.parse((await get(u)).body.toString());

(async () => {
  const topics = [
    "data centre server room racks",
    "solar photovoltaic installation rooftop",
    "CCTV surveillance camera building",
    "fibre optic network patch panel",
    "call centre operator headset",
    "software developer working code",
    "telecommunication mast tower",
    "business team office collaboration",
  ];
  for (const t of topics) {
    const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent("filetype:bitmap " + t)}&gsrnamespace=6&gsrlimit=6&prop=imageinfo&iiprop=url|size|extmetadata|mime`;
    try {
      const r = await j(api);
      const pages = Object.values(r.query?.pages || {});
      console.log(`\n=== ${t} (${pages.length}) ===`);
      for (const p of pages) {
        const ii = p.imageinfo?.[0] || {};
        const em = ii.extmetadata || {};
        const short = (em.LicenseShortName?.value || "?").replace(/<[^>]+>/g, "").slice(0, 18);
        console.log(`  ${String(p.title).slice(5, 78)}`);
        console.log(`     ${ii.width}x${ii.height} ${ii.mime} lic=${short} bytes=${ii.size}`);
      }
    } catch (e) { console.log(`\n=== ${t} ERROR ${e.message}`); }
  }
})();
