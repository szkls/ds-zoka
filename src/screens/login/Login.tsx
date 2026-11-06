import { useState, type FormEvent } from 'react';
import { Alert, Button, Checkbox, Icon, Input, Tabs } from '../../index';
import './login.css';

/**
 * Login screen — composed only from ds-zoka components and tokens.
 * Not in the design system yet (flagged for Figma): the text link "Forgot password?" / "Create one".
 */
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const bad = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    setEmailError(bad ? 'Enter a valid email address, like name@company.com.' : null);
    if (bad) { setError(null); return; }
    if (password.length < 8) { setError('The email or password is incorrect. Check both and try again.'); return; }
    setError(null); setDone(true);
  };

  return (
    <div className="login">
      <main className="login__panel">
        <div className="login__brand">
          <span className="login__mark"><Icon name="Hexagon" size="3xs" weight="medium" /></span>
          <span className="login__wordmark">Zoka</span>
        </div>

        <div className="login__heading">
          <h1 className="login__title">Sign in</h1>
          <p className="login__subtitle">Use your work email to open your workspace.</p>
        </div>

        {error && <Alert status="error" title="Sign-in failed" description={error} fullWidth onClose={() => setError(null)} />}
        {done && <Alert status="success" title="Signed in" description="Redirecting to your workspace." fullWidth />}

        <form className="login__form" onSubmit={submit} noValidate>
          <Input id="login-email" label="Email" type="basic" icon="Envelope" placeholder="name@company.com" autoComplete="email" fullWidth
            value={email} onChange={(e) => setEmail(e.target.value)} status={emailError ? 'error' : 'default'} hint={emailError ?? undefined} />
          <Input id="login-password" label="Password" type="password" autoComplete="current-password" fullWidth placeholder="Your password"
            value={password} onChange={(e) => setPassword(e.target.value)} hint="At least 8 characters." />
          <div className="login__options">
            <Checkbox id="login-remember" label="Keep me signed in" defaultChecked />
            <a className="login__link" href="#forgot">Forgot password?</a>
          </div>
          <Button htmlType="submit" label="Sign in" fullWidth />
        </form>

        <div className="login__divider"><span>or</span></div>

        <div className="login__alt">
          <Button label="Continue with SSO" variant="stroke" iconLeft="Key" fullWidth />
          <Button label="Continue with a magic link" variant="ghost" iconLeft="Envelope" fullWidth />
        </div>

        <p className="login__footer">No account yet? <a className="login__link" href="#signup">Create one</a></p>
      </main>
      <PreviewBar />
    </div>
  );
}

/** Discreet preview controls: theme / brand / device, i.e. the three Figma mode switches. */
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
      <Tabs type="segmented" size="sm" label="Device" items={[{ id: 'desktop', label: 'Desktop', icon: 'Layout' }, { id: 'mobile', label: 'Mobile', icon: 'Phone' }]} value={device} onChange={(v) => set('device', v)} />
    </div>
  );
}
