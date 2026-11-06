# Accordion

Figma: component `Accordion` on page `↳ Accordion` · spec: `tokens/figma/components/accordion.json` · code: `src/components/Accordion/`

## Import

```tsx
import { Accordion, AccordionBlock } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `heading` | ReactNode |
| `children` | ReactNode (description) |
| `icon` | IconName \| null = "Sun" |
| `open` | boolean (controlled) |
| `defaultOpen` | boolean |
| `onOpenChange` | (open) => void |
| `grouped` | boolean (set automatically inside AccordionBlock — pass grouped on each child) |
| `AccordionBlock.fullWidth` | boolean (default 400 px) |

## Example

```tsx
<AccordionBlock>
  <Accordion grouped heading="How do I cancel an order?" icon="Question" defaultOpen>Open the order and choose Cancel.</Accordion>
  <Accordion grouped heading="Payment methods" icon="CreditCard">Cards, PayPal and bank transfer.</Accordion>
</AccordionBlock>
```

## When to use

Use the Accordion to shorten a long page when the user only needs some of its sections: FAQ, help pages, settings groups, product details, order summaries. The headings give the overview and the user opens what they need. Related sections stack in an Accordion block, 3 to 6 sections at a time.

Do not hide what the user must see: a price, a warning, a required step or the main content of the page stays visible. For a single detail to expand inside a card, prefer a “Show more” link; for parallel content of equal importance, prefer tabs; for navigation, use plain links.

## Layout

- **Heading** — One short line that names the content, as a topic or as the question the user has in mind (“Shipping and returns”, “How do I cancel an order?”). Verbs like “Click to open” add nothing.
- **Indicator** — The + / − indicator sits on the right and reflects the state; the icon on the left names the topic. Keep the same indicator across the product.
- **Open by default** — Sections start closed, unless one of them answers the most common question: open that one. Several sections can stay open at once; opening a section never closes another.
- **Width** — The accordion fills the width of its column. A heading wraps on two lines before it is shortened; the description keeps the width of the heading.

## Do and don’t

| Do | Don’t |
|---|---|
| **Write headings that say what is inside** — The user finds the section without opening it. | **Use vague headings** — Generic headings force the user to open every section. |
| **Group related sections in a block** — One frame, one rhythm: the sections read as a list. | **Stack standalone accordions** — Separate frames read as unrelated cards and double the borders. |
| **Open the most useful section by default** — The common answer is visible at once; the rest stays one click away. | **Open every section by default** — The page is as long as without accordions, and the user has to close them. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Contrast | Heading 19.8:1 (19.0:1 on the hover background), description 7.8:1, indicator 7.8:1. | Text must reach 4.5:1, icons 3:1. | Everything passes. The outline and the bottom rule (1.3:1) are decorative. |
| Icon size | The icon and the indicator are 14 × 14 px with a 1.4 px stroke. | The library has no size variable at 14 and no stroke variable; the rule elsewhere is 16 px (size/3xs), stroke 1.2 regular or 1.5 medium. | Align on 16 px and stroke 1.5 when the icon set is revised; the heading row stays 24 px high. |
| Block | The Accordion block holds five accordions and has no property. | Blocks of 3 to 6 sections are the common case, and hiding instances is manual. | Add show-item switches, as on the Dropdown, if blocks become frequent. |
| Content | The description is a single text. | Product accordions often hold lists, links, images or a form. | Swap the Description text for a slot frame when a screen needs richer content. |
