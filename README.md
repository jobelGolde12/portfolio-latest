# Jobel V. Golde — Portfolio

> Full-stack developer building systems that stay boring under load.

🔗 **Live site:** [jobelgolde.dev](https://jobelgolde.dev)

A dark, editorial-style portfolio built with a modern 2026 stack — **Next.js 16 (Turbopack), React 19, TypeScript (strict), Tailwind CSS v4, and Framer Motion**.

---

## ✨ Highlights

- **Token-driven design system** — colors, type ramp, spacing, radius, and motion easing defined once in `app/globals.css` and consumed as Tailwind v4 utilities via `@theme inline`.
- **Custom interactions** — scroll-driven horizontal projects gallery, a timeline whose line "paints" each node as you scroll, mouse parallax hero, and a ⌘K command palette (try it on the live site).
- **SEO complete** — JSON-LD structured data (Person/WebSite/Organization), Open Graph + Twitter cards, canonical URLs, `sitemap.xml`, and `robots.txt`.
- **Accessibility-minded** — skip link, focus management, `aria-current` navigation states, and `prefers-reduced-motion` support throughout.
- **Performance-aware** — `next/image` with `sizes`/`priority` and AVIF/WebP formats, self-hosted fonts via `next/font`, lazy-loaded Leaflet map.

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, Framer Motion, Lucide Icons |
| Language | TypeScript (strict mode) |
| Mapping | Leaflet + react-leaflet (dynamically imported) |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel (static prerender) |

## 🚀 Getting Started

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:3000
```

### Quality checks

```bash
npm run lint        # ESLint (0 errors, 0 warnings)
npm run typecheck   # tsc --noEmit
npm test            # Vitest unit tests
npm run test:e2e    # Playwright browser smoke tests
npm run build       # production build
```

### Asset scripts

```bash
npm run generate:og         # regenerate public/og-default.png (1200×630)
npm run generate:resume     # regenerate public/jobel-golde-resume.pdf
npm run optimize:images     # re-compress images to WebP
```

## 📁 Project Structure

```
app/            routes, metadata, sitemap, robots
components/     section components + ui primitives
lib/            seo config, utils
public/         images, logo, resume, og card
scripts/        asset generation & optimization (node)
docs/           roadmap & audit notes
```

## 📄 Documentation

- [Roadmap & planned features](docs/ROADMAP.md)
- [Audit report](docs/AUDIT_REPORT.md)

## 📬 Contact

- **Email:** jobelgolde45@gmail.com
- **GitHub:** [jobelGolde12](https://github.com/jobelGolde12)
- **LinkedIn:** [jobel-golde-6a8822411](https://www.linkedin.com/in/jobel-golde-6a8822411/)
- **Download resume:** [`public/jobel-golde-resume.pdf`](public/jobel-golde-resume.pdf)

---

Built with Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript
