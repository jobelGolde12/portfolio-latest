# Accessibility Plan

## Contrast decisions (WCAG 2.2 AA)

| Token | Value | On white | Usage |
|---|---|---|---|
| `--color-text-primary` | `#171717` | 16.6:1 ✔ | headings/body |
| `--color-text-secondary` | `#555555` | 7.5:1 ✔ | body-secondary, form labels |
| `--color-text-tertiary` | `#777777` | 4.74:1 ✔ | meta text (dates, counts, captions) |
| `--color-text-faint` | `#A0A0A0` | decorative only | eyebrows are *not* faint — they use tertiary/secondary; faint reserved for non-essential marks (aria-hidden or duplicated by text) |
| accent `#D96C92` | — | ~3.5:1 ✘ for text | **decorative only**: dots, hover arrow tint, selection. Never carries meaning alone (TODO §14 "don't rely on color"). Links = primary text + underline. |
| success/danger text | `#1F7A57` / `#B33030` | ≥4.5:1 ✔ | badges/form errors |

## Structure & semantics

- Landmarks: `header`(nav) / `main#main-content` / section `aria-labelledby` → h2 ids /
  `footer`; skip link kept (restyled square, visible on focus).
- Heading order: single h1 (hero) → h2 per section → h3 inside rows/dialog.
- Buttons vs links: real `<a>` for navigation, `<button>` for actions (palette trigger,
  copy email, menu toggle). Project cards remain buttons opening a dialog
  (`aria-label="Open case study: …"` — e2e contract).
- Dialog: role/aria-modal/label, focus trap + restore, Escape, backdrop click close,
  body scroll lock (all pre-existing, preserved).
- Forms: labelled inputs with `aria-describedby` error wiring, `role="alert"` region,
  `aria-live="polite"` status for submit feedback; no `alert()`.
- Icon-only controls keep `aria-label` (menu, palette, socials, back-to-top).
- Images: meaningful alt (`Portrait of Jobel V. Golde`); project images alt = project
  title; decorative layers `aria-hidden`.
- Proficiency dots: existing `aria-label` pattern retained ("Proficiency: advanced").

## Keyboard

- All interactions reachable; visible focus via `focus-visible:ring-2 ring-offset-2`
  using ink/accent tokens on every interactive element.
- Mobile menu + dialogs: Escape closes and restores focus (existing behavior kept).
- Reduced motion: global CSS kill-switch retained; JS animations gate on
  `useReducedMotion` (hero rotation widget falls back to static first item).
