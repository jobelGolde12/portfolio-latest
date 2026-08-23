/**
 * Generates public/og-default.png (1200×630) — the Open Graph card used by
 * lib/seo.ts. Renders the light editorial brand (white canvas, ink typography,
 * restrained rose accent) via sharp's SVG renderer.
 *
 * Usage: npm run generate:og
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1200;
const H = 630;

// Brand tokens (mirrors app/globals.css)
const TEXT_PRIMARY = '#171717';
const TEXT_SECONDARY = '#555555';
const TEXT_TERTIARY = '#777777';
const ACCENT = '#D96C92';
const BORDER = '#E8E8E8';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>

  <!-- Hairline frame, editorial geometry -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${BORDER}" stroke-width="2"/>

  <!-- Eyebrow label -->
  <text x="104" y="168" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="6" fill="${TEXT_TERTIARY}">SOFTWARE ENGINEER · FULL-STACK</text>

  <!-- Name — the dominant typographic object -->
  <text x="98" y="318" font-family="Helvetica, Arial, sans-serif" font-weight="300" font-size="118" letter-spacing="-4" fill="${TEXT_PRIMARY}">Jobel Golde.</text>

  <!-- Value line -->
  <text x="104" y="392" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="${TEXT_SECONDARY}">Building systems that stay boring under load.</text>

  <!-- Accent rule — single restrained signal -->
  <line x1="104" y1="452" x2="184" y2="452" stroke="${ACCENT}" stroke-width="4"/>

  <!-- Stack line -->
  <text x="104" y="530" font-family="Courier New, monospace" font-size="24" fill="${TEXT_TERTIARY}">Laravel · Vue.js · React · Next.js · TypeScript</text>

  <!-- Location, bottom-right -->
  <text x="${W - 104}" y="530" text-anchor="end" font-family="Courier New, monospace" font-size="22" fill="${TEXT_TERTIARY}">Sorsogon, PH</text>
</svg>
`;

const out = join(root, 'public', 'og-default.png');
await sharp(Buffer.from(svg)).png().toFile(out);
const meta = await sharp(out).metadata();
console.log(`Generated ${out} (${meta.width}x${meta.height})`);
