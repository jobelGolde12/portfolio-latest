# 04 — UX, Accessibility & Design

**Pillar score: 5.5 / 10**

The design direction is the strongest part of this portfolio: a disciplined dark editorial aesthetic (near-black surfaces, Geist + Fraunces, hairline borders, restrained violet accent `#7C5CFF`), consistent motion language (`cubic-bezier(0.16, 1, 0.3, 1)`, staggered reveals), and genuinely nice micro-interactions (timeline line that "paints" the nodes, skill badges with spring hover). Accessibility *intent* is present (skip link, focus rings, reduced-motion) but the execution has real WCAG 2.2 failures, mostly around contrast and focus semantics.

---

## Section 1: WCAG 2.2 Accessibility Audit

### 1.1 Contrast failures (WCAG 1.4.3 / 1.4.11) — highest-impact issue

Several small text elements use low-opacity white on near-black, falling below the 4.5:1 AA threshold for normal text:

| Location | Class | Approx. contrast vs `#0A0A0A` | Fails? |
|---|---|---|---|
| Hero location "Sorsogon, Philippines" | `text-white/30` | ~3.4:1 | ✅ (small text) |
| About section labels ("Education", "Based in", …) | `text-white/35` | ~3.9:1 | ✅ (11px uppercase) |
| Hero tech-stack chips | `text-white/30` | ~3.4:1 | ✅ |
| Timeline "organization" meta | `text-white/60` | ~6.5:1 | 🟢 OK |
| MapView "© OSM" footer | `text-white/25` | ~2.9:1 | ✅ (link — also 1.4.1) |
| Scroll indicators / decorative labels | `text-white/20` | ~2.3:1 | ✅ if content-bearing |

**Current Code (Flaw):**
```tsx
<span className="text-white/30 text-sm tracking-wide">Sorsogon, Philippines</span>
```

**Proposed Refactor (Best Practice) — use semantic tokens with verified contrast:**
```tsx
<span className="text-text-secondary text-sm tracking-wide">Sorsogon, Philippines</span>
```
(`--color-text-secondary: #9AA1AC` on `#0A0B0D` ≈ 7:1 — comfortably AA.)

- [ ] Replace `text-white/{20,25,30,35}` content-bearing text with `text-text-secondary` / `text-text-tertiary` tokens across Hero, About, Timeline, MapView, Skills.
- [ ] Audit with axe DevTools or Lighthouse after the pass; record results in `docs/ROADMAP.md`.
- [ ] Keep decorative-only whitespace/text at low opacity but ensure they are `aria-hidden` or truly non-content (they mostly are).

### 1.2 Non-interactive elements in the tab order (WCAG 2.4.7 / 2.4.3)

- [ ] `Skills.tsx` `SkillBadge` has `tabIndex={0}` + focus ring but no keyboard action — it should **not** be focusable (see 02 §2.6 for the refactor).
- [ ] `components/ui/pill.tsx` renders a `<button>` for static labels in `About.tsx` — screen readers announce them as buttons with no action. Convert to `<span>`.

### 1.3 Unlabelled command palette input (WCAG 1.3.1 / 3.3.2)

**Current Code (Flaw) — `components/CommandPalette.tsx`:**
```tsx
<input
  type="text"
  placeholder="Search sections, projects, actions..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  className="..."
  autoFocus
/>
```
**Proposed Refactor (Best Practice):**
```tsx
<label htmlFor="command-search" className="sr-only">Search sections, projects, actions</label>
<input
  id="command-search"
  type="text"
  placeholder="Search sections, projects, actions..."
  aria-label="Search sections, projects, actions"
  ...
/>
```

- [ ] Add an accessible name to the palette input (`aria-label` or visible sr-only label).
- [ ] Add `role="combobox"` + `aria-expanded`/`aria-activedescendant` semantics for a proper combobox pattern (the palette is keyboard-navigated, so this matters for AT users).

### 1.4 Dialog semantics (WCAG 4.1.2, 2.4.3)

- [x] `components/ui/dialog.tsx` implements a real focus trap, Escape-to-close, backdrop click-to-close, `role="dialog"` + `aria-modal="true"`, and focus restore — genuinely good.
- [ ] Missing `aria-labelledby`/`aria-label` on the `Dialog` — screen readers announce an unnamed dialog. Add `aria-label="Command palette"` when used from `CommandPalette`.
- [ ] The **mobile menu** in `Navbar.tsx` (`role="dialog" aria-modal="true"` without a focus trap) only handles Escape — Tab can escape the menu into the page behind it, and focus is not returned to the toggle on close. Either implement a real trap (reuse the `Dialog` component) or drop `role="dialog"` and treat it as an expanding disclosure (`aria-expanded` on the toggle is already present — the simplest compliant path).

