# Text input

Figma: component `Input` on page `↳ Text input` · spec: `tokens/figma/components/input.json` · code: `src/components/Input/`

## Import

```tsx
import { Input, Label, Hint } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `type` | "basic" \| "phone" \| "website" \| "amount" \| "search" \| "password" \| "share-link" = "basic" |
| `label` | ReactNode |
| `required` | boolean (brand *) |
| `optional` | boolean \| string ("(Optional)") |
| `labelInfo` | boolean |
| `hint` | ReactNode |
| `status` | "default" \| "error" |
| `icon` | IconName \| null (basic type) |
| `info` | boolean (trailing Info icon) |
| `placeholder` | string |
| `value` | string |
| `onChange` | ChangeEventHandler |
| `disabled` | boolean |
| `fullWidth` | boolean (default 320 px) |
| `countryCode` | string (phone) |
| `prefix` | string (website) |
| `currencySymbol` | string (amount) |
| `currencyCode` | string (amount) |
| `shortcut` | string (search) |
| `onCopy` | () => void (share-link) |

## Example

```tsx
<Input label="Email" type="basic" icon="Envelope" required hint="We never share it." />
<Input label="Password" type="password" status="error" hint="At least 8 characters." />
```

## When to use

Use the Input for short, single-line data the user knows and can type: a name, an email address, a phone number, a website, an amount, a search query, a password, or a link to copy. The type sets the right structure and keyboard: a country code for phone, an https:// prefix for website, a currency for amount, a magnifier and a shortcut for search, a show / hide button for password, a copy button for share-link.

For several lines of text, use a textarea, which this library does not have yet. When the answer comes from a short known list, use the Radio button or the Select. For a yes / no value, use the Checkbox. For a date, prefer three separate fields (day, month, year).

## Layout

- **Label above the field** — The label stays visible while typing and when the form is reviewed. The placeholder only shows an example of the format, or nothing.
- **Hint under the field** — One short sentence on the format or the purpose of the field. In error, the hint carries the message and says how to fix it.
- **Width follows the answer** — A postcode field is short, an email field is wider, and only free text takes the full width: the width hints at the expected format.
- **One column** — Fields stack in a single column, 16 to 24 px apart, with related fields (an address) grouped under a legend.

## Do and don’t

| Do | Don’t |
|---|---|
| **Keep a visible label above the field** — A persistent label keeps the context while typing and when reviewing the answers. | **Use the placeholder as the label** — The placeholder disappears as soon as the user types, and nothing says what the field is any more. |
| **Write errors that explain the fix** — A specific message lets the user correct the value at once. | **Show generic errors** — A generic message says neither what is wrong nor how to fix it. |
| **Put essential rules in the hint** — Rules shown before typing are read by everyone, before the first error. | **Hide the rules behind the info icon** — Rules hidden in a tooltip only surface after an error, which means rework. |
| **Size fields to the expected answer** — The width hints at the length and the format of the answer. | **Stretch every field to full width** — Same-width fields give no cue about the expected answer. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Contrast | Field border 4.7:1, placeholder 7.8:1, error message 4.8:1, error border 3.8:1. Disabled is exempt. | Text must reach 4.5:1, borders and icons 3:1. | Everything passes. |
| Flags and logos | A globe stands in for the country flag, and there is no card logo. | The file has no flag or logo library. | Add a flag library for the phone type. |
| Types not covered | Card, date, emoji, tag input, counter and textarea. | Out of this first batch. | Add them as separate components on the same base. |
| Icon stroke | Icons use a 1.5 px stroke, hard-coded. | The value is 14 px regular, so the rule calls for 1.2. | Set the field icons to 1.2 and create an icon stroke variable. |
| Hint position | The hint sits under the field. | Some systems put it above, so it is never hidden by autofill or the mobile keyboard. | Keep it under the field across the library, and keep hints short. |
