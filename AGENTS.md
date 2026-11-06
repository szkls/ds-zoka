# AGENTS.md — how to build screens with RV Design

This repository is the code twin of the Figma file **"DS - Test"** (white-label design system). Everything here is derived from Figma and must stay 1:1 with it: tokens, component anatomy, states, and usage rules. An agent building a screen should **compose the existing components** and never restyle them.

## 1. Where things are

| What | Where |
|---|---|
| Component registry (machine-readable) | `registry.json` — one entry per component: import, props, example, Figma page, docs path |
| Component docs (usage rules, do/don't, notes) | `docs/components/*.md` |
| Component code | `src/components/<Name>/<Name>.tsx` + `.css` |
| Public entry | `src/index.ts` (`import { Button, Input, … } from 'rv-design'` or `@/index`) |
| Design tokens (CSS custom properties) | `src/tokens/tokens.css` (generated) · names in `src/tokens/index.ts` · resolved values in `src/tokens/resolved.json` |
| Text styles | `src/tokens/typography.css` → classes `.rv-text-{size}-{weight}` (e.g. `.rv-text-sm-medium`) |
| Icons | `src/icons/Icon.tsx`, names in `src/icons/paths.ts` (`iconNames`) — Phosphor set, stroke-based |
| Raw Figma exports (source of truth) | `tokens/figma/**` — do not edit by hand |

## 2. Set up a page

```tsx
import 'rv-design/src/styles/index.css';   // tokens + base, once
```
```html
<html data-theme="light" data-brand="boreal" data-device="desktop">
```
- `data-theme`: `light` | `dark` (Figma collection 3a. semantic.color)
- `data-brand`: `boreal` | `sylva` (2a. brand — colours, font family, radii)
- `data-device`: `desktop` | `mobile` (3c. semantic.layout — sizes, the `device` variable). Switch it at the 768 px breakpoint; the Header changes composition with it.

Fonts: Boreal uses **Inter**, Sylva uses **Raleway** (load them, e.g. Google Fonts as in `index.html`).

## 3. Rules when composing a screen

1. **Use components, not raw HTML**, for anything that exists here: Button, Badge, Alert, Banner, Checkbox, Radio, Input, Select, Dropdown, Accordion, Avatar (+ AvatarUser, AvatarGroup), Breadcrumb, Tabs, Header.
2. **Use tokens for everything else** (page layout, spacing, custom containers): `var(--rv-padding-lg)`, `var(--rv-gap-md)`, `var(--rv-background-neutral-subtlest)`, `var(--rv-text-neutral-soft)`, `var(--rv-radius-lg)`, `var(--rv-shadow-sm)`, text classes `.rv-text-md-semi-bold`. Never hard-code a colour, size or font.
3. **Follow the usage rules** in `docs/components/*.md` ("When to use", "Layout", "Do and don't"). They come from the Figma Utilisation boards. Examples: one filled Button per view; Alert for page feedback, Banner for site-wide, Badge for a state word; Radio for 2–7 options, Select for 6–15; label above the field, hint below.
4. **Do not override component CSS**. If a composition needs something the system lacks (toast, switch, textarea, link, modal, table…), build it with tokens, mark it clearly as *not in the design system*, and list it in the hand-off so it can be added to Figma first.
5. **Icons**: `<Icon name="…" />` only with names from `iconNames`. Icon next to text takes the text colour; stroke 1.2 next to regular text, 1.5 next to medium (`weight` prop).
6. **Accessibility**: components ship their semantics (labels, roles, focus rings, keyboard). Keep the Label on inputs, give icon-only buttons a `label`, give an Avatar status in words.
7. **Layout defaults**: desktop frame 1440 × 1024, mobile 390 × 844 (test at 360). Page content padding `padding/3xl` on desktop, `padding/lg` on mobile. Form fields stack in one column, `gap/lg`–`gap/xl` apart.

## 4. Token naming (CSS)

| Figma collection | CSS prefix | Example |
|---|---|---|
| 3a. semantic.color | `--rv-<name>` | `--rv-background-brand-base`, `--rv-text-neutral-soft`, `--rv-icon-system-error-base`, `--rv-border-neutral-subtler` |
| 3c. semantic.layout | `--rv-<name>` | `--rv-size-xl`, `--rv-padding-md`, `--rv-gap-sm`, `--rv-radius-md`, `--rv-border-xs`, `--rv-opacity-disabled` |
| 3b. semantic.typography | `--rv-font-<name>` | `--rv-font-size-sm`, `--rv-font-line-height-sm`, `--rv-font-weight-medium`, `--rv-font-family-sans` |
| 2a. brand | `--rv-brand-<name>` | `--rv-brand-color-base` (prefer the semantic tokens) |
| 1a/1b/1c primitives | `--rv-colors-…`, `--rv-type-…`, `--rv-layout-…` | only for exceptions already flagged in Figma |
| Effect styles | `--rv-shadow-{xs…2xl}`, `--rv-focus-ring-{brand\|neutral\|error}` | `box-shadow: var(--rv-shadow-md)` |

A Figma token name maps mechanically: replace `/` by `-` and add the prefix (`cssVar()` in `src/tokens/index.ts` does it).

## 5. Checklist before handing a screen back

- [ ] Only components from `registry.json` + token-based layout
- [ ] Works in `data-theme="dark"`, both brands, and `data-device="mobile"`
- [ ] One primary action; statuses used as the docs say; labels in sentence case
- [ ] Anything not in the system is listed as a proposal for Figma
