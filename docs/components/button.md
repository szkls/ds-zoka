# Button

Figma: component `Button` on page `↳ Button` · spec: `tokens/figma/components/button.json` · code: `src/components/Button/`

## Import

```tsx
import { Button } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `label` | ReactNode = "Button" |
| `type` | "brand" \| "destructive" \| "static-black" \| "static-white" = "brand" |
| `variant` | "filled" \| "stroke" \| "lighter" \| "ghost" = "filled" (Figma: style) |
| `size` | "md" \| "sm" \| "xs" = "md" |
| `iconLeft` | IconName |
| `iconRight` | IconName |
| `icon` | IconName — icon-only button (label = accessible name) |
| `disabled` | boolean |
| `fullWidth` | boolean |
| `htmlType` | "button" \| "submit" \| "reset" |
| `onClick` | () => void |

## Example

```tsx
<Button label="Save" iconLeft="FloppyDisk" />
<Button label="Cancel" variant="stroke" />
<Button label="Delete" type="destructive" variant="ghost" size="sm" />
<Button icon="Gear" label="Settings" variant="ghost" />
```

## When to use

Use the Button to trigger an action in the current context: submit a form, save, open a dialog, start a process, delete. The filled style is the primary action, and there is only one per view or dialog; stroke is the secondary action, lighter and ghost are supporting actions. destructive is reserved for actions that delete or cannot be undone.

When the element takes the user to another page, use a link, not a button. For more than two or three secondary actions, group them in a Dropdown opened by one button. For an on / off setting that applies immediately, use a switch, which this library does not have yet.

## Layout

- **One primary per view** — A single filled button per view or dialog. Every other action is stroke, lighter or ghost.
- **Order** — In a dialog or a form footer, the primary button sits on the right with Cancel just to its left, right-aligned. In a full-page form, the primary button is left-aligned under the fields, with the secondary button to its right. Never mix the two orders in one context.
- **Destructive apart** — A destructive action is separated from the primary one: on the left of the footer, or behind a confirmation dialog whose confirm button is destructive.
- **Sizes** — md by default in forms, sm in dense tables and toolbars, xs only in very dense interfaces. On mobile, dialog buttons stack full width with the primary on top.
- **Icons** — One icon per button, before the label. An icon after the label only for direction or disclosure (next, open a menu). An icon-only button needs an accessible name and a tooltip, and is reserved for universally understood actions.

## Do and don’t

| Do | Don’t |
|---|---|
| **Start labels with a specific verb** — Users know exactly what happens before they click. | **Use vague labels** — “Yes”, “No” or “OK” force users to reread the question and cause errors. |
| **Use one primary button per view** — A single filled button makes the main action obvious. | **Make every button primary** — Several filled buttons compete and none reads as the main action. |
| **Write short labels in sentence case** — Sentence case is the easiest to read, and a short label never wraps. | **Shout or write long labels** — All caps slows reading, and a long label wraps or gets cut. |
| **Keep destructive actions apart** — Distance and a clear name prevent accidental data loss. | **Put destructive next to primary** — An adjacent destructive button is easy to hit by mistake. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Contrast | Label on brand filled 4.6:1 in Boreal Light, 4.6:1 in Dark; label on destructive filled 4.8:1; stroke border 6.0:1. | Text must reach 4.5:1, borders and icons 3:1. | Everything passes. |
| No neutral type | There is no grey secondary button. | The library keeps the palette small. | Use brand stroke, or static-black stroke on a light background. |
| Icon stroke | Icons use a 1.5 px stroke, hard-coded. | No variable holds an icon stroke width. | Create an icon stroke variable (1.5 next to a medium label, 1.2 next to a regular one). |
| Static types | static-black and static-white keep the same colours in Light and Dark. | They sit on images or brand colours, not on the page background. | Check the contrast on the actual image or colour behind them. |
