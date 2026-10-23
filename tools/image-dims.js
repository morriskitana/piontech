"use strict";
/**
 * Pixel dimensions for every image asset the replacement pipeline writes.
 *
 * Existing assets read their size from tools/image-analysis.tsv, which is a
 * snapshot of what is currently on disk. New assets (the per-service detail
 * photos) do not have a file yet, so their target size is declared here.
 */
const fs = require("fs");
const path = require("path");

const ROOT = "C:/Users/ADMIN/Documents/Projects/pion";
const TSV = path.join(ROOT, "tools/image-analysis.tsv");

// The service hero is a wide banner, the gallery tiles are square.
const SERVICE_HERO = { w: 2580, h: 1200 };
const SERVICE_TILE = { w: 820, h: 820 };

const SERVICE_SLUGS = [
  "ict-solutions-systems-and-hardware",
  "integrated-security-solutions",
  "enterprise-applications",
  "custom-software-and-integration",
  "telecommunication-solutions",
  "power-and-renewable-energy",
  "smart-facilities-and-automation",
  "iot-solutions-and-remote-monitoring",
];

/** Every asset this pipeline may write, with its required pixel size. */
function targets() {
  const map = new Map();

  // existing assets, straight from the analysis snapshot
  if (fs.existsSync(TSV)) {
    const lines = fs.readFileSync(TSV, "utf8").split(/\r?\n/).filter(Boolean);
    const head = lines[0].split("\t");
    const iPath = head.indexOf("path"), iW = head.indexOf("w"), iH = head.indexOf("h");
    for (const line of lines.slice(1)) {
      const c = line.split("\t");
      map.set(c[iPath], { w: +c[iW], h: +c[iH] });
    }
  }

  // new per-service detail photos
  for (const slug of SERVICE_SLUGS) {
    map.set(`services/service_details_${slug}_1.webp`, { ...SERVICE_HERO });
    map.set(`services/service_details_${slug}_2.webp`, { ...SERVICE_TILE });
    map.set(`services/service_details_${slug}_3.webp`, { ...SERVICE_TILE });
    map.set(`services/service_details_${slug}_4.webp`, { ...SERVICE_TILE });
  }

  // the CTA parallax background is a wide banner
  if (!map.has("backgrounds/bg_image_1.webp")) {
    map.set("backgrounds/bg_image_1.webp", { w: 3840, h: 2558 });
  }

  return map;
}

/** avatar_1 .. avatar_11 in numeric order. */
function avatarTargets() {
  const map = targets();
  const out = [];
  for (let i = 1; i <= 11; i++) {
    const key = `avatar/avatar_${i}.webp`;
    const d = map.get(key);
    if (!d) throw new Error("missing dimensions for " + key);
    out.push({ target: key, w: d.w, h: d.h });
  }
  return out;
}

module.exports = { targets, avatarTargets, SERVICE_SLUGS, SERVICE_HERO, SERVICE_TILE };
