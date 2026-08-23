# Content Analysis

## Hierarchy evaluation (TODO §8)

Visitor should learn: who → what → capable of → built with what → why it matters → contact.

**Before:** name only in hero (what/why missing); About pushed skills ~10 screens away;
Services interrupted proof-of-work; fake testimonials before Contact.

**After (executed):**

1. **Hero** — who (name), what ("Building systems that stay boring under load."),
   where (Sorsogon, PH), stack chips, two CTAs.
2. **About** — summary, education, based-in (+ map), languages, interests. Scannable.
3. **Skills** — proof of capability with honest proficiency levels.
4. **Projects** — the proof: 5 case studies w/ problem/approach/trade-offs/outcomes,
   visible demo/repo links + dialog detail.
5. **Services** — offering for freelance leads.
6. **Experience** — timeline kept (real university/community projects; no invented roles).
7. **Contact** — form + email copy + socials + résumé via palette & footer… plus a
   visible "Download résumé" link added to Contact info column (was palette-only).

## DOs implemented (TODO §6)

- Positioning: role/specialization/value prop/stack/CTA above the fold. ✔
- Strong hero answering "who/what/why care" without clichés. ✔
- Projects communicate problem/solution/features/outcome/screenshots/demo/source. ✔
- Evidence of capability: real deployed URLs + public repos + written posts. ✔
- Clear nav: About/Skills/Projects/Blog/Contact. ✔
- Strong CTAs: See projects / Get in touch / View case study / Visit live site /
  Download résumé. ✔
- Personality: mono micro-labels, rotating specializations, Filipino-context projects
  (Suitora, Profanity API) — professional but human. ✔

## DON'Ts enforced (TODO §7)

| Rule | Action |
|---|---|
| Fake testimonials | **Section removed** (`Testimonials.tsx`, `data/testimonials.ts` deleted). Data file self-declared as placeholder samples. Documented per §18. |
| Fake statistics | "Systems operational" footer badge removed. No user/project/revenue numbers anywhere; project outcomes use factual deployment claims only. |
| Tech wall | Hero stack trimmed to 6 core chips; full inventory stays in Skills with levels. |
| Hero overload | One paragraph max; 2 CTAs; no badge clusters; animations ≤ quiet reveals. |
| Excessive glassmorphism/motion | Glass removed globally; parallax/blobs/grain deleted; motion = fade/rise + arrow shifts. |
| Hidden information | Case-study links visible on the listing itself; hover-only affordances removed. |
| Unnecessary sections | Testimonials cut; every remaining section has a distinct job. |

## Content preservation (TODO §18)

Kept: all 5 projects incl. repo-only Dugtong; timeline entries (factual); education;
map/location; blog posts; command palette; Formspree form; résumé PDF link.
Removed (documented): testimonials data, `me2.webp` asset, dead theme/background
components. Nothing factual was invented anywhere.

## Project prioritization (TODO §9)

Order chosen by relevance-to-target-role × demonstrated engineering depth (not chronology):
1. Profanity Detection API (public API, real integrations, niche domain expertise)
2. TrailMates (full-stack Laravel+Vue, deployed)
3. TaskMind (React+TS product thinking, deployed)
4. Suitora (distinctive UX/product identity, deployed)
5. Dugtong (open-source collaboration evidence)
