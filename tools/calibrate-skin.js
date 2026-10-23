"use strict";
/**
 * Calibration harness for tools/lib/skintone.js.
 *
 * The skin-tone heuristic is only useful if it separates dark skin from light
 * and medium skin. Because the agent running this pipeline cannot visually
 * inspect the contact sheet, the thresholds are pinned against synthetic
 * swatches of known RGB values and the expected outcome for each.
 *
 * Run: node tools/calibrate-skin.js
 */
const sharp = require("C:/Users/ADMIN/Documents/Projects/pion/node_modules/sharp");
const ST = require("./lib/skintone");

// name, RGB, expectDark (does this swatch count as dark skin?)
const SWATCHES = [
  ["very light skin (255,230,215)", [255, 230, 215], false],
  ["light skin     (245,205,180)", [245, 205, 180], false],
  ["medium skin    (222,170,135)", [222, 170, 135], false],
  ["olive skin     (190,145,105)", [190, 145, 105], false],
  ["brown skin     (150,100,70)", [150, 100, 70], true],
  ["dark brown     (110,70,45)", [110, 70, 45], true],
  ["very dark      ( 75,45,30)", [75, 45, 30], true],
  // Non-skin surfaces must never register as skin.
  ["blue shirt     ( 40,60,110)", [40, 60, 110], false],
  ["white bg       (255,255,255)", [255, 255, 255], false],
  ["grey bg        (128,128,128)", [128, 128, 128], false],
  ["red shirt      (180,30,30)", [180, 30, 30], false],
  ["green foliage  (30,90,40)", [30, 90, 40], false],
];

(async () => {
  let failures = 0;
  console.log("swatch                        dark    any     lum   expected");
  for (const [name, [r, g, b], expectDark] of SWATCHES) {
    const buf = await sharp({
      create: { width: 400, height: 500, channels: 3, background: { r, g, b } },
    }).jpeg().toBuffer();
    const s = await ST.skinStats(buf);
    const v = ST.verdict(s);
    const ok = v.darkSkin === expectDark;
    if (!ok) failures++;
    // Invariant: the dark-skin window is a strict subset of the skin window,
    // so the dark fraction can never exceed the skin fraction.
    if (s.dark > s.any + 1e-9) { failures++; console.log("   INVARIANT VIOLATION: dark > any"); }
    console.log(
      name.padEnd(30) +
        "  " + s.dark.toFixed(3) + "   " + s.any.toFixed(3) + "   " +
        s.lum.toFixed(0).padStart(3) + "   dark=" + String(v.darkSkin).padEnd(5) +
        " (want " + expectDark + ")" + (ok ? "" : "   <-- MISMATCH")
    );
  }
  console.log(failures ? `\n${failures} mismatch(es)` : "\nall swatches behave as expected");
  process.exit(failures ? 1 : 0);
})();
