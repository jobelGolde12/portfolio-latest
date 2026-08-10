# 01 — Executive Summary & Ratings

> **STATUS UPDATE (Aug 10, 2026):** All P0–P2 follow-ups are implemented and verified — lint 0/0, `typecheck` + `build` green, 16 unit tests (Vitest + RTL), CI (GitHub Actions), README rewritten, resume download + OG image + `bg-dark`/`bg-dark-light` tokens fixed, dead code removed, images → WebP (~3.8 MB → ~560 KB). Second round: **case-study dialogs** (`data/projects.ts` + accessible `ProjectDialog`), **a11y hardening** (contrast tokens, `Pill`→span, de-focused badges, labeled palette input, focus-visible rings, `Dialog` aria-label), **shared data/hooks** (`NAV_LINKS`/`SOCIAL_LINKS` single source, `useMouseParallax`, `lib/motion.ts` variants, `SectionHeading`), **blog** (3 SSG posts at `/blog` + sitemap), and **husky pre-commit hooks** (lint-staged + typecheck + test). Third round: **Playwright E2E** (config + 4 smoke tests covering homepage/dialog/blog/mobile, `test:e2e` script, CI job with `playwright install --with-deps chromium`), **testimonials** section (placeholder data clearly flagged for replacement), **server-component refactor** (Services + Footer → server components with a `Reveal` client island), **skill proficiency** dot ratings (a11y-labeled), **404 + error boundary** pages, and **BackToTop**. Verified: lint 0/0, typecheck clean, 16/16 unit tests, 4/4 E2E, production build OK. Remaining: replace the generated resume PDF with the real one (drop your file at `public/jobel-golde-resume.pdf`).

**Project:** Jobel V. Golde — Portfolio (`jobelgolde.dev`)
**Audited:** August 10, 2026
**Stack:** Next.js 16.2.1 (Turbopack) · React 19.2.4 · TypeScript 5 (strict) · Tailwind CSS v4 · Framer Motion 12 · Leaflet/react-leaflet · Lucide Icons
**Repo state:** 41 commits, single author, clean working tree · production build ✅ · `tsc --noEmit` ✅ (0 errors) · ESLint ❌ (4 errors, 9 warnings)

---

## Overall Score Card

| Pillar | Score (1–10) | Short Justification |
|---|---|---|
| Codebase Architecture & Software Design | **6.5** | Clean section-per-component structure, strict TS with zero `any`, strong design-token system in `globals.css`. Dragged down by dead code (`TerminalArtifact`, `Tooltip`, `Card`), duplicated background/animation logic, unused deps, and undefined token classes (`bg-dark`, `bg-dark-light`). |
| Modern Web Engineering & Performance (2026) | **8.0** | Cutting-edge stack: Next 16 + Turbopack, React 19, Tailwind v4, `next/image` with `sizes`/`priority`, AVIF/WebP formats, `next/font` self-hosted fonts, lazy-loaded Leaflet. Dragged down by an all-client component tree (no server components), heavy raw PNG assets (up to 1.3 MB), and unbounded mousemove re-renders. |
| UX & Accessibility (WCAG 2.2) | **5.5** | Visually strong, tasteful motion, skip link, focus-visible rings, reduced-motion handling in most components. Fails on contrast (white/25–35 text), non-interactive elements made focusable/button-like (`Pill`, `SkillBadge`), unlabelled palette input, incomplete mobile-menu dialog semantics, and a Leaflet map with no keyboard path. |
| Security, Testing & DevOps | **4.0** | No secrets committed, `rel="noopener noreferrer"` everywhere, `dangerouslySetInnerHTML` used only with static JSON-LD data. But: **zero tests, zero CI, zero Prettier**, 4 lint errors, no `typecheck` script, no git hooks, stale audit docs. |
| Portfolio & Presentation / Hiring Readiness | **4.5** | Excellent visual identity + genuinely strong `docs/ROADMAP.md`. But: **README is untouched `create-next-app` boilerplate**, projects are a gallery with no case studies, the "Download resume" command does nothing, the OG image is missing (broken social shares), and `info.md` with personal data is committed. |

## Overall Weighted Portfolio Rating: **5.8 / 10**

Weighting: Architecture 25% · Modern Standards 20% · UX/A11y 20% · DevOps 15% · Hiring Readiness 20%

> **The headline:** this is an *above-average student portfolio visually* with a genuinely modern stack — but it is being held back by presentation-layer and engineering-hygiene issues that are cheap to fix and would move the rating to 7.5+. None of the fixes below require redesigning the site.

---

## Top Strengths

1. **Modern 2026 stack, used correctly.** Next.js 16 + Turbopack, React 19, Tailwind v4 with `@theme inline` token mapping, `next/font` (Geist + Fraunces, zero CLS), `next/image` with `fill`/`sizes`/`priority` on the LCP portrait, AVIF/WebP formats configured, Leaflet dynamically imported with `ssr: false`. This is exactly what a 2026 hiring manager wants to see in a code sample.
2. **Clean, disciplined TypeScript.** `strict: true`, no `any` anywhere, `tsc --noEmit` passes 100%, well-typed interfaces (`Project`, `TimelineEntry`, `CommandItem`), typed `Variants` from framer-motion.
3. **A real design system, not ad-hoc classes.** `globals.css` defines a full token layer (colors, type ramp via `clamp()`, spacing, radius, elevation, motion easing, reduced-motion overrides) and components mostly consume tokens via `text-accent-signal`, `bg-bg-surface-2`, etc. plus a shared `cn()` utility.
4. **Strong SEO groundwork.** Centralized `lib/seo.ts`, full metadata (OG, Twitter, canonical, robots), `sitemap.ts`, `robots.ts`, and a three-schema JSON-LD block (Person/WebSite/Organization).
5. **Thoughtful accessibility intent.** Skip link, `aria-current` nav states, focus trap + Escape handling in the `Dialog`, `prefers-reduced-motion` respected in Hero/Timeline/TerminalArtifact, `aria-live` on the terminal, explicit labels on form fields.

