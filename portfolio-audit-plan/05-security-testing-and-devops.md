# 05 — Security, Testing & DevOps

**Pillar score: 4.0 / 10**

Security posture is *clean for a static portfolio* (no secrets, no user-supplied HTML, `rel="noopener noreferrer"` discipline, CSP-friendly static output). The score collapses on engineering hygiene: **zero automated tests, zero CI, zero formatting tooling, 4 failing lint rules, no typecheck script, and no git hooks.** For hiring purposes this is the weakest pillar — a "green build in CI with tests" is the fastest credibility win available.

---

## Section 1: Security Risk Assessment

### 1.1 Secrets & credentials — ✅ clean

- [x] `.env*` ignored by `.gitignore`; no API keys, tokens, or passwords found in tracked files.
- [x] `info.md` (committed) contains personal data (full name, phone `+63...`, email, resume content) — not a credential leak, but **PII in a public repo**; consider removing or redacting (see 06 §3.2).
- [ ] Run `git log -p` / `gitleaks` or `trufflehog` once to confirm no secret was ever committed and removed.

### 1.2 XSS & injection — ✅ low risk, two notes

- [x] `dangerouslySetInnerHTML` appears only in `JsonLd.tsx` with `JSON.stringify` of static, hardcoded data — safe (no user input).
- [ ] Future-proof: if any user/content input is ever rendered, switch JSON-LD to serialized React (`<script type="application/ld+json" dangerouslySetInnerHTML>` is acceptable only for trusted static data). Add a comment in `JsonLd.tsx` stating this invariant.
- [ ] Contact form posts to Formspree with `new FormData(e.target)` — the Formspree endpoint is public by design (client-side form backend); acceptable. Note: `name`/`email`/`message` are submitted without client-side validation beyond `required` — add `minLength` and `type="email"` hardening (already `type="email"` on email input).

### 1.3 External links & phishing hygiene

- [x] All `target="_blank"` links use `rel="noopener noreferrer"` — verified in Navbar, Footer, Contact, Projects, MapView.
- [ ] **Fix:** the Profanity Detection API project link contains a full `fbclid` Facebook tracking parameter (`.../?fbclid=IwY2xjawT...`) — clean it to the bare URL. It's ugly, leaks analytics noise, and looks unprofessional in a portfolio.
- [ ] **Fix:** CommandPalette hardcodes project URLs (some with `.git` suffixes); consolidate all project/social URLs in one typed data module (`data/projects.ts` + `lib/seo.ts`) so links stay consistent and auditable.

### 1.4 Dependencies

- [ ] Run `npm audit` and record results; with React 19 + Next 16.2.1 the surface is small, but make it a habit (see CI §3).
- [ ] Pin exact versions or stay on `^` with a lockfile (lockfile is committed — good); consider `npm audit --omit=dev` in CI.

### 1.5 Headers & CSP

