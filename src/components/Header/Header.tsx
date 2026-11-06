import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { Tabs, type TabItem } from '../Tabs/Tabs';
import { Avatar } from '../Avatar/Avatar';
import './Header.css';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /**
   * Figma `device` — desktop | mobile. When omitted, the header follows the page's `data-device` attribute
   * (both layouts are rendered and CSS shows the right one), i.e. the Figma `device` variable.
   */
  device?: 'desktop' | 'mobile';
  /** Logo wordmark (md/semi-bold) and mark icon (Hexagon on background/brand/base) */
  brand?: ReactNode;
  logoIcon?: IconName;
  /** Navigation tabs (Tabs type=line size=md) — desktop only */
  navigation?: TabItem[];
  navigationValue?: string;
  onNavigate?: (id: string) => void;
  /** Right side: search and notifications icon buttons (desktop), avatar (both) */
  onSearch?: () => void;
  onNotifications?: () => void;
  onMenu?: () => void;
  avatarSrc?: string;
  avatarInitials?: string;
  userName?: string;
  onProfile?: () => void;
}

/**
 * Header — Figma "Header" (page ↳ Header, variants device=desktop / mobile).
 * Desktop (1440): pad 0 3xl, height size/4xl, Left = Logo + Tabs (gap 4xl), Right = Search, Notifications, Profile (gap sm).
 * Mobile (390): pad 0 lg, height size/3xl, Menu (List) · Logo · Avatar.
 */
export function Header({ device, brand = 'Brand', logoIcon = 'Hexagon', navigation, navigationValue, onNavigate, onSearch, onNotifications, onMenu, avatarSrc, avatarInitials = 'CL', userName, onProfile, className, ...rest }: HeaderProps) {
  const logo = (
    <span className="rv-header__logo">
      <span className="rv-header__mark"><Icon name={logoIcon} size="3xs" weight="medium" /></span>
      <span className="rv-header__wordmark">{brand}</span>
    </span>
  );
  return (
    <header className={['rv-header', className ?? ''].join(' ').trim()} data-device={device} {...rest}>
      <div className="rv-header__desktop">
        <div className="rv-header__left">
          {logo}
          {navigation && <Tabs items={navigation} type="line" size="md" value={navigationValue} onChange={onNavigate} label="Main navigation" className="rv-header__nav" />}
        </div>
        <div className="rv-header__right">
          <Button icon="MagnifyingGlass" label="Search" type="brand" variant="ghost" size="md" onClick={onSearch} className="rv-header__iconbtn" />
          <Button icon="Bell" label="Notifications" type="brand" variant="ghost" size="md" onClick={onNotifications} className="rv-header__iconbtn" />
          <button type="button" className="rv-header__profile" onClick={onProfile} aria-label={userName ? `${userName} — account menu` : 'Account menu'}>
            <Avatar type={avatarSrc ? 'image' : 'initials'} src={avatarSrc} initials={avatarInitials} size="md" alt={userName} />
            <Icon name="CaretDown" size="3xs" weight="medium" className="rv-header__chevron" />
          </button>
        </div>
      </div>
      <div className="rv-header__mobile">
        <Button icon="List" label="Menu" type="brand" variant="ghost" size="md" onClick={onMenu} className="rv-header__iconbtn" />
        {logo}
        <button type="button" className="rv-header__profile" onClick={onProfile} aria-label={userName ? `${userName} — account menu` : 'Account menu'}>
          <Avatar type={avatarSrc ? 'image' : 'initials'} src={avatarSrc} initials={avatarInitials} size="md" alt={userName} />
        </button>
      </div>
      <span className="rv-header__rule" aria-hidden="true" />
    </header>
  );
}