---

## Critical Red Flags / Outdated Practices

1. **🚨 README is 100% boilerplate.** The single most visible file a recruiter opens is still the untouched `create-next-app` README. No project description, no live URL, no screenshots, no tech table, no setup notes.
2. **🚨 "Download resume" command silently does nothing.** `CommandPalette.tsx` line ~101: `action: () => { onClose(); }` — the palette advertises a resume that doesn't exist. A broken advertised feature is worse than no feature.
3. **🚨 Missing OG image + oversized assets.** `lib/seo.ts` references `/og-default.png` which does not exist in `public/` (every social share renders broken). The navbar logo is a 729 KB PNG; `project_trailmates.png` is 1.3 MB and `project_suitora.png` is 1.0 MB.
4. **🚨 Zero automated testing and zero CI/CD.** No test framework, no `test` script, no GitHub Actions, no pre-commit hooks, no Prettier. `npm run lint` exits with **4 errors** (React 19 `react-hooks/set-state-in-effect` in `Hero.tsx`, `CommandPalette.tsx` ×2, `ThemeProvider.tsx`) and 9 warnings (dead imports like `Sun`/`Moon`/`theme`/`toggleTheme` in `Navbar`).
5. **⚠️ Dead code & unused dependencies.** `TerminalArtifact.tsx`, `ui/tooltip.tsx`, `ui/card.tsx` are never imported; `@fontsource/instrument-serif`, `lenis`, `gh-pages` are installed but unused; `Navbar` still imports `useTheme` from a theme system whose toggle was removed; `lib/seo.ts` exports `NAV_LINKS` that nothing uses.
6. **⚠️ Undefined utility classes = silent rendering bugs.** `bg-dark` (Contact, Footer, Card) and `bg-dark-light` (Input, Textarea) reference tokens that don't exist in `globals.css` — in Tailwind v4 these compile to nothing, so the form fields and icon circles have **no background**.
7. **⚠️ Light theme is dead infrastructure.** `ThemeProvider` ships a full light palette and persists `portfolio-theme` to `localStorage`, but the toggle was removed (`Remove toggle theme feature` commit) — dead state + dead CSS that still ships.
8. **⚠️ Gallery, not case studies.** Project cards are screenshot + title + external link. No problem statements, technical trade-offs, architecture decisions, or outcomes — the #1 portfolio anti-pattern for hiring.
9. **⚠️ Contrast failures throughout.** `text-white/25`, `/30`, `/35` on near-black backgrounds (hero location, about labels, timeline meta, OSM footer) fall well below WCAG AA 4.5:1 for the small text sizes used.
10. **⚠️ Stale internal docs.** `docs/AUDIT_REPORT.md` describes an *older* codebase (Manrope, `#1E1B20` palette) that no longer matches the repo — misleading for anyone reading it.

---

## High-Level Roadmap (Priority Order)

| # | Priority | Initiative | Effort | Impact |
|---|---|---|---|---|
| 1 | **P0** | Fix the 4 lint errors + clean 9 warnings; add `npm run typecheck`; wire Prettier | S | L |
| 2 | **P0** | Replace default README with a real portfolio README (live link, stack, screenshots, setup) | S | L |
| 3 | **P0** | Fix broken/missing items: resume command, `og-default.png`, `bg-dark`/`bg-dark-light` tokens | S | M |
| 4 | **P1** | Add CI: GitHub Actions running lint + typecheck + build on PR/push | S | M |
| 5 | **P1** | Add test suite: Vitest + React Testing Library for UI primitives, Playwright smoke E2E | M | L |
| 6 | **P1** | Compress images (logo → ~50 KB, project shots → WebP/AVIF ≤ 300 KB) via `next/image` quality + offline optimization | S | M |
| 7 | **P1** | Delete dead code & deps (`TerminalArtifact`, `Tooltip`, `Card`, unused imports, `lenis`, `gh-pages`, `@fontsource/instrument-serif`, boilerplate SVGs) | S | M |
| 8 | **P2** | Convert `Projects` to case-study cards: problem → approach → trade-off → outcome per project | M | L |
| 9 | **P2** | A11y pass: contrast fixes, de-focus static badges, label palette input, real focus trap in mobile menu | M | M |
| 10 | **P2** | Extract shared data/state: single `NAV_LINKS`/`SOCIAL_LINKS` source, shared `variants`, `SectionHeader`, `useMouseParallax` hook | M | M |
| 11 | **P3** | Introduce server components / content islands (data in MDX or a `content/` module) to shrink client JS | M | M |
| 12 | **P3** | Add the planned Blog section from `docs/ROADMAP.md` to demonstrate content architecture | L | M |

---

## How to Read the Remaining Files

- `02-architecture-and-code-quality.md` — structure, smells, type safety, refactoring plan
- `03-performance-and-modern-standards.md` — bundles, hydration, Web Vitals, asset pipeline
- `04-ux-accessibility-and-design.md` — WCAG 2.2 audit, responsiveness, interaction polish
- `05-security-testing-and-devops.md` — security posture, test strategy, CI/CD & repo hygiene
- `06-portfolio-presentation-and-narrative.md` — README, case studies, storytelling fixes

Every recommendation in those files is a checkable `- [ ]` item with **Current Code (Flaw)** vs. **Proposed Refactor (Best Practice)** snippets where applicable.
