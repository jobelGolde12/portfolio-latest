# Changelog — Editorial Redesign (Aug 23, 2026)

Design-language pivot per `TODO.md` + `modern-and-polish.md`: dark cinematic theme
→ white editorial, typography-led canvas. All E2E contracts preserved.

---

# Round 4 — Project cards simplification + ship (Aug 23, 2026)

Scope: TODO.md §38. Simplified project cards, corrected TaskMind/Suitora
positioning, audited all projects, full git workflow.

## Changed

- `data/projects.ts` — rewritten as a minimal `Project` model (slug, title,
  tagline, description, image, links, embeddable). Stack tags and the
  problem/approach/trade-offs/outcomes case-study fields removed with their UI.
  TaskMind repositioned as a decision & action clarity tool; Suitora
  repositioned as an AI fashion assistant ("Know if it suits you before you
  buy."); Dugtong tightened; order set Profanity → Suitora → TrailMates →
  TaskMind → Dugtong.
- `components/Projects.tsx` — dialog and all case-study elements removed;
  server component again. Cards: tagline label, name, short description,
  primary CTA (Live demo / View source), secondary Source link.
- `components/ProjectPreview.tsx` — repurposed as inline card media: screenshot
  default + always-visible Live preview toggle for embeddable projects,
  mount-on-click iframe, 15s honest fallback. Fixed lazy-loading false timeout.
- `e2e/smoke.spec.ts` — dialog test replaced by card/CTA assertions.

## Verification (Round 4)

lint ✅ · typecheck ✅ · unit tests 16/16 ✅ · production build ✅ · e2e 4/4 ✅ ·
browser regression at 1280px & 375px ✓

---

# Round 3 — Quality & preview pass (Aug 23, 2026)

Scope: TODO.md §38. Skills cleanup, responsive + functional audits, live project
previews, hero interaction, AA contrast, anchor offsets.

## Changed

- `components/Skills.tsx` — decorative proficiency dots removed; name-only chips
  with native `title` tooltip carrying the honest level. Header copy updated.
- `app/globals.css` — contrast fixes (`text-tertiary` #777777→#6B6B6B,
  `text-faint` #A0A0A0→#767676, both now AA on white); `section[id]`
  scroll-margin-top 4.5rem (fixed-header-safe anchors); new `.hero-portrait`
  CSS-only hover settle (pointer-fine only, transform-only, reduced-motion safe).
- `components/Hero.tsx` — portrait uses `.hero-portrait`.
- `data/projects.ts` — `embeddable` flag from header probe (profanity API +
  TrailMates true; TaskMind/Suitora send `frame-ancestors 'none'` and are never
  iframed).
- `components/ProjectPreview.tsx` — NEW: dialog media defaults to the **live
  embedded site** where embeddable (Screenshot tab as secondary), explicit view
  labeling, lazy iframe mounting inside the dialog only, 15s timeout → honest
  fallback with direct link. Non-embeddable projects (TaskMind, Suitora send
  `frame-ancestors 'none'`) and demo-less projects (Dugtong) show labeled
  screenshots with prominent demo/source actions — never bypassed.
- `components/Projects.tsx` — dialog uses ProjectPreview.

## Audits

- Responsive: no horizontal overflow at 320/375/390/430/768/1024/1280/1440/1920,
  landscape checks, touch targets ≥24px at 320px (skip-link exempt), via
  browser automation against the production build.
- Functional: all GitHub repos, demo sites, Formspree (POST-only), maps and OSM
  links verified; mobile nav + case-study dialogs open/close; live preview tab
  loads the real site in-dialog.

## Deferred

- LinkedIn profile click-through (CLI gets LinkedIn's standard bot-block).

## Verification (Round 3)

lint ✅ · typecheck ✅ · unit tests 16/16 ✅ · production build ✅ · e2e 4/4 ✅

---

# Round 2 — Brand follow-ups (Aug 23, 2026)

Follow-up tasks added to `TODO.md` §37 and executed.

## F1 — OG image regenerated (done)

- Rewrote `scripts/generate-og.mjs` for the light editorial brand: white canvas,
  hairline frame, eyebrow label ("Software engineer · Full-stack"), "Jobel Golde."
  display type, value line, single rose `#D96C92` rule, mono stack + location.
- Ran `npm run generate:og` → `public/og-default.png` now 1200×630 (~39KB),
  replacing the dark/violet card. Shared-link previews match the site.
- Fixed the unused-token lint warning introduced by the rewrite; lint clean.

## F2 — Résumé refreshed to editorial brand (done)

- Updated `scripts/generate-resume.mjs` palette: retired #0A0B0D/#7C5CFF/#5C636E
  → ink `#111111`, text `#171717`/`#555555`, hairlines `#E8E8E8`, single rose
  accent rule under the header. Rose no longer used for section titles or tech
  labels (contrast + restraint).
- Rewrote the summary from "Passionate full-stack developer…" to the authentic
  positioning used across the site. All factual content (phone, email, links,
  project list, education) untouched per TODO §18/§35.
- Regenerated `public/jobel-golde-resume.pdf` — one page (verified via pdfinfo).

## F3/F4 — Documented as requiring human input

- F3: project screenshot re-capture needs visual QA against live third-party
  sites; exact capture spec written into `TODO.md` §37-F3.
- F4: placeholder résumé replacement awaits the real authored file.

## Verification (Round 2)

lint ✅ · typecheck ✅ · unit tests 16/16 ✅ · production build ✅ ·
e2e smoke 4/4 ✅ · og-default.png regenerated ✅ · resume PDF regenerated (1 page) ✅

---

# Round 1 — Main redesign

## Verification

| Check | Result |
|---|---|
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run typecheck` | ✅ |
| `npm test` | ✅ 16/16 |
| `npm run build` | ✅ 11 static routes |
| `npx playwright test` | ✅ 4/4 |

## Deleted

- `components/ThemeProvider.tsx` — dead infra; no toggle existed and hardcoded
  `text-white` broke the light path. Single light theme now.
- `components/DarkBackground.tsx`, `components/AnimatedBackground.tsx` — gradient
  blobs / grain / glows forbidden by the reference.
- `lib/useMouseParallax.ts` — parallax forbidden.
- `components/Testimonials.tsx`, `data/testimonials.ts` — fabricated quotes
  (TODO §7 forbids fake social proof).
- `public/me2.webp` — unused duplicate portrait.
- Stray tracked file literally named `` et --hard HEAD@{0} ``.

## Tokens (`app/globals.css`)

- Full editorial light palette: `bg-base #FFFFFF`, `ink #111111`, text ramp
  (#171717/#555555/#777777/#A0A0A0), hairline borders, accent rose `#D96C92`
  (decorative only), AA success/warning/danger.
- Removed `--color-dark*`, `--color-accent-signal-text/-dim`; added
  `text-faint`, `accent-soft`, `bg-overlay`.
- Radii 2/4/6px; shadows near-none; `--text-display` clamp(3rem→6.75rem);
  `.editorial-label` / `.editorial-link` utilities; code blocks lightened;
  reduced-motion kill-switch retained.

## Rewritten

- **`app/layout.tsx`** — Fraunces removed (all-Geist); global leaflet.css import
  moved out of the document head into MapView; `viewport` export added.
- **`app/globals.css`** — token overhaul above.
- **`components/Shell.tsx`** — providers/backgrounds stripped; skip link restyled.
- **`components/Navbar.tsx`** — quiet fixed white header (h-14), small wordmark,
  13px links w/ section-active state, ⌘K, GitHub icon, dark Contact CTA, mobile
  dialog preserved (Escape + focus restore). Hide-on-scroll removed (constant
  access beats novelty).
- **`components/Hero.tsx`** — eyebrow · huge thin "Jobel Golde." display headline ·
  value line with rotating specialization (reduced-motion aware) · location line ·
  one dark CTA + one text link · stack tags · portrait `profile.webp` right with
  single −1.25° rotation. Glows/grain/parallax/empty badge divs gone.
- **`components/About.tsx`** — dvh storytelling → flat label/statement grid +
  detail rows; blob-morph portrait removed; lazy MapView kept.
- **`components/Skills.tsx`** — icon-map (28 lucide imports) dropped for editorial
  index rows; honest proficiency dots kept with aria-labels.
- **`components/Projects.tsx`** — scroll-jack (~357vw) → vertical alternating
  rows with media wells; case-study dialog intact ("The problem", "Trade-offs",
  links, Escape); visible demo/source links on every row; first image priority.
- **`components/Timeline.tsx`** — scroll-linked glowing spine → year-gutter rows;
  blur/scale/glow animations removed.
- **`components/Services.tsx`** — glass cards → numbered hairline rows (server
  component).
- **`components/Contact.tsx`** — light form; `alert()` errors → inline
  `role="alert"` region + `aria-live="polite"` status; résumé download link;
  Formspree/copy-email/socials intact; square inputs, dark submit.
- **`components/Footer.tsx`** — light hairline footer; false "Systems operational"
  badge removed; BackToTop kept.
- **`components/MapView.tsx`** — imports `leaflet/dist/leaflet.css` locally
  (~30KB CSS off the critical path of every page); ink marker w/ rose ring;
  light caption bar.
- **UI primitives** — `button` (ink primary, min-h touch targets),
  `input`/`textarea` (white surfaces, ink focus), `pill`, `tag`, `dialog`
  (DARK_DIALOG_VARS removed — inherits light theme), `SectionHeading`,
  `BackToTop`.

## Pages

- **`app/page.tsx`** — Testimonials removed; order now Hero→About→Skills→
  **Projects→Services**→Timeline→Contact→Footer (proof before pitch).
- **`app/blog/page.tsx`** — glass cards → editorial index rows; h1 kept as exact
  `"Blog"` to satisfy the e2e contract.
- **`app/blog/[slug]/page.tsx`** — de-darked; light code blocks.
- **`app/not-found.tsx`, `app/error.tsx`** — glow gradients removed; editorial
  type scale; ink CTAs.

## Tests updated (token contracts only)

- `components/ui/button.test.tsx` — `bg-accent-signal` → `bg-ink`;
  size-lg `h-12` → `min-h-12`. No behavioral assertions changed.

## Deferred

- Regenerate `public/og-default.png` (`node scripts/generate-og.mjs`) — still
  shows dark design.
- Replace placeholder résumé PDF with the real file.
- Re-capture project screenshots against the light theme.
