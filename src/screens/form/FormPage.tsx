import { useState, type FormEvent } from 'react';
import { Alert, Breadcrumb, Button, Checkbox, CheckboxGroup, Header, Input, Radio, RadioGroup, Select, Tabs } from '../../index';
import { Page, PageSection } from '../../layout/Page';
import './form.css';

const nav = [{ id: 'overview', label: 'Overview' }, { id: 'members', label: 'Members' }, { id: 'settings', label: 'Settings' }];

/** Test screen: a form page built on the Page template (sections + sub-sections) with ds-zoka components only. */
export function FormPage() {
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [name, setName] = useState('Camille Leroy');
  const [email, setEmail] = useState('camille.leroy@zoka.app');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = 'Enter the member’s full name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = 'Enter a valid email address, like name@company.com.';
    setErrors(next); setSaved(Object.keys(next).length === 0);
  };

  return (
    <>
      <Page
        header={<Header brand="Zoka" navigation={nav} navigationValue="members" avatarInitials="CL" userName="Camille Leroy" />}
        breadcrumb={<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Members', href: '#' }, { label: 'New member' }]} />}
        title="New member"
        description="Invite someone to the workspace. They receive an email with a link to set their password; the role and the access level can be changed later."
      >
        <form onSubmit={submit} noValidate className="form">
          {saved && <Alert status="success" title="Invitation sent" description="Camille Leroy will receive the email in a few minutes." fullWidth onClose={() => setSaved(false)} />}

          <PageSection title="Identity" description="How this person appears to the rest of the team.">
            <div className="rv-form-fields">
              <Input id="name" label="Full name" required icon="User" placeholder="First and last name" value={name} onChange={(e) => setName(e.target.value)} status={errors.name ? 'error' : 'default'} hint={errors.name ?? 'As shown on the profile and in mentions.'} />
              <Input id="title" label="Job title" optional icon="Briefcase" placeholder="Product designer" />
              <Input id="email" label="Work email" required icon="Envelope" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} status={errors.email ? 'error' : 'default'} hint={errors.email ?? 'The invitation is sent to this address.'} />
              <Input id="phone" label="Phone" optional type="phone" />
            </div>
          </PageSection>

          <PageSection title="Role and access" description="What this person can see and do. Admins can change it at any time from the member list.">
            <div className="rv-form-fields">
              <Select id="role" label="Role" required icon="Key" defaultValue="editor" hint="Editors can create and change content; viewers only read." options={[{ value: 'admin', label: 'Admin', description: 'Full access, billing included' }, { value: 'editor', label: 'Editor', description: 'Create and edit content' }, { value: 'viewer', label: 'Viewer', description: 'Read only' }]} />
              <Select id="team" label="Team" optional icon="Users" placeholder="Choose a team" options={[{ value: 'design', label: 'Design' }, { value: 'product', label: 'Product' }, { value: 'eng', label: 'Engineering' }]} />
            </div>
          </PageSection>

          <PageSection title="Access level" description="Which projects this person can open. It applies to projects created later too.">
            <RadioGroup label="Projects">
              <Radio name="access" label="All projects" description="Including the ones created later." defaultChecked />
              <Radio name="access" label="Selected projects only" description="You pick them after the invitation is accepted." />
              <Radio name="access" label="No project yet" description="The person joins the workspace without any project." />
            </RadioGroup>
          </PageSection>

          <PageSection title="Notifications" description="Default notification settings. The member can change them from their own account.">
            <CheckboxGroup label="Send an email for">
              <Checkbox label="Mentions and replies" defaultChecked />
              <Checkbox label="Weekly activity digest" defaultChecked />
              <Checkbox label="Billing and plan changes" />
            </CheckboxGroup>
          </PageSection>

          <PageSection title="Invitation" description="A short note goes with the invitation email.">
            <Input id="note" label="Message" optional icon={null} placeholder="Welcome to the team!" fullWidth hint="Up to 200 characters." className="form__message" />
            <div className="rv-form-actions">
              <Button htmlType="submit" label="Send invitation" iconLeft="Envelope" />
              <Button label="Cancel" variant="stroke" />
            </div>
          </PageSection>
        </form>
      </Page>
      <PreviewBar />
    </>
  );
}

function PreviewBar() {
  const html = document.documentElement;
  const [theme, setTheme] = useState(html.dataset.theme === 'dark' ? 'dark' : 'light');
  const [brand, setBrand] = useState(html.dataset.brand ?? 'boreal');
  const [device, setDevice] = useState(html.dataset.device ?? 'desktop');
  const set = (k: 'theme' | 'brand' | 'device', v: string) => { html.dataset[k] = v; if (k === 'theme') setTheme(v); if (k === 'brand') setBrand(v); if (k === 'device') setDevice(v); };
  return (
    <div className="preview-bar" aria-label="Preview options">
      <Tabs type="segmented" size="sm" label="Theme" items={[{ id: 'light', label: 'Light', icon: 'Sun' }, { id: 'dark', label: 'Dark', icon: 'Moon' }]} value={theme} onChange={(v) => set('theme', v)} />
      <Tabs type="segmented" size="sm" label="Brand" items={[{ id: 'boreal', label: 'Boreal', icon: null }, { id: 'sylva', label: 'Sylva', icon: null }]} value={brand} onChange={(v) => set('brand', v)} />
      <Tabs type="segmented" size="sm" label="Device" items={[{ id: 'desktop', label: 'Desktop', icon: 'Layout' }, { id: 'mobile', label: 'Phone', icon: 'Phone' }]} value={device} onChange={(v) => set('device', v)} />
    </div>
  );
}
