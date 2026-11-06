# Radio button

Figma: component `Radio button` on page `↳ Radio button` · spec: `tokens/figma/components/radio.json` · code: `src/components/Radio/`

## Import

```tsx
import { Radio, RadioGroup } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `label` | ReactNode |
| `description` | ReactNode |
| `name` | string (shared by the group) |
| `checked` | boolean |
| `readOnly` | boolean |
| `disabled` | boolean |
| `RadioGroup.label` | ReactNode (the question) |
| `RadioGroup.orientation` | "vertical" \| "horizontal" = "vertical" |

## Example

```tsx
<RadioGroup label="Delivery">
  <Radio name="delivery" label="Standard" defaultChecked />
  <Radio name="delivery" label="Express" />
</RadioGroup>
```

## When to use

Use the Radio button when the user must pick exactly one option among a small set of visible choices, from 2 to 7. Showing every option at once helps to compare them, and preselecting a safe default means the group always carries a value.

For several choices at once, or a single standalone option, use the Checkbox. For more than 7 options, or when the screen has no room for the whole list, use the Select.

## Layout

- **Vertical by default** — One option per line: the list is easy to scan, the labels align and a description fits under each option.
- **Horizontal for 2 or 3 short options** — Only when the labels are one or two words and the whole group stays on one line.

## Do and don’t

| Do | Don’t |
|---|---|
| **Preselect a safe default** — When one option is the usual or safest choice, select it by default so the group always has a value. | **Use a single radio button on its own** — One radio button alone cannot be unselected. For a single standalone option, use a Checkbox. |
| **State the question in the group label** — Short, parallel labels that complete the group label: the user reads the question once. | **Put long labels on a horizontal group** — Long labels wrap and the options read like a paragraph. Go vertical. |
| **Go vertical from 4 options** — From 4 options, use the vertical orientation: every label starts on the same line and the list stays easy to scan. | **List more than 7 options** — Beyond 7 options the list gets long to scan and to compare. Use a Select. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| 6 px dot | The centre dot is 6 px, without a variable. | The size scale starts at 12 px. | Add a 6 px size to 3c. semantic.layout, or keep the fixed value. |
| Contrast | Empty circle border 4.7:1, checked circle 4.6:1 in Boreal (3.8 to 5.5:1 in Sylva). Disabled is exempt. | A circle must reach 3:1. | Everything passes. |
| Accessibility | The circle and the label form a single clickable area. | A 16 px circle alone is too small to hit. | In code: input type="radio" sharing the same name, linked to its label; group in a fieldset with a legend; arrow keys move between options; read-only via aria-readonly or a disabled input whose label stays readable. |
| Options 4 to 10 | The group holds 10 options. Options 4 to 10 are hidden layers, not properties. | Keeps the property panel short. | Show them from the Layers panel when a list needs more than 3 options. |
| No error state | The radio button and the group have no error status. | The form keeps the submit button disabled until every required choice is made, so an empty group never has to show an error. | Mark required questions in the group label and keep forms short. |
