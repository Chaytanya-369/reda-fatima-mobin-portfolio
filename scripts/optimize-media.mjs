/**
 * Media optimiser — run with `npm run media`.
 * Reads scripts/media-sources.mjs, resolves each source (originals first, PDF
 * extract second), crops, and writes responsive AVIF + WebP renditions to
 * public/media/<folder>/ plus a manifest at src/content/media.generated.json.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { sources } from "./media-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINALS = path.join(root, "media-source/originals");
const EXTRACT = path.join(root, "media-source/pdf-extract");
const OUT = path.join(root, "public/media");
const MANIFEST = path.join(root, "src/content/media.generated.json");
const WIDTHS = [480, 800, 1200, 1600, 2000, 2600];
const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"];

/** Detect black letterbox / pillarbox bars and return a crop box. */
async function letterboxCrop(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  // A bar is a line that is dark AND flat (cinema bars are a single solid tone,
  // often grey-ish after compression; real dark picture content is not uniform).
  const isBar = (mean, mn, mx) => mean < 48 && mx - mn <= 12;
  const rowDark = (y) => { let s = 0, mx = 0, mn = 255; for (let x = 0; x < W; x++) { const v = data[y * W + x]; s += v; if (v > mx) mx = v; if (v < mn) mn = v; } return isBar(s / W, mn, mx); };
  const colDark = (x, y0, y1) => { let s = 0, mx = 0, mn = 255; for (let y = y0; y < y1; y++) { const v = data[y * W + x]; s += v; if (v > mx) mx = v; if (v < mn) mn = v; } return isBar(s / (y1 - y0), mn, mx); };
  let top = 0, bottom = H - 1;
  while (top < H / 3 && rowDark(top)) top++;
  while (bottom > (H * 2) / 3 && rowDark(bottom)) bottom--;
  let left = 0, right = W - 1;
  while (left < W / 3 && colDark(left, top, bottom + 1)) left++;
  while (right > (W * 2) / 3 && colDark(right, top, bottom + 1)) right--;
  // shave 2px safety margin to remove anti-aliased edge lines
  const pad = 2;
  if (top) top += pad; if (bottom < H - 1) bottom -= pad;
  if (left) left += pad; if (right < W - 1) right -= pad;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

function findOriginal(id) {
  for (const ext of EXTS) {
    const p = path.join(ORIGINALS, id + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const manifest = {};
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });

for (const s of sources) {
  const original = findOriginal(s.id);
  const file = original ?? path.join(EXTRACT, s.pdf);
  if (!fs.existsSync(file)) { console.warn("missing source for", s.id); continue; }

  let img = sharp(file).rotate();
  if (!original && s.crop) {
    const box = s.crop === "letterbox" ? await letterboxCrop(file) : s.crop;
    img = img.extract(box);
  }
  const buf = await img.toBuffer();
  const meta = await sharp(buf).metadata();
  const { width, height } = meta;
  const { dominant } = await sharp(buf).stats();
  const color = `rgb(${dominant.r},${dominant.g},${dominant.b})`;

  const dir = path.join(OUT, s.folder);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (f.startsWith(s.id + "-")) fs.rmSync(path.join(dir, f));

  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])];
  for (const w of widths) {
    const base = sharp(buf).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(path.join(dir, `${s.id}-${w}.avif`));
    await base.clone().webp({ quality: 80 }).toFile(path.join(dir, `${s.id}-${w}.webp`));
  }
  manifest[s.id] = {
    src: `/media/${s.folder}/${s.id}`,
    width, height, widths, color,
    source: original ? "original" : "pdf-extract",
    temp: !original && !!s.temp,
  };
  console.log(`${s.id.padEnd(22)} ${width}x${height} ${original ? "ORIGINAL" : "pdf"} ${widths.join(",")}`);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));

// ---- Social share image + icons -------------------------------------------
const pub = path.join(root, "public");
const share = path.join(EXTRACT, "p17_05_1930x864.jpg");
if (fs.existsSync(share)) {
  const crop = await letterboxCrop(share);
  const bg = await sharp(share).extract(crop).resize(1200, 630, { fit: "cover", position: "attention" }).modulate({ brightness: 0.55 }).toBuffer();
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0.35" stop-color="#110f0e" stop-opacity="0"/><stop offset="1" stop-color="#110f0e" stop-opacity="0.92"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="64" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="96" fill="#f1ebe2">Reda Fatima Mobin</text>
    <text x="68" y="540" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="5" fill="#e0916b">FILMMAKER · SCREENWRITER · CREATIVE STRATEGIST</text>
  </svg>`);
  await sharp(bg).composite([{ input: svg }]).jpeg({ quality: 84 }).toFile(path.join(pub, "og-image.jpg"));
  console.log("og-image.jpg written");
}
const icon = (size) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#141211"/><text x="32" y="45" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="40" fill="#e0916b">R</text></svg>`);
await sharp(icon(180)).png().toFile(path.join(pub, "apple-touch-icon.png"));
await sharp(icon(512)).png().toFile(path.join(pub, "icon-512.png"));
console.log("icons written");
