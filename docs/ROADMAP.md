# Portfolio Roadmap — Next Additions & Improvements

**Project:** Jobel V. Golde — Portfolio  
**Date:** July 22, 2026  
**Focus:** Future sections, design enhancements, new components, content strategy, and UX improvements

---

## Table of Contents

1. [Strategic Principles](#1-strategic-principles)
2. [New Sections & Content](#2-new-sections--content)
3. [Design Enhancements](#3-design-enhancements)
4. [New Components](#4-new-components)
5. [Content Strategy](#5-content-strategy)
6. [UX & Interaction Improvements](#6-ux--interaction-improvements)
7. [Technical Architecture](#7-technical-architecture)
8. [Testing & Quality](#8-testing--quality)
9. [Timeline & Priorities](#9-timeline--priorities)

---

## 1. Strategic Principles

Every addition to this portfolio should satisfy at least three of these criteria:

| Principle | Why It Matters |
|-----------|---------------|
| **Builds on the existing identity** | The dark theme, whitespace, and typography are the foundation — never fight them |
| **Reduces cognitive load** | A portfolio should feel effortless to browse; every pixel should earn its place |
| **Shows, doesn't tell** | Projects and skills should demonstrate competence through visuals and interaction, not just text |
| **Prioritizes the reader** | Recruiters and collaborators scan fast — make the signal loud and the noise quiet |
| **Accessible by default** | Every new feature must work for keyboard-only users, screen readers, and motion-sensitive visitors |

## 2. New Sections & Content

### P1 — Blog / Writing Section

**Why:** A blog section differentiates this portfolio from the average student portfolio. It demonstrates communication skills, deep thinking, and teaching ability.

**What to include:**
- 3–5 starter posts (can be short ~500 words each)
- Topics: "Building a Profanity Detection API", "Why I Chose Laravel + Vue.js", "What I Learned Building a Lost & Found System"
- Clean reading layout with `max-w-[720px]` article width
- Code syntax highlighting via `rehype-highlight` or `shiki`
- RSS feed for subscribers

**Implementation approach:**
```
app/blog/
  page.tsx          — listing with cards
  [slug]/page.tsx   — individual post
  layout.tsx        — shared reading layout
```

### P2 — Testimonials / Recommendations Section

**Why:** Social proof from professors, peers, or clients adds credibility that self-description can't.

**What to include:**
- 3–5 testimonial cards with photo, name, title, quote
- Horizontal carousel on desktop, stacked on mobile
- Sourced from LinkedIn recommendations, professors, or client feedback

### P2 — Resume / Downloadable CV Section

**Why:** Recruiters often want to download a PDF. Making it easy signals professionalism.

**What to include:**
- "Download Resume" button visible in both the hero CTA area and contact section
- Well-formatted PDF generated from a template
- Link to LinkedIn as a secondary option

### P3 — Timeline / Experience Section

**Why:** The current "4+ Years Learning" badge is static. A visual timeline would show progression over time.

**What to include:**
- Chronological timeline of education, projects, and milestones
- Vertical layout on desktop, simplified on mobile
- Subtle connecting line with dots at each milestone

## 3. Design Enhancements

### P1 — Project Thumbnails

**Current state:** All-text project cards with no visual preview.

**Recommendation:** Add a thumbnail image (1200×630px) to each project card. This drastically improves scannability and visual interest.

**Implementation:**
- Add `thumbnail` field to project data
- Use `next/image` with `fill` and proper `sizes`
- Show thumbnail on hover or as a persistent small image on desktop
- Fallback to a generated gradient if no image exists

### P1 — Skill Proficiency Visualization

**Current state:** All skills listed as equal — no indication of experience level.

**Recommendation:** Add subtle visual indicators:
- Years of experience (e.g., "4 yrs" next to PHP/Laravel)
- Categorization by proficiency (Core / Proficient / Familiar)
- Or a simple dot-rating system (●●●○○)

### P2 — Scroll Progress Indicator

**Why:** Improves Nielsen's "Visibility of system status" heuristic. Gives users a sense of how far they've scrolled.

**Implementation:**
- Thin (2px) line at the very top of the page, below the navbar
- Uses `useScroll` from framer-motion to map scroll progress to width
- Colored white to match the theme
- Hidden on touch devices to avoid interfering with native scrollbars

### P2 — Mobile Bottom Navigation

Still-experimental but useful pattern — a small bottom nav bar on mobile with quick links to sections and a back-to-top button. Fitts' Law optimization for thumb reach on large phones.

## 4. New Components

### P1 — `Button` Component

Extract a reusable button system:

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}
```

Currently buttons/NavLinks/CTAs have duplicated styling. A single `Button` component ensures consistency and maintainability.

### P2 — `Card` Component

Extract a consistent card wrapper with variants for `default`, `hover`, and `interactive` behaviors.

### P2 — `Badge` Component

For skill tags, language tags, and tech stack items with `default`, `outline`, and `glass` variants.

### P3 — `SectionHeading` Component

Standardize the heading + subtitle pattern used in every section:

```tsx
interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}
```

Current pattern is repeated 5+ times across components — extraction would reduce duplication significantly.

### P3 — `ThemeToggle` Component

While the site currently uses a dark-only theme, setting up the architecture for a future light mode makes the code future-proof.


## 5. Content Strategy

### P1 — Improve Project Content

Each project card should answer:
1. What problem did it solve? (1 sentence)
2. What did you build? (2–3 sentences)
3. What was your role? (Solo / Lead / Team member)
4. What technologies did you use? (Already present)
5. Can I see it live? (Already present for some)
6. Can I see the code? (Already present)

**Recommendation:** Add a `highlights` array with measurable outcomes.

### P1 — Add Call-to-Action Metrics

Vary CTA messaging based on context:
- Hero: "Let's work together"
- Projects: "View my work"
- Contact: "Send a message"

This reduces repetition and feels more tailored.

### P2 — Add "Currently" Section

A small, dynamic section at the top showing current focus:
> "Currently building: A real-time lost and found platform"
> "Currently learning: Go and Docker"

This signals active growth — attractive to recruiters.

### P2 — About Section Enhancement

Consider adding:
- A short "Why I code" paragraph
- A fun fact or personal detail (builds connection)
- A photo that shows personality (not just a professional headshot)

## 6. UX & Interaction Improvements

### P1 — Form Inline Validation

**Current state:** Contact form only uses HTML `required` attribute. No inline error messages.

**Recommendation:** Add per-field validation with error messages shown below each field. Use `aria-describedby` and `aria-invalid` for accessibility.

### P2 — Loading Skeleton for Images

Generate unique blurDataURL per image using `plaiceholder` or `lqip-modern` for contextually relevant placeholders.

### P2 — Keyboard Shortcuts

For power users:
- `?` Show keyboard shortcuts dialog
- `⌘K` or `Ctrl+K` Command palette (search sections, projects)
- `1`–`4` Jump to nav link positions
- `T` Scroll to top

### P3 — Reading Time Indicator

On blog posts: show estimated reading time (e.g., "4 min read").

### P3 — Contact Confirmation UX

After sending, show:
- Expected response time ("I'll respond within 24 hours")
- Option to view LinkedIn or GitHub while waiting
- Clear "Send another" action


## 7. Technical Architecture

### P2 — Create `constants/` Directory

Move all hardcoded data out of components:

```
app/constants/
  navigation.ts    — navLinks
  skills.ts        — skillGroups
  projects.ts      — projects array
  social.ts        — socialLinks
  about.ts         — aboutContent
  contact.ts       — contactInfo
```

**Why:** This is the single biggest code quality improvement available. Components become pure presentation layers, making both data and UI easier to reason about, test, and maintain.

### P2 — Create Custom Hooks

| Hook | Purpose |
|------|---------|
| `useScrollPosition` | Throttled scroll position tracking (extracted from Navbar) |
| `useActiveSection` | IntersectionObserver-based section tracking (extracted from Navbar) |
| `useReducedMotion` | Returns `true` if user prefers reduced motion |
| `useMediaQuery` | Reactive media query matching |

### P2 — JSON-LD Structured Data

Add rich search results markup with `Person` schema for improved SEO.

### P3 — Performance Monitoring

- Add Next.js `reportWebVitals` hook
- Track Core Web Vitals (CLS, LCP, FID)

### P3 — E2E Testing

Add Playwright for:
- Navigation flow (all sections accessible)
- Contact form submission (happy path + error states)
- Mobile menu toggle
- Keyboard navigation (Tab through all interactive elements)

## 8. Testing & Quality

### Manual QA Checklist for Each New Feature

- [ ] Works on mobile (360px, 414px)
- [ ] Works on tablet (768px, 1024px)
- [ ] Works on desktop (1280px, 1920px)
- [ ] Keyboard navigable (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader friendly (NVDA or VoiceOver)
- [ ] Reduced motion respected
- [ ] No horizontal overflow
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Meets WCAG 2.2 AA contrast ratios
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Link opens in new tab if external

### Accessibility Testing Tools to Run Before Each Release

1. **axe DevTools** — browser extension for automated accessibility audit
2. **Lighthouse** — built into Chrome DevTools
3. **Tab through the page** — manual keyboard audit
4. **Color contrast checker** — ensure all text meets 4.5:1 ratio
5. **Zoom to 200%** — ensure no content is clipped

## 9. Timeline & Priorities

### Phase 1 — Next Sprint (Current)

| Priority | Item | Effort | Dependencies |
|----------|------|--------|--------------|
| 🔴 P0 | Add inline form validation to Contact | Medium | None |
| 🔴 P0 | Create constants/ directory | Medium | None |
| 🔴 P0 | Extract custom hooks | Medium | None |
| 🟡 P1 | Project thumbnails | High | Image assets |
| 🟡 P1 | Button component | Low | None |
| 🟡 P1 | Blog section | High | Content creation |

### Phase 2 — Short-term

| Priority | Item | Effort | Dependencies |
|----------|------|--------|--------------|
| 🟡 P1 | Skill proficiency indicators | Medium | Data design |
| 🟡 P1 | Card component | Low | Button component |
| 🟡 P1 | Improve project content | Medium | Content writing |
| 🟡 P1 | SectionHeading component | Low | None |
| 🟡 P2 | Testimonials section | Medium | Collect content |
| 🟡 P2 | Resume download | Low | PDF creation |
| 🟡 P2 | Badge component | Low | None |

### Phase 3 — Medium-term

| Priority | Item | Effort | Dependencies |
|----------|------|--------|--------------|
| 🟡 P2 | Scroll progress indicator | Low | None |
| 🟡 P2 | JSON-LD structured data | Low | None |
| 🟡 P2 | Timeline section | Medium | Content |
| 🟡 P2 | About section enhancement | Low | Content |
| 🔵 P3 | Mobile bottom nav | Medium | User research |
| 🔵 P3 | E2E tests | High | Testing infra |

### Phase 4 — Long-term / Stretch

| Priority | Item | Effort | Dependencies |
|----------|------|--------|--------------|
| 🔵 P3 | Reading time indicators | Low | Blog section |
| 🔵 P3 | Keyboard shortcuts | Medium | Feature design |
| 🔵 P3 | Performance monitoring | Medium | Analytics setup |
| 🔵 P3 | Theme toggle architecture | Medium | Design exploration |
| 🔵 P3 | "Currently" section | Low | None |

---

*This roadmap is a living document. Priorities should be re-evaluated after each major deployment based on feedback, analytics, and changing goals.*

*Last updated: July 22, 2026*

- Animated on scroll with staggered reveals
