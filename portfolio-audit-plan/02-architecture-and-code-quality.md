# 02 — Architecture & Code Quality

**Pillar score: 6.5 / 10**

The architecture is a textbook single-page-portfolio layout: one section component per page region, a `components/ui/` primitive layer, centralized config in `lib/seo.ts`, and a token-driven design system. TypeScript strictness is excellent (zero `any`, zero type errors). The deductions come from dead code, duplicated logic/data, undefined tokens being consumed as classes, and a theme system that no longer has a user-facing toggle.

---

## Section 1: Folder Structure & Organization

### Current State

```
app/            layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts
components/     Section components (Hero, About, Skills, Services, Projects, Timeline, Contact, Footer, Navbar)
                App chrome (Shell, CommandPalette, MapView, JsonLd, ThemeProvider, DarkBackground, AnimatedBackground)
components/ui/  Primitives (button, input, textarea, badge, tag, pill, card, dialog, tooltip)
lib/            seo.ts, utils.ts
public/         Logo, portraits, project screenshots + leftover create-next-app SVGs
docs/           ROADMAP.md, AUDIT_REPORT.md
```

### Assessment

- [x] **Good:** Clear separation — section components, UI primitives, config, and app shell are distinct layers.
- [x] **Good:** `@/` path alias keeps imports clean (`@/components/...`, `@/lib/...`).
- [x] **Good:** Presentational data lives next to components (e.g., `projects`, `services`, `skillGroups` as module-level consts) — readable for a single-page site.
- [ ] **Fix:** Introduce a `data/` or `content/` directory for portfolio content (projects, timeline, services, skills) so content is editable without touching component code and can later feed a CMS or MDX.
- [ ] **Fix:** Move `lib/seo.ts` constants usage into a single source of truth (see Section 3 — duplicated `navLinks`/`socialLinks`).
- [ ] **Fix:** Remove unused files from `public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` — create-next-app leftovers) and the unused `public/images/project_lost_and_found.png`.
- [ ] **Fix:** Refresh `docs/AUDIT_REPORT.md` (describes the pre-refactor codebase: Manrope font, `#1E1B20` palette) or archive it — stale docs are actively misleading.
- [ ] **Fix:** Decide the fate of `.mimocode/plans/` and `info.md` (personal resume data committed to the repo — see 05).

---

## Section 2: Code Smells & Anti-Patterns Identified

### 2.1 🚨 Undefined token classes compile to nothing (silent rendering bugs)

`globals.css` defines `--color-bg-base/surface/surface-2/overlay`, but **never** `--color-dark` or `--color-dark-light`. Tailwind v4 does not generate unknown utilities, so these classes silently apply no background.

**Current Code (Flaw) — `components/ui/input.tsx` & `components/ui/textarea.tsx`:**
```tsx
className={cn(
  'w-full rounded-md border border-border-subtle bg-dark-light px-4 py-3 ...',
```
**Current Code (Flaw) — `components/Contact.tsx`, `components/Footer.tsx`, `components/ui/card.tsx`:**
```tsx
className="flex items-center justify-center w-10 h-10 rounded-full bg-dark border border-border-subtle ..."
```

**Proposed Refactor (Best Practice):**
```css
/* globals.css — define the tokens once */
:root {
  --color-dark: #0A0B0D;        /* alias of bg-base */
  --color-dark-light: #141417;  /* subtle input surface */
}
```
```tsx
/* Then either: use the existing token (preferred, no alias needed) */
className="... bg-bg-surface-2 ..."
/* Or keep the alias for readability, but only after defining it */
className="... bg-dark-light ..."
```

- [ ] Add `--color-dark` and `--color-dark-light` to the `:root` + `@theme inline` block (or migrate call sites to `bg-bg-surface-2`).
- [ ] Verify the fix visually: the contact form inputs and social icon circles currently have transparent backgrounds.

### 2.2 Dead code & dead dependencies

Verified by import-graph search — these are never imported/used:

