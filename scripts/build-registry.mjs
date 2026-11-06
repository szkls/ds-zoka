// Builds docs/components/*.md and registry.json from the Figma usage exports (tokens/figma/docs/*.json)
// and the component API table below. Run with: npm run registry
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));
const usage = { ...read('tokens/figma/docs/usage-1.json'), ...read('tokens/figma/docs/usage-2.json') };

// One entry per Figma component page. `exports` = React exports, `props` = public API (mirrors Figma properties).
const components = [
  { name: 'Button', figma: 'Button', page: '↳ Button', spec: 'button.json', exports: ['Button'], import: "import { Button } from 'rv-design'",
    props: { label: 'ReactNode = "Button"', type: '"brand" | "destructive" | "static-black" | "static-white" = "brand"', variant: '"filled" | "stroke" | "lighter" | "ghost" = "filled" (Figma: style)', size: '"md" | "sm" | "xs" = "md"', iconLeft: 'IconName', iconRight: 'IconName', icon: 'IconName — icon-only button (label = accessible name)', disabled: 'boolean', fullWidth: 'boolean', htmlType: '"button" | "submit" | "reset"', onClick: '() => void' },
    example: `<Button label="Save" iconLeft="FloppyDisk" />\n<Button label="Cancel" variant="stroke" />\n<Button label="Delete" type="destructive" variant="ghost" size="sm" />\n<Button icon="Gear" label="Settings" variant="ghost" />` },
  { name: 'Badge', figma: 'Badge', page: '↳ Badge', spec: 'badge-banner.json', exports: ['Badge'], import: "import { Badge } from 'rv-design'",
    props: { label: 'ReactNode (one or two words)', status: '"information" | "success" | "warning" | "error" = "information"', size: '"sm" | "md" | "lg" = "sm"', showIcon: 'boolean = true', icon: 'IconName (override)' },
    example: `<Badge label="Paid" status="success" />\n<Badge label="In review" status="warning" size="md" showIcon={false} />` },
  { name: 'Alert', figma: 'Alert', page: '↳ Alert', spec: 'alert.json', exports: ['Alert'], import: "import { Alert } from 'rv-design'",
    props: { title: 'ReactNode', description: 'ReactNode', status: 'Status = "information"', filled: 'boolean = true (false: white + border + shadow/xs)', showIcon: 'boolean = true', actions: '{ label, onClick }[] (ghost xs buttons)', onClose: '() => void (shows the X)', fullWidth: 'boolean (default width 400 px)' },
    example: `<Alert status="error" title="Payment failed" description="Your card was declined." actions={[{ label: 'Update card', onClick: retry }]} />` },
  { name: 'Banner', figma: 'Banner', page: '↳ Banner', spec: 'badge-banner.json', exports: ['Banner'], import: "import { Banner } from 'rv-design'",
    props: { title: 'ReactNode', description: 'ReactNode', status: 'Status = "information"', showIcon: 'boolean = true', action: '{ label, onClick }', onClose: '() => void' },
    example: `<Banner status="warning" title="Verify your email" description="Confirm your address before Friday." action={{ label: 'Resend email' }} onClose={dismiss} />` },
  { name: 'Checkbox', figma: 'Checkbox', page: '↳ Checkbox', spec: 'checkbox.json', exports: ['Checkbox', 'CheckboxGroup'], import: "import { Checkbox, CheckboxGroup } from 'rv-design'",
    props: { label: 'ReactNode', description: 'ReactNode', checked: 'boolean | "indeterminate"', defaultChecked: 'boolean', readOnly: 'boolean', disabled: 'boolean', onChange: 'ChangeEventHandler', 'CheckboxGroup.label': 'ReactNode', 'CheckboxGroup.orientation': '"vertical" | "horizontal" = "vertical"' },
    example: `<CheckboxGroup label="Notifications">\n  <Checkbox label="Email" defaultChecked />\n  <Checkbox label="Push" description="Only for mentions" />\n</CheckboxGroup>` },
  { name: 'Radio button', figma: 'Radio button', page: '↳ Radio button', spec: 'radio.json', exports: ['Radio', 'RadioGroup'], import: "import { Radio, RadioGroup } from 'rv-design'",
    props: { label: 'ReactNode', description: 'ReactNode', name: 'string (shared by the group)', checked: 'boolean', readOnly: 'boolean', disabled: 'boolean', 'RadioGroup.label': 'ReactNode (the question)', 'RadioGroup.orientation': '"vertical" | "horizontal" = "vertical"' },
    example: `<RadioGroup label="Delivery">\n  <Radio name="delivery" label="Standard" defaultChecked />\n  <Radio name="delivery" label="Express" />\n</RadioGroup>` },
  { name: 'Text input', figma: 'Input', page: '↳ Text input', spec: 'input.json', exports: ['Input', 'Label', 'Hint'], import: "import { Input, Label, Hint } from 'rv-design'",
    props: { type: '"basic" | "phone" | "website" | "amount" | "search" | "password" | "share-link" = "basic"', label: 'ReactNode', required: 'boolean (brand *)', optional: 'boolean | string ("(Optional)")', labelInfo: 'boolean', hint: 'ReactNode', status: '"default" | "error"', icon: 'IconName | null (basic type)', info: 'boolean (trailing Info icon)', placeholder: 'string', value: 'string', onChange: 'ChangeEventHandler', disabled: 'boolean', fullWidth: 'boolean (default 320 px)', countryCode: 'string (phone)', prefix: 'string (website)', currencySymbol: 'string (amount)', currencyCode: 'string (amount)', shortcut: 'string (search)', onCopy: '() => void (share-link)' },
    example: `<Input label="Email" type="basic" icon="Envelope" required hint="We never share it." />\n<Input label="Password" type="password" status="error" hint="At least 8 characters." />` },
  { name: 'Select', figma: 'Select', page: '↳ Dropdown', spec: 'dropdown.json', exports: ['Select'], import: "import { Select } from 'rv-design'",
    props: { label: 'ReactNode', required: 'boolean', optional: 'boolean | string', hint: 'ReactNode', status: '"default" | "error"', placeholder: 'string = "Select an option"', icon: 'IconName | null = "User"', options: '{ value, label, description?, icon?, disabled? }[]', value: 'string', defaultValue: 'string', onChange: '(value: string) => void', disabled: 'boolean', fullWidth: 'boolean', name: 'string (hidden input for forms)' },
    example: `<Select label="Country" required options={[{ value: 'fr', label: 'France' }, { value: 'de', label: 'Germany' }]} onChange={setCountry} />` },
  { name: 'Dropdown', figma: 'Dropdown', page: '↳ Dropdown', spec: 'dropdown.json', exports: ['Dropdown', 'DropdownItem', 'DropdownSectionLabel', 'DropdownDivider', 'DropdownSearch', 'DropdownUser', 'DropdownFooter'], import: "import { Dropdown, DropdownItem, DropdownDivider } from 'rv-design'",
    props: { 'Dropdown.size': '"sm" | "md" = "sm"', 'Dropdown.search': 'ReactNode (<DropdownSearch />)', 'Dropdown.user': 'ReactNode (<DropdownUser />)', 'Dropdown.footer': 'ReactNode (<DropdownFooter />)', 'DropdownItem.label': 'ReactNode', 'DropdownItem.description': 'ReactNode', 'DropdownItem.leading': '"none" | "icon" | "avatar" | "checkbox" | "radio" = "none"', 'DropdownItem.icon': 'IconName', 'DropdownItem.selected': 'boolean', 'DropdownItem.type': '"default" | "destructive"', 'DropdownItem.shortcut': 'string', 'DropdownItem.badge': 'string', 'DropdownItem.chevron': 'boolean', 'DropdownItem.disabled': 'boolean', 'DropdownItem.onClick': '() => void' },
    example: `<Dropdown>\n  <DropdownItem label="Edit" leading="icon" icon="PencilSimple" />\n  <DropdownItem label="Duplicate" leading="icon" icon="Copy" />\n  <DropdownDivider />\n  <DropdownItem label="Delete" leading="icon" icon="Trash" type="destructive" />\n</Dropdown>`,
    note: 'The panel is positioned by the caller (absolute under its trigger, left-aligned; flips when there is no room). Width 240 px; max 320 px.' },
  { name: 'Accordion', figma: 'Accordion', page: '↳ Accordion', spec: 'accordion.json', exports: ['Accordion', 'AccordionBlock'], import: "import { Accordion, AccordionBlock } from 'rv-design'",
    props: { heading: 'ReactNode', children: 'ReactNode (description)', icon: 'IconName | null = "Sun"', open: 'boolean (controlled)', defaultOpen: 'boolean', onOpenChange: '(open) => void', grouped: 'boolean (set automatically inside AccordionBlock — pass grouped on each child)', 'AccordionBlock.fullWidth': 'boolean (default 400 px)' },
    example: `<AccordionBlock>\n  <Accordion grouped heading="How do I cancel an order?" icon="Question" defaultOpen>Open the order and choose Cancel.</Accordion>\n  <Accordion grouped heading="Payment methods" icon="CreditCard">Cards, PayPal and bank transfer.</Accordion>\n</AccordionBlock>` },
  { name: 'Avatar', figma: 'Avatar', page: '↳ Avatar', spec: 'avatar.json', exports: ['Avatar', 'AvatarUser', 'AvatarGroup'], import: "import { Avatar, AvatarUser, AvatarGroup } from 'rv-design'",
    props: { type: '"image" | "icon" | "initials" = "image" (falls back to initials without src)', size: '"xs" | "sm" | "md" | "lg" | "xl" = "xs"', status: '"none" | "available" | "busy" | "in-call" | "do-not-disturb" | "out-of-office" | "idle" | "away" | "offline"', initials: 'string = "CL"', icon: 'IconName = "User"', src: 'string', alt: 'string (person name)', 'AvatarUser.name': 'ReactNode', 'AvatarUser.detail': 'ReactNode', 'AvatarUser.size': '"sm" | "md" | "lg"', 'AvatarGroup.items': '{ src?, initials?, name? }[]', 'AvatarGroup.size': 'AvatarSize', 'AvatarGroup.max': 'number = 4', 'AvatarGroup.counter': 'string | false', 'AvatarGroup.onAdd': '() => void' },
    example: `<AvatarUser name="Camille Leroy" detail="Product designer" size="md" status="available" />\n<AvatarGroup items={members} size="sm" />` },
  { name: 'Breadcrumb', figma: 'Breadcrumb', page: '↳ Breadcrumb', spec: 'breadcrumb.json', exports: ['Breadcrumb'], import: "import { Breadcrumb } from 'rv-design'",
    props: { items: '{ label, href?, icon?, onClick? }[] (last = current page)', showIcons: 'boolean = true', maxVisible: 'number = 4 (beyond: root › … › current)', renderLink: '(item, props) => ReactNode (router links)' },
    example: `<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Settings', href: '/settings' }, { label: 'Billing' }]} />` },
  { name: 'Tabs', figma: 'Tabs', page: '↳ Tabs', spec: 'tabs.json', exports: ['Tabs'], import: "import { Tabs } from 'rv-design'",
    props: { items: '{ id, label, icon?: IconName | null, badge?, disabled? }[]', type: '"line" | "segmented" = "line"', size: '"sm" | "md" = "sm"', value: 'string', defaultValue: 'string', onChange: '(id) => void', label: 'string (aria-label)' },
    example: `<Tabs items={[{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity', badge: '3' }]} value={tab} onChange={setTab} />`,
    note: 'First draft in Figma (page ↳ Tabs has no Documentation section yet). Render the matching panel yourself with role="tabpanel".' },
  { name: 'Header', figma: 'Header', page: '↳ Header', spec: 'header.json', exports: ['Header'], import: "import { Header } from 'rv-design'",
    props: { device: '"desktop" | "mobile" (omit to follow html[data-device])', brand: 'ReactNode = "Brand"', logoIcon: 'IconName = "Hexagon"', navigation: 'TabItem[] (desktop)', navigationValue: 'string', onNavigate: '(id) => void', onSearch: '() => void', onNotifications: '() => void', onMenu: '() => void (mobile burger)', avatarSrc: 'string', avatarInitials: 'string', userName: 'string', onProfile: '() => void' },
    example: `<Header brand="RV Design" navigation={nav} navigationValue={page} onNavigate={go} avatarInitials="CL" userName="Camille Leroy" />`,
    note: 'Mirrors the Figma `device` variable: html[data-device="mobile"] switches to the mobile composition (breakpoint 768 px decided with the designer; apply it in the app).' },
];

