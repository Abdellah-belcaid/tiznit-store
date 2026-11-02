// Crops and compresses the raw product photos into public/images (webp).
// Usage: node scripts/prepare-images.mjs <folder-with-raw-photos>
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/prepare-images.mjs <raw-photos-folder>");
  process.exit(1);
}
const out = join(import.meta.dirname, "..", "public", "images");
mkdirSync(out, { recursive: true });

// Crop boxes are fractions of the source image: [left, top, right, bottom]
const jobs = [
  { file: "2.jpg", name: "amlou-amande", box: [0.04, 0.02, 0.96, 0.9], w: 800, h: 1000 },
  { file: "3.jpg", name: "miel-euphorbe-1kg", box: [0.19, 0.24, 0.45, 0.54], w: 800, h: 1000 },
  { file: "3.jpg", name: "miel-thym", box: [0.64, 0.22, 0.9, 0.52], w: 800, h: 1000 },
  { file: "3.jpg", name: "miel-eucalyptus", box: [0.0, 0.36, 0.23, 0.66], w: 800, h: 1000 },
  { file: "3.jpg", name: "shelf", box: [0.0, 0.22, 1.0, 0.82], w: 1400, h: 830 },
  { file: "4.jpg", name: "safran", box: [0.02, 0.06, 0.98, 0.95], w: 800, h: 1000 },
  { file: "5.jpg", name: "miel-oranger", box: [0.13, 0.5, 0.73, 0.96], w: 800, h: 1000 },
  { file: "5.jpg", name: "honey-stack", box: [0.08, 0.02, 0.92, 0.98], w: 900, h: 1400 },
  { file: "6.jpg", name: "miel-euphorbe", box: [0.0, 0.0, 1.0, 1.0], w: 800, h: 1000 },
];

for (const j of jobs) {
  const img = sharp(join(src, j.file));
  const { width, height } = await img.metadata();
  const [l, t, r, b] = j.box;
  await img
    .extract({
      left: Math.round(l * width),
      top: Math.round(t * height),
      width: Math.round((r - l) * width),
      height: Math.round((b - t) * height),
    })
    .resize(j.w, j.h, { fit: "cover", position: "centre" })
    .modulate({ saturation: 1.06 })
    .webp({ quality: 82 })
    .toFile(join(out, `${j.name}.webp`));
  console.log("✓", j.name, `(${width}x${height})`);
}
