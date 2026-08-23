# SEO Plan

## Already in place (verified, kept)

- `metadataBase`, title template `%s | Jobel V. Golde`, default title/description.
- Canonical (`alternates.canonical`), robots directives incl. `max-image-preview: large`.
- Open Graph + Twitter `summary_large_image` with existing `/og-default.png` (1200×630).
- JSON-LD: Person (+sameAs, alumniOf, address) / WebSite / Organization.
- `sitemap.ts` (home + blog posts w/ pinned dates) · `robots.ts` (allows all, sitemap ref).
- Semantic single-h1 pages; descriptive link text; image alt text.

## Changed in this pass

- Added `export const viewport` with white `themeColor` (matches new canvas) and
  `viewport: width=device-width, initial-scale=1`.
- Hero copy now leads with role + value proposition ("Building systems that stay boring
  under load.") — matches `SITE_CONFIG.description` claims; no keyword stuffing.
- Removed fake testimonials section → removes fabricated endorsement content from the
  crawlable page (trust signal).

## Deferred (owner action)

- Regenerate `/og-default.png` in light branding via `npm run generate:og` when desired —
  current dark OG is still accurate for name/role.
- Replace generated placeholder résumé PDF with the real file.
