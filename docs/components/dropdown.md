# Dropdown

Figma: component `Dropdown` on page `↳ Dropdown` · spec: `tokens/figma/components/dropdown.json` · code: `src/components/Dropdown/`

## Import

```tsx
import { Dropdown, DropdownItem, DropdownDivider } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `Dropdown.size` | "sm" \| "md" = "sm" |
| `Dropdown.search` | ReactNode (<DropdownSearch />) |
| `Dropdown.user` | ReactNode (<DropdownUser />) |
| `Dropdown.footer` | ReactNode (<DropdownFooter />) |
| `DropdownItem.label` | ReactNode |
| `DropdownItem.description` | ReactNode |
| `DropdownItem.leading` | "none" \| "icon" \| "avatar" \| "checkbox" \| "radio" = "none" |
| `DropdownItem.icon` | IconName |
| `DropdownItem.selected` | boolean |
| `DropdownItem.type` | "default" \| "destructive" |
| `DropdownItem.shortcut` | string |
| `DropdownItem.badge` | string |
| `DropdownItem.chevron` | boolean |
| `DropdownItem.disabled` | boolean |
| `DropdownItem.onClick` | () => void |

## Example

```tsx
<Dropdown>
  <DropdownItem label="Edit" leading="icon" icon="PencilSimple" />
  <DropdownItem label="Duplicate" leading="icon" icon="Copy" />
  <DropdownDivider />
  <DropdownItem label="Delete" leading="icon" icon="Trash" type="destructive" />
</Dropdown>
```

> The panel is positioned by the caller (absolute under its trigger, left-aligned; flips when there is no room). Width 240 px; max 320 px.

## When to use

Use the Dropdown for a list of actions or commands opened from a Button or an icon button: more actions, account menu, sort by, bulk actions. Use the Select as a form field when the user picks one value among 6 to 15 options and the value is submitted with the form.

For 2 to 5 options in a form, use the Radio button, which shows every option at once; for several simultaneous choices, the Checkbox. For a value the user types faster than they find it (a year, a quantity), use the Input. For site navigation, use plain links, not a menu.

## Layout

- **Opens below the trigger** — The panel opens under the button or the field, left-aligned with it, and flips up or right when there is no room. It is at least as wide as the trigger, 320 px at most.
- **Order and groups** — The most frequent actions first, related items grouped under a section label or between dividers, and the destructive item last, after a divider.
- **7 to 10 items** — Beyond, the list scrolls and a search row sits at the top. The user header only belongs in an account menu; the footer holds secondary links.
- **Select anatomy** — Same anatomy as the Input: Label above, field, Hint under it. The field is as wide as the expected value, and the options follow a natural order (sizes, months) or the alphabet.

## Do and don’t

| Do | Don’t |
|---|---|
| **Put destructive items last, separated** — A divider and the red colour keep an irreversible action away from the frequent ones. | **Mix destructive items with the others** — A delete item between frequent actions gets hit by mistake. |
| **Use radio buttons for a few options** — Visible options are compared and picked in one click. | **Hide 3 options in a select** — A select for 2 to 4 options adds clicks and hides the choices. |
| **Keep a visible label on the select** — The label stays after the choice, so users can check their answer. | **Use the placeholder as the label** — Once a value is chosen, nothing says what the field was. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Contrast | Label 19.8:1, description and shortcut 7.8:1, destructive label 4.8:1 (4.4:1 on the red hover background), check mark 6.0:1, field border 4.7:1. | Text must reach 4.5:1, icons and borders 3:1. | Everything passes. The panel outline (1.3:1) is decorative: the shadow does the separation. |
| Select panel | Open, the panel is placed in absolute position 68 px under the top of the component, so it covers the Hint as on screen. | An element in the flow would push the Hint down and distort the height of the field. | If the Label is hidden, move the panel up by 24 px by hand. |
| Switch | No item with a switch: the library has no Switch component yet. | No component is created outside the agreed list. | Add it to _Dropdown item when the Switch exists. |
| Multiple choice | The Select holds one value. Multiple choice happens in the panel with checkbox items, without tags in the field. | A version with tags needs a field that grows, to design separately. | Plan it when a screen needs it. |
| Swapped icon | An icon changed through the icon property can lose its colour and stroke. | Figma does not always carry overrides onto a swapped instance. | Reapply the label colour, stroke 1.2 (regular) or 1.5 (medium). |
