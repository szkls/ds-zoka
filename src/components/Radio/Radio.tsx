import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import './Radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Figma `label` */
  label?: ReactNode;
  /** Figma `show-description` + `description` */
  description?: ReactNode;
  /** Figma state=read-only */
  readOnly?: boolean;
}

/**
 * Radio button — Figma "Radio button" (page ↳ Radio button): 20 px hit area, 16 px circle radius/full, 6 px dot when checked.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ label, description, readOnly, disabled, className, id, onChange, ...rest }, ref) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <label className={['rv-radio', className ?? ''].join(' ').trim()} data-disabled={disabled || undefined} data-readonly={readOnly || undefined} htmlFor={inputId}>
      <span className="rv-radio__hit">
        <input ref={ref} id={inputId} type="radio" className="rv-radio__input" aria-readonly={readOnly || undefined} disabled={disabled} onChange={readOnly ? (e) => e.preventDefault() : onChange} {...rest} />
        <span className="rv-radio__circle" aria-hidden="true"><span className="rv-radio__dot" /></span>
      </span>
      {(label || description) && (
        <span className="rv-radio__text">
          {label && <span className="rv-radio__label">{label}</span>}
          {description && <span className="rv-radio__description">{description}</span>}
        </span>
      )}
    </label>
  );
});

export interface RadioGroupProps {
  /** Figma `label` (group label) — the question */
  label?: ReactNode;
  /** Figma `orientation` — default "vertical" */
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

/** Radio button group — Figma "Radio button group": fieldset + legend, options gap/md. */
export function RadioGroup({ label, orientation = 'vertical', children, className }: RadioGroupProps) {
  return (
    <fieldset className={['rv-radio-group', className ?? ''].join(' ').trim()} data-orientation={orientation}>
      {label && <legend className="rv-radio-group__label">{label}</legend>}
      <div className="rv-radio-group__options">{children}</div>
    </fieldset>
  );
}