| Item | Evidence | Action |
|---|---|---|
| `components/TerminalArtifact.tsx` | only self-reference found | [ ] Delete or mount it in the About/Hero section |
| `components/ui/tooltip.tsx` | no importers | [ ] Delete, or adopt for social icons |
| `components/ui/card.tsx` | no importers | [ ] Delete, or adopt in Projects/Services |
| `Navbar` imports `Sun`, `Moon`, `useTheme`, `theme`, `toggleTheme` | theme toggle removed in commit `ecf1a0b` | [ ] Remove the imports + unused vars (fixes 4 lint warnings) |
| `TerminalArtifact` `currentLine`/`setCurrentLine` | unused state | [ ] Remove state (2 lint warnings) |
| `Contact` imports `Send` | unused | [ ] Remove import (1 lint warning) |
| `@fontsource/instrument-serif` | layout uses `next/font` `Fraunces` instead | [ ] Uninstall |
| `lenis` | no usage found | [ ] Uninstall or actually adopt smooth scrolling |
| `gh-pages` | no deploy script uses it | [ ] Uninstall or add a `deploy` script |
| `public/*.svg` (5 boilerplate files) | create-next-app leftovers | [ ] Delete |
| `ThemeProvider`'s `toggleTheme` + light palette | toggle removed; only `dark` is reachable | [ ] Either restore a toggle or strip the light theme |

### 2.3 Duplicated logic: the background is implemented three times

`Hero.tsx` (lines ~40–70) and `DarkBackground.tsx` are near-identical (base gradient, spotlight glow, grain, vignette, **and an identical `mousemove` parallax handler**). `AnimatedBackground.tsx` adds a third full-screen layer.

**Current Code (Flaw) — duplicated in `Hero.tsx` and `DarkBackground.tsx`:**
```tsx
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  setMousePosition({ x, y });
};
window.addEventListener('mousemove', handleMouseMove);
```

**Proposed Refactor (Best Practice) — extract a hook:**
```tsx
// lib/useMouseParallax.ts
export function useMouseParallax(amount = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 2 * amount,
          y: (e.clientY / window.innerHeight - 0.5) * 2 * amount,
        });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, [prefersReducedMotion, amount]);

  return offset;
}
```

- [ ] Extract `useMouseParallax` and use it in both `Hero` and `DarkBackground` (removes ~30 duplicated lines and one of the two window mousemove listeners).
- [ ] Consolidate the three background layers into one `Background` component (or `DarkBackground` owning all layers, `AnimatedBackground` deleted/merged) with a single `mousemove` listener.
- [ ] Gate `AnimatedBackground`'s infinite blob animation on `prefers-reduced-motion` (currently it is not gated — see 04).

### 2.4 Duplicated data: three nav sources, three social sources

- `lib/seo.ts` exports `NAV_LINKS` — **imported nowhere**.
- `Navbar.tsx` and `Footer.tsx` each define their own `navLinks` array (identical).
- `Contact.tsx` and `Footer.tsx` define their own `socialLinks`; `lib/seo.ts` `SOCIAL_LINKS` is used **only** by `JsonLd`.

**Current Code (Flaw):**
```tsx
// Navbar.tsx
const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  // ...
];
// Footer.tsx — the same array, re-typed
```

**Proposed Refactor (Best Practice) — one source of truth:**
```tsx
// lib/seo.ts (already exists!)
export const NAV_LINKS = [
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
] as const;
```
```tsx
// Navbar.tsx / Footer.tsx
import { NAV_LINKS } from '@/lib/seo';
const navLinks = NAV_LINKS;
```

- [ ] Make `Navbar` and `Footer` consume `NAV_LINKS` from `lib/seo.ts`.
- [ ] Make `Contact` and `Footer` consume `SOCIAL_LINKS` from `lib/seo.ts` (with a shared icon resolver map).

### 2.5 Duplicated animation variants & repeated section headers

`Services.tsx` and `Contact.tsx` define byte-identical `containerVariants`/`itemVariants`. `Hero`, `About`, `Skills`, `Services`, `Timeline`, and `Contact` each hand-roll a "label + heading + optional description" header block — the exact scenario `docs/ROADMAP.md` already proposed a `SectionHeading` for.

**Proposed Refactor (Best Practice):**
```tsx
// lib/motion.ts — shared variants
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;
export const fadeUpItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
} as const;
```
```tsx
// components/ui/SectionHeading.tsx
export function SectionHeading({ label, title, description }: {
  label: string; title: string; description?: string;
}) { /* single implementation of the label+heading pattern */ }
```

- [ ] Move shared variants to `lib/motion.ts`; import in `Services` and `Contact` (and later `Projects`).
- [ ] Extract `SectionHeading` and replace the 6 hand-rolled headers.

