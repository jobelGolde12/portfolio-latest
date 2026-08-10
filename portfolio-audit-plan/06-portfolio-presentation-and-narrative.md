# 06 — Portfolio Presentation & Narrative

**Pillar score: 4.5 / 10**

The site *looks* like a senior developer built it; the *presentation layer* says "student project." The gap between the two is exactly where the biggest hiring-readiness gains are: a default README, gallery-style project cards with no story, one broken advertised feature (resume), a missing OG image, and committed personal documents. None of this requires design work — it's all writing, data, and cleanup.

---

## Section 1: README & Repository Documentation Audit

### 1.1 🚨 The README is untouched `create-next-app` boilerplate

The single most-read file for any recruiter who clicks the GitHub link still says:

> "This is a Next.js project bootstrapped with create-next-app..."

No live link, no project description, no screenshots, no stack table, no structure overview. This is the #1 portfolio anti-pattern: **the repo advertises the scaffold, not the work.**

**Proposed Refactor (Best Practice) — a hiring-grade README:**
```markdown
# Jobel V. Golde — Portfolio

Full-stack developer portfolio built with **Next.js 16 (Turbopack), React 19,
TypeScript (strict), Tailwind CSS v4, and Framer Motion**.

🔗 **Live site:** https://jobelgolde.dev

## Highlights
- Dark editorial design system with token-driven theming (CSS variables + Tailwind v4 `@theme`)
- Scroll-driven horizontal projects gallery, animated timeline, Leaflet map
- Full SEO suite: JSON-LD (Person/WebSite/Organization), OG/Twitter cards, sitemap, robots
- WCAG-minded: skip link, focus management, `prefers-reduced-motion` support

## Tech Stack
| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Framer Motion, Lucide |
| Data/State | Local state + Context (theme), static content modules |
| Mapping | Leaflet + react-leaflet (lazy-loaded) |

## Getting Started
```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## Structure
```
app/        routes, metadata, sitemap, robots
components/ section components + ui primitives
data/       portfolio content (projects, timeline, services)
lib/        seo config, utils, shared motion variants
```

## Lighthouse
<!-- screenshot or badge + current scores -->

## Projects
| Project | Description | Link |
|---|---|---|
| Profanity Detection API | Laravel REST API for Filipino profanity | [demo](…) / [repo](…) |
```

- [ ] Replace the README with the structure above (adapt links/stack to final state).
- [ ] Add a **live-demo link** at the very top (the repo's most-clicked element).
- [ ] Add 1–2 **screenshots** of the hero + projects sections (GitHub renders them inline).
- [ ] Add **Lighthouse scores** as a badge or screenshot (run once, refresh quarterly).
- [ ] Add a **license** file (MIT or CC-BY for the content) — shows professionalism.
- [ ] Keep `docs/ROADMAP.md` (it's strong) and link it from the README's "Roadmap" section.

### 1.2 Repository hygiene for presentation

- [ ] Remove `info.md` (personal resume dump with phone number) from the repo or move it to `.gitignore` (05 §3.3).
- [ ] Decide on `.mimocode/plans/` — gitignore or relocate (05 §3.3).
- [ ] Refresh `docs/AUDIT_REPORT.md` — it currently documents an older codebase (Manrope, `#1E1B20`); recruiters who read it will be confused.
- [ ] Add a `CONTRIBUTING.md`? Not required for a personal portfolio — skip unless you open-source the components.

---

## Section 2: Case Study & Technical Storytelling Enhancements

### 2.1 🚨 "Gallery vs. Case Study" flaw

Project cards are: screenshot + title + external link. No problem statement, no architecture, no trade-offs, no outcomes. For a *student* portfolio this is the difference between "built something" and "can engineer and communicate."

**Current Code (Flaw) — `components/Projects.tsx`:**
```tsx
interface Project {
  title: string;
  image: string | null;
  gradient: string;
  link: string;
}
const projects: Project[] = [
  { title: 'Profanity Detection API', image: '/images/project_profanity_api.png', ... },
];
```

**Proposed Refactor (Best Practice) — a case-study-shaped type:**
```tsx
interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: string;              // one line, e.g. "Filipino profanity detection as a REST API"
  problem: string;              // what pain did it solve?
  approach: string;             // stack + architecture decision (and WHY)
  tradeoffs: string[];          // "chose X over Y because …"
  outcomes?: string[];          // quantifiable: requests/day, accuracy, integrations
  stack: string[];
  image: string | null;
  gradient: string;
  links: { demo?: string; repo?: string };
}
```
- [ ] Expand each project to include `problem`, `approach`, `tradeoffs`, `outcomes` — even 2–3 sentences each transforms a card into a story.
- [ ] Add a per-project **detail route** (`app/projects/[slug]/page.tsx`) or a **dialog** with the full write-up (the `Dialog` primitive already exists — but see 02 §2.2 about it being unused; this is its natural home). A detail page also adds routes to the sitemap.
- [ ] Quantify where possible: Profanity Detection API says "deployed and integrated by external services" — how many? What's the accuracy on Tagalog terms? TrailMates — what scale did it reach? Numbers are what make hiring managers stop scrolling.
- [ ] Use the timeline's existing narrative (Lost & Found capstone, Protec Damayan SMS integration) as source material for the case studies — the content already exists on the page, it just needs structure and links.

