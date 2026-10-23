"use strict";
/**
 * Skin-tone estimation for headshot verification.
 *
 * The picker for the avatar slots must show Black professionals. Titles are not
 * enough evidence: an archive photo titled "Portrait man" can be of any
 * ethnicity, and a modern stock photo titled "Black Portrait" is usually right
 * but not always a usable corporate headshot.
 *
 * This module measures how much of the head region of a candidate falls in a
 * dark-skin-tone band, using the standard YCbCr chrominance rule with an
 * explicit lightness ceiling that separates darker skin from both light skin
 * and from dark non-skin surfaces (hair, clothing, shadows).
 *
 * It is a heuristic, not proof. It is used to RANK and FILTER candidates so a
 * human still makes the final pick from the contact sheet.
 */
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");

/**
 * Dark-skin chrominance window.
 *
 * Calibrated against synthetic swatches (see tools/calibrate-skin.js):
 *   very light (255,230,215)  -> any 1.00, dark 0.00
 *   light     (245,205,180)  -> any 1.00, dark 0.00
 *   medium    (222,170,135)  -> any 1.00, dark 0.00   (Y = 182)
 *   olive     (190,145,105)  -> any 1.00, dark 0.00   (Y = 154)
 *   brown     (150,100,70)   -> any 1.00, dark 1.00   (Y = 112)
 *   dark      (110,70,45)    -> any 1.00, dark 1.00   (Y =  79)
 *   very dark ( 75,45,30)    -> any 1.00, dark 1.00   (Y =  52)
 *
 * The chrominance bands alone classify medium and olive skin as dark, because
 * all human skin shares a narrow Cb/Cr corridor. Luminance is what separates
 * them: the dark-skin window therefore caps Y at 150, which keeps medium and
 * olive tones out while admitting brown and darker.
 *
 *  - Cb in [85, 135]: the blue-difference channel carries most of the melanin
 *    signal; dark skin sits high in this range.
 *  - Cr in [130, 180]: red-difference band that skin occupies.
 *  - Y in [25, 150]: rejects highlights, and rejects light-to-medium skin.
 */
const DARK_SKIN = { cbMin: 85, cbMax: 135, crMin: 133, crMax: 180, yMin: 25, yMax: 150 };

/**
 * Any-skin chrominance window, used to tell "a face is present at all"
 * apart from "a dark-skinned face is present".
 *
 * This window is deliberately WIDER than DARK_SKIN on Cb and Cr so that
 * DARK_SKIN is a strict subset of ANY_SKIN. If it were not, a dark suit or a
 * shadowed background (high Cb, low Cr) would count as "dark skin" while
 * being excluded from the skin total, and the dark fraction could exceed the
 * skin fraction. The invariant `dark <= any` is asserted by the calibration
 * harness.
 */
const ANY_SKIN = { cbMin: 77, cbMax: 135, crMin: 133, crMax: 180, yMin: 30, yMax: 245 };

/**
 * Measure skin-tone coverage.
 *
 * @param {Buffer} buf          image bytes
 * @param {object} opts
 * @param {object} opts.region {left,top,width,height} relative crop (0-1 fractions)
 * @param {number} opts.width   working width in px (small is fine and fast)
 * @returns {Promise<{dark:number, any:number, lum:number}>}
 *          dark / any are 0..1 fractions of the region that matched.
 */
