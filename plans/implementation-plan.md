# Implementation Plan (executed)

Priorities: **P0** critical · **P1** high · **P2** polish · **P3** optional.
Status column reflects completion at verification time.

## P0 — Critical

| # | Task | Files | Status |
|---|---|---|---|
| 1 | Rewrite token layer to editorial palette (white canvas, ink text, hairline borders, rose accent, flat radii, near-zero shadows) | `app/globals.css` | ✅ |
| 2 | Remove fabricated testimonials section + data | `components/Testimonials.tsx`, `data/testimonials.ts`, `app/page.tsx` | ✅ |
| 3 | Replace scroll-jacked horizontal Projects with vertical editorial index; keep case-study dialog; surface demo/repo links on listing | `components/Projects.tsx` | ✅ |
| 4 | Editorial hero: eyebrow / huge thin name / value line / CTAs / single portrait visual; delete glows/grain/vignette/parallax/empty badge div | `components/Hero.tsx` | ✅ |
| 5 | Quiet header: white bar, small wordmark, 13px links, underline hover, compact dark CTA; remove glass pill + progress bar | `components/Navbar.tsx` | ✅ |
| 6 | Delete dead infrastructure: ThemeProvider, DarkBackground, AnimatedBackground, useMouseParallax; update Shell/layout | `components/*`, `app/layout.tsx`, `lib/useMouseParallax.ts` | ✅ |

## P1 — High

| # | Task | Files | Status |
|---|---|---|---|
| 7 | Flatten About: two-column editorial rows, kill dvh storytelling + blob-morph portrait + duplicate image; map kept | `components/About.tsx` | ✅ |
| 8 | Skills as editorial index rows (title/description left, badges right); drop per-skill icon registry | `components/Skills.tsx`, `data/skills.ts` (icons removed from component) | ✅ |
| 9 | Services → numbered typographic rows with hairlines | `components/Services.tsx` | ✅ |
| 10 | Timeline simplification: year-gutter rows, static hairline, subtle states; remove blur/scale/glow loops | `components/Timeline.tsx` | ✅ |
| 11 | Contact restyle: white square inputs, dark submit, inline error region replacing alert(); add résumé link; keep Formspree flow | `components/Contact.tsx`, `ui/input.tsx`, `ui/textarea.tsx`, `ui/button.tsx` | ✅ |
| 12 | Footer: white/hairline/small-type; drop "Systems operational"; keep nav/social/back-to-top | `components/Footer.tsx` | ✅ |
| 13 | Dialog/palette re-tokened to light surfaces; dialog dark-var override removed | `ui/dialog.tsx`, `CommandPalette.tsx` | ✅ |
| 14 | Remove Fraunces; Geist-only type system; display styles via tokens (`--text-display` clamp) | `app/layout.tsx`, `globals.css` | ✅ |

## P2 — Medium

| # | Task | Files | Status |
|---|---|---|---|
| 15 | Move leaflet.css into MapView (off critical path) | `app/layout.tsx`, `components/MapView.tsx` | ✅ |
| 16 | Blog/404/error pages re-tokened; hardcoded white classes swept | `app/blog/**`, `not-found.tsx`, `error.tsx` | ✅ |
| 17 | SectionHeading/Reveal/Pill/Badge/Tag flattened to new geometry | `ui/*` | ✅ |
| 18 | Viewport export w/ themeColor; metadata copy aligned to new hero positioning | `app/layout.tsx`, `app/page.tsx` | ✅ |
| 19 | Delete retired asset `me2.webp`; flag stray tracked file `et --hard HEAD@{0}` for git rm | `public/me2.webp` | ✅ |

## P3 — Optional (documented, not all executed)

- OG image regeneration matching light branding (`scripts/generate-og.mjs`) — current dark
  OG still valid for social preview. *Deferred (needs visual assets I cannot generate).*
- Résumé PDF is a generated placeholder — owner must supply the real file. *External dependency.*
- Project screenshots are dark-themed captures on a white page — framed in neutral media
  wells so they read as artifacts, not design elements. *Owner may re-capture later.*

## Acceptance criteria (all met)

- `npm run lint` → 0 errors/warnings · `npm run typecheck` → clean ·
  `npm test` → pass · `npm run build` → success.
- E2E contracts preserved: h1 contains "Jobel", "Sorsogon, Philippines" visible,
  case-study dialog opens/closes via Escape with problem/trade-offs/links,
  blog routes render, mobile menu opens as labelled dialog.
- No horizontal overflow at 320–1920px (flex/grid audits + overflow-x guard retained).
- Contrast ≥ 4.5:1 for all meaningful text (see accessibility-plan).
