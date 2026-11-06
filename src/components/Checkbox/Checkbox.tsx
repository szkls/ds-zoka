import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../../icons/Icon';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'checked'> {
  /** Figma `label` (show-label=false → pass nothing and give an aria-label) */
  label?: ReactNode;
  /** Figma `show-description` + `description` */
  description?: ReactNode;
  /** Figma `checked`: false | true | "indeterminate" (parent "Select all" box only) */
  checked?: boolean | 'indeterminate';
  /** Figma state=read-only (aria-readonly, value cannot change, label stays readable) */
  readOnly?: boolean;
}

/**
 * Checkbox — Figma "Checkbox" (page ↳ Checkbox): 20 px hit area, 16 px box radius/sm, label sm/medium, description sm/regular.
 * States hover / focus (focus-ring/brand) / read-only / disabled; the box is `_Checkbox box`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, description, checked, readOnly, disabled, className, id, onChange, ...rest }, ref) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inner = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (inner.current) inner.current.indeterminate = checked === 'indeterminate'; }, [checked]);
  return (
    <label className={['rv-checkbox', className ?? ''].join(' ').trim()} data-disabled={disabled || undefined} data-readonly={readOnly || undefined} htmlFor={inputId}>
      <span className="rv-checkbox__hit">
        <input
          ref={(el) => { inner.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
          id={inputId}
          type="checkbox"
          className="rv-checkbox__input"
          checked={checked === undefined ? undefined : checked === true}
          aria-checked={checked === 'indeterminate' ? 'mixed' : undefined}
          aria-readonly={readOnly || undefined}
          disabled={disabled}
          onChange={readOnly ? (e) => e.preventDefault() : onChange}
          {...rest}
        />
        <span className="rv-checkbox__box" aria-hidden="true">
          <Icon name={checked === 'indeterminate' ? 'Minus' : 'Check'} size={10} strokeWidth={1.5} className="rv-checkbox__icon" />
        </span>
      </span>
      {(label || description) && (
        <span className="rv-checkbox__text">
          {label && <span className="rv-checkbox__label">{label}</span>}
          {description && <span className="rv-checkbox__description">{description}</span>}
        </span>
      )}
    </label>
  );
});

export interface CheckboxGroupProps {
  /** Figma `label` (group label) */
  label?: ReactNode;
  /** Figma `orientation` — default "vertical" */
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

/** Checkbox group — Figma "Checkbox group": label sm/medium, options gap/md, vertical or horizontal. */
export function CheckboxGroup({ label, orientation = 'vertical', children, className }: CheckboxGroupProps) {
  return (
    <fieldset className={['rv-checkbox-group', className ?? ''].join(' ').trim()} data-orientation={orientation}>
      {label && <legend className="rv-checkbox-group__label">{label}</legend>}
      <div className="rv-checkbox-group__options">{children}</div>
    </fieldset>
  );
}