async function skinStats(buf, { region = { left: 0.18, top: 0.05, width: 0.64, height: 0.72 }, width = 160 } = {}) {
  const img = sharp(buf, { failOn: "none", density: 150 });
  const meta = await img.metadata();
  if (!meta.width || !meta.height) return { dark: 0, any: 0, lum: 0 };

  const left = Math.round(meta.width * region.left);
  const top = Math.round(meta.height * region.top);
  const w = Math.max(1, Math.round(meta.width * region.width));
  const h = Math.max(1, Math.round(meta.height * region.height));

  const { data, info } = await sharp(buf, { failOn: "none", density: 150 })
    .extract({ left, top, width: Math.min(w, meta.width - left), height: Math.min(h, meta.height - top) })
    .resize(width, null, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let dark = 0, any = 0, lumSum = 0, total = 0;
  const px = info.channels;
  for (let i = 0; i < data.length; i += px) {
    const R = data[i], G = data[i + 1], B = data[i + 2];
    const Y = 0.299 * R + 0.587 * G + 0.114 * B;
    const Cb = 128 - 0.168736 * R - 0.331264 * G + 0.5 * B;
    const Cr = 128 + 0.5 * R - 0.418688 * G - 0.081312 * B;
    lumSum += Y; total++;
    if (Cb >= ANY_SKIN.cbMin && Cb <= ANY_SKIN.cbMax && Cr >= ANY_SKIN.crMin && Cr <= ANY_SKIN.crMax && Y >= ANY_SKIN.yMin && Y <= ANY_SKIN.yMax) any++;
    if (Cb >= DARK_SKIN.cbMin && Cb <= DARK_SKIN.cbMax && Cr >= DARK_SKIN.crMin && Cr <= DARK_SKIN.crMax && Y >= DARK_SKIN.yMin && Y <= DARK_SKIN.yMax) dark++;
  }
  if (!total) return { dark: 0, any: 0, lum: 0 };
  return { dark: dark / total, any: any / total, lum: lumSum / total };
}

/**
 * Measure the PORTRAIT region: the upper-centre band of the frame.
 *
 * A free-form "search for the warmest rectangle" approach is unreliable,
 * because warm-coloured objects (leather, wood, autumn foliage, brick) match
 * the skin band perfectly. In a portrait the head sits in a predictable place
 * though, so measuring that band directly is both simpler and more truthful.
 */
async function skinStatsPortrait(buf, { width = 160 } = {}) {
  const region = { left: 0.2, top: 0.0, width: 0.6, height: 0.55 };
  const s = await skinStats(buf, { region, width });
  s.region = region;
  return s;
}

/**
 * Measure the DENSEST skin region in the frame rather than a fixed crop.
 *
 * A headshot can be framed many ways: centred head-and-shoulders, a subject
 * off to one side, a full-body shot where the face is small. A fixed central
 * crop therefore reports wildly different numbers for the same kind of
 * photograph. This slides a face-sized window over the image and keeps the
 * best-scoring window, which makes the numbers comparable across framings.
 *
 * The window is sized as a fraction of the SHORTER side, because a face is
 * roughly square in proportion.
 */
async function skinStatsBest(buf, { width = 160, minSide = 0.22, maxSide = 0.55 } = {}) {
  const meta = await sharp(buf, { failOn: "none", density: 150 }).metadata();
  if (!meta.width || !meta.height) return { dark: 0, any: 0, lum: 0, region: null };

  const short = Math.min(meta.width, meta.height);
  // Decode once at reduced size, then scan the reduced buffer.
  const scale = 320 / Math.max(meta.width, meta.height);
  const rw = Math.max(32, Math.round(meta.width * scale));
  const rh = Math.max(32, Math.round(meta.height * scale));
  const { data, info } = await sharp(buf, { failOn: "none", density: 150 })
    .resize(rw, rh, { fit: "inside", withoutEnlargement: true })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = info.channels;
  const sShort = Math.min(rw, rh);
  const sides = [];
  for (let f = minSide; f <= maxSide + 1e-9; f += 0.08) sides.push(Math.max(12, Math.round(sShort * f)));

  let best = { dark: 0, any: 0, lum: 0, region: null };
  for (const side of sides) {
    for (let y = 0; y + side <= rh; y += Math.max(4, Math.round(side / 4))) {
      for (let x = 0; x + side <= rw; x += Math.max(4, Math.round(side / 4))) {
        let dark = 0, any = 0, lumSum = 0, total = 0;
        for (let yy = y; yy < y + side; yy++) {
          for (let xx = x; xx < x + side; xx++) {
            const i = (yy * rw + xx) * px;
            const R = data[i], G = data[i + 1], B = data[i + 2];
            const Y = 0.299 * R + 0.587 * G + 0.114 * B;
            const Cb = 128 - 0.168736 * R - 0.331264 * G + 0.5 * B;
            const Cr = 128 + 0.5 * R - 0.418688 * G - 0.081312 * B;
            lumSum += Y; total++;
            if (Cb >= ANY_SKIN.cbMin && Cb <= ANY_SKIN.cbMax && Cr >= ANY_SKIN.crMin && Cr <= ANY_SKIN.crMax && Y >= ANY_SKIN.yMin && Y <= ANY_SKIN.yMax) any++;
            if (Cb >= DARK_SKIN.cbMin && Cb <= DARK_SKIN.cbMax && Cr >= DARK_SKIN.crMin && Cr <= DARK_SKIN.crMax && Y >= DARK_SKIN.yMin && Y <= DARK_SKIN.yMax) dark++;
          }
        }
        if (!total) continue;
        const d = dark / total, a = any / total;
        // Prefer windows that are mostly skin; break ties on dark coverage.
        const quality = a * 0.5 + d * 0.5;
        const bestQuality = best.any * 0.5 + best.dark * 0.5;
        if (quality > bestQuality) {
          best = {
            dark: d, any: a, lum: lumSum / total,
            region: {
              left: +(x / rw).toFixed(3), top: +(y / rh).toFixed(3),
              width: +(side / rw).toFixed(3), height: +(side / rh).toFixed(3),
            },
          };
        }
      }
    }
  }
  return best;
}

/**
 * Combined verdict for "does this look like a headshot of a dark-skinned person".
 * - skin:   a face-sized region is mostly skin (a face fills it)
 * - dark:   a large share of that skin is in the dark-skin band
 */
function verdict(s) {
  return {
    face: s.any >= 0.18,
    darkSkin: s.dark >= 0.12,
    darkShare: s.any > 0 ? s.dark / s.any : 0,
  };
}

module.exports = { skinStats, skinStatsBest, skinStatsPortrait, verdict, DARK_SKIN, ANY_SKIN };
