# RV Design

React + TypeScript design system mirrored **1:1 from the Figma file "DS - Test"**: design tokens (colour, typography, layout, effects, with Light/Dark × Boreal/Sylva × Desktop/Mobile modes), 14 components with every Figma variant and state, the icon set, and the usage guidelines written on the Figma documentation boards.

Built so that an agent (see `AGENTS.md` and `registry.json`) can pick components and guidelines to assemble screens.

## Quick start

```bash
npm install
npm run dev        # demo page with every component + theme / brand / device switches
npm run build      # typecheck + production build (regenerates tokens, icons, registry first)
```

Use in an app:

```tsx
import 'rv-design/src/styles/index.css';
import { Button, Input, Alert } from 'rv-design';

<html data-theme="light" data-brand="boreal" data-device="desktop">
```

## Structure

```
tokens/figma/            raw exports from Figma (variables, text/effect styles, component specs, usage texts, icon paths)
scripts/build-tokens.mjs → src/tokens/tokens.css, typography.css, resolved.json, index.ts
scripts/build-icons.mjs  → src/icons/paths.ts
scripts/build-registry.mjs → docs/components/*.md, registry.json
src/components/<Name>/   React component + CSS (data-attributes mirror the Figma properties)
src/demo/                showcase page (npm run dev)
docs/components/         one page per component: import, props, example, when to use, layout, do/don't, notes
AGENTS.md                rules for building screens with the system
```

## Figma ↔ code mapping

- **Variables** → CSS custom properties, one block per collection and mode (`:root`, `[data-theme="dark"]`, `[data-brand="sylva"]`, `[data-device="mobile"]`). Aliases stay aliases (`var(--rv-brand-color-base)`), so a brand or theme switch cascades exactly like in Figma.
- **Text styles** `{size}/{weight}` → `.rv-text-{size}-{weight}` classes.
- **Effect styles** → `--rv-shadow-*`, `--rv-focus-ring-*` box-shadows.
- **Components** → one React component per Figma component set; Figma variant properties become props (`type`, `variant` for Figma *style*, `size`, `status`…); `state` is handled by CSS (`:hover`, `:focus-visible`, `:disabled`).
- **Icons** → stroke SVG paths exported from the Figma icon set (Phosphor); `strokeWidth` follows the 1.2 / 1.5 rule.

## Known gaps (also written on the Figma boards)

- No Link, Switch, Toast, Textarea, Modal yet — the components that reference them (Alert/Banner action, Dropdown) use a ghost Button for now.
- Avatar out-of-office uses the primitive `colors/pink/500` (no semantic token yet); accordion icons are 14 px (no size token); checkbox check is 10 px; radio dot 6 px — all fixed values as in Figma.
- Static-black / static-white Button focus variants have no ring in Figma; the code uses `focus-ring/neutral`.
