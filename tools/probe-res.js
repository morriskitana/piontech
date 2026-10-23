const https = require("https");
function head(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": "PionTechSiteBuilder/1.0" } }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, len: res.headers["content-length"], type: res.headers["content-type"] });
    });
    req.on("error", (e) => resolve({ status: "ERR", len: e.message }));
  });
}
(async () => {
  console.log("--- StockSnap CDN size variants (ID JBW2PXDOL6) ---");
  for (const v of ["280h", "640w", "960w", "1280w", "1920w", "2560w", "original"]) {
    console.log(`  ${v.padEnd(9)}`, await head(`https://cdn.stocksnap.io/img-thumbs/${v}/JBW2PXDOL6.jpg`));
  }
  console.log("  page     ", await head("https://stocksnap.io/photo/JBW2PXDOL6"));

  console.log("--- Flickr size suffixes (2800660239_608ea2a18d) ---");
  for (const s of ["b", "c", "h", "k", "o"]) {
    console.log(`  _${s}.jpg   `, await head(`https://live.staticflickr.com/3172/2800660239_608ea2a18d_${s}.jpg`));
  }

  console.log("--- Commons iiurlwidth thumburl (Cern datacenter.jpg) ---");
  const api = `https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=File:Cern%20datacenter.jpg&prop=imageinfo&iiprop=url|size|mime&iiurlwidth=1800`;
  const raw = await new Promise((res, rej) => {
    https.get(api, { headers: { "User-Agent": "PionTechSiteBuilder/1.0" } }, (r) => {
      const c = []; r.on("data", (d) => c.push(d)); r.on("end", () => res(Buffer.concat(c).toString()));
    }).on("error", rej);
  });
  const j = JSON.parse(raw);
  const p = Object.values(j.query.pages)[0];
  const ii = p.imageinfo[0];
  console.log(`  original : ${ii.width}x${ii.height}  ${ii.url}`);
  console.log(`  thumb    : ${ii.thumbwidth}x${ii.thumbheight}  ${ii.thumburl}`);
  console.log("  thumb head:", await head(ii.thumburl));
})();
