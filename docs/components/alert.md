# Alert

Figma: component `Alert` on page `↳ Alert` · spec: `tokens/figma/components/alert.json` · code: `src/components/Alert/`

## Import

```tsx
import { Alert } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `title` | ReactNode |
| `description` | ReactNode |
| `status` | Status = "information" |
| `filled` | boolean = true (false: white + border + shadow/xs) |
| `showIcon` | boolean = true |
| `actions` | { label, onClick }[] (ghost xs buttons) |
| `onClose` | () => void (shows the X) |
| `fullWidth` | boolean (default width 400 px) |

## Example

```tsx
<Alert status="error" title="Payment failed" description="Your card was declined." actions={[{ label: 'Update card', onClick: retry }]} />
```

## When to use

Use the Alert for feedback that concerns a page or a section and stays until the user acts or dismisses it: a failed payment, a saved draft, a plan about to expire, a step to complete. It sits in the content, at the top of the page or of the form, under the heading.

For a message about one field, use the Hint of the Input. For a message that concerns the whole site (maintenance, outage, policy), use the Banner. To label a state in a few words without talking to the user, use the Badge. For a short confirmation that needs no action, a toast is the better fit; it is not in the library yet.

## Layout

- **Status** — information for a neutral fact, success for a completed action, warning for something to check before it becomes a problem, error for something that failed and needs an action. One alert at a time per section; the most severe wins.
- **Writing** — The title says what happened in a few words; the description says what it means and what to do. The action names the next step (Retry, Update card, Open drafts), never OK or Close.
- **Placement** — Top of the page content or of the form, under the heading, as wide as its column (Fill). An alert that answers a submit replaces the previous one and receives focus or is announced.
- **Dismiss** — Show the cross only when the message is not needed to finish the task. A blocking error stays until it is fixed; a success message can go away on its own after a few seconds, or on the cross.

## Do and don’t

| Do | Don’t |
|---|---|
| **Say what happened and what to do next** — The title names the problem, the description the fix, the action the next step. | **Leave the user without a next step** — A generic message and no action: the user does not know what to do. |
| **Keep error for a failure** — A deadline is a warning: it can still be handled. | **Use error to get attention** — Red for something that has not failed makes real errors invisible. |
| **Keep a blocking error on screen** — The message stays until the situation is fixed. | **Let a blocking error be dismissed** — Once closed, the user has lost the reason the form is stuck. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| Action in Dark | Brand ghost Button. In Light, 4.9 to 5.4:1 on the tinted backgrounds. In Dark, 2.6 to 3.3:1. | Button text must reach 4.5:1. | Lighten text/brand/base in Dark, or force the Light mode on the alert. With filled=False everything passes. |
| Description in Dark | text/neutral/base on the tinted backgrounds: 5.4 to 6.8:1 in Dark, 8.5 to 9.4:1 in Light. | Text must reach 4.5:1. | Same fix as the action if a value falls under 4.5:1. |
| Icon colour | Icons in icon/system/…/bold: 3.4 to 5.3:1 on the tinted backgrounds, at least 3.9:1 on white. The base version was too light (2.5:1 for information). | A meaningful icon must reach 3:1. | Keep bold. |
| Link component | The action is a ghost Button for now. | The library has no Link component yet. | Replace it with the Link when it exists. |
| One icon property per status | icon-information, icon-success, icon-warning and icon-error; only the one of the current status shows in the panel. | A shared property would have one default icon for every variant. | Keep as is. |
| Width | 400 px by default. | The alert must follow its container. | In screens, set the instance to Fill width. |
