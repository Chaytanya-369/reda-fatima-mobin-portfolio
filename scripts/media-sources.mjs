/**
 * MEDIA SOURCE REGISTRY
 * ---------------------------------------------------------------------------
 * Every image on the site has an `id` defined here. The optimiser
 * (scripts/optimize-media.mjs) resolves each id to a source file:
 *
 *   1. media-source/originals/<id>.(jpg|jpeg|png|webp|tif|tiff)   <- preferred
 *   2. media-source/pdf-extract/<pdf>                              <- fallback
 *
 * To upgrade an image to the original high-resolution file, drop it into
 * media-source/originals/ named after its id (e.g. `gharq-boat.jpg`) and run
 * `npm run media`. No component code needs to change.
 *
 * `crop` (applies only to the PDF fallback):
 *   "letterbox"  -> strip black cinema bars automatically
 *   {left, top, width, height} -> exact pixel crop (matches the crop used in the PDF)
 *   undefined    -> use the full frame
 * `temp: true` marks low-resolution / screenshot sources that should be replaced.
 */

export const sources = [
  // ---------- Portraits ----------
  { id: "portrait-camera", folder: "portraits", pdf: "p02_02_960x1280.jpg" },
  { id: "portrait-gallery", folder: "portraits", pdf: "p03_02_819x1530.jpg" },
  { id: "portrait-studio", folder: "portraits", pdf: "p20_02_1210x1613.jpg" },

  // ---------- Documentary / Gharq ----------
  { id: "gharq-poster", folder: "documentary/gharq", pdf: "p12_02_633x896.jpg", temp: true },
  { id: "gharq-foam", folder: "documentary/gharq", pdf: "p13_02_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-diver", folder: "documentary/gharq", pdf: "p13_05_768x381.jpg", crop: "letterbox", temp: true },
  { id: "gharq-shelter", folder: "documentary/gharq", pdf: "p13_03_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-portrait", folder: "documentary/gharq", pdf: "p13_08_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-boat", folder: "documentary/gharq", pdf: "p13_07_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-shrine", folder: "documentary/gharq", pdf: "p13_04_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-gathering", folder: "documentary/gharq", pdf: "p13_10_683x384.jpg", crop: "letterbox", temp: true },
  { id: "gharq-fire", folder: "documentary/gharq", pdf: "p13_09_683x384.jpg", crop: "letterbox", temp: true },

  // ---------- Documentary / Crossroads ----------
  { id: "crossroads-title", folder: "documentary/crossroads", pdf: "p14_02_1152x648.jpg", crop: "letterbox" },
  { id: "crossroads-stretch", folder: "documentary/crossroads", pdf: "p15_02_1206x540.jpg", crop: "letterbox" },
  { id: "crossroads-interview", folder: "documentary/crossroads", pdf: "p15_03_1206x540.jpg", crop: "letterbox" },
  { id: "crossroads-field", folder: "documentary/crossroads", pdf: "p15_05_1206x540.jpg", crop: "letterbox" },
  { id: "crossroads-courtside", folder: "documentary/crossroads", pdf: "p15_04_1206x540.jpg", crop: "letterbox" },

  // ---------- Audio-visual / Fitoor ----------
  { id: "fitoor-turban", folder: "audiovisual/fitoor", pdf: "p17_05_1930x864.jpg", crop: "letterbox" },
  { id: "fitoor-forest", folder: "audiovisual/fitoor", pdf: "p17_03_1689x756.jpg", crop: "letterbox" },
  { id: "fitoor-red", folder: "audiovisual/fitoor", pdf: "p17_02_1689x756.jpg", crop: "letterbox" },
  { id: "fitoor-cave", folder: "audiovisual/fitoor", pdf: "p17_04_1448x648.jpg", crop: "letterbox" },

  // ---------- Anthology / Saayah ----------
  { id: "saayah-still", folder: "audiovisual/saayah", pdf: "p04_02_1280x680.jpg", crop: "letterbox" },
  { id: "saayah-bts-1", folder: "audiovisual/saayah", pdf: "p19_02_648x1152.jpg", temp: true },
  { id: "saayah-bts-2", folder: "audiovisual/saayah", pdf: "p19_03_648x1152.jpg", temp: true },

  // ---------- Music video / On The Loose ----------
  { id: "otl-park", folder: "music-video/on-the-loose", pdf: "p18_05_1448x648.jpg", crop: "letterbox" },
  { id: "otl-highfive", folder: "music-video/on-the-loose", pdf: "p18_02_1689x756.jpg", crop: "letterbox" },
  { id: "otl-closeup", folder: "music-video/on-the-loose", pdf: "p18_03_1689x756.jpg", crop: "letterbox" },
  { id: "otl-smile", folder: "music-video/on-the-loose", pdf: "p18_04_1206x540.jpg", crop: "letterbox" },

  // ---------- Photography ----------
  { id: "photo-hands", folder: "photography/selected", pdf: "p16_04_1205x1805.jpg" },
  { id: "photo-jewellery", folder: "photography/selected", pdf: "p16_02_1805x1205.jpg" },
  { id: "photo-couple", folder: "photography/selected", pdf: "p16_03_756x1689.jpg", crop: { left: 95, top: 544, width: 525, height: 676 }, temp: true },
  { id: "photo-tomb", folder: "photography/selected", pdf: "p16_05_864x1930.jpg", crop: { left: 49, top: 625, width: 764, height: 711 }, temp: true },

  // ---------- Social media / ISB ----------
  { id: "isb-grid-1", folder: "social-media/isb", pdf: "p07_02_573x1280.jpg", crop: { left: 0, top: 228, width: 573, height: 938 }, temp: true },
  { id: "isb-grid-2", folder: "social-media/isb", pdf: "p07_03_573x1280.jpg", crop: { left: 0, top: 234, width: 573, height: 934 }, temp: true },

  // ---------- Social media / NerdNerdy ----------
  { id: "nn-reel-scissors", folder: "social-media/nerdnerdy", pdf: "p08_03_1280x2276.jpg", crop: { left: 93, top: 0, width: 1123, height: 2276 } },
  { id: "nn-reel-puzzle", folder: "social-media/nerdnerdy", pdf: "p08_02_406x720.jpg", crop: { left: 26, top: 0, width: 356, height: 720 }, temp: true },
  { id: "nn-habits", folder: "social-media/nerdnerdy", pdf: "p09_02_540x1206.jpg", crop: { left: 0, top: 351, width: 540, height: 541 }, temp: true },
  { id: "nn-selfstudy", folder: "social-media/nerdnerdy", pdf: "p09_03_540x1206.jpg", crop: { left: 0, top: 351, width: 540, height: 540 }, temp: true },
  { id: "nn-vocabulary", folder: "social-media/nerdnerdy", pdf: "p09_04_540x1206.jpg", crop: { left: 0, top: 353, width: 540, height: 540 }, temp: true },
  { id: "nn-motor", folder: "social-media/nerdnerdy", pdf: "p09_05_540x1206.jpg", crop: { left: 0, top: 349, width: 540, height: 540 }, temp: true },

  // ---------- Social media / Xtreme Vision ----------
  { id: "xv-hockey", folder: "social-media/xtreme-vision", pdf: "p10_02_540x1206.jpg", crop: { left: 0, top: 218, width: 537, height: 537 }, temp: true },
  { id: "xv-isl", folder: "social-media/xtreme-vision", pdf: "p10_03_540x1206.jpg", crop: { left: 1, top: 219, width: 536, height: 536 }, temp: true },
  { id: "xv-archery", folder: "social-media/xtreme-vision", pdf: "p10_04_540x1206.jpg", crop: { left: 2, top: 219, width: 537, height: 537 }, temp: true },
  { id: "xv-cricket", folder: "social-media/xtreme-vision", pdf: "p10_06_540x540.jpg", temp: true },

  // ---------- Journalism ----------
  { id: "et-list-1", folder: "journalism", pdf: "p11_03_540x1206.jpg", crop: { left: 0, top: 62, width: 540, height: 1095 }, temp: true },
  { id: "et-list-2", folder: "journalism", pdf: "p11_02_540x1206.jpg", crop: { left: 22, top: 153, width: 495, height: 1002 }, temp: true },
];
