# 03 — Performance & Modern Standards (2026)

**Pillar score: 8.0 / 10**

The stack is genuinely current — Next.js 16.2.1 with Turbopack, React 19, Tailwind v4, `next/image` with AVIF/WebP and explicit `sizes`/`priority`, `next/font` self-hosted fonts (no layout shift), and a lazy-loaded Leaflet map. Production build completes in ~8 s with all routes static. The main deductions: **every section is a client component** (whole page hydrates Framer Motion + Lucide), oversized PNG assets, duplicate `mousemove`-driven re-renders, and an unbounded infinite animation.

---

## Section 1: Bundle Size & Hydration Efficiency

### 1.1 All page content is client-rendered

`app/page.tsx` imports 8 section components, each marked `'use client'`. The only server components are `layout.tsx`, `page.tsx`, `JsonLd.tsx`, and the `app/` route files. Everything else ships to the client bundle: Framer Motion, Lucide icons, and every section's JS.

**Current Code (Flaw) — `app/page.tsx`:**
```tsx
import Hero from '@/components/Hero';      // 'use client'
import About from '@/components/About';    // 'use client'
// ... all 8 sections are client components
```

**Proposed Refactor (Best Practice) — keep static sections on the server:**
```tsx
// Remove 'use client' from sections with no motion/state (e.g., a static Projects list)
// Or use composition: server component renders static content, <ClientMotion> wraps only animated pieces.
import Hero from '@/components/Hero';      // server wrapper
import HeroContent from '@/components/HeroContent'; // small client island
```

- [ ] Audit each section for the minimal client surface: `Skills`, `Services`, `Projects` (non-scroll variant), `Timeline` use motion but their *data* could render server-side with a tiny client wrapper.
- [ ] Move `JsonLd` and section *content data* out of client bundles entirely (they already are for JsonLd — keep it that way).
- [ ] Consider `next/dynamic` with `ssr: false` only where truly interactive (already done correctly for `MapView`).
- [ ] Add a bundle budget: run `next build` and note the per-route sizes; set a target (e.g., < 180 KB gzip JS for the homepage) and re-check after the refactor.
- [ ] Explore `React Compiler` / React 19 `useActionState` for the contact form later (form is currently a plain client fetch — fine at this scale).

### 1.2 Dead code still bundles

- [ ] `TerminalArtifact`, `ui/tooltip.tsx`, `ui/card.tsx` ship zero bytes today because they're unimported (unused exports are tree-shaken), but the **installed-but-unused deps** (`lenis`, `gh-pages`, `@fontsource/instrument-serif`) inflate `package-lock` and `node_modules`, and any stray import would silently add weight. Remove them (see 02 §2.2).
- [ ] `ThemeProvider`'s dead light-theme tokens and `toggleTheme` stay in the shipped CSS/JS — strip when the theme decision lands (02 §3.2).

### 1.3 Re-render risk: mousemove-driven state on two layers

Both `Hero.tsx` and `DarkBackground.tsx` attach `window` mousemove listeners that call `setMousePosition` on **every mouse event** (no `requestAnimationFrame` throttle). Combined with framer-motion transforms on those values, this can re-render two large subtrees at pointer speed.

**Current Code (Flaw):**
```tsx
const handleMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  setMousePosition({ x, y });   // runs on every mousemove, no rAF
};
window.addEventListener('mousemove', handleMouseMove);
```

**Proposed Refactor (Best Practice) — use motion values instead of state:**
```tsx
// Framer Motion can drive transforms without React re-renders:
import { useMotionValue, useSpring } from 'framer-motion';
const mx = useMotionValue(0);
const my = useMotionValue(0);
const springX = useSpring(mx, { stiffness: 120, damping: 20 });

// in the listener:
mx.set((e.clientX / window.innerWidth - 0.5) * 2 * 20);
my.set((e.clientY / window.innerHeight - 0.5) * 2 * 20);

// style={{ x: springX, y: springY }} — no setState, no re-render
```

