# UX Analysis

## Recruiter test (10–15 seconds)

- **Who:** "Jobel Golde." — huge thin headline, first fixation. ✔
- **What:** eyebrow "Software engineer" + display line "Building systems that stay boring
  under load." + stack chips (Laravel/React/Next.js/Vue/TS/MySQL). ✔
- **Where/availability:** location line + availability badge in Contact; résumé one click
  (palette + Contact link). ✔
- **Proof within one scroll:** project index starts immediately after Skills with visible
  demo/repo links — no scroll-scrubbing mini-game. ✔

## Hiring-manager signals

- Case studies expose problem → approach → trade-offs → outcomes (engineering judgment).
- Honest skill levels ("currently exploring" at level 1–2) signal self-awareness.
- Blog posts discuss polling-vs-websockets, RBAC, state-machine-first design.
- No inflated claims anywhere.

## Interaction inventory (kept/improved)

| Interaction | Status |
|---|---|
| Command palette (⌘K) | Kept; restyled to new tokens. |
| Case-study dialog (focus trap, Esc, restore focus) | Kept; de-darked, radius flattened. |
| Copy email button | Kept; success feedback via label swap + icon. |
| Formspree contact form | Kept; `alert()` replaced by inline `role="alert"` error region; success panel kept. Loading/disabled states kept. |
| Mobile menu | Kept (dialog semantics, Esc); restyled flat. |
| Active-section nav highlighting | Kept via IntersectionObserver. |
| Back-to-top | Kept in footer bottom bar. |
| Scroll-hide navbar | Kept (returns on scroll-up / when menu open). |
| Scroll progress bar | **Removed** — decorative, competes with quiet header spec. |
| Hover-only reveal hints | **Removed** — replaced by always-visible links (touch-friendly). |

## Motion policy

Reveals: fade + 8–16px rise, 400–500ms, once. UI transitions: 150–220ms.
Hover: color shifts, arrow translate 3–4px, image scale ≤1.025 inside overflow crop.
All decorative loops (blob morph, glow pulses, parallax, floating) removed.
`prefers-reduced-motion`: global CSS kill-switch retained + framer's `useReducedMotion`
where JS-driven (rotating specialization text).

## Empty states / error states

- Form: inline error message region (`role="alert"`), disabled+spinner submit,
  success panel with heading. ✔
- Palette: "No results found" empty state. ✔
- 404/error pages: restyled to white editorial; actions preserved (Try again / Back home).
