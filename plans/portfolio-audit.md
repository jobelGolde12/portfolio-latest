# Portfolio Audit — Pre-Redesign State

**Audited:** August 23, 2026 · Commit `723dd81` ("Add audit") + untracked `modern-and-polish.md`

## Current state (summary)

Next.js 16.2.1 App Router · React 19 · TS strict · Tailwind v4 (`@theme inline` tokens) ·
framer-motion 12 · Leaflet (react-leaflet, lazy) · lucide-react · Geist Sans/Mono + Fraunces.
Single page (`app/page.tsx`) composing Hero → About → Skills → Services → Projects →
Timeline → Testimonials → Contact → Footer, plus `/blog`, 404/error pages, command palette.

The engineering baseline is healthy after the Aug-10 audit round: strict TS with zero
errors, unit + E2E tests, CI, SEO metadata/JSON-LD/sitemap/robots, case-study dialogs,
accessible `Dialog` primitive with focus trap.

The **visual language, however, directly contradicts the mandatory design reference**
(`modern-and-polish.md`) and several content rules in `TODO.md`.

## Strengths (preserve)

1. **Real design-token system** — `app/globals.css` defines colors/type-ramp/spacing/motion
   consumed via Tailwind theme mapping; components rarely hardcode hex.
2. **Accessible dialog primitive** — `components/ui/dialog.tsx`: focus trap, Escape,
   restore focus, `aria-modal`, labelled (`ariaLabel`).
3. **Case-study data model** — `data/projects.ts` has problem/approach/tradeoffs/outcomes;
   `ProjectDialog` renders it accessibly.
4. **Centralized config** — `lib/seo.ts` single source for nav/social/site metadata;
   JSON-LD (`components/JsonLd.tsx`), sitemap, robots all wired.
5. **Honest skill levels** — `data/skills.ts` proficiency dots with `LEVEL_LABELS`
   aria-labels; "Currently exploring" group signals honesty.
6. **Working contact form** — Formspree integration with loading/success states
   (`components/Contact.tsx`).
7. **Command palette** (⌘K) — real functionality incl. working resume download.
8. **Blog** — 3 SSG posts with structured blocks, per-post metadata, sitemap inclusion.
9. **Reduced-motion respected** in most animated components.
10. **Tests** — Vitest/RTL unit tests + Playwright smoke suite that encode UX contracts.

## Weaknesses / Problems (evidence)

### Design-system conflicts vs `modern-and-polish.md` (P0)

| Spec says | Codebase does |
|---|---|
| Nearly pure white canvas | Dark cinematic base `#0A0B0D`; fixed gradient+grain+vignette layers (`DarkBackground.tsx`), hero re-implements them again (`Hero.tsx:51–82`) |
| Minimal borders/decorative UI, almost no shadow | Glass pills everywhere: `rounded-full … backdrop-blur-md border` navbar (`Navbar.tsx:120`), pill CTAs with glow shadows (`Hero.tsx:176`), glass cards (`Skills.tsx:211–231`, `Testimonials.tsx:21`) |
| Radius 0–4px, "prefer square geometry" | `--radius-full`/`rounded-2xl`/`rounded-3xl` across buttons, cards, inputs, images |
| Restrained accent, tiny doses | Saturated purple `#7C5CFF` on progress bar, badges, timeline glow pulses, marker glow |
| No floating blobs / background animation | `AnimatedBackground.tsx` animating blurred blob forever |
| Quiet editorial motion; no parallax-everything | Mouse parallax on hero spotlight + portrait (`Hero.tsx:57–62, 222`), morphing blob-border portrait loop (`About.tsx:104–122`), blur/scale/glow timeline nodes (`Timeline.tsx`) |
| Typography-led hero: huge thin headline, intentional breaks | Hero H1 = name only at `clamp(3.5rem…)`; value prop buried in rotating widget; empty leftover status-badge motion.div (`Hero.tsx:90–97`) |

### Credibility / content (P0)

- **Fabricated testimonials.** `data/testimonials.ts` header literally says *"SAMPLE quotes…
  placeholder content — replace before going live"*. `TODO.md` §7 forbids fake testimonials
  and fake attributions ("Capstone Adviser", "Barangay Official" with no names).
- **"Systems operational" badge** in Footer (`Footer.tsx:69`) — meaningless stat-like claim.
- **Hero tech chips** duplicate the Skills section content (giant-list anti-pattern, mild).

### UX structure (P1)

- **Scroll-jacked horizontal Projects** (`Projects.tsx:244`): section height =
  `100vh + ~357vw`; recruiters must scrub a full screen-width carousel; hover-only
  "View case study" hint is invisible on touch; mobile gets 70vw cards.
- **About scroll-storytelling** (`About.tsx`): full-viewport intro screen + `mt-[70dvh]`,
  `mt-[60dvh]` margins — ~6 viewport-heights of scrolling for ~6 short blocks. Recruiters
  bounce before reaching Skills.
- **Section order**: Services sits between Skills and Projects, interrupting the
  proof-of-work flow; Testimonials (fake) sits before Contact.
- Duplicate portraits: hero (`me2.webp`) + About (`profile.webp`).

### Technical debt (P1/P2)

- **Dead infrastructure:** `ThemeProvider` ships/persists a light theme no UI exposes, and
  the palette is broken anyway because components hardcode `text-white`,
  `bg-white/[0.02]`, `border-white/[0.06]` (~30+ occurrences). `DarkBackground` +
  `AnimatedBackground` exist only to paint the dark canvas.
- **Empty motion.div** `Hero.tsx:90–97`.
- **Fraunces font loaded (5 weights)** but used only by `--font-display` headings;
  spec's preferred typefaces are grotesks (Geist qualifies).
- **leaflet.css imported globally** in root layout (`layout.tsx:5`) — render-blocking CSS
  for every visitor although the map is far below the fold and dynamically imported.
- **`alert()` for form errors** (`Contact.tsx:67,70`) — jarring, unstyled, poor a11y.
- **Scroll-progress bar** fixed at top in accent color (`Navbar.tsx:102–107`) — decorative.
- Stray tracked file `et --hard HEAD@{0}` (git-command typo artifact) in repo root.
- `me2.webp` becomes unused after redesign.

### Accessibility (P2)

- Contrast failures: `text-white/40`, `/50`, `/60`, `/25` meta text throughout Hero/About/
  Timeline/Contact on near-black bg (< 4.5:1). Fixed wholesale by palette swap + sweep.
- `text-white/30` separators fine (decorative), but labels using them are not.
- Touch targets: some 9×9 icon buttons (36px) below 44px guidance.

### SEO (ok, minor)

Metadata/OG/Twitter/canonical/JSON-LD/sitemap/robots all present and correct.
Missing: `themeColor`/viewport export; OG image exists (`og-default.png`, 97KB ✓).

## Missing features (from TODO §6)

- Résumé download visible in primary UI (currently only inside ⌘K palette).
- Clear "what I build / target role" statement in hero copy.
- Direct demo/repo links on project listing (locked behind dialog today).