mkdirSync(resolve(root, 'docs/components'), { recursive: true });
const slug = (s) => s.toLowerCase().replace(/\s+/g, '-');
const registry = { name: 'RV Design', source: 'Figma "DS - Test" (fileKey tYFo6T4m7rMz10ugzm5Y1h)', entry: 'src/index.ts', styles: 'src/styles/index.css', tokens: { css: 'src/tokens/tokens.css', json: 'src/tokens/resolved.json', modes: { theme: ['light', 'dark'], brand: ['boreal', 'sylva'], device: ['desktop', 'mobile'] }, attributes: 'html[data-theme] html[data-brand] html[data-device]' }, icons: { component: 'Icon', names: 'src/icons/paths.ts (iconNames)' }, components: [] };

for (const c of components) {
  const u = usage[c.name] ?? usage[c.figma];
  const md = [];
  md.push(`# ${c.name}`, '', `Figma: component \`${c.figma}\` on page \`${c.page}\` · spec: \`tokens/figma/components/${c.spec}\` · code: \`src/components/${c.exports[0]}/\``, '');
  md.push('## Import', '', '```tsx', c.import, '```', '');
  md.push('## Props', '', '| Prop | Type / default |', '|---|---|');
  for (const [k, v] of Object.entries(c.props)) md.push(`| \`${k}\` | ${v.replace(/\|/g, '\\|')} |`);
  md.push('');
  md.push('## Example', '', '```tsx', c.example, '```', '');
  if (c.note) md.push('> ' + c.note, '');
  if (u) {
    const ut = u.utilisation;
    md.push('## When to use', '', ...ut['When to use'].flatMap((p) => [p, '']));
    if (ut.Layout?.length) { md.push('## Layout', ''); for (const [t, d] of ut.Layout) md.push(`- **${t}** — ${d}`); md.push(''); }
    const dd = ut['Do and don’t'] ?? [];
    if (dd.length) { md.push('## Do and don’t', '', '| Do | Don’t |', '|---|---|'); for (const p of dd) md.push(`| **${p.do}** — ${p.doText} | **${p.dont}** — ${p.dontText} |`); md.push(''); }
    if (u.notes?.length) { md.push('## Notes (from the Figma design-token board)', '', '| Topic | Observation | Why | Next step |', '|---|---|---|---|'); for (const r of u.notes) md.push(`| ${r.map((x) => x.replace(/\|/g, '\\|')).join(' | ')} |`); md.push(''); }
  } else {
    md.push('## When to use', '', '_No Utilisation board in Figma yet for this component._', '');
  }
  writeFileSync(resolve(root, `docs/components/${slug(c.name)}.md`), md.join('\n'));
  registry.components.push({ name: c.name, figma: c.figma, figmaPage: c.page, exports: c.exports, import: c.import, path: `src/components/${c.exports[0]}/`, spec: `tokens/figma/components/${c.spec}`, docs: `docs/components/${slug(c.name)}.md`, props: c.props, example: c.example, whenToUse: u ? u.utilisation['When to use'][0] : null, note: c.note ?? null });
}
writeFileSync(resolve(root, 'registry.json'), JSON.stringify(registry, null, 2));
console.log('registry:', registry.components.length, 'components,', 'docs written to docs/components/');
