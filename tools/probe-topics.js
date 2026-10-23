const https = require("https");
function get(url, tries = 3) {
  return new Promise((resolve, reject) => {
    const go = (n) => {
      https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0 (site rebuild)" } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return resolve(get(res.headers.location, tries));
        const c = []; res.on("data", (d) => c.push(d));
        res.on("end", () => {
          const b = Buffer.concat(c);
          if (res.statusCode !== 200) { if (n > 0) return setTimeout(() => go(n - 1), 1200); return reject(new Error("HTTP " + res.statusCode)); }
          resolve({ body: b, headers: res.headers });
        });
      }).on("error", (e) => { if (n > 0) setTimeout(() => go(n - 1), 1200); else reject(e); });
    };
    go(tries);
  });
}
const j = async (u) => JSON.parse((await get(u)).body.toString());

const TOPICS = [
  { id: "security-cctv", q: "cctv surveillance camera building" },
  { id: "fleet", q: "fleet vehicle logistics trucks" },
  { id: "solar", q: "solar panel array photovoltaic" },
  { id: "serverroom", q: "server room rack datacenter" },
  { id: "network", q: "network switch patch panel cabling" },
  { id: "controlroom", q: "control room monitoring screens operator" },
  { id: "telecom", q: "telecommunication tower antenna mast" },
  { id: "callcentre", q: "call centre operator headset customer service" },
  { id: "developer", q: "software developer coding laptop screen" },
  { id: "biometric", q: "fingerprint biometric access control scanner" },
  { id: "warehouse", q: "warehouse logistics distribution shelves forklift" },
  { id: "iot", q: "iot sensor electronic device circuit" },
  { id: "smartbuilding", q: "smart building automation control panel" },
  { id: "engineers", q: "african engineers team site technology" },
  { id: "portrait-m", q: "african businessman portrait professional" },
  { id: "portrait-f", q: "african businesswoman portrait professional" },
  { id: "analysis", q: "business analytics dashboard screen data" },
  { id: "design", q: "graphic designer creative workspace desk" },
  { id: "handshake", q: "business handshake partnership agreement" },
  { id: "skyline", q: "modern city business district skyline" },
];

(async () => {
  for (const t of TOPICS) {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(t.q)}&page_size=8&license=cc0,pdm,by,by-sa&mature=false`;
    let r;
    try { r = await j(url); } catch (e) { console.log(`\n### ${t.id} ERROR ${e.message}`); continue; }
    console.log(`\n### ${t.id}  "${t.q}"  (${r.result_count})`);
    for (const it of (r.results || []).slice(0, 6)) {
      const tags = (it.tags || []).map((x) => x.name).join(",");
      console.log(`  [${(it.source || "").padEnd(9)}|${it.license.padEnd(5)}] ${String(it.width).padStart(5)}x${String(it.height).padEnd(5)} ${String(it.title || "").slice(0, 46).padEnd(47)}`);
      console.log(`      tags: ${tags.slice(0, 90)}`);
    }
  }
})();