### 1.5 Focus visibility gaps

- [x] `Button`, `Input`, `Textarea`, `Pill`, skill badges, project cards, and nav links define `focus-visible` rings — good.
- [ ] `motion.a` CTAs in `Hero` ("See projects", "Get in touch"), social icon links in `Contact`/`Footer`, and the "Let's talk" link in `Services` have **no** visible focus style. Add `focus-visible:ring-2 focus-visible:ring-accent-signal` (and `outline-none`).
- [ ] `Contact` copy-email button, "back to top" button: verify visible focus (currently rely on browser default — acceptable, but unify with the ring system).

### 1.6 Landmarks, headings & semantics

- [x] Single `<main id="main-content">` + skip link → good.
- [x] `aria-current="page"` on active nav links — present.
- [ ] `aria-current="page"` is arguably misused for *section* links on a single page (the page never changes); `aria-current="true"`/`aria-current="location"` is more accurate, or keep as-is — minor.
- [ ] `Projects` uses `aria-label="Projects"` on a `<section>` with no heading element — consider an sr-only `<h2>` for heading hierarchy consistency across sections.
- [ ] Hero `<section>` lacks `aria-labelledby`; the H1 is the page's only `h1` (good) — fine as-is, but consider `aria-labelledby` pointing at the H1.
- [ ] `MapView`'s Leaflet canvas is not keyboard-operable (drag disabled). Since the map is informational (not interactive), add `role="img"` + `aria-label="Map showing Sorsogon State University – Bulan Campus"` on the map container, or provide the location text (already present below) — acceptable either way, but document the choice.

### 1.7 Motion & vestibular safety (WCAG 2.3.3)

- [x] `Hero`, `Timeline`, `About`, `TerminalArtifact` respect `useReducedMotion`/`prefers-reduced-motion`.
- [x] Global CSS kills CSS animations/transitions under `prefers-reduced-motion: reduce`.
- [ ] `AnimatedBackground`'s infinite blob animation runs regardless of motion preference (JS-driven via Framer Motion, not covered by the CSS override) — gate it (see 03 §2.4).
- [ ] Auto-rotating hero specialization (3 s interval) stops under reduced motion — good; also pause on `document.hidden` to save battery (minor).

### 1.8 Forms & feedback

- [x] `Input`/`Textarea` have real `<label>` + `htmlFor`, `required` markers, and `aria-describedby` error wiring — strong.
- [ ] Error path uses `alert()` (`Contact.tsx` submit catch) — replace with an inline `role="alert"` region styled like the success state (also improves UX).
- [ ] Success state swaps the whole form for a confirmation panel — good; ensure focus moves to the confirmation heading when it appears.

---

## Section 2: Responsive & Mobile Behavior

- [x] Mobile-first breakpoints throughout; `grid-cols-1` → `lg:grid-cols-2` patterns; `clamp()` type scale adapts without media queries.
- [x] Navbar collapses to hamburger + palette icons on mobile; sticky hide-on-scroll works.
- [x] MapView heights scale (`h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]`).
- [x] About uses `100dvh` units (mobile URL-bar-safe) — nice attention to detail.

### 2.1 The horizontal Projects section is the top mobile UX risk

`Projects.tsx` converts vertical page scroll into horizontal card travel (`height: calc(100vh + 265vw)`). On mobile this is a very long pinned scroll region (~2.5× the viewport height of pure scroll-with-no-visible-vertical-progress), which reads as "dead scrolling" and can fail the "page feels stuck" heuristic.

**Proposed Refactor (Best Practice) — keep the effect on desktop, degrade on mobile:**
```tsx
// Option A: native horizontal scroll container on mobile
<div className="overflow-x-auto snap-x snap-mandatory md:overflow-hidden">
  <div className="flex gap-[2.5vw] pl-[5vw] snap-x">
    {projects.map((p) => <ProjectCard key={p.title} project={p} />)}
  </div>
</div>
```
```tsx
// Option B: keep scroll-pinning only on lg+ via a matchMedia/useMediaQuery gate
const isDesktop = useMediaQuery('(min-width: 1024px)'); // hook
// render pinned track only when isDesktop; otherwise the native-scroll variant
```

