import type { HTMLAttributes } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'none' | 'available' | 'busy' | 'in-call' | 'do-not-disturb' | 'out-of-office' | 'idle' | 'away' | 'offline';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma `type` — image | icon | initials; default "image" (falls back to initials/icon when `src` is missing) */
  type?: 'image' | 'icon' | 'initials';
  /** Figma `size` — xs 20, sm 24, md 32, lg 40, xl 48 px */
  size?: AvatarSize;
  /** Figma `status` — presence dot, bottom-right */
  status?: AvatarStatus;
  /** Figma `initials` */
  initials?: string;
  /** Figma `icon` — default User */
  icon?: IconName;
  src?: string;
  /** Accessible name (person's name). The status is also given in words. */
  alt?: string;
}

const statusLabel: Record<AvatarStatus, string> = { none: '', available: 'Available', busy: 'Busy', 'in-call': 'In a call', 'do-not-disturb': 'Do not disturb', 'out-of-office': 'Out of office', idle: 'Idle', away: 'Away', offline: 'Offline' };

/**
 * Avatar — Figma "Avatar" (page ↳ Avatar). Circle radius/full; icon and initials on background/brand/subtlest in brand colour.
 * Dot geometry per size (outer / inner / ring) is fixed in the component, as in Figma.
 */
export function Avatar({ type = 'image', size = 'xs', status = 'none', initials = 'CL', icon = 'User', src, alt, className, ...rest }: AvatarProps) {
  const kind = type === 'image' && !src ? (initials ? 'initials' : 'icon') : type;
  const iconPx = { xs: 12, sm: 12, md: 16, lg: 20, xl: 24 }[size];
  return (
    <span className={['rv-avatar', className ?? ''].join(' ').trim()} data-size={size} data-type={kind} data-status={status} role="img" aria-label={[alt, status !== 'none' ? statusLabel[status] : ''].filter(Boolean).join(', ') || undefined} {...rest}>
      {kind === 'image' && <img className="rv-avatar__image" src={src} alt="" />}
      {kind === 'icon' && <Icon name={icon} size={iconPx} weight="medium" className="rv-avatar__icon" />}
      {kind === 'initials' && <span className="rv-avatar__initials">{initials}</span>}
      {status !== 'none' && (
        <span className="rv-avatar__dot" aria-hidden="true">
          <span className="rv-avatar__dot-inner">{status === 'do-not-disturb' && <span className="rv-avatar__dot-bar" />}</span>
        </span>
      )}
    </span>
  );
}
