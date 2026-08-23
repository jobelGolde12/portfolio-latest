# Responsive Plan

## Breakpoints (Tailwind defaults)

`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`

Conceptual audit points: 320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920.

## Strategy per region

- **Container:** `max-w-[1280px]` + `px-5 sm:px-8 lg:px-12` (20/32/48px gutters — spec
  §5). Body keeps `overflow-x-hidden` as a guard.
- **Header:** single row at all sizes; nav links hidden <md behind the existing labelled
  menu button; panel = flat bordered sheet below the bar. Touch targets ≥44px
  (`min-h-11` on mobile items).
- **Hero:** text-first stacking (spec §27): eyebrow → H1 → statement → CTAs → visual.
  H1 `clamp(3rem, 9vw, 6.75rem)` stays dominant on 320px; portrait drops to `max-w-[420px]`
  right-aligned with slight offset; rotation disabled under `md` to protect layout.
- **Project rows:** stacked media-over-text <lg; alternating two-column ≥lg
  (`grid lg:grid-cols-[1.1fr_1fr]`). Media wells keep a fixed aspect via `aspect-[16/10]`
  so no CLS at any width.
- **Skills rows:** stacked label/badges <md, `[8rem_1fr]` two-col ≥md; badges wrap.
- **Services:** one column list all sizes (numbered rows), no card grid collapse needed.
- **Timeline:** left year gutter collapses above content on mobile (`stacked` variant),
  hairline hidden <md where it would hug the edge.
- **Contact:** two columns ≥lg only; form fields full-width; submit ≥44px tall.
- **Footer:** stacks centered → left-aligned ≥md.

## Known constraints

- Project screenshots were captured dark (1364×593); they sit in neutral `#F8F8F6`
  media wells with hairline borders so they read as framed artifacts at every size.
- The Leaflet map has fixed heights (220→320px by breakpoint) inside About's right
  column; verified no overflow since the container clips (`overflow-hidden`).
