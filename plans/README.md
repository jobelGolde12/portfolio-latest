# Portfolio Redesign — Planning Directory

**Project:** Jobel V. Golde — Developer Portfolio (`jobelgolde.dev`)
**Trigger:** `TODO.md` — Senior Developer Portfolio Audit, Redesign & Implementation
**Mandatory design reference:** `modern-and-polish.md` (minimal editorial, white canvas, typography-led)
**Date:** August 23, 2026

## Context

A previous audit round (`portfolio-audit-plan/`, Aug 10 2026) fixed engineering hygiene:
lint errors, tests, CI, case-study dialogs, a11y hardening, image optimization. This round
is different: it is a **design-language pivot**. The site was rebuilt visually to conform to
`modern-and-polish.md` while preserving all legitimate content and functionality.

## Documents

| File | Purpose |
|---|---|
| `portfolio-audit.md` | Full audit of the pre-redesign state with file references |
| `portfolio-rating.md` | 18-category scoring (before → after) with evidence |
| `design-analysis.md` | Current vs target visual language; decisions & conflicts |
| `content-analysis.md` | Content hierarchy, DOs/DON'Ts, what was kept/cut and why |
| `ux-analysis.md` | Recruiter/hiring-manager UX evaluation |
| `technical-analysis.md` | Architecture, type safety, performance, SEO baseline |
| `implementation-plan.md` | Prioritized P0–P3 task plan that was executed |
| `responsive-plan.md` | Breakpoint strategy & known constraints |
| `accessibility-plan.md` | WCAG decisions, contrast table, motion policy |
| `performance-plan.md` | Bundle/font/image/perf work |
| `seo-plan.md` | Metadata, structured data, sitemap/robots status |
| `testing-plan.md` | What is verified by which command/test |
| `changelog.md` | What changed, file by file, and why |

## Final status

Rounds 1–3 (redesign, brand follow-ups, quality & preview pass) implemented and
verified: lint ✅ · typecheck ✅ · unit tests 16/16 ✅ ·
production build ✅ (11 static routes) · E2E smoke 4/4 ✅.
See `changelog.md` for details and `portfolio-rating.md` for before/after scores.

### Known deferred items

- ~~OG image regeneration~~ — **done (Round 2)**: `public/og-default.png` now
  renders the light editorial brand.
- Résumé PDF is a generated placeholder — replace `public/jobel-golde-resume.pdf`
  with the real file when available (TODO §37-F4).
- Project screenshots in `public/images/*.webp` depict the projects' own UIs and
  predate the redesign; re-capture manually per the spec in TODO §37-F3.
