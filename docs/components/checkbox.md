# Checkbox

Figma: component `Checkbox` on page `↳ Checkbox` · spec: `tokens/figma/components/checkbox.json` · code: `src/components/Checkbox/`

## Import

```tsx
import { Checkbox, CheckboxGroup } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `label` | ReactNode |
| `description` | ReactNode |
| `checked` | boolean \| "indeterminate" |
| `defaultChecked` | boolean |
| `readOnly` | boolean |
| `disabled` | boolean |
| `onChange` | ChangeEventHandler |
| `CheckboxGroup.label` | ReactNode |
| `CheckboxGroup.orientation` | "vertical" \| "horizontal" = "vertical" |

## Example

```tsx
<CheckboxGroup label="Notifications">
  <Checkbox label="Email" defaultChecked />
  <Checkbox label="Push" description="Only for mentions" />
</CheckboxGroup>
```

## When to use

Use the Checkbox when the user can select several options in a list, or to turn a single standalone option on or off, such as accepting the terms or receiving a newsletter. Each box is independent: ticking one never changes the others. The indeterminate state is only for a parent box whose children are partly selected, such as a “Select all” row.

When exactly one option must be chosen, use the Radio button for 2 to 7 options, or the Select beyond. A setting that applies immediately, without a form to submit, calls for a switch, which this library does not have yet.

## Layout

- **Vertical by default** — One option per line: the list is easy to scan, each box sits next to its own label and a description fits under each option.
- **Horizontal for 2 or 3 short options** — Only when the labels are one or two words and the whole group stays on one line.
- **Select all** — A parent box above the list checks or unchecks every option. It shows the indeterminate dash while only some options are checked.

## Do and don’t

| Do | Don’t |
|---|---|
| **Stack checkboxes vertically** — A vertical list is faster to scan and clearly pairs each box with its label. | **Use checkboxes for a single choice** — Users can tick several options when only one is valid. Use the Radio button instead. |
| **Write positive labels** — Positive phrasing makes the checked state unambiguous. | **Use negative labels** — With a negative label, users cannot tell whether checking means yes or no. |
| **Offer an explicit “none” answer** — An explicit “none” option shows that the user answered rather than skipped the question. | **Crowd a horizontal row** — Several boxes on one line make it unclear which box belongs to which label. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| 10 px icon | The check mark and the dash are 10 px, without a variable. | The size scale starts at 12 px. | Add size/5xs (10 px) to 3c. semantic.layout, or keep the fixed value. |
| Contrast | Empty box border 4.7:1, checked box 4.6:1 in Boreal (3.8 to 5.5:1 in Sylva). Read-only: black check mark on light grey, easily readable. Disabled is exempt. | A box must reach 3:1. | Everything passes. |
| Accessibility | The box and the label form a single clickable area. | A 16 px box alone is too small to hit. | In code: input type="checkbox" linked to its label; indeterminate set by script; read-only via aria-readonly or a disabled input whose label stays readable; an aria-label when there is no visible label. |
| Options 4 to 10 | The group holds 10 options. Options 4 to 10 are hidden layers, not properties. | Keeps the property panel short. | Show them from the Layers panel when a list needs more than 3 options. |
| No error state | The checkbox and the group have no error status. | The form keeps the submit button disabled until every required choice is made, so an empty group never has to show an error. | Mark required questions in the group label and keep forms short. |
