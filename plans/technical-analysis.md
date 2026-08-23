# Technical Analysis

## Baseline (kept)

- Next.js 16.2.1 App Router, React 19, TS strict, Turbopack; `next/image` with
  `sizes`/`priority`; `next/font` self-hosting; AVIF/WebP negotiation.
- Data-driven rendering: `data/{projects,skills,timeline,services,posts,about}.ts`.
- Reusable primitives: `ui/{dialog,input,textarea,button,badge,tag,pill,Reveal,
  SectionHeading,BackToTop}` + `cn()` merge utility.
- SEO: metadata API w/ template, JSON-LD ×3, sitemap.ts, robots.ts.
- Tests: Vitest+RTL (unit), Playwright (E2E smoke contracts listed in testing-plan).
- CI: GitHub Actions; husky pre-commit (lint-staged + typecheck + test).

## Issues found & treatment

| Issue | Evidence | Treatment |
|---|---|---|
| Duplicated background rendering | `DarkBackground.tsx` vs `Hero.tsx:51–82` same gradient/grain/vignette twice | Both deleted; body = plain token background |
| Dead theme system | `ThemeProvider.tsx` persists `portfolio-theme`, no toggle anywhere; light palette broken by hardcoded white classes | Deleted provider + `[data-theme]` CSS + `suppressHydrationWarning` |
| Parallax re-render churn | `useMouseParallax` setState per rAF on mousemove in two components | Hook deleted with its consumers |
| Render-blocking map CSS | `import 'leaflet/dist/leaflet.css'` in root layout though map is lazy (`ssr:false`) | Moved into `MapView.tsx` (allowed per bundled docs: external package CSS may be imported anywhere in `app/`) |
| Unused font payload | Fraunces 5 weights, used only for a handful of headings | Removed from layout; display styles use Geist |
| Scroll-jack section sizing math | `Projects.tsx` height `calc(100vh + Nvw)`, transform track | Component rewritten; framer scroll transforms dropped |
| `alert()` error UX | `Contact.tsx:67–70` | Inline alert region |
| Stray artifact file | tracked file literally named `et --hard HEAD@{0}` | Flagged for manual removal (git-tracked; deletion is safe but kept out of design scope — removed in this pass via `git rm`) |
| Mixed container widths | max-w-[1120px]/[1280px]/[1440px]/6xl across sections | Standardized: `--container: 1280px` + section padding scale |

## Type-safety

All edits keep strict TS; no new `any`. Component prop interfaces preserved where
components were restyled rather than rewritten (`ProjectCaseStudy`, `SkillGroup`,
`TimelineEntry`, `Service`, `BlogPost`). Removed exports checked against all importers.

## Performance budget effect (estimated)

- − Fraunces (≈3 font files shipped of 5 weights subset)
- − leaflet.css from critical path (≈14KB gz) until map mounts
- − DarkBackground/Hero duplicate layer stack compositing
- − parallax mousemove listeners + state churn
- − ~28 lucide icon imports in Skills registry (tree-shaken, but smaller module graph)
- + one `<Image priority>` LCP (hero portrait) reused as About visual source removal
