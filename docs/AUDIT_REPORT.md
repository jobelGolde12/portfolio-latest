# Portfolio Audit Report

**Project:** Jobel V. Golde — Portfolio  
**Date:** July 22, 2026  
**Auditor:** Senior Front-End Engineering & UI/UX Audit  
**Scope:** Full codebase analysis across design, accessibility, performance, code quality, and UX

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Strengths](#2-strengths)
3. [Typography Analysis](#3-typography-analysis)
4. [Design System & Visual Consistency](#4-design-system--visual-consistency)
5. [Component-by-Component Audit](#5-component-by-component-audit)
6. [Accessibility Audit](#6-accessibility-audit)
7. [Performance Audit](#7-performance-audit)
8. [Code Quality Audit](#8-code-quality-audit)
9. [Responsive Design Audit](#9-responsive-design-audit)
10. [UX Heuristic Evaluation](#10-ux-heuristic-evaluation)
11. [Prioritized Improvement Plan](#11-prioritized-improvement-plan)
12. [Implementation Guide](#12-implementation-guide)
13. [Verification Checklist](#13-verification-checklist)

---

## 1. Executive Summary

The portfolio presents a solid foundation: a cohesive dark theme, thoughtful use of motion, well-structured components, and clear information architecture. The developer has established a visual identity that feels personal and technically competent.

However, the project exhibits patterns typical of early-stage development — excellent raw materials that need refinement to reach a polished, production-grade state. The primary opportunities lie in **typography elevation**, **design system standardization**, **accessibility hardening**, **code organization**, and **UX micro-polish**.

The overall recommendation is **incremental refinement** — each improvement builds on the existing identity rather than replacing it.

---

## 2. Strengths

### What Already Works Well

| Area | Strengths |
|------|-----------|
| **Dark Theme** | Consistent `#1E1B20` background with white typography creates strong contrast and modern aesthetic |
| **Animation** | Framer Motion used tastefully — fade/slide/scale patterns, staggered children, spring physics |
| **Component Structure** | Clean separation of concerns per section (Hero, About, Skills, Projects, Contact, Footer) |
| **TypeScript** | Full type safety with proper interfaces; no `any` types observed |
| **Contact Form** | Floating labels, validation states, loading spinner, success feedback — well-implemented UX |
| **Project Cards** | Good information density: category, year, description, tech stack, links |
| **Image Optimization** | Proper use of `next/image` with `fill`, `sizes`, and `priority` on LCP images |
| **Scroll Animations** | `useInView` with `once: true` prevents re-triggering, reducing unnecessary work |
| **SEO Metadata** | Proper `Metadata` export with title, description, icons |
| **Font Loading** | Manrope loaded via Next.js font system (self-hosted, no layout shift) |
| **Icon System** | Lucide React for UI icons, custom SVG icons for social — consistent `strokeWidth={1.75}` |
| **cn() Utility** | `clsx` + `tailwind-merge` pattern established for className composition |
| **Responsive Intent** | Breakpoints used (`sm:`, `md:`, `lg:`) throughout with mobile-first approach |


## 3. Typography Analysis

### Current State

| Property | Current Value | Assessment |
|----------|--------------|------------|
| Primary Font | Manrope | Good, but generic for developer portfolios |
| Font Weights | 400, 500, 600, 700 | Adequate |
| Body Size | 14–16px | Slightly small for readability |
| Heading Size (Hero) | 48–64px | Good scale |
| Section Title Size | 28–32px | Could be larger for hierarchy |
| Line Height (body) | 1.7 | Excellent for readability |
| Letter Spacing | -0.02em | Tight, appropriate for display |

### Issues Found

1. **No secondary/display font** — All text uses the same font family, reducing visual hierarchy
2. **Inconsistent heading sizes** — No systematic type scale; sizes are arbitrary
3. **Section label size** — `text-[13px]` for section subtitles is hard to read on mobile
4. **No font-size CSS variables** — Sizes are hardcoded in every component
5. **All-caps hero heading** — "JOBEL V. GOLDE" in all caps reduces readability

### Recommendation

Adopt a **dual-font system**:

- **Primary:** Geist (modern, optimized for UI, excellent on dark backgrounds)
- **Display:** Instrument Serif (used sparingly for hero words and section titles)

Establish a **type scale** with CSS variables:

```css
--text-xs: 0.75rem;    /* 12px — labels */
--text-sm: 0.8125rem;  /* 13px — small text */
--text-base: 1rem;     /* 16px — body */
--text-lg: 1.125rem;   /* 18px — large body */
--text-xl: 1.5rem;     /* 24px — card titles */
--text-2xl: 2rem;      /* 32px — small headings */
--text-3xl: 2.5rem;    /* 40px — section titles */
--text-4xl: 3.5rem;    /* 56px — hero */
--text-5xl: 4.5rem;    /* 72px — hero emphasis */

## 4. Design System & Visual Consistency

### CSS Variables Audit

```css
/* Current state — multiple variables are functionally identical */
--background: #1E1B20;      /* Used ✓ */
--foreground: #ffffff;       /* Used ✓ */
--surface-primary: #F8F8F7;  /* UNUSED — referenced nowhere */
--surface-secondary: #FFFFFF; /* UNUSED */
--text-primary: #ffffff;      /* Used ✓ */
--text-secondary: #ffffff;    /* UNUSED — same as primary */
--text-muted: #ffffff;        /* UNUSED — should be a different shade */
--border: #E9E9E9;           /* UNUSED — too light for dark theme anyway */
--hover-surface: #F2F2F2;    /* UNUSED */
--accent: #ffffff;            /* UNUSED — no accent color */
```

**Issues:**
- 7 of 10 CSS variables are unused in the actual codebase
- `--text-muted` is set to `#ffffff` instead of a lower-opacity white
- No accent/brand color defined
- No spacing/sizing tokens
- Hardcoded colors throughout (`#1F1F1F`, `white/10`, `white/5`)

### Spacing Audit

Current spacing is inconsistent and doesn't follow an 8px grid:

| Usage | Current | 8px Grid Equivalent |
|-------|---------|-------------------|
| Section padding top/bottom | `py-24` (96px) / `md:py-32` (128px) | ✓ Good |
| Card padding | `px-5 py-6` (20px / 24px) | → 24px / 24px |
| Project card padding | `px-5 py-6 sm:px-7 sm:py-8` | Inconsistent |
| Gap between elements | `gap-3`, `gap-4`, `gap-6`, `gap-12` | Random values |
| Navbar padding | `px-3 py-2` (12px / 8px) | → 16px / 8px |

### Border Radius Audit

| Usage | Current Radius |
|-------|---------------|
| Navbar container | `rounded-[28px]` |
| Profile image | `rounded-[28px]` |
| Mobile menu | `rounded-[20px]` |
| About cards | `rounded-[16px]` |
| Project cards | `rounded-[16px]` |
| Skill badges | `rounded-lg` (8px) |
| Language badges | `rounded-full` |
| Buttons | `rounded-full` |
| Info dot | `rounded-full` |

**Issue:** 5 distinct radius values where 3 would suffice.

### Recommended Radius System

```css
--radius-sm: 8px;    /* badges, small elements */
--radius-md: 16px;   /* cards, sections */
--radius-lg: 28px;   /* profile image, hero elements */
--radius-full: 9999px; /* buttons, pills */
```


## 5. Component-by-Component Audit

### Navbar

| Aspect | Finding |
|--------|---------|
| ✅ Scrolled state detection | Clean `useEffect` with scroll listener |
| ✅ Mobile menu | AnimatePresence with smooth transitions |
| ⚠️ Duplicated GitHub icon | Defined inline AND in `Icons.tsx` — import instead |
| ⚠️ White background on dark theme | `bg-white/80` when not scrolled feels out of place against `#1E1B20` background |
| ⚠️ "Hire Me" uses `text-[#1F1F1F]` | Hardcoded color, should use variable |
| ❌ No active section highlighting | No visual indicator for current scroll position |
| ❌ No ARIA attributes on mobile menu | Missing `aria-expanded`, `aria-controls`, `role` |
| ❌ No focus trap in mobile menu | Keyboard users can tab behind the overlay |
| ❌ Scroll listener not throttled | Could fire excessively on scroll |

### Hero

| Aspect | Finding |
|--------|---------|
| ✅ 3D tilt effect | Clean spring-based mouse tracking |
| ✅ Good animation sequencing | Staggered delays feel natural |
| ⚠️ Heading is all-caps | "JOBEL V. GOLDE" — hard to read, visually aggressive |
| ⚠️ Profile image is repeated | Same image used in Hero and About — different sizes, okay but no `blurDataURL` |
| ⚠️ Scroll indicator | Arrow animation good, but no smooth scroll behavior linked |
| ❌ No `prefers-reduced-motion` respect | Tilt effect ignored for users with motion sensitivity |

### About

| Aspect | Finding |
|--------|---------|
| ✅ Content well-structured | Summary, education, languages, interests — logical flow |
| ✅ Staggered animations | `containerVariants` / `itemVariants` pattern is clean |
| ⚠️ "4+ Years Learning" badge | Uses `bg-white` with `text-[#1F1F1F]` — breaks dark theme consistency |
| ⚠️ `bg-dark` class used | Not a standard Tailwind class — likely no-op unless defined globally |
| ❌ Missing heading hierarchy | Section has `h2` but aria landmarks could be improved |

### Skills

| Aspect | Finding |
|--------|---------|
| ✅ Clean data structure | Array of skill groups with clear naming |
| ✅ Good visual layout | Numbered index, category title, skill chips |
| ⚠️ `Skiper31` component appended | Social media scroll animation is unrelated to skills section |
| ⚠️ `text-[12px]` for mono number | Very small on mobile |
| ❌ No skill proficiency indication | All skills look equal — no differentiation |

### Projects

| Aspect | Finding |
|--------|---------|
| ✅ Clean project card design | Number, category, description, tech stack, links |
| ✅ Good hover effects | Subtle lift, icon rotation |
| ⚠️ Tech stack separator | Uses `/` character — could use proper bullet or badge system |
| ⚠️ `bg-dark` class again | Not a standard Tailwind utility |
| ❌ No project image/thumbnail | All text — no visual preview of projects |
| ❌ No demo link indicator | Some projects have `live` but it's not visually distinguished from GitHub |

### Contact

| Aspect | Finding |
|--------|---------|
| ✅ Floating label input | Excellent UX pattern with clean implementation |
| ✅ Form states | Idle, submitting, submitted, error — all handled |
| ✅ Spinner during submission | Animated with Framer Motion |
| ✅ Success feedback | CheckCircle icon + "Sent!" message |
| ⚠️ Formspree endpoint | Hardcoded URL in component |
| ❌ No form validation feedback | `required` attribute only — no inline error messages |
| ❌ No honeypot field | No spam protection beyond Formspree |

### Footer

| Aspect | Finding |
|--------|---------|
| ✅ Clean layout | Logo, social link, copyright |
| ❌ Only GitHub link | LinkedIn and Facebook from social links array not rendered |
| ❌ No back-to-top link | Users must scroll manually |
| ❌ No aria-label on social link | Screen reader only hears "GitHub" — not that it opens externally |

### Animation & Background Components

| Component | Finding |
|-----------|---------|
| **AnimatedBackground** | Subtle blur + SVG circle — lightweight, good |
| **FloatingTriangles** | 15 triangles with individual animations — GPU-composited but high overhead |
| **CustomCursor** | Well-implemented spring physics, but only shown on `md:` — good |
| **Skiper31 / text-scroll-animation** | Extremely complex (210vh sections, per-character transforms) — performance concern |


## 6. Accessibility Audit

### Critical Issues

| Issue | Location | Impact |
|-------|----------|--------|
| ❌ No skip link | Layout | Keyboard users cannot skip navigation |
| ❌ No `prefers-reduced-motion` | All components | Animations may cause vestibular issues |
| ❌ No focus trap in mobile menu | Navbar | Keyboard focus can leave the modal |
| ❌ Custom cursor hides default cursor | Global | Users expecting standard cursor lose visual feedback |

### Moderate Issues

| Issue | Location | Impact |
|-------|----------|--------|
| ⚠️ No `aria-current="section"` | Navbar links | Screen reader can't identify current section |
| ⚠️ No `aria-expanded` on mobile toggle | Navbar button | Screen reader doesn't know menu state |
| ⚠️ Low contrast on `white/5` borders | Multiple | Hard to perceive for low-vision users |
| ⚠️ Section headings not sequential | About | `h2` used but not preceded by `h1` on every page |
| ⚠️ No form error announcements | Contact form | Screen reader doesn't hear validation errors |
| ⚠️ External links lack indicators | Projects, Footer | No visual or screen reader indication of new tab |

### Good Practices Already Present

| Practice | Location |
|----------|----------|
| ✅ `aria-label` on logo link | Navbar |
| ✅ `aria-label` on skill lists | Skills section |
| ✅ `aria-hidden` on decorative numbers | Projects, Skills |
| ✅ Semantic HTML (`nav`, `section`, `footer`, `article`) | Throughout |
| ✅ `focus-visible` ring on some elements | Projects |
| ✅ Proper heading order (`h1` → `h2`) | Per section |

## 7. Performance Audit

### Metrics Assessment

| Metric | Current State | Concern Level |
|--------|--------------|---------------|
| **LCP** | Hero image with `priority` + `loading="eager"` | ✅ Good |
| **CLS** | Font loaded via next/font, Image dimensions set | ✅ Good |
| **FCP** | Multiple client components, framer-motion bundle | ⚠️ Moderate |
| **TBT** | CustomCursor + FloatingTriangles + AnimatedBackground run on load | ⚠️ Moderate |

### Bundle Size Concerns

1. **Framer Motion** — Large library (~150KB), imported in every component
2. **Lenis** — Imported only in `text-scroll-animation.tsx` but adds ~15KB
3. **Unused components** — `LogoStrip` exported but never imported anywhere
4. **CustomCursor** — Runs on all devices but only visible on `md:` breakpoint
5. **FloatingTriangles** — 15 motion.div elements with per-frame animations on every scroll

### Optimization Opportunities

1. **Lazy load FloatingTriangles** — Not visible above the fold on most devices
2. **Code-split framer-motion** — Only import `motion` from `framer-motion` (already done)
3. **Throttle scroll listener** — Navbar scroll handler fires on every pixel change
4. **Remove unused components** — `LogoStrip` is dead code
5. **Preconnect to external origins** — GitHub, Formspree
6. **Add `blurDataURL`** — For profile images to show placeholder


## 8. Code Quality Audit

### Strengths

- TypeScript strict mode enabled
- Clean component decomposition
- Consistent export patterns (default exports)
- Good use of React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`)
- Framer Motion variants extracted (About component)

### Issues

| Issue | Location | Recommendation |
|-------|----------|----------------|
| Duplicated GitHubIcon | Navbar.tsx + Icons.tsx | Import from Icons.tsx |
| `bg-dark` class not defined | About.tsx, Projects.tsx | Replace with valid Tailwind class or define it |
| Unused component | LogoStrip.tsx | Remove or integrate |
| Overly complex animation | text-scroll-animation.tsx | Simplify or split |
| Inline SVG in component | Navbar.tsx | Already duplicated — consolidate |
| Magic numbers | Multiple files | Use design tokens / CSS variables |
| No custom hooks | Project | Extract scroll logic, intersection observer patterns |
| No constants file | Project | Extract navLinks, project data, skill data to constants/ |
| Lenis + framer-motion conflict | text-scroll-animation.tsx | Both control scroll — potential jank |

## 9. Responsive Design Audit

### Breakpoint Coverage

| Breakpoint | Status |
|------------|--------|
| Mobile (< 640px) | ✅ Functional — sections stack properly |
| Tablet (640–768px) | ⚠️ Some spacing feels loose |
| Laptop (768–1024px) | ✅ Good |
| Desktop (1024–1280px) | ✅ Good |
| Ultra-wide (> 1280px) | ⚠️ Content constrained to 1200px max-width — fine |

### Specific Issues

1. **Hero font size** jumps from 48px → 56px → 64px — fine on mobile, good progression
2. **About section grid** goes to single column on mobile — correct
3. **Skills section** gap on mobile is comfortable
4. **Projects** stack vertically on all breakpoints — could use 2-column grid on desktop
5. **Contact form** 2-column layout on mobile — the `sm:grid-cols-2` works well
6. **FloatingTriangles** reduces count on mobile — good optimization

### Recommendation

- Add `2xl:` breakpoint for ultra-wide containers (max-width: 1400px)
- Consider 2-column project grid at `lg:` breakpoint

## 10. UX Heuristic Evaluation

### Nielsen's 10 Usability Heuristics

| Heuristic | Score | Notes |
|-----------|-------|-------|
| **1. Visibility of system status** | ⚠️ 6/10 | No loading states for images, no scroll progress indicator |
| **2. Match system & real world** | ✅ 8/10 | Clear language, familiar patterns |
| **3. User control & freedom** | ✅ 8/10 | Navigation is predictable, but no back-to-top |
| **4. Consistency & standards** | ⚠️ 5/10 | Inconsistent spacing, multiple radius values |
| **5. Error prevention** | ⚠️ 5/10 | Form has no inline validation before submit |
| **6. Recognition over recall** | ✅ 7/10 | Clear section labels, familiar iconography |
| **7. Flexibility & efficiency** | ⚠️ 4/10 | No keyboard shortcuts, no search |
| **8. Aesthetic & minimalist** | ⚠️ 6/10 | Good base but lacks polish in spacing and type hierarchy |
| **9. Help users recognize errors** | ⚠️ 3/10 | No inline error messages in contact form |
| **10. Help & documentation** | ❌ 2/10 | No tooltips, help text, or documentation |

### Key UX Findings

1. **CTA clarity** — "Hire Me" button is clear, but secondary action (GitHub) competes visually
2. **Reading flow** — Content reads well top-to-bottom, section transitions are smooth
3. **Project discoverability** — Projects section is well-structured but lacks thumbnail previews
4. **Contact confidence** — Formspree submission gives no ETA or confirmation email
5. **Scroll experience** — Smooth scroll on `<html>` but no scroll-progress indicator


## 11. Prioritized Improvement Plan

### 🔴 P0 — Critical (Do First)

| # | Improvement | Effort | Impact | Files |
|---|-------------|--------|--------|-------|
| 1 | **Add skip link** for keyboard users | Low | High | `app/layout.tsx` |
| 2 | **Respect `prefers-reduced-motion`** | Low | High | `globals.css` + all components |
| 3 | **Fix mobile menu accessibility** — focus trap, ARIA | Medium | High | `Navbar.tsx` |
| 4 | **Remove unused CSS variables**, add meaningful tokens | Low | Medium | `globals.css` |
| 5 | **Remove duplicated GitHubIcon** | Low | Low | `Navbar.tsx` |

### 🟡 P1 — High Priority

| # | Improvement | Effort | Impact | Files |
|---|-------------|--------|--------|-------|
| 6 | **Typography upgrade** — Geist + Instrument Serif | Medium | Very High | `layout.tsx`, `globals.css` |
| 7 | **Establish 8px spacing system** throughout | Medium | High | All components |
| 8 | **Standardize border radius** to 3 values | Low | Medium | All components |
| 9 | **Add active nav section highlighting** on scroll | Medium | High | `Navbar.tsx` |
| 10 | **Replace hardcoded colors** with CSS variables | Medium | Medium | All components |
| 11 | **Add `blurDataURL`** to profile images | Low | Medium | `Hero.tsx`, `About.tsx` |

### 🟢 P2 — Medium Priority

| # | Improvement | Effort | Impact | Files |
|---|-------------|--------|--------|-------|
| 12 | **Simplify Skiper31** animation component | High | Medium | `text-scroll-animation.tsx` |
| 13 | **Add inline form validation** to Contact | Medium | High | `Contact.tsx` |
| 14 | **Add social links to Footer** | Low | Medium | `Footer.tsx` |
| 15 | **Add back-to-top link** in Footer | Low | Low | `Footer.tsx` |
| 16 | **Extract data to constants/** folder | Medium | Medium | New file |
| 17 | **Add focus indicators** to all interactive elements | Medium | High | Multiple components |

### 🔵 P3 — Polish

| # | Improvement | Effort | Impact | Files |
|---|-------------|--------|--------|-------|
| 18 | **Throttle scroll listener** in Navbar | Low | Low | `Navbar.tsx` |
| 19 | **Remove unused LogoStrip component** | Low | Low | Delete file |
| 20 | **Add JSON-LD structured data** | Medium | Medium | `layout.tsx` |
| 21 | **Improve hero heading** — sentence case with display font accent | Low | Medium | `Hero.tsx` |
| 22 | **Add project thumbnails** | High | High | `Projects.tsx` |
| 23 | **Optimize FloatingTriangles** with `will-change` and lazy load | Low | Low | `FloatingTriangles.tsx` |


## 12. Implementation Guide

### 12.1 Typography Upgrade

#### Install Geist

```bash
npm install geist
```

#### Update `app/layout.tsx`

```tsx
import { Geist, Geist_Mono } from 'geist/font';
import { Instrument_Serif } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});
```

#### Update `globals.css`

```css
:root {
  --font-sans: var(--font-geist-sans);
  --font-display: var(--font-instrument-serif);
  --font-mono: var(--font-geist-mono);
}
```

### 12.2 CSS Variables Refresh

Replace the current unused variables with a meaningful set:

```css
:root {
  /* Backgrounds */
  --background: #1E1B20;
  --surface: rgba(255, 255, 255, 0.05);
  --surface-hover: rgba(255, 255, 255, 0.1);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.4);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.12);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 28px;
  --radius-full: 9999px;

  /* Spacing (8px grid) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 80px;
  --space-9: 96px;

  /* Typography */
  --font-sans: var(--font-geist-sans);
  --font-display: var(--font-instrument-serif);
  --font-mono: var(--font-geist-mono);
}
```

### 12.3 Navbar Refinement

Key improvements for `Navbar.tsx`:

1. **Remove duplicated `GithubIcon`** — import from `@/components/Icons`
2. **Add `aria-expanded` and `aria-controls`** to mobile menu button
3. **Add focus trap** in mobile menu overlay
4. **Add `role="dialog"` and `aria-modal="true"`** to mobile dropdown
5. **Add active section highlighting** using IntersectionObserver
6. **Use transparent background by default** (as previously implemented)

### 12.4 Spacing Standardization

Map all current Tailwind spacing to 8px grid:

| Context | Current → Standardized |
|---------|----------------------|
| Section padding | `py-24` (96px) → Keep (divisible by 8) |
| Card padding | `px-5 py-6` → `px-6 py-6` (24px) |
| Gap between sections | `gap-3` (12px) → `gap-4` (16px) |
| Gap between items | `gap-6` (24px) → Keep (divisible by 8) |
| Navbar horizontal padding | `px-3` (12px) → `px-4` (16px) |

### 12.5 Accessibility Additions

#### Skip Link (add to `layout.tsx`)

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-white focus:text-[#1F1F1F] focus:rounded-lg focus:outline-none"
>
  Skip to main content
</a>
```

#### Reduced Motion (add to `globals.css`)

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Active Section Highlighting (add to `Navbar.tsx`)

```tsx
useEffect(() => {
  const sections = navLinks.map(link =>
    document.querySelector(link.href)
  ).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((section) => {
    if (section) observer.observe(section);
  });

  return () => observer.disconnect();
}, []);
```

### 12.6 Data Extraction Pattern

Create `app/constants/index.ts`:

```ts
export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const skillGroups = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'PHP', 'Java', 'C++', 'Python'],
  },
  // ... rest of the data
];

export const projects = [
  // ... project data
];
```

### 12.7 Form Validation Enhancement (Contact.tsx)

```tsx
const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'name':
      return value.trim().length < 2 ? 'Name must be at least 2 characters' : null;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email';
    case 'subject':
      return value.trim().length < 3 ? 'Subject must be at least 3 characters' : null;
    case 'message':
      return value.trim().length < 10 ? 'Message must be at least 10 characters' : null;
    default:
      return null;
  }
};
```


## 13. Verification Checklist

### Visual Identity

- [ ] Dark theme preserved (`#1E1B20` background)
- [ ] White typography remains primary text color
- [ ] Overall aesthetic unchanged — improvements feel like evolution
- [ ] Branding elements (logo, name, tagline) preserved
- [ ] Content unchanged unless improving readability or accessibility

### Typography

- [ ] Geist loaded as primary font (or Manrope retained with improvements)
- [ ] Instrument Serif used for display accents only (≤2 words per heading)
- [ ] Type scale established and consistent
- [ ] Line heights: 150% body, 120% headings
- [ ] Letter spacing: tighter headings, normal body

### Design System

- [ ] CSS variables meaningful and used — no dead variables
- [ ] 8px spacing system applied consistently
- [ ] Border radius standardized (3–4 values max)
- [ ] No hardcoded color values in components (all via variables/tokens)
- [ ] Shadows consistent across similar elements

### Accessibility

- [ ] Skip link added and functional
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile menu has focus trap
- [ ] All interactive elements have visible focus indicators
- [ ] ARIA attributes correct (`aria-expanded`, `aria-controls`, `aria-current`, etc.)
- [ ] Heading hierarchy logical (`h1` → `h2` → `h3`)
- [ ] Form has inline validation with error announcements
- [ ] External links distinguishable and labeled
- [ ] Touch targets minimum 44×44px on mobile

### Responsive Design

- [ ] No horizontal overflow at any breakpoint
- [ ] Typography scales comfortably on mobile
- [ ] Touch interactions comfortable on small screens
- [ ] Layout adapts gracefully at all breakpoints

### Performance

- [ ] No unused components in bundle
- [ ] Scroll listeners throttled where appropriate
- [ ] Images have `blurDataURL` or proper placeholders
- [ ] Animations use `will-change` for composited properties only
- [ ] No layout shifts from font loading

### Code Quality

- [ ] No duplicated code (GitHubIcon imported, not redefined)
- [ ] No undefined utility classes (`bg-dark` removed or defined)
- [ ] Data extracted to constants/ folder
- [ ] Custom hooks extracted for reusable logic
- [ ] TypeScript strict mode clean — no errors

### UX

- [ ] Reading flow feels natural
- [ ] CTAs clear and appropriately prominent
- [ ] Navigation feels predictable
- [ ] Scroll experience smooth
- [ ] Interaction feedback present on all interactive elements
- [ ] Mobile menu intuitive

---
*End of Audit Report*

*Note: This report is a living document. As improvements are implemented, findings should be updated and items moved from "Issues" to "Resolved."*

