# Tabs

Figma: component `Tabs` on page `↳ Tabs` · spec: `tokens/figma/components/tabs.json` · code: `src/components/Tabs/`

## Import

```tsx
import { Tabs } from 'ds-zoka'
```

## Props

| Prop | Type / default |
|---|---|
| `items` | { id, label, icon?: IconName \| null, badge?, disabled? }[] |
| `type` | "line" \| "segmented" = "line" |
| `size` | "sm" \| "md" = "sm" |
| `value` | string |
| `defaultValue` | string |
| `onChange` | (id) => void |
| `label` | string (aria-label) |

## Example

```tsx
<Tabs items={[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity', badge: '3' }]} value={tab} onChange={setTab} />
```

> First draft in Figma (page ↳ Tabs has no Documentation section yet). Render the matching panel yourself with role="tabpanel".

## When to use

_No Utilisation board in Figma yet for this component._
