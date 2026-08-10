/**
 * Generates public/og-default.png (1200×630) — the Open Graph card used by
 * lib/seo.ts. Renders the brand (dark bg, violet accent, name + tagline) via
 * sharp's SVG renderer.
 *
 * Usage: npm run generate:og
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200;
const H = 630;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0d0d"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="18%" r="75%">
      <stop offset="0%" stop-color="#7C5CFF" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#7C5CFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <line x1="80" y1="512" x2="360" y2="512" stroke="#7C5CFF" stroke-width="3" stroke-opacity="0.85"/>
  <text x="80" y="170" font-family="sans-serif" font-size="24" letter-spacing="7" fill="#9AA1AC">FULL STACK DEVELOPER</text>
  <text x="80" y="290" font-family="sans-serif" font-weight="800" font-size="92" fill="#EDEFF2">Jobel V. Golde</text>
  <text x="80" y="400" font-family="sans-serif" font-size="36" fill="#9AA1AC">Building systems that stay boring under load.</text>
  <text x="80" y="580" font-family="sans-serif" font-size="26" fill="#5C636E">Laravel · Vue.js · React · Next.js · TypeScript</text>
</svg>
`;

const out = join(root, 'public', 'og-default.png');
await sharp(Buffer.from(svg)).png().toFile(out);
const meta = await sharp(out).metadata();
console.log(`Generated ${out} (${meta.width}x${meta.height})`);
