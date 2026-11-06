import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Input.css';

export interface HintProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Figma `status` — default | error | disabled */
  status?: 'default' | 'error' | 'disabled';
  /** Figma `show-icon` — default true */
  showIcon?: boolean;
}

/** Hint — Figma "Hint" (page ↳ Text input): xs/regular; 12 px stroke icon in the text colour (Info, WarningCircle on error). */
export function Hint({ children, status = 'default', showIcon = true, className, ...rest }: HintProps) {
  return (
    <div className={['rv-hint', className ?? ''].join(' ').trim()} data-status={status} {...rest}>
      {showIcon && <Icon name={status === 'error' ? 'WarningCircle' : 'Info'} size={12} strokeWidth={1.2} className="rv-hint__icon" />}
      <span className="rv-hint__text">{children}</span>
    </div>
  );
}
