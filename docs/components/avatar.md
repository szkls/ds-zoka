# Avatar

Figma: component `Avatar` on page `↳ Avatar` · spec: `tokens/figma/components/avatar.json` · code: `src/components/Avatar/`

## Import

```tsx
import { Avatar, AvatarUser, AvatarGroup } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `type` | "image" \| "icon" \| "initials" = "image" (falls back to initials without src) |
| `size` | "xs" \| "sm" \| "md" \| "lg" \| "xl" = "xs" |
| `status` | "none" \| "available" \| "busy" \| "in-call" \| "do-not-disturb" \| "out-of-office" \| "idle" \| "away" \| "offline" |
| `initials` | string = "CL" |
| `icon` | IconName = "User" |
| `src` | string |
| `alt` | string (person name) |
| `AvatarUser.name` | ReactNode |
| `AvatarUser.detail` | ReactNode |
| `AvatarUser.size` | "sm" \| "md" \| "lg" |
| `AvatarGroup.items` | { src?, initials?, name? }[] |
| `AvatarGroup.size` | AvatarSize |
| `AvatarGroup.max` | number = 4 |
| `AvatarGroup.counter` | string \| false |
| `AvatarGroup.onAdd` | () => void |

## Example

```tsx
<AvatarUser name="Camille Leroy" detail="Product designer" size="md" status="available" />
<AvatarGroup items={members} size="sm" />
```

## When to use

Use the Avatar wherever a person must be recognised at a glance: comment author, assignee, member list, message header, account menu in the Dropdown. Prefer the photo; fall back on the initials when the name is known, and keep the icon for an unknown or anonymous person and for the placeholder before a photo is uploaded.

Use the Avatar user when the name must be read, not only recognised: people pickers, member tables, assignee fields, profile headers. Use the Avatar group to show that several people share something (a project, a document, a thread): three or four faces and a counter, as a summary; the full list opens on click or in a tooltip.

## Layout

- **Size** — xs and sm in dense lists and tables, md in comments, cards and forms, lg and xl in profile headers. One size per context, and the same type for everyone in a list.
- **Status dot** — Show presence only where it helps a decision (chat, calls, support). The dot never travels alone: a text, a tooltip or an accessible name gives the status in words.
- **Initials** — First letter of the first name, then of the last name, in uppercase; one letter when only one name is known. All initials share the brand colour: a colour per person adds nothing the name does not already say.
- **Group** — The most important or most recent person comes first, on top of the stack. Beyond four, the counter takes over, and a click gives access to the full list.

## Do and don’t

| Do | Don’t |
|---|---|
| **Fall back on initials when there is no photo** — The initials still identify the person. | **Show the generic icon for a known person** — The icon says nothing about who it is. |
| **Give the status in words next to the dot** — The status is read, not guessed from a colour. | **Let the dot alone carry the status** — Busy, in a call and do not disturb share the same red. |
| **Summarise a group with a counter** — Four faces and a count tell the story. | **Line up every member** — A long row takes space and still cannot be read. |

## Notes (from the Figma design-token board)

| Topic | Observation | Why | Next step |
|---|---|---|---|
| _Avatar add | The _Avatar add set (state × size) is no longer on any page: the Add button of the Avatar group still points to it, but it cannot be edited or published. | No component is created without agreement. | Restore it from the version history, or bring it back on this page before the next publish. |
| Out-of-office pink | No semantic pink token: the out-of-office dot is bound to the primitive colors/pink/500. | No variable is created without agreement. | Add a token such as background/system/presence/out-of-office, or pick an existing colour. |
| Dot sizes | 8, 10 and 14 px have no variable; only 12 px (size/4xs) and 16 px (size/3xs) are bound. | The size scale starts at 12 px. | Add sizes under 12 px, or keep these values fixed in the component. |
| Do-not-disturb bar | The white bar is 60 % of the dot, a fixed length; its thickness is bound to border/xs or border/sm. | No variable matches such a short length. | Keep it fixed: it is a drawing detail. |
| Status and colour | busy and in-call share the same red, as requested, and the status is carried by colour only. | Information must not rely on colour alone. | In code, give the status as text (tooltip and accessible name). |
| Contrast | Dots on the white ring: green 3.3:1, amber 3.2:1, red 3.8:1, grey 4.7:1 (bold versions chosen; the base green and amber were 2.3:1 and 2.1:1). Initials 5.5:1 (4.8:1 in Dark), icon 5.5:1, detail 7.8:1, counter 9.5:1. | Text must reach 4.5:1, graphics 3:1. | Everything passes in Light and Dark. |
| Demo photo | The photo comes from randomuser.me. | It is only a placeholder. | Replace it with a licensed photo before any publication. |
| Group overlap | The overlap between avatars is a fixed negative gap: −4, −6, −8, −10 and −12 px by size. | There is no negative spacing variable. | Add negative values to 3c. semantic.layout, or keep them fixed. |