### 2.6 Semantic misuse: static content rendered as interactive controls

- `components/ui/pill.tsx` renders a `<button>` — but `About.tsx` uses `Pill` for **non-interactive** language/interest labels.
- `Skills.tsx` `SkillBadge` renders a `tabIndex={0}` span with `focus-visible` rings — focusable but does nothing on Enter/Space.

**Current Code (Flaw) — `components/ui/pill.tsx`:**
```tsx
const Pill = forwardRef<HTMLButtonElement, PillProps>(
  ({ className, active = false, ...props }, ref) => (
    <button ref={ref} className={cn('inline-flex items-center rounded-full ...')} {...props} />
  ),
);
```
**Current Code (Flaw) — `Skills.tsx`:**
```tsx
<motion.span role="listitem" tabIndex={0} aria-label={skill} ...>
```

**Proposed Refactor (Best Practice):**
```tsx
// Pill becomes a span by default; an optional `asButton`/`href` variant is opt-in
type PillProps = React.HTMLAttributes<HTMLSpanElement> & { asButton?: boolean };
const Pill = forwardRef<HTMLSpanElement, PillProps>(({ asButton, ...props }, ref) => (
  <span ref={ref} className={cn('inline-flex items-center rounded-full ...')} {...props} />
));
```
```tsx
// Skills.tsx — plain span, no tabIndex, no role
<motion.span className="...">...</motion.span>
```

- [ ] Change `Pill` to render a `<span>` (or add an `as` prop); update `About.tsx` usage.
- [ ] Remove `tabIndex={0}`, `role="listitem"`, and `focus-visible` classes from `SkillBadge` (a non-interactive badge must not enter the tab order).

### 2.7 Miscellaneous smells

- [ ] `Navbar` scroll effect lists `scrollDirection` in its dependency array — the listener is torn down/re-added on every direction change; move it out of deps (use a ref for direction).
- [ ] `Hero.tsx` runs `setIsMounted(true)` in an effect purely to gate the rotating text (also a lint error — see 2.8); replace with a `useSyncExternalStore`-free approach: render the rotating text only after hydration using a one-time `useState(() => ...)` where possible, or accept the server render as the fallback text.
- [ ] `Contact.tsx` uses `alert()` for form errors — replace with an inline error state (a11y + polish, see 04).
- [ ] `CommandPalette` re-computes `grouped` with `filtered.filter(...)` inside a loop (O(n²) for tiny n — trivial, but the `grouped`/`flatItems` bookkeeping is more complex than needed; consider `useMemo` on a single reduce).
- [ ] Inline `style={{ paddingBottom: '56.25%' }}` aspect-ratio hack in `ProjectCard` — migrate to Tailwind's `aspect-video` (Tailwind v4 supports `aspect-video` natively).
- [ ] `Projects.tsx` hardcodes `pl-[5vw]`, `gap-[2.5vw]`, `CARD_WIDTH_VW = 70` — extract to named config constants at the top (partially done) and document the math in a comment.

---

## Section 3: Type Safety & State Management

### 3.1 Type safety — strong

- [x] `strict: true`, `noEmit`, `moduleResolution: bundler`, `isolatedModules` — all correct for Next 16.
- [x] No `any` found; `Readonly<{ children: React.ReactNode }>` used for layout; `as const` used aggressively in `lib/seo.ts`.
- [x] `MotionValue<number>` is properly imported and typed in `Timeline.tsx`.
- [ ] **Add** `"noUncheckedIndexedAccess": true` and `"noUnusedLocals": true` to `tsconfig.json` — the second would have caught the 9 dead-import lint warnings at compile time.
- [ ] **Add** a `"typecheck": "tsc --noEmit"` script to `package.json` and make it part of CI (see 05).

### 3.2 State management — appropriate for scope

