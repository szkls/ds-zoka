# Header

Figma: component `Header` on page `↳ Header` · spec: `tokens/figma/components/header.json` · code: `src/components/Header/`

## Import

```tsx
import { Header } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `device` | "desktop" \| "mobile" (omit to follow html[data-device]) |
| `brand` | ReactNode = "Brand" |
| `logoIcon` | IconName = "Hexagon" |
| `navigation` | TabItem[] (desktop) |
| `navigationValue` | string |
| `onNavigate` | (id) => void |
| `onSearch` | () => void |
| `onNotifications` | () => void |
| `onMenu` | () => void (mobile burger) |
| `avatarSrc` | string |
| `avatarInitials` | string |
| `userName` | string |
| `onProfile` | () => void |

## Example

```tsx
<Header brand="RV Design" navigation={nav} navigationValue={page} onNavigate={go} avatarInitials="CL" userName="Camille Leroy" />
```

> Mirrors the Figma `device` variable: html[data-device="mobile"] switches to the mobile composition (breakpoint 768 px decided with the designer; apply it in the app).

## When to use

_No Utilisation board in Figma yet for this component._
