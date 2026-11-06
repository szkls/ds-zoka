# Select

Figma: component `Select` on page `↳ Dropdown` · spec: `tokens/figma/components/dropdown.json` · code: `src/components/Select/`

## Import

```tsx
import { Select } from 'rv-design'
```

## Props

| Prop | Type / default |
|---|---|
| `label` | ReactNode |
| `required` | boolean |
| `optional` | boolean \| string |
| `hint` | ReactNode |
| `status` | "default" \| "error" |
| `placeholder` | string = "Select an option" |
| `icon` | IconName \| null = "User" |
| `options` | { value, label, description?, icon?, disabled? }[] |
| `value` | string |
| `defaultValue` | string |
| `onChange` | (value: string) => void |
| `disabled` | boolean |
| `fullWidth` | boolean |
| `name` | string (hidden input for forms) |

## Example

```tsx
<Select label="Country" required options={[{ value: 'fr', label: 'France' }, { value: 'de', label: 'Germany' }]} onChange={setCountry} />
```

## When to use

_No Utilisation board in Figma yet for this component._