- [x] Local `useState` + `useCallback` per feature (palette open state in `Shell`, form state in `Contact`, scroll states in `Navbar`) — no global store needed at this size.
- [x] Derived state handled with `useMemo` (palette filtering/grouping).
- [ ] **Remove** the theme machinery: `ThemeProvider` + `useTheme` context is wired, persists `portfolio-theme` to `localStorage`, and ships a full light palette — but there is no toggle (removed). Either restore a toggle (small, see `docs/ROADMAP.md` P3) or delete the provider, `data-theme="light"` block, and the unused `Sun`/`Moon`/`toggleTheme` references. As-is it is dead state + dead CSS that still loads.
- [ ] **React 19 fix (4 lint errors):** the new `react-hooks/set-state-in-effect` rule flags synchronous `setState` inside effects in `Hero.tsx` (line 37), `CommandPalette.tsx` (lines 76, 81), and `ThemeProvider.tsx` (lines 32–35). Patterns to fix:
  - `Hero`: compute `isMounted` via a layout-safe `useState(false)` + `useEffect` is the current approach — instead gate the animation client-side with a single `const [mounted] = useState(() => typeof window !== 'undefined')` or use `useSyncExternalStore` for the media query.
  - `CommandPalette`: reset `selectedIndex`/`query` **during render** when `query`/`open` change (React 19 "derive state from props" pattern: `const [prevQuery, setPrevQuery] = useState(query); if (query !== prevQuery) { setPrevQuery(query); setSelectedIndex(0); }`) instead of in effects.
  - `ThemeProvider`: keep theme in `useState` but read `localStorage` inside the initializer (safe via `typeof window` guard) and only write to `localStorage` in the effect (writing is allowed — it's an external system sync).

### 3.3 Data flow sanity

- [x] Unidirectional and props-driven; no prop-drilling beyond 2 levels; `Shell` correctly owns palette open/close and passes one callback down.
- [x] No server/client data contracts yet (no API calls beyond Formspree) — nothing to validate.
- [ ] When case studies are added (see 06), type them strictly (`interface ProjectCaseStudy { slug; problem; approach; tradeoffs[]; outcomes[]; stack[]; links }`) and keep them in a `data/projects.ts` module so the type is the contract.

---

## Section 4: Actionable Architecture Refactoring Plan

Ordered so each step keeps the app green (build/lint/typecheck after each).

- [ ] **Step 1 — Hygiene sprint (S, ~1 hr):** delete dead files (`TerminalArtifact`, `ui/tooltip.tsx`, `ui/card.tsx`, boilerplate SVGs, unused `project_lost_and_found.png`); remove dead imports in `Navbar`, `Contact`, `TerminalArtifact`; uninstall `lenis`, `gh-pages`, `@fontsource/instrument-serif`. Run lint → expect 0 warnings.
- [ ] **Step 2 — Fix React 19 lint errors (S, ~1 hr):** rework the 4 `set-state-in-effect` sites per Section 3.2. Run `npm run lint` → expect 0 errors.
- [ ] **Step 3 — Fix undefined tokens (S, 30 min):** add `--color-dark` / `--color-dark-light` or migrate to `bg-bg-surface-2`; verify inputs/social circles visually.
- [ ] **Step 4 — Single sources of truth (S–M, ~2 hr):** `NAV_LINKS`/`SOCIAL_LINKS` from `lib/seo.ts`; shared `lib/motion.ts` variants; `SectionHeading`; `useMouseParallax` hook; consolidate backgrounds into one component.
- [ ] **Step 5 — Theme decision (S, 30 min):** restore a working toggle or delete `ThemeProvider` + light tokens (then remove `useTheme` from `Navbar`).
- [ ] **Step 6 — Type hardening (S, 30 min):** enable `noUnusedLocals` + `noUncheckedIndexedAccess`; add `typecheck` script; fix any new errors.
- [ ] **Step 7 — Content layer (M, ~3 hr):** extract `projects`, `timeline`, `services`, `skillGroups`, `aboutContent` into `data/` modules with strict interfaces; expand the `Project` type toward a case-study shape.
- [ ] **Step 8 — Component upgrades (M, ~3 hr):** replace `ProjectCard` aspect hack with `aspect-video`; add keyboard-visible focus styles to all `motion.a` CTAs; convert `Pill`/`SkillBadge` to non-interactive markup.
- [ ] **Step 9 — Server components (L, ~1 day):** audit which sections truly need `'use client'` (anything without motion/state can be a server component); at minimum move `JsonLd` and static sections out of the client bundle (see 03).
- [ ] **Step 10 — Docs refresh (S, ~1 hr):** rewrite `docs/AUDIT_REPORT.md` to match current code or archive it; update `docs/ROADMAP.md` checkboxes with this plan's outcomes.