- [x] Static export → no server headers today; on Vercel you get platform defaults.
- [ ] Add a `next.config.ts` `headers()` for `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` (or rely on Vercel's `_headers`/security defaults) when the site gets server hosting.
- [ ] If a light-touch CSP is added, keep `style-src 'unsafe-inline'` (Tailwind v4 + inline styles are used heavily) and note it in the config comment.
- [ ] Leaflet tile requests go to `*.tile.openstreetmap.org` — if a strict CSP is ever added, allowlist it.

---

## Section 2: Test Coverage & Quality Gates

### 2.1 Current state — 🚨 zero tests

Verified: no `*.test.*`/`*.spec.*` in the project (only `.mimocode/node_modules` hits), no test runner in `package.json` (`test` script absent), no Vitest/Jest/Playwright/Cypress binaries installed.

### 2.2 Recommended test stack (2026 standard for a Next 16 + React 19 repo)

- [ ] **Vitest + React Testing Library + `jsdom`** for unit/component tests (fast, Vite-native, works with Tailwind v4 + TS out of the box).
- [ ] **Playwright** for E2E smoke tests (SSR render, nav, palette, contact form, mobile viewport).
- [ ] Add scripts to `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit"
  }
}
```

### 2.3 Highest-value test targets (order matters)

- [ ] **UI primitives**: `Button` variants/disabled, `Input`/`Textarea` label + error wiring (`aria-describedby`), `Dialog` focus trap + Escape close + focus restore.
- [ ] **CommandPalette**: filtering, arrow-key selection, Enter execution, "Download resume" command (this test will fail today — the action is a no-op; fix it first, see 06 §2.3).
- [ ] **Navbar**: active-section tracking, mobile menu open/close, Escape handling, `aria-current` on active link.
- [ ] **Contact form**: mock `fetch` → success state swap, error path (replace `alert()`), submit-disabled while sending.
- [ ] **E2E smoke**: homepage renders all sections, skip link works, palette opens via ⌘K/ctrl+K, project cards open external links with `rel` attributes, mobile menu works at 375 px.
- [ ] **A11y regression**: axe-core assertions in Playwright (`page.accessibility` or `@axe-core/playwright`) pinned to the AA ruleset.

### 2.4 Quality gates to wire into CI

- [ ] `npm run lint` — must pass with 0 errors (fix the 4 `react-hooks/set-state-in-effect` errors first, see 02 §3.2).
- [ ] `npm run typecheck` — must pass (currently passes).
- [ ] `npm run build` — must pass (currently passes in ~8 s).
- [ ] `npm test` + `npm run test:e2e` — must pass.
- [ ] Coverage gate on pure logic (data modules, `cn`, palette filtering): ≥ 80% lines for `lib/` and `data/`.

---

## Section 3: CI/CD Pipeline & Repository Hygiene

### 3.1 CI/CD — 🚨 absent

No `.github/workflows/`, no GitLab CI, no CircleCI. Every quality gate is manual.

**Proposed Best Practice — GitHub Actions workflow:**
```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run build
      - run: npm test
      - run: npx playwright install --with-deps && npm run test:e2e
```
- [ ] Add the workflow above.
- [ ] Add branch protection: require CI to pass before merge to `main`.
- [ ] Add `npm audit --omit=dev` as a non-blocking informational step or a scheduled dependency-update reminder (Dependabot/Renovate).

### 3.2 Lint & format tooling

- [ ] **Fix 4 lint errors** (`Hero`, `CommandPalette` ×2, `ThemeProvider`) — React 19's `react-hooks/set-state-in-effect` rule (02 §3.2 has the refactor patterns).
- [ ] **Fix 9 warnings**: unused imports (`Sun`, `Moon`, `theme`, `toggleTheme` in Navbar; `Send` in Contact; `currentLine` in TerminalArtifact; unused `index` params). Most disappear when dead code is deleted (02 §2.2).
- [ ] Add **Prettier** + `prettier-plugin-tailwindcss` with a `.prettierrc` (single quotes, 2-space — matching the current style) and a `format` script; add a `.editorconfig`.
- [ ] Add a **pre-commit hook** (`lint-staged` + `husky`) running eslint + prettier on staged files — prevents the current state (errors committed to `main`) from recurring.

### 3.3 Repository hygiene

- [x] 41 commits, single author (`jobelGolde12`), descriptive imperative messages ("Add trailmates project", "Make skills responsive") — good discipline; keep it.
- [ ] **Commit noise:** `ecf1a0b Remove toggle theme feature` left the `ThemeProvider` dead code behind — commit messages are honest, the code just wasn't fully cleaned. Pair commits with cleanup.
- [ ] **`info.md` at repo root** — a resume dump with a phone number, committed. Move personal data out of the repo or into `.gitignore`; keep the repo professional.
- [ ] **`.mimocode/plans/` committed** — agent tooling artifacts in the public repo. Gitignore `.mimocode/` or move plans to `docs/` if they're valuable.
- [ ] **`docs/AUDIT_REPORT.md` is stale** (describes the old Manrope/`#1E1B20` build). Regenerate or archive with a date prefix.
- [ ] **`docs/ROADMAP.md` is excellent and current** — keep it updated as tasks land; check off completed items (e.g., the scroll progress bar now exists).
- [ ] Add a **`CHANGELOG.md`** or rely on conventional commit messages for release notes.
- [ ] Consider a `.nvmrc`/`engines` field (`node >= 20`) so the project runs predictably anywhere.

### 3.4 Deployment

- [ ] Confirm the production deploy target (Vercel per README); add a `vercel.json` or keep defaults.
- [ ] `gh-pages` is installed but unused — if static export is the goal, restore `images.unoptimized`? No — `next.config.ts` deliberately removed `unoptimized`; keep Vercel/`next start` as the primary path and remove `gh-pages` (02 §2.2).
- [ ] Add a deploy status badge (e.g., Vercel) to the README once CI exists.
