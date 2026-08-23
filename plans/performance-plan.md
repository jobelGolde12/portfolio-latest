# Performance Plan

## Removed cost

| Item | Effect |
|---|---|
| Fraunces (Google font, 5 weights declared) | Fewer font requests/bytes; Geist already self-hosted via `geist` package |
| `leaflet/dist/leaflet.css` in root layout | ~14KB CSS off the critical path; now imported inside the `ssr:false` dynamic `MapView` |
| `DarkBackground` + `AnimatedBackground` + hero duplicate layer stack | Fewer fixed composited layers, no infinite blob animation |
| Mouse parallax hook (2 consumers) | No mousemove-driven re-renders |
| Scroll-jacked Projects (`useScroll`+`useTransform`, height ≈ 100vh+357vw) | Massive scroll-paint reduction; shorter page |
| Per-skill lucide icon registry (~28 imports) | Smaller module graph |
| Timeline per-item scroll listeners/blur filters | Blur filters are GPU-expensive; removed |

## Kept / improved

- `next/image` everywhere: hero portrait `priority` + `sizes`; project images lazy with
  explicit `sizes`; AVIF/WebP negotiation in `next.config.ts`.
- Server components where possible: Services/Footer/blog pages remain server components;
  client islands limited to interactivity (Reveal wrapper, dialogs, palette, nav, form).
- Fonts: `display: swap`, self-hosted Geist Sans/Mono.
- Images optimized already (WebP ≤76KB); hero uses existing 233KB portrait — acceptable
  LCP at priority preload; flagged as optional future re-compress.

## Verification

- `npm run build` route table (static pages, first-load JS) recorded in changelog.
- No layout shift: media boxes use aspect ratios; fonts swap with matched metrics
  fallbacks; no injected banners.