- [ ] Replace `setMousePosition` with `useMotionValue` + `useSpring` in `Hero` (and the shared `useMouseParallax` hook from 02 §2.3) — removes re-renders entirely.
- [ ] Ensure a single window mousemove listener exists (merge `Hero` + `DarkBackground` usage).

---

## Section 2: Core Web Vitals & Asset Optimization

### 2.1 LCP — good, with one risk

- [x] LCP candidate is the hero H1 (`clamp(3.5rem–7rem)` white on near-black) — renders instantly; the portrait (`/me2.png`, 161 KB) has `priority` + `sizes="(max-width: 1024px) 100vw, 520px"` — correctly optimized.
- [x] Fonts via `next/font` (Geist Sans/Mono + Fraunces) with `display: 'swap'` — zero FOUT/CLS from fonts.
- [ ] **Risk:** `mix-blend-multiply` on the portrait (`scale-105 mix-blend-multiply`) against a near-black background can crush the image to near-invisible on some GPUs/printers. Verify visually on dark + light sections; prefer `opacity`/`contrast` filters or `isolation: isolate` on the parent.
- [ ] **Measure:** run Lighthouse + Web Vitals (the repo's own `TODO.md` still has "Lighthouse audit — Run manually" unchecked) and record LCP/INP/CLS into `docs/ROADMAP.md`.

### 2.2 Asset weight — the biggest single win

| Asset | Size | Usage | Verdict |
|---|---|---|---|
| `public/jobel_logo.png` | **729 KB** | Navbar + Footer | 🔴 Should be ≤ 60 KB (SVG or compressed PNG/WebP) |
| `public/images/project_trailmates.png` | **1.32 MB** | Project card | 🔴 Compress to ≤ 300 KB WebP/AVIF |
| `public/images/project_suitora.png` | **1.03 MB** | Project card | 🔴 Compress |
| `public/images/project_dugtong.png` | 153 KB | Project card | 🟡 Fine, could halve |
| `public/profile.jpg` | 274 KB | About sticky portrait | 🟡 Compress |
| `public/me2.png` | 161 KB | Hero LCP | 🟡 Compress (LCP asset) |
| `public/images/project_profanity_api.png` | 52 KB | Project card | 🟢 Good |
| `public/images/project_taskmind.png` | 68 KB | Project card | 🟢 Good |

**Proposed Refactor (Best Practice):**
```tsx
// next.config.ts — add explicit quality + minimum cache TTL for images
images: {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  ...
}
```
```tsx
// Projects.tsx — constrain delivery size on heavy screenshots
<Image
  src={project.image}
  alt={project.title}
  fill
  sizes="70vw"
  quality={75}          // default is 75; drop to 70 for screenshots
  className="object-cover ..."
/>
```

- [ ] Re-encode the logo + 2 largest screenshots offline (sharp/ImageMagick/squoosh) to WebP/AVIF ≤ 300 KB; replace files in `public/`.
- [ ] Add `quality` where appropriate; confirm `formats` + `minimumCacheTTL` in `next.config.ts`.
- [ ] Consider lazy-loading non-priority project images below the fold (they already are, via `next/image` — verify `loading="lazy"` is applied to the `i >= 2` cards; add explicitly if not).
- [ ] Add `og-default.png` (1200×630) — currently missing entirely, so every social share 404s (see 06).

### 2.3 CLS & layout stability

- [x] All images use `fill` inside aspect-ratio/`paddingBottom` boxes or explicit `width/height` — no layout shift from images.
- [ ] The rotating hero specialization uses absolutely-positioned overlapping spans with an `invisible` spacer — verify the spacer's width matches the widest word to avoid CLS (the `invisible` span pattern is correct if it's always the *current* word; long words like "full-stack web apps" vs "developer tooling" can still shift. Test with a viewport change).
- [ ] The `scroll-smooth` on `<html>` + `useScroll`-driven horizontal Projects section (`height: calc(100vh + 265vw)`) is a long sticky region — check for scroll-jank on low-end mobiles; consider `contain` or reducing travel on `lg:` only (see 04 §2 for the mobile UX concern).

