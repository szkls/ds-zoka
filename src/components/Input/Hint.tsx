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

/** Hint — Figma "Hint" (page ↳ Text input): xs/regular, Info icon (filled) icon/neutral/subtler; error → WarningCircle icon/system/error/base + text/system/error/base. */
export function Hint({ children, status = 'default', showIcon = true, className, ...rest }: HintProps) {
  return (
    <div className={['rv-hint', className ?? ''].join(' ').trim()} data-status={status} {...rest}>
      {showIcon && <Icon name={status === 'error' ? 'WarningCircle' : 'Info'} fill size="3xs" className="rv-hint__icon" />}
      <span className="rv-hint__text">{children}</span>
    </div>
  );
}
