# SEO Implementation Checklist

## Phase 1 — Foundations

- [x] 1. Create `lib/seo.ts` — SEO constants (production URL, social handles, etc.)
- [x] 2. Fix `next.config.ts` — Remove `images.unoptimized: true`
- [x] 3. Enhance `app/layout.tsx` — metadataBase, title template, canonical, OG, Twitter, hreflang
- [x] 4. Create `components/JsonLd.tsx` — Reusable JSON-LD Person/WebSite/Organization schema
- [x] 5. Import and render `<JsonLd />` in root layout

## Phase 2 — Pages Content

- [x] 6. Update `app/page.tsx` — Add `generateMetadata` with unique homepage meta
- [x] 7. Enhance `app/sitemap.ts` — All routes, proper lastModified, changeFrequency, priority
- [x] 8. Fix `app/robots.ts` — Dynamic sitemap URL generation

## Phase 3 — Components

- [x] 9. Update `components/Navbar.tsx` — Replace `<motion.a>` with `<Link>`, add `aria-current`
- [x] 10. Update `components/Footer.tsx` — Replace `<a>` with `<Link>` for internal nav

## Verification

- [x] `npm run build` — ✅ Compiled successfully, zero TypeScript/lint errors
- [x] `npm run dev` — ✅ Site renders without errors
- [x] JSON-LD present in `<head>` — via `components/JsonLd.tsx` rendered in root layout
- [x] Sitemap/robots endpoints — ✅ Both generated at `/sitemap.xml` and `/robots.txt`
- [ ] Lighthouse audit — Run manually to confirm Core Web Vitals

