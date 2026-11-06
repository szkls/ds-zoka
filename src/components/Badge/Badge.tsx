import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { statusIcon, type Status } from '../../lib/status';
import './Badge.css';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma `label` — one or two words */
  label: ReactNode;
  /** Figma `status` — default "information" */
  status?: Status;
  /** Figma `size` — default "sm" */
  size?: BadgeSize;
  /** Figma `show-icon` — default true */
  showIcon?: boolean;
  /** Override the status icon (Figma icon-information / icon-success / …) */
  icon?: IconName;
}

/**
 * Badge — Figma "Badge" (page ↳ Badge). Labels a state or a category in one or two words; never clickable.
 * sm: pad 3xs/xs, radius/sm, icon 12 px, xs/medium · md: pad 2xs/sm · lg: pad 2xs/md, radius/md, icon 16 px, sm/medium.
 */
export function Badge({ label, status = 'information', size = 'sm', showIcon = true, icon, className, ...rest }: BadgeProps) {
  const iconName = icon ?? statusIcon[status];
  return (
    <span className={['rv-badge', className ?? ''].join(' ').trim()} data-status={status} data-size={size} {...rest}>
      {showIcon && <Icon name={iconName} fill={!icon} size={size === 'lg' ? '3xs' : '4xs'} weight="medium" />}
      <span className="rv-badge__label">{label}</span>
    </span>
  );
}
