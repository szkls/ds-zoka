import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Button } from '../Button/Button';
import { statusIcon, type Status } from '../../lib/status';
import './Alert.css';

export interface AlertAction { label: string; onClick?: () => void }

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `title` */
  title: ReactNode;
  /** Figma `show-description` + `description` */
  description?: ReactNode;
  /** Figma `status` — default "information" */
  status?: Status;
  /** Figma `filled` — true: tinted background; false: extra-subtle background + border + shadow/xs */
  filled?: boolean;
  /** Figma `show-icon` — default true */
  showIcon?: boolean;
  /** Override the status icon */
  icon?: IconName;
  /** Figma `show-actions` — ghost xs brand buttons (label flush left) */
  actions?: AlertAction[];
  /** Figma `show-close` — renders the X and calls onClose */
  onClose?: () => void;
  /** Fill the container width (Figma instances set to Fill). Default width is 400 px like the component. */
  fullWidth?: boolean;
}

/**
 * Alert — Figma "Alert" (page ↳ Alert). Page / section feedback that stays until the user acts or dismisses it.
 * Root: pad lg, gap md, radius/lg · Icon 20 px icon/system/{status}/bold · Title sm/semi-bold · Description sm/regular text/neutral/base.
 */
export function Alert({ title, description, status = 'information', filled = true, showIcon = true, icon, actions, onClose, fullWidth, className, ...rest }: AlertProps) {
  return (
    <div className={['rv-alert', fullWidth ? 'rv-alert--full' : '', className ?? ''].join(' ').trim()} data-status={status} data-filled={filled} role={status === 'error' ? 'alert' : 'status'} {...rest}>
      {showIcon && <Icon name={icon ?? statusIcon[status]} fill={!icon} size="2xs" weight="medium" className="rv-alert__icon" />}
      <div className="rv-alert__content">
        <div className="rv-alert__text">
          <div className="rv-alert__title">{title}</div>
          {description && <div className="rv-alert__description">{description}</div>}
        </div>
        {actions && actions.length > 0 && (
          <div className="rv-alert__actions">
            {actions.map((a) => (
              <Button key={a.label} label={a.label} type="brand" variant="ghost" size="xs" className="rv-alert__action" onClick={a.onClick} />
            ))}
          </div>
        )}
      </div>
      {onClose && (
        <button type="button" className="rv-alert__close" aria-label="Close" onClick={onClose}>
          <Icon name="X" size="3xs" weight="medium" />
        </button>
      )}
    </div>
  );
}
