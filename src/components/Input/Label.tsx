import type { LabelHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Input.css';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Figma `label` */
  children: ReactNode;
  /** Figma `show-required` — adds the brand-coloured "*" */
  required?: boolean;
  /** Figma `show-optional` + `optional` text (default "(Optional)") */
  optional?: boolean | string;
  /** Figma `show-info` — Info icon (filled, 16 px, icon/neutral/subtler); pass the tooltip text as `infoTitle` */
  info?: boolean;
  infoTitle?: string;
  /** Figma state=disabled */
  disabled?: boolean;
}

/** Label — Figma "Label" (page ↳ Text input): sm/medium text/neutral/strongest, gap/2xs, * text/brand/base, (Optional) sm/regular text/neutral/soft. */
export function Label({ children, required, optional, info, infoTitle, disabled, className, ...rest }: LabelProps) {
  return (
    <label className={['rv-label', className ?? ''].join(' ').trim()} data-disabled={disabled || undefined} {...rest}>
      <span className="rv-label__text">{children}</span>
      {required && <span className="rv-label__required" aria-hidden="true">*</span>}
      {optional && <span className="rv-label__optional">{typeof optional === 'string' ? optional : '(Optional)'}</span>}
      {info && <Icon name="Info" fill size="3xs" className="rv-label__info" label={infoTitle} />}
    </label>
  );
}
