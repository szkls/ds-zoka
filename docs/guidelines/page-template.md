# Page template

Validated with the designer on 2026-11-06. Code: `src/layout/Page.tsx` (`Page`, `PageSection`, `PageSubsection`).

| From | To | Token | Desktop | Mobile |
|---|---|---|---|---|
| Header | Breadcrumb | `padding/lg` (page top padding) | 16 | 16 |
| Breadcrumb | Page title | `gap/4xl` | 40 | 24 |
| Page title (`2xl/semi-bold`) | Page description (`md/regular`, `text/neutral/soft`) | `gap/sm` | 8 | 8 |
| Page description | First section | `gap/4xl` | 40 | 24 |
| Section | Next section | `gap/3xl` · divider `border/xs` `border/neutral/subtler` · `gap/3xl` | 32 · 1 · 32 | 24 · 1 · 24 |
| Section title (`lg/semi-bold`) | Section description (`sm/regular`, soft) | `gap/sm` | 8 | 8 |
| Section description | Section content | `gap/2xl` | 24 | 16 |
| Content block | Next content block | `gap/lg` | 16 | 16 |
| Sub-section (avoid; prefer a new section) | Its content | `gap/lg` | 16 | 16 |

Page padding: `padding/lg` top, `padding/3xl` sides (`padding/lg` on mobile), `padding/5xl` bottom. Content max width `container/5xl` (1024).

Forms: fields are always stacked, one per line, never side by side (`.rv-form-fields`, 16 apart); each field keeps the width of the expected answer (320 by default, wider only for free text). In a full-page form the primary button is left-aligned under the fields with the secondary button to its right (`.rv-form-actions`).
