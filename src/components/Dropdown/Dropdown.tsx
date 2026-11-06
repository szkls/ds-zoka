import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';
import { AvatarUser } from '../Avatar/AvatarUser';
import './Dropdown.css';

export type DropdownSize = 'sm' | 'md';

/* ── _Dropdown item ─────────────────────────────────────────────── */
export interface DropdownItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma `label` */
  label: ReactNode;
  /** Figma `show-description` + `description` (xs/regular, text/neutral/soft) */
  description?: ReactNode;
  /** Figma `leading` — none | icon | avatar | checkbox | radio; default "none" */
  leading?: 'none' | 'icon' | 'avatar' | 'checkbox' | 'radio';
  /** Figma `icon` (leading=icon) */
  icon?: IconName;
  /** leading=avatar: image URL */
  avatarSrc?: string;
  /** Figma `size` — default "sm" (inherited from the Dropdown) */
  size?: DropdownSize;
  /** Figma `selected` — medium label + trailing Check icon/brand/base (or checked checkbox / radio) */
  selected?: boolean;
  /** Figma `type` — default | destructive */
  type?: 'default' | 'destructive';
  /** Figma `show-shortcut` + `shortcut` (xs/regular) */
  shortcut?: string;
  /** Figma `show-badge` — Badge information sm */
  badge?: string;
  /** Figma `show-chevron` — submenu indicator */
  chevron?: boolean;
}

/** Dropdown item — Figma "_Dropdown item" (leading × size × state × selected × type). */
export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(function DropdownItem(
  { label, description, leading = 'none', icon = 'User', avatarSrc, size = 'sm', selected, type = 'default', shortcut, badge, chevron, className, disabled, ...rest },
  ref,
) {
  const iconSize = size === 'md' ? '2xs' : '3xs';
  return (
    <button
      ref={ref}
      type="button"
      role={leading === 'checkbox' ? 'menuitemcheckbox' : leading === 'radio' ? 'menuitemradio' : 'menuitem'}
      aria-checked={leading === 'checkbox' || leading === 'radio' ? !!selected : undefined}
      className={['rv-dropdown-item', className ?? ''].join(' ').trim()}
      data-size={size}
      data-type={type}
      data-selected={selected || undefined}
      data-leading={leading}
      disabled={disabled}
      {...rest}
    >
      {leading !== 'none' && (
        <span className="rv-dropdown-item__leading">
          {leading === 'icon' && <Icon name={icon} size={iconSize} weight={selected ? 'medium' : 'regular'} />}
          {leading === 'avatar' && <Avatar type={avatarSrc ? 'image' : 'initials'} src={avatarSrc} size="xs" initials="CL" />}
          {leading === 'checkbox' && (
            <span className="rv-dropdown-item__box" data-checked={selected || undefined}>
              <Icon name="Check" size={10} strokeWidth={1.5} />
            </span>
          )}
          {leading === 'radio' && (
            <span className="rv-dropdown-item__circle" data-checked={selected || undefined}>
              <span />
            </span>
          )}
        </span>
      )}
      <span className="rv-dropdown-item__text">
        <span className="rv-dropdown-item__label">{label}</span>
        {description && <span className="rv-dropdown-item__description">{description}</span>}
      </span>
      {shortcut && <span className="rv-dropdown-item__shortcut">{shortcut}</span>}
      {badge && <Badge label={badge} status="information" size="sm" showIcon={false} className="rv-dropdown-item__badge" />}
      {chevron && <Icon name="CaretRight" size="3xs" className="rv-dropdown-item__chevron" />}
      {selected && (leading === 'none' || leading === 'icon' || leading === 'avatar') && <Icon name="Check" size="3xs" weight="medium" className="rv-dropdown-item__check" />}
    </button>
  );
});

/* ── sub-components ─────────────────────────────────────────────── */
/** _Dropdown section label — uppercase xs/medium text/neutral/soft, pad xs/sm */
export function DropdownSectionLabel({ children }: { children: ReactNode }) {
  return <div className="rv-dropdown__section-label" role="presentation">{children}</div>;
}
/** _Dropdown divider — border/xs rule, pad 2xs/sm */
export function DropdownDivider() {
  return <div className="rv-dropdown__divider" role="separator"><span /></div>;
}
/** _Dropdown search — search row at the top of long lists (7+ items) */
export function DropdownSearch({ value, onChange, placeholder = 'Search…', onClear }: { value: string; onChange: (v: string) => void; placeholder?: string; onClear?: () => void }) {
  return (
    <div className="rv-dropdown__search" data-state={value ? 'filled' : 'placeholder'}>
      <Icon name="MagnifyingGlass" size="3xs" />
      <input className="rv-dropdown__search-input" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-label="Search" />
      {value && (
        <button type="button" className="rv-dropdown__search-clear" aria-label="Clear" onClick={() => { onChange(''); onClear?.(); }}>
          <Icon name="X" size="3xs" />
        </button>
      )}
    </div>
  );
}
/** _Dropdown user — account-menu header: Avatar user md + optional Badge */
export function DropdownUser({ name, detail, src, badge }: { name: string; detail?: string; src?: string; badge?: string }) {
  return (
    <div className="rv-dropdown__user">
      <AvatarUser name={name} detail={detail} src={src} size="md" className="rv-dropdown__user-avatar" />
      {badge && <Badge label={badge} status="success" size="sm" showIcon={false} />}
    </div>
  );
}
/** _Dropdown footer — type text (xs/regular) or button (brand stroke sm, full width) */
export function DropdownFooter({ text, button }: { text?: ReactNode; button?: { label: string; icon?: IconName; onClick?: () => void } }) {
  return (
    <div className="rv-dropdown__footer" data-type={button ? 'button' : 'text'}>
      {button ? <Button label={button.label} type="brand" variant="stroke" size="sm" iconLeft={button.icon ?? 'Plus'} fullWidth onClick={button.onClick} /> : <span className="rv-dropdown__footer-text">{text}</span>}
    </div>
  );
}

/* ── Dropdown panel ─────────────────────────────────────────────── */
export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma `size` — default "sm"; passed down to items that don't set their own */
  size?: DropdownSize;
  /** Figma `show-search` */
  search?: ReactNode;
  /** Figma `show-user` */
  user?: ReactNode;
  /** Figma `show-footer` */
  footer?: ReactNode;
  children: ReactNode;
}

/**
 * Dropdown — Figma "Dropdown" (page ↳ Dropdown): panel 240 px, pad 2xs, gap 3xs, extra-subtle fill, border/neutral/subtler, radius/lg, shadow/md.
 * Order: Search › User › items › Footer. Use `DropdownItem`, `DropdownSectionLabel`, `DropdownDivider` as children.
 */
export function Dropdown({ size = 'sm', search, user, footer, children, className, ...rest }: DropdownProps) {
  return (
    <div className={['rv-dropdown', className ?? ''].join(' ').trim()} data-size={size} role="menu" {...rest}>
      {search}
      {user}
      {children}
      {footer}
    </div>
  );
}
