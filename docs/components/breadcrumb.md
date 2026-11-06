# Breadcrumb

Figma: component `Breadcrumb` on page `↳ Breadcrumb` · spec: `tokens/figma/components/breadcrumb.json` · code: `src/components/Breadcrumb/`

## Import

```tsx
import { Breadcrumb } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `items` | { label, href?, icon?, onClick? }[] (last = current page) |
| `showIcons` | boolean = true |
| `maxVisible` | number = 4 (beyond: root › … › current) |
| `renderLink` | (item, props) => ReactNode (router links) |

## Example

```tsx
<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Billing' }]} />
```

## When to use

Use the Breadcrumb on pages that sit at least two levels below the root of a hierarchy: a catalogue, a documentation, settings, a file tree. It sits under the header and above the page title, as a secondary navigation. It shows the path from the root to the page, not the history of the visit.

Not on the home page, not on a flat site, and never as a replacement for the main navigation or for the browser back button. The hidden levels of a long path open in the Dropdown behind the ellipsis.

## Layout

- **Levels** — Two to four levels are shown in full. From five, keep the root and the current page and collapse the levels between behind the ellipsis.
- **Labels** — The page titles, as they appear in the navigation: short nouns, no verbs. A long title is cut at about twenty characters, with the full title in a tooltip.
- **Current page** — Always last, in medium weight, and not a link. On small screens the breadcrumb can shrink to a single link back to the parent.
- **Icons** — Optional and the same choice on every level: house for the root, folder for the levels between, document for the page. Without icons, the path is lighter.

## Do and don’t

| Do | Don’t |
|---|---|
| **Collapse the middle levels beyond four** — The root and the page stay visible; the rest is one click away. | **Show six levels in a row** — A long path is hard to scan and wraps on small screens. |
| **Use the page titles** — The path reads like the navigation. | **Write actions or sentences** — A verb or a long label is not a place in the site. |
| **End with the current page, not a link** — The user knows where they are; nothing to click. | **Make the current page a link** — A link to the page the user is already on goes nowhere. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Contrast | Links 7.8:1, current page 19.8:1, ellipsis 7.8:1, chevrons 2.5:1. | Text must reach 4.5:1, meaningful icons 3:1. | Everything passes; the chevrons are decorative. |
| Hidden levels menu | The ellipsis opens an instance of the Dropdown (sm) with three items and no icon. | One component for every drop-down list. | Set the items from the Dropdown instance inside the ellipsis. |
| Collapse rule | The 5+ variant is chosen by hand from five levels. | Figma cannot count the levels for the designer. | In code, beyond four levels, show the root, the ellipsis and the current page. |
| Link height | Links are 20 px high, with no vertical padding. | The breadcrumb must stay compact. | In code, extend the hit area to 24 px without changing the look. |
