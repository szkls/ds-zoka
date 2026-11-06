# Badge

Figma: component `Badge` on page `↳ Badge` · spec: `tokens/figma/components/badge-banner.json` · code: `src/components/Badge/`

## Import

```tsx
import { Badge } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `label` | ReactNode (one or two words) |
| `status` | "information" \| "success" \| "warning" \| "error" = "information" |
| `size` | "sm" \| "md" \| "lg" = "sm" |
| `showIcon` | boolean = true |
| `icon` | IconName (override) |

## Example

```tsx
<Badge label="Paid" status="success" />
<Badge label="In review" status="warning" size="md" showIcon={false} />
```

## When to use

Use the Badge to label a state or a category in one or two words, right next to what it qualifies: an order status in a table row, New beside an item of the Dropdown, Beta on a feature, the plan level in the account header. It is scanned in a list and read in a sentence; it is never clicked.

To talk to the user about something that happened, use the Alert. For a count on an icon (unread messages) or a tag the user can add and remove, a different component is needed; neither is in the library yet.

## Layout

- **Wording** — One or two words, a noun or a past participle: Paid, In review, Draft, Archived, New. No verb, no sentence, no punctuation. The same word always means the same thing across the product.
- **Status** — information for a neutral state or a category, success for done or active, warning for pending or needing attention, error for failed, blocked or expired. One colour per meaning, everywhere.
- **Size** — sm in dense tables and menus, md by default in cards and lists, lg next to a page title. One size per context.
- **Icon** — Optional. Keep it when it helps to tell the statuses apart at a glance, and make the same choice for every badge of a list.

## Do and don’t

| Do | Don’t |
|---|---|
| **One or two words** — The badge is read at a glance. | **A sentence in a badge** — A long label is a message: that is an Alert. |
| **One colour per meaning** — Paid is green, pending amber, failed red, everywhere. | **Colours as decoration** — The same words in other colours break the code the user has learnt. |
| **The same icon choice in a list** — Every badge of the list has an icon, or none has. | **Icons on some badges only** — The odd one out looks like a different state. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Text colour | Label in text/system/…/stronger: 7.0 to 8.3:1 in Light, 7.0 to 8.3:1 in Dark. The bold version failed on the tinted background (3.4:1 for information). | Text must reach 4.5:1. | Keep stronger. |
| Icon colour | Icons in icon/system/…/bold: 3.4 to 5.3:1 on the tinted backgrounds. | A meaningful icon must reach 3:1. | Keep bold; the word carries the meaning anyway. |
| Background on white | The tinted backgrounds sit at 1.1 to 1.2:1 on white. | Only the text has to pass; the tint is decorative. | Nothing to do. |
| Radius in Sylva | radius/sm and radius/md are 1 px in Sylva. | Brand choice made earlier. | Keep as is. |
| One icon property per status | icon-information, icon-success, icon-warning and icon-error; only the one of the current status shows in the panel. | A shared property would have one default icon for every variant. | Keep as is. |
