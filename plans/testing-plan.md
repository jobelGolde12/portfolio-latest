# Testing Plan

## Commands (package.json — verified before running)

| Command | Expectation |
|---|---|
| `npm run lint` | 0 errors, 0 warnings |
| `npm run typecheck` | clean (`tsc --noEmit`) |
| `npm test` | Vitest suites pass |
| `npm run build` | production build succeeds; routes prerender |

## Unit tests (Vitest + RTL) — existing suites

- `components/ui/button.test.tsx`, `components/ui/dialog.test.tsx`,
  `components/CommandPalette.test.tsx`.
- Dialog/palette tests exercise focus trap + Escape + filtering → these must stay green
  after re-tokening (behavior untouched).
- No suite referenced deleted components (ThemeProvider/Testimonials verified untested).

## E2E contracts (Playwright `e2e/smoke.spec.ts`) preserved by design

1. `/` h1 contains "Jobel"; exact text "Sorsogon, Philippines" visible; zero console errors.
2. Button "Open case study: Profanity Detection API" opens dialog named
   "… case study" containing "The problem", "Trade-offs", links "Visit live site" and
   "View source"; Escape closes.
3. `/blog` lists posts; post route renders heading + section text.
4. 375×667: menu button "Open navigation menu" opens dialog labelled
   "Navigation menu"; Escape closes.

All four contracts were explicitly kept stable while restyling (aria labels, roles,
copy unchanged where tests depend on them).

## Manual QA checklist executed

- Keyboard-only pass: skip link → nav → palette (⌘K/arrow/enter/esc) → project dialogs →
  form submit states → back-to-top.
- Visual pass at 320/375/768/1024/1440 widths: no horizontal scroll; hero stacks
  text-first; project rows alternate correctly.
- Reduced-motion emulation: no rotation widget loop; reveals appear instantly.
