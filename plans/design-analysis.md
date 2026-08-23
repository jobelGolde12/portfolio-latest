# Design Analysis

## Current visual language (before)

Dark cinematic "premium SaaS": `#0A0B0D` canvas, fixed gradient + SVG-noise grain +
vignette layers, purple accent `#7C5CFF` (`--color-accent-signal`), pill-shaped nav and
buttons with glow shadows, glass cards (`white/[0.02]` + `backdrop-blur`), mouse parallax,
blob-morphing portrait, scroll-driven horizontal gallery, Fraunces serif for section
titles, Geist Sans/Mono everywhere else.

## Target: principles extracted from `modern-and-polish.md`

1. White canvas; whitespace *is* the texture. No gradients, grain, dotted grids, blobs.
2. Typography is the primary visual element — large, thin/regular weight, tight leading
   (~0.95–1.05), negative tracking (~-0.03/-0.05em), intentional line breaks.
3. Compact quiet header: small wordmark, small nav type, tiny utility icons right.
4. Hero = left text column + **one** dominant visual on the right; slightly off-center;
   controlled playfulness (one rotation / one annotation max).
5. Minimal CTA strategy: one compact dark button (#111) + plain text links with arrows.
6. Near-square geometry (radius 0–4px); shadows ~none (modal/mobile-nav exception).
7. Restrained accent `#D96C92` used in tiny doses only (dots, hover details); page must
   still work if the accent is removed.
8. Quiet motion: 150–220ms UI transitions, 400–700ms reveals, fade+8–16px rise,
   no bounce/elastic/parallax-everything.
9. Section rhythm: eyebrow micro-label → large heading → short supporting copy → content.

## Design decisions & documented conflicts

| Decision | Reason |
|---|---|
| **Single light theme; ThemeProvider deleted.** Spec's core is a white canvas. The old light theme was unreachable dead code (no toggle) and broken (components hardcoded `text-white`). Maintaining a second broken theme violates "simple > over-engineered". | Spec §17 background; TODO §7 avoid unnecessary complexity |
| **Fraunces removed; all-Geist.** Spec's preferred faces are grotesks and explicitly list Geist. Serif display headings fought the editorial direction; dropping it removes a 5-weight font payload. | Spec §4 |
| **Accent shifted #7C5CFF → #D96C92** (spec's suggested value). Purple-on-white at small sizes fails contrast and reads "SaaS". Rose used only for dots/hover marks. | Spec §3 |
| **Name stays the hero H1** ("Jobel Golde."), value prop becomes the supporting display line ("Building systems that stay boring under load." — his authentic tagline from Footer/SEO copy). Editorial portfolios lead with the person's name; e2e contract (`h1 contains "Jobel"`) preserved. | Spec §10; content preservation |
| **Portrait = `profile.webp`** (853×1280 real photo, object-cover) as hero's single dominant visual with a slight `-2°` rotation and micro-caption. `me2.webp` (mix-blend-multiply tuned for dark bg) retired. About loses its duplicate portrait to honor "one dominant visual" and avoid repetition. | Spec §13/§45 |
| **Radius scale flattened**: sm=2px, md=4px, lg=6px (was 6/10/16). `rounded-full` reserved for dots/pips. | Spec §31 |
| **Buttons**: primary = `#111111` bg, white text, radius-sm; secondary = hairline border; tertiary text-links with arrow-shift hover (180–220ms). | Spec §12/§36 |
| **Cards replaced by typographic rows** (Services/Skills/Timeline/Blog) separated by `1px #E8E8E8` hairlines. Cards remain only where grouping aids comprehension (project media frames). | Spec §19, §49 DON'T "turn every section into a card grid" |

## Component mapping (old → new)

- `Navbar` glass pill → flat white bar, hairline bottom border on scroll, 13px links,
  underline hover, GitHub icon + ⌘K + compact dark "Contact".
- `Hero` cinematic split w/ glows → editorial split: eyebrow / huge thin name / display
  statement / location / CTAs / quiet stack tags ‖ rotated portrait + caption.
- `About` dvh storytelling + blob portrait → two-column editorial: left sticky label +
  summary; right education / based-in (+map) / languages / interests rows.
- `Skills` glowing cards → index rows: group title + description left, badges right.
- `Services` icon cards → numbered editorial rows (01–06).
- `Projects` horizontal scroll-jack → vertical alternating media/text rows; dialog kept.
- `Timeline` blur/glow nodes → year-gutter rows on a static hairline, subtle fill states.
- `Testimonials` fake → removed.
- `Contact` dark inputs → white fields, thin borders, square corners, dark submit button.
- `Footer` dark 3-col → white, hairline top border, small type, no status badge.

## Visual hierarchy after redesign

Brand mark → eyebrow ("Software engineer — Sorsogon, PH") → huge thin name → one-line
value proposition → portrait → "See projects" → project index rows → skills index →
services → timeline → contact → footer. Primary value proposition lands in ≤5 seconds.