### 2.4 INP & interaction readiness

- [x] Navbar scroll handling uses `requestAnimationFrame` batching with a `passive: true` listener — good INP hygiene.
- [x] Buttons have `active:scale` micro-feedback; the palette/dialog animations are ≤ 200 ms — good.
- [ ] `AnimatedBackground`'s infinite 12 s blob loop is not gated by `prefers-reduced-motion` — it keeps the compositor busy on every scroll on low-end devices and violates WCAG 2.3.3. Gate it:
```tsx
const prefersReducedMotion = useReducedMotion();
<motion.div
  animate={prefersReducedMotion ? { opacity: 0.2 } : { x: [0, -40, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 12, repeat: Infinity }}
/>
```
- [ ] The `Timeline` line uses `useScroll` per item (5 instances) + a container instance — fine, but ensure observers disconnect on unmount (they do via `useScroll` internals). No action needed unless profiling shows otherwise.

### 2.5 Caching & delivery

- [x] Everything is statically prerendered (`○` routes) — optimal for a portfolio; CDN-cacheable by default on Vercel.
- [ ] Add `export const revalidate` or keep fully static (current behavior is fine); if the site moves to a different host, keep the static export in mind (`next.config.ts` comment already flags this).
- [ ] `robots.txt` correctly disallows `/api/`, `/_next/`, `/static/`.

---

## Section 3: Modern Engineering Checklist (2026)

- [x] **Next.js 16 + Turbopack** — dev + build on Turbopack (verified in build output: "Next.js 16.2.1 (Turbopack)").
- [x] **React 19** (19.2.4) with `react-dom` 19 — current.
- [x] **TypeScript 5 strict** — no `any`.
- [x] **Tailwind CSS v4** with `@theme inline` token mapping — modern approach; partial adoption of custom `--text-*`/`--space-*` tokens (some components still hardcode `text-[0.65rem]`, `py-24`, `bg-[#0a0a0a]`).
- [x] **`next/image`** with `formats` (AVIF/WebP), `deviceSizes`, `sizes` attributes, `priority` on LCP.
- [x] **`next/font`** self-hosted fonts — no external font requests, no CLS.
- [x] **`next/dynamic` + `ssr: false`** for Leaflet (avoids SSR hydration mismatch + shrinks initial JS).
- [x] **Metadata API**: `metadataBase`, templates, OG/Twitter, canonical, robots, sitemap — complete.
- [x] **CSS `prefers-reduced-motion` global override** + per-component `useReducedMotion` in most animation sites.
- [ ] **Server Components / React islands** — the single biggest modernization gap (Section 1.1).
- [ ] **`useTransition`/`useOptimistic`** — not applicable yet (no mutations); when the contact form gets an API route, use them.
- [ ] **Testing framework** — absent (see 05 §2): add Vitest + Testing Library.
- [ ] **E2E** — absent (see 05 §2): add Playwright smoke test.
- [ ] **CI** — absent (see 05 §3): add GitHub Actions.
- [ ] **Bundle-size CI guard** — absent: add `size-limit` or a `next build` size assertion.
- [ ] **Formatting** — no Prettier config: add `prettier` + `prettier-plugin-tailwindcss` (class sorting catches the inconsistent utility ordering seen across components).
- [ ] **Design tokens drift** — several components bypass tokens (`text-[clamp(...)]`, `bg-[#0a0a0a]`, `text-white/25`) — migrate to `--text-*`/`--color-*` tokens for consistency (ties into 02 §4 Step 4).

### Suggested "Modern Standards" Definition of Done

- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run typecheck` → 0 errors
- [ ] `npm run build` → green
- [ ] Lighthouse (mobile + desktop): LCP < 2.5 s, INP < 200 ms, CLS < 0.1
- [ ] All interactive elements keyboard-focusable with visible focus (see 04)
- [ ] No asset in `public/` > 400 KB (after compression)
