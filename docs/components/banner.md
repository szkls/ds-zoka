# Banner

Figma: component `Banner` on page `↳ Banner` · spec: `tokens/figma/components/badge-banner.json` · code: `src/components/Banner/`

## Import

```tsx
import { Banner } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `title` | ReactNode |
| `description` | ReactNode |
| `status` | Status = "information" |
| `showIcon` | boolean = true |
| `action` | { label, onClick } |
| `onClose` | () => void |

## Example

```tsx
<Banner status="warning" title="Verify your email" description="Confirm your address before Friday." action={{ label: 'Resend email' }} onClose={dismiss} />
```

## When to use

Use the Banner for a message that concerns the whole site or the whole account and that every page must show while the situation lasts: planned maintenance, an outage, a payment problem on the account, a policy change, a new version to adopt. It sits at the very top of the screen, above the header, over the full width.

For feedback about one page, one section or one form, use the Alert. For a state in one or two words, use the Badge. A banner is rare by nature: if the product shows one every day, the message belongs somewhere else.

## Layout

- **Status** — information for an announcement or a maintenance; warning for something to do before a date (payment method, email to verify); error for a degraded service or a suspended account; success rarely, for a migration or an upgrade that is done.
- **One banner** — One banner at a time, the most severe first. The next one shows when the first is closed or the situation ends.
- **Writing** — A short title, one sentence of description, and an action that fixes the situation (Update payment method, See status page). No cross when the user cannot do without the message.
- **Persistence** — The banner stays on every page until the situation ends or the user closes it; a dismissal is remembered for the session at least, so the banner does not come back on the next page.

## Do and don’t

| Do | Don’t |
|---|---|
| **A message about the whole site** — Maintenance concerns every page: the banner is the right place. | **Page feedback in a banner** — A saved draft concerns one page: that is an Alert. |
| **One banner at a time** — The most severe message first; the next waits. | **Stacked banners** — Two or three banners push the content down and cancel each other. |
| **An action that fixes the situation** — The user knows what to do and the banner can go away. | **A message with no way out** — Without an action or a cross, the banner stays for ever and says nothing new. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Strong colours and contrast | error in bold (4.8:1) and warning in base with dark text (4.8:1). information and success use stronger (5.9:1 and 7.1:1); their bold version with white text fell to 2.8:1 and 3.3:1. | Text must reach 4.5:1. | A brighter blue or green would need dark text on those two statuses. |
| Light mode forced | The component is locked in Light mode on the 3a. semantic.color collection. | In Dark, the stronger backgrounds would turn pale and the white text unreadable. | Keep as is: a site notice looks the same whatever the theme. |
| Width | 1440 px by default; 1200 px in this documentation. | The banner must take the full width of the screen. | In screens, set the instance to Fill width. |
| Action | Ghost Button in static white or static black for now. | The library has no Link component yet. | Replace it with the Link when it exists. |
