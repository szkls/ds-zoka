import { useEffect, useState, type ReactNode } from 'react';
import {
  Accordion, AccordionBlock, Alert, Avatar, AvatarGroup, AvatarUser, Badge, Banner, Breadcrumb, Button, Checkbox, CheckboxGroup,
  Dropdown, DropdownDivider, DropdownFooter, DropdownItem, DropdownSearch, DropdownSectionLabel, DropdownUser, Header, Hint, Input, Label,
  Radio, RadioGroup, Select, Tabs,
} from '../index';
import './demo.css';

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="demo-section" id={title.toLowerCase().replace(/\s+/g, '-')}>
    <h2 className="demo-h2">{title}</h2>
    <div className="demo-grid">{children}</div>
  </section>
);
const Row = ({ label, children }: { label?: string; children: ReactNode }) => (
  <div className="demo-row">{label && <span className="demo-label">{label}</span>}<div className="demo-items">{children}</div></div>
);

export function Demo() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [brand, setBrand] = useState<'boreal' | 'sylva'>('boreal');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('overview');
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = theme; el.dataset.brand = brand; el.dataset.device = device;
  }, [theme, brand, device]);
  const nav = [{ id: 'overview', label: 'Overview' }, { id: 'activity', label: 'Activity' }, { id: 'members', label: 'Members' }, { id: 'settings', label: 'Settings' }];
  const people = [{ initials: 'CL', name: 'Camille Leroy' }, { initials: 'WC', name: 'Wei Chen' }, { initials: 'AM', name: 'Ana Moreira' }, { initials: 'JD', name: 'Jon Doe' }, { initials: 'KB' }, { initials: 'LP' }, { initials: 'RS' }];

  return (
    <div className="demo">
      <Banner title="Scheduled maintenance" description="The service will be unavailable on Sunday from 2 to 4 am." status="information" action={{ label: 'See status page' }} onClose={() => {}} />
      <Header brand="RV Design" navigation={nav} navigationValue={tab} onNavigate={setTab} avatarInitials="CL" userName="Camille Leroy" />
      <main className="demo-main">
        <div className="demo-toolbar">
          <Tabs type="segmented" size="sm" items={[{ id: 'light', label: 'Light', icon: 'Sun' }, { id: 'dark', label: 'Dark', icon: 'Moon' }]} value={theme} onChange={(v) => setTheme(v as 'light' | 'dark')} label="Theme" />
          <Tabs type="segmented" size="sm" items={[{ id: 'boreal', label: 'Boreal', icon: null }, { id: 'sylva', label: 'Sylva', icon: null }]} value={brand} onChange={(v) => setBrand(v as 'boreal' | 'sylva')} label="Brand" />
          <Tabs type="segmented" size="sm" items={[{ id: 'desktop', label: 'Desktop', icon: 'Layout' }, { id: 'mobile', label: 'Mobile', icon: 'Phone' }]} value={device} onChange={(v) => setDevice(v as 'desktop' | 'mobile')} label="Device" />
        </div>
        <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Section', href: '#' }, { label: 'Subsection', href: '#' }, { label: 'Details', href: '#' }, { label: 'Current page' }]} />
        <h1 className="demo-h1">RV Design — components</h1>

        <Section title="Button">
          {(['brand', 'destructive'] as const).map((t) => (
            <Row key={t} label={t}>
              {(['filled', 'stroke', 'lighter', 'ghost'] as const).map((s) => <Button key={s} label={s} type={t} variant={s} iconLeft="Plus" />)}
              <Button label="Disabled" type={t} disabled />
              <Button icon="Copy" label="Copy" type={t} variant="stroke" />
            </Row>
          ))}
          <Row label="sizes"><Button label="Medium" /><Button label="Small" size="sm" /><Button label="Extra small" size="xs" /><Button icon="Gear" label="Settings" size="sm" variant="lighter" /></Row>
          <Row label="static">
            <span className="demo-dark"><Button label="White filled" type="static-white" /><Button label="Stroke" type="static-white" variant="stroke" /><Button label="Ghost" type="static-white" variant="ghost" /></span>
            <span className="demo-light"><Button label="Black filled" type="static-black" /><Button label="Stroke" type="static-black" variant="stroke" /><Button label="Lighter" type="static-black" variant="lighter" /></span>
          </Row>
        </Section>

        <Section title="Badge">
          <Row>{(['information', 'success', 'warning', 'error'] as const).map((s) => <Badge key={s} label={s} status={s} />)}</Row>
          <Row label="sizes"><Badge label="Small" size="sm" /><Badge label="Medium" size="md" status="success" /><Badge label="Large" size="lg" status="warning" /><Badge label="No icon" size="md" status="error" showIcon={false} /></Row>
        </Section>

        <Section title="Alert">
          <Row><Alert title="Payment failed" description="Your card was declined. Update your payment method to keep your plan." status="error" actions={[{ label: 'Update card' }]} onClose={() => {}} /></Row>
          <Row><Alert title="Draft saved" description="You can come back to it from the Drafts tab." status="success" filled={false} actions={[{ label: 'Open drafts' }]} onClose={() => {}} /></Row>
          <Row><Alert title="Plan expires in 3 days" description="Renew now to avoid an interruption." status="warning" /><Alert title="New version available" status="information" filled={false} onClose={() => {}} /></Row>
        </Section>

        <Section title="Banner">
          <Row><Banner title="Verify your email" description="Confirm your address before Friday to keep your account active." status="warning" action={{ label: 'Resend email' }} onClose={() => {}} /></Row>
          <Row><Banner title="Service degraded" description="Some requests may fail. We are on it." status="error" action={{ label: 'See status page' }} /></Row>
        </Section>

        <Section title="Checkbox">
          <Row><Checkbox label="Checkbox label" /><Checkbox label="Checked" defaultChecked /><Checkbox label="Indeterminate" checked="indeterminate" readOnly /><Checkbox label="Read-only" readOnly checked /><Checkbox label="Disabled" disabled /><Checkbox label="Disabled checked" disabled checked /></Row>
          <Row><CheckboxGroup label="Notifications"><Checkbox label="Email" description="Insert the checkbox description here." defaultChecked /><Checkbox label="Push" /><Checkbox label="None" /></CheckboxGroup></Row>
        </Section>

        <Section title="Radio button">
          <Row><RadioGroup label="Delivery" orientation="horizontal"><Radio name="d" label="Standard" defaultChecked /><Radio name="d" label="Express" /><Radio name="d" label="Pickup" disabled /></RadioGroup></Row>
          <Row><RadioGroup label="Plan"><Radio name="p" label="Free" description="For individuals" defaultChecked /><Radio name="p" label="Pro" description="For small teams" /><Radio name="p" label="Enterprise" readOnly /></RadioGroup></Row>
        </Section>

        <Section title="Text input">
          <Row><Input label="Label" required optional labelInfo hint="Insert hint here." /><Input label="Email" type="basic" icon="Envelope" status="error" hint="Enter a valid email address." defaultValue="camille@" /><Input label="Disabled" disabled hint="Insert hint here." /></Row>
          <Row><Input label="Phone" type="phone" /><Input label="Website" type="website" /><Input label="Amount" type="amount" /></Row>
          <Row><Input label="Search" type="search" /><Input label="Password" type="password" defaultValue="hunter2hunter2" /><Input label="Share link" type="share-link" defaultValue="www.example.com/share" readOnly /></Row>
          <Row><Label required>Standalone label</Label><Hint>Default hint</Hint><Hint status="error">Error hint</Hint></Row>
        </Section>

        <Section title="Select">
          <Row>
            <Select label="Country" required hint="Pick the country of the billing address." options={[{ value: 'fr', label: 'France' }, { value: 'de', label: 'Germany' }, { value: 'es', label: 'Spain' }, { value: 'it', label: 'Italy' }, { value: 'pt', label: 'Portugal' }]} />
            <Select label="Role" status="error" hint="A role is required." icon={null} options={[{ value: 'admin', label: 'Admin', description: 'Full access' }, { value: 'editor', label: 'Editor' }, { value: 'viewer', label: 'Viewer' }]} />
            <Select label="Disabled" disabled options={[{ value: 'a', label: 'A' }]} />
          </Row>
        </Section>

        <Section title="Dropdown">
          <Row>
            <Dropdown size="sm">
              <DropdownItem label="Edit" leading="icon" icon="PencilSimple" shortcut="⌘E" />
              <DropdownItem label="Duplicate" leading="icon" icon="Copy" />
              <DropdownItem label="Share" leading="icon" icon="Share" badge="New" />
              <DropdownItem label="Archive" leading="icon" icon="Archive" disabled />
              <DropdownDivider />
              <DropdownItem label="Delete" leading="icon" icon="Trash" type="destructive" />
            </Dropdown>
            <Dropdown size="md" search={<DropdownSearch value={search} onChange={setSearch} />} footer={<DropdownFooter button={{ label: 'Add workspace' }} />}>
              <DropdownSectionLabel>Workspaces</DropdownSectionLabel>
              <DropdownItem label="Acme" description="12 members" leading="avatar" size="md" selected />
              <DropdownItem label="Globex" description="4 members" leading="avatar" size="md" />
              <DropdownItem label="Initech" leading="avatar" size="md" chevron />
            </Dropdown>
            <Dropdown size="sm" user={<DropdownUser name="Wei Chen" detail="wei@example.com" badge="PRO" />} footer={<DropdownFooter text="v1.0.0 · Terms & Conditions" />}>
              <DropdownItem label="Show archived" leading="checkbox" selected />
              <DropdownItem label="Show drafts" leading="checkbox" />
              <DropdownDivider />
              <DropdownItem label="Name" leading="radio" selected />
              <DropdownItem label="Date" leading="radio" />
              <DropdownDivider />
              <DropdownItem label="Sign out" leading="icon" icon="SignOut" />
            </Dropdown>
          </Row>
        </Section>

        <Section title="Accordion">
          <Row>
            <Accordion heading="Shipping and returns" icon="Package">Orders ship within 2 business days. Returns are free for 30 days.</Accordion>
            <AccordionBlock>
              <Accordion grouped heading="How do I cancel an order?" icon="Question" defaultOpen>Open the order and choose Cancel before it ships.</Accordion>
              <Accordion grouped heading="Payment methods" icon="CreditCard">Cards, PayPal and bank transfer.</Accordion>
              <Accordion grouped heading="Delivery times" icon="Rocket">2 to 5 business days depending on the country.</Accordion>
            </AccordionBlock>
          </Row>
        </Section>

        <Section title="Avatar">
          <Row label="sizes">{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => <Avatar key={s} size={s} type="initials" initials="CL" alt="Camille Leroy" />)}<Avatar size="md" type="icon" /><Avatar size="lg" type="image" src="https://i.pravatar.cc/96?img=5" alt="Photo" /></Row>
          <Row label="status">{(['available', 'busy', 'in-call', 'do-not-disturb', 'out-of-office', 'idle', 'away', 'offline'] as const).map((s) => <Avatar key={s} size="md" type="initials" initials="CL" status={s} alt="Camille Leroy" />)}</Row>
          <Row label="user"><AvatarUser name="Camille Leroy" detail="Product designer" size="sm" /><AvatarUser name="Camille Leroy" detail="Product designer" size="md" status="available" /><AvatarUser name="Camille Leroy" detail="Product designer" size="lg" /></Row>
          <Row label="group"><AvatarGroup items={people} size="xs" /><AvatarGroup items={people} size="md" onAdd={() => {}} /><AvatarGroup items={people.slice(0, 3)} size="lg" /></Row>
        </Section>

        <Section title="Breadcrumb">
          <Row><Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Current page' }]} /></Row>
          <Row><Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Section', href: '#' }, { label: 'Subsection', href: '#' }, { label: 'Current page' }]} /></Row>
          <Row><Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Section', href: '#' }, { label: 'Subsection', href: '#' }, { label: 'Page', href: '#' }, { label: 'Current page' }]} /></Row>
        </Section>

        <Section title="Tabs">
          <Row><Tabs items={nav} type="line" size="sm" defaultValue="overview" /></Row>
          <Row><Tabs items={[...nav.slice(0, 3), { id: 'billing', label: 'Billing', badge: '3' }, { id: 'off', label: 'Disabled', disabled: true }]} type="line" size="md" defaultValue="overview" /></Row>
          <Row><Tabs items={nav} type="segmented" size="sm" defaultValue="overview" /><Tabs items={nav} type="segmented" size="md" defaultValue="activity" /></Row>
        </Section>

        <Section title="Header">
          <Row><div className="demo-frame"><Header device="desktop" brand="RV Design" navigation={nav} navigationValue="overview" avatarInitials="CL" /></div></Row>
          <Row><div className="demo-frame demo-frame--mobile"><Header device="mobile" brand="RV Design" avatarInitials="CL" /></div></Row>
        </Section>
      </main>
    </div>
  );
}
