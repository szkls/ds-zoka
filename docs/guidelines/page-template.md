# Page template

Validated with the designer on 2026-11-06. Code: `src/layout/Page.tsx` (`Page`, `PageSection`, `PageSubsection`).

| From | To | Token | Desktop | Mobile |
|---|---|---|---|---|
| Header | Breadcrumb | `padding/lg` (page top padding) | 16 | 16 |
| Breadcrumb | Page title | `gap/4xl` | 40 | 24 |
| Page title (`2xl/semi-bold`) | Page description (`md/regular`, `text/neutral/soft`) | `gap/sm` | 8 | 8 |
| Page description | First section | `gap/4xl` | 40 | 24 |
| Section | Next section | `gap/4xl` | 40 | 24 |
| Section title (`lg/semi-bold`) | Section description (`sm/regular`, soft) | `gap/sm` | 8 | 8 |
| Section description | Section content | `gap/2xl` | 24 | 16 |
| Content block | Next content block | `gap/lg` | 16 | 16 |
| Sub-section title (`md/medium`) | Its content | `gap/lg` (to confirm) | 16 | 16 |
| Sub-section | Next sub-section | 24 (to confirm) | 24 | 24 |

Page padding: `padding/lg` top, `padding/3xl` sides (`padding/lg` on mobile), `padding/5xl` bottom. Content max width `container/5xl` (1024).

Forms: fields in rows of two on desktop (`.rv-form-row`), one column on mobile; in a full-page form the primary button is left-aligned under the fields with the secondary button to its right (`.rv-form-actions`).
