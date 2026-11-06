# Tokens

Generated from the Figma variable collections by `scripts/build-tokens.mjs`. Source: `tokens/figma/primitives.json`, `semantic-color.json`, `semantic-layout-typo-brand.json`.

| Collection | Modes | Count | CSS prefix | Switch |
|---|---|---|---|---|
| 1a. primitive.color | value | 529 | `--rv-colors-*` | — |
| 1b. primitive.typography | Mode 1 | 80 | `--rv-type-*` | — |
| 1c. primitive.layout | Value | 156 | `--rv-layout-*` | — |
| 2a. brand | Boreal, Sylva | 24 | `--rv-brand-*` | `html[data-brand]` |
| 3a. semantic.color | Light, Dark | 353 | `--rv-{background,text,icon,border,effect}-*` | `html[data-theme]` |
| 3b. semantic.typography | Value | 46 | `--rv-font-*` | — |
| 3c. semantic.layout | Desktop, Mobile | 125 | `--rv-{size,padding,gap,radius,border,spacing,breakpoint,container,effect,opacity}-*`, `--rv-device` | `html[data-device]` |

Text styles: `.rv-text-{xs…11xl}-{regular|medium|semi-bold|bold}`. Effect styles: `--rv-shadow-{xs,sm,md,lg,xl,2xl}`, `--rv-focus-ring-{brand,neutral,error}`.

Full list with values per mode: `src/tokens/resolved.json`.
