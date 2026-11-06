import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { statusIcon, type Status } from '../../lib/status';
import './Banner.css';

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `title` */
  title: ReactNode;
  /** Figma `show-description` + `description` */
  description?: ReactNode;
  /** Figma `status` — default "information" */
  status?: Status;
  /** Figma `show-icon` — default true */
  showIcon?: boolean;
  icon?: IconName;
  /** Figma `show-action` — one ghost xs button (static-white, or static-black on warning) */
  action?: { label: string; onClick?: () => void };
  /** Figma `show-close` */
  onClose?: () => void;
}

/**
 * Banner — Figma "Banner" (page ↳ Banner). Site-wide message at the very top of the screen, full width.
 * Locked in Light mode in Figma (3a. semantic.color = Light): the component forces data-theme="light" on itself.
 * Root: pad md/3xl, gap md · fills: information stronger, success stronger, warning base (dark text), error bold.
 */
export function Banner({ title, description, status = 'information', showIcon = true, icon, action, onClose, className, ...rest }: BannerProps) {
  const dark = status === 'warning';
  return (
    <div className={['rv-banner', className ?? ''].join(' ').trim()} data-status={status} data-theme="light" role="status" {...rest}>
      {showIcon && <Icon name={icon ?? statusIcon[status]} fill={!icon} size="2xs" weight="medium" className="rv-banner__icon" />}
      <div className="rv-banner__text">
        <span className="rv-banner__title">{title}</span>
        {description && <span className="rv-banner__description">{description}</span>}
      </div>
      {action && <Button label={action.label} type={dark ? 'static-black' : 'static-white'} variant="ghost" size="xs" onClick={action.onClick} />}
      {onClose && (
        <button type="button" className="rv-banner__close" aria-label="Close" onClick={onClose}>
          <Icon name="X" size="3xs" weight="medium" />
        </button>
      )}
    </div>
  );
}
