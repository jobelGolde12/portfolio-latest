/**
 * Optimizes all portfolio images:
 *  - Project screenshots → WebP (max 1600px wide)
 *  - Portraits (hero/about) → WebP (max 1200px wide)
 *  - Logo → compressed 8-bit PNG (kept as PNG for favicon/apple-touch-icon)
 * Originals are deleted after conversion — update component references to the
 * new extensions (already done: Projects.tsx, Hero.tsx, About.tsx, JsonLd.tsx).
 *
 * Usage: npm run optimize:images
 */
import sharp from 'sharp';
import { rmSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => join(root, 'public', p);

const webpJobs = [
  { src: 'images/project_profanity_api.png', out: 'images/project_profanity_api.webp', width: 1600, quality: 82 },
  { src: 'images/project_trailmates.png', out: 'images/project_trailmates.webp', width: 1600, quality: 75 },
  { src: 'images/project_taskmind.png', out: 'images/project_taskmind.webp', width: 1600, quality: 82 },
  { src: 'images/project_suitora.png', out: 'images/project_suitora.webp', width: 1600, quality: 75 },
  { src: 'images/project_dugtong.png', out: 'images/project_dugtong.webp', width: 1600, quality: 82 },
  { src: 'me2.png', out: 'me2.webp', width: 1200, quality: 82 },
  { src: 'profile.jpg', out: 'profile.webp', width: 1200, quality: 82 },
];

for (const job of webpJobs) {
  const input = pub(job.src);
  const output = pub(job.out);
  if (!existsSync(input)) {
    console.log(`· skip ${job.out} (already converted)`);
    continue;
  }
  await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 5 })
    .toFile(output);
  rmSync(input);
  const meta = await sharp(output).metadata();
  const kb = Math.round(statSync(output).size / 1024);
  console.log(`✓ ${job.out} (${meta.width}x${meta.height}, ${kb} KB)`);
}

// Logo stays PNG (favicon/apple-touch-icon compatibility) but gets resized + quantized.
const logoIn = pub('jobel_logo.png');
const logoOut = pub('jobel_logo.optimized.png');
if (!existsSync(logoIn)) {
  console.log('· skip jobel_logo.png (already optimized)');
} else {
  await sharp(logoIn)
  .resize({ width: 512, withoutEnlargement: true })
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(logoOut);
  rmSync(logoIn);
  await sharp(logoOut).toFile(logoIn);
  rmSync(logoOut);
  const logoMeta = await sharp(logoIn).metadata();
  console.log(`✓ jobel_logo.png recompressed (${logoMeta.width}x${logoMeta.height}, ${Math.round(statSync(logoIn).size / 1024)} KB)`);
}

console.log('Done.');