### 2.2 🚨 Broken advertised features

- [ ] **"Download resume" does nothing.** `CommandPalette.tsx`:
```tsx
{ id: 'resume', label: 'Download resume', icon: <FileText .../>, action: () => { onClose(); } }
```
  Fix: add `public/jobel-golde-resume.pdf`, then:
```tsx
action: () => { window.open('/jobel-golde-resume.pdf', '_blank'); onClose(); }
```
- [ ] Add a "Download resume" button in the Hero CTAs and/or Contact section (ROADMAP P2 item) — recruiters expect it in both places.
- [ ] **Missing OG image:** `lib/seo.ts` → `ogImage: '/og-default.png'` but the file doesn't exist in `public/`. Every share to LinkedIn/Discord/Twitter shows a broken card. Generate a 1200×630 OG image (name + tagline on the dark brand background) and drop it in `public/`.
- [ ] **Clean the `fbclid` URL** on the Profanity Detection API link (05 §1.3).
- [ ] Add `aria-label` for external links ("Opens in new tab") in the projects grid (a11y + polish).

### 2.3 Project links audit

| Project | Current link | Issue | Fix |
|---|---|---|---|
| Profanity Detection API | `…/filipino-profanity-api-latest.vercel.app/?fbclid=…` | marketing param | [ ] Strip to clean URL |
| TrailMates | `companion-hike.onrender.com` | fine | [ ] Optionally add repo link |
| TaskMind | `whatshouldido-five.vercel.app` | fine | [ ] Add repo link |
| Suitora | `suitora-kappa.vercel.app` | fine | [ ] Add repo link |
| Dugtong | GitHub link only | no live demo | [ ] Add demo if deployed |
| (timeline) Lost & Found, Protec Damayan, School Portal | links exist only inside CommandPalette | inconsistent | [ ] Consolidate in `data/projects.ts` |

- [ ] Consolidate all project URLs into one typed `data/projects.ts` module consumed by both `Projects.tsx` and `CommandPalette.tsx` (removes the current duplication).

---

## Section 3: Modern Portfolio Anti-Pattern Fixes

### 3.1 "Vibe coding / surface code" — how this repo reads to an engineer

- [x] **Genuinely good:** the timeline animation, parallax, and token system are *custom*, not boilerplate — this is not a cloned template.
- [x] **Good:** `docs/ROADMAP.md` shows planning discipline most student portfolios lack.
- [ ] **Risk:** the *content* still reads surface-level — skills listed as badges with no proficiency, services listed with no evidence, no blog/writing. The site says "I can do full-stack" but doesn't prove depth beyond visuals. The case-study work in §2.1 is the fix.
- [ ] Add **proficiency signals** to Skills (ROADMAP P1): years or ●●○ ratings next to badges. "Exploring: TypeScript/Docker" already signals honesty — lean into that.
- [ ] Publish **2–3 short blog posts** (ROADMAP P1): "Building the Filipino Profanity Detection API", "Why Laravel + Vue for my capstone", "What I learned from the Lost & Found system". This single feature changes a recruiter's perception from *designer* to *engineer who communicates*.
- [ ] Add **testimonials/recommendations** (ROADMAP P2) from a professor or client — social proof matters most for students with thin work history.

### 3.2 Professionalism & data hygiene

- [ ] Remove the phone number and personal resume from committed files (`info.md`) — keep a downloadable resume as a static asset instead.
- [ ] Consider a **custom domain** — the site already uses `jobelgolde.dev` in metadata; ensure the deployed URL matches (a Vercel `.vercel.app` URL undermines the polish).
- [ ] Add an **uptime/status** consideration — "Systems operational" badge in the Footer is aspirational marketing on a static site; either make it meaningful (link to status page) or soften the copy.
- [ ] The `Date.now()`-based `lastModified` in `sitemap.ts` (`new Date()`) changes on every build — pin it to a constant or use the last git commit date for stable, crawl-friendly sitemaps.

### 3.3 "Show your work" checklist

- [ ] Every project card answers: *What? Why? How? What happened?*
- [ ] At least one project has a **technical write-up** (architecture diagram optional) with trade-offs.
- [ ] The **README** is the front door (live link + screenshots + stack).
- [ ] **Social cards** work (OG image exists and renders).
- [ ] **Resume** is downloadable and up to date.
- [ ] **Git history** is public and clean (41 meaningful commits — already good).
- [ ] The **deployed URL** appears in GitHub repo metadata (About section → Website field).
- [ ] **`docs/AUDIT_REPORT.md`** is refreshed to match the current codebase or archived with a date.

### 3.4 Definition of "hiring ready" for this repo

- [ ] README rewritten with live link + screenshots
- [ ] 0 lint errors, 0 warnings; `typecheck` + `build` green in CI
- [ ] ≥ 1 case study with problem → approach → trade-offs → outcomes
- [ ] Resume download works from palette + hero/contact
- [ ] OG image exists and social previews look intentional
- [ ] Test suite (unit + one E2E smoke) in place
- [ ] No PII in the repo, no stale docs