- [ ] Add a `useMediaQuery` gate so the pinned horizontal effect runs only ≥ 1024 px.
- [ ] On mobile, render a swipeable/snap container with visible scroll affordance (native `overflow-x-auto` + `snap` + scrollbar hints).
- [ ] Verify touch scroll performance (the `will-change-transform` + large `vw` travel is compositor-heavy on phones).

### 2.2 Other responsive nits

- [ ] Hero name uses `me-3` logical margin between "Jobel" and "Golde" — verify wrapping on narrow screens (it can break the two-word lockup awkwardly; consider `whitespace-nowrap` per word or a single line with smaller clamp).
- [ ] Timeline alternating left/right collapses to single column < `md` — good; confirm `pl-12` node alignment on very narrow screens (320 px).
- [ ] Command palette `max-h-[300px]` with 11+ items → scrollable — fine; add `overscroll-contain`.
- [ ] Footer 3-column grid → stacked on mobile — good; center alignment is handled.

---

## Section 3: UI Component Polish & Interaction Design

### 3.1 What's already excellent (keep it)

- [x] **Motion language:** one easing curve (`0.16, 1, 0.3, 1`) across sections = coherent brand feel.
- [x] **Timeline line-painting:** scroll progress literally fills the vertical line and "activates" nodes with a white glow — a memorable, on-brand interaction.
- [x] **Skill badges:** spring hover/tap, icon tint on group hover, staggered entrance — delightful without being distracting.
- [x] **Dialog polish:** 150 ms enter/exit, scale + y drift, dark-token enforcement even in a light theme.
- [x] **Contact micro-feedback:** spinner on submit, success swap panel, copy-to-clipboard button with "Copied!" state.

### 3.2 Consistency gaps

- [ ] **Section header duplication** — 6 hand-rolled header blocks; extract `SectionHeading` (02 §2.5) for consistent spacing/typography.
- [ ] **Font-size tokens vs hardcoded** — `style={{ fontSize: 'var(--text-3xl)' }}` (Services, Timeline, Contact) alongside raw `text-[clamp(...)]`/`text-4xl` (Hero, About) — pick one system. Prefer Tailwind's `text-3xl` after mapping `--text-*` into `@theme` as `--text-*` scale so `text-3xl` resolves to the clamp values.
- [ ] **`Pill` vs `Tag` vs `Badge` vs `Button`** — four small primitives with overlapping looks (`Pill`/`Tag` both render small rounded labels). Consolidate to one `Tag`/`Chip` component + the `Badge` status dot; document variants.
- [ ] **Hardcoded accent `#a78bfa`** in `Skills.tsx` fallbacks (`var(--color-accent,#a78bfa)`) vs the system accent `#7C5CFF` — the accent differs between Skills (violet-400-ish) and the rest (violet-500-ish). Unify on one accent token.

### 3.3 Micro-interactions worth adding (from `docs/ROADMAP.md`, already planned)

- [ ] Scroll progress indicator already implemented in Navbar (top bar) — mark ROADMAP P2 item done.
- [ ] Project thumbnails hover state: cards currently static images with a title overlay; add a subtle scale/parallax on hover and an "Open ↗" affordance that appears on hover/focus.
- [ ] Skill proficiency markers (years/dot-rating) — ROADMAP P1 item; makes skills section more honest and informative.
- [ ] Back-to-top exists in Footer — consider a floating FAB on mobile (ROADMAP P2).
- [ ] `Tooltip` exists but is unused — either adopt it for icon-only buttons (social icons, copy button) or delete (02 §2.2).

### 3.4 Visual QA checklist

- [ ] Verify the `mix-blend-multiply` portrait doesn't vanish on dark screens (03 §2.1).
- [ ] Check `bg-dark`/`bg-dark-light` impact: contact inputs and icon circles render transparent today (02 §2.1) — fix before final visual QA.
- [ ] Test at 320 px, 375 px, 768 px, 1024 px, 1440 px, and with 200% browser zoom (WCAG 1.4.4 — no horizontal overflow; `overflow-x-hidden` on body masks overflow — remove it after fixing the root causes and test again).
- [ ] Test with forced-colors/high-contrast mode (Windows) — accent and status colors should survive.
