import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Label } from './Label';
import { Hint } from './Hint';
import './Input.css';

/** Figma: Input › type */
export type InputType = 'basic' | 'phone' | 'website' | 'amount' | 'search' | 'password' | 'share-link';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Figma `type` — default "basic" */
  type?: InputType;
  /** Figma `show-label` + Label `label` */
  label?: ReactNode;
  required?: boolean;
  optional?: boolean | string;
  /** Label `show-info` */
  labelInfo?: boolean;
  /** Figma `show-hint` + Hint text */
  hint?: ReactNode;
  /** Figma `status` — "error" turns the border red and the hint into an error message */
  status?: 'default' | 'error';
  /** Figma `show-icon` + `icon` (basic type; search/password/share-link have fixed icons) */
  icon?: IconName | null;
  /** Figma `show-info` — trailing Info icon inside the field */
  info?: boolean;
  /** phone: country code shown in the leading addon (default "US") */
  countryCode?: string;
  /** website: prefix text (default "https://") */
  prefix?: string;
  /** amount: currency symbol before the value (default "$") and currency code in the trailing select (default "USD") */
  currencySymbol?: string;
  currencyCode?: string;
  /** search: keyboard shortcut shown on the right (default "⌘K") */
  shortcut?: string;
  /** share-link: called when the copy button is pressed */
  onCopy?: () => void;
  /** Fill the container width (default width 320 px like the Figma component) */
  fullWidth?: boolean;
}

/**
 * Input — Figma "Input" (page ↳ Text input). Label above, field (size/xl, radius/md, border/neutral/base), Hint under.
 * States: placeholder / hover / focus (focus-ring/neutral, border strongest) / filled / disabled; status error.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = 'basic', label, required, optional, labelInfo, hint, status = 'default', icon, info, countryCode = 'US', prefix = 'https://', currencySymbol = '$', currencyCode = 'USD', shortcut = '⌘K', onCopy, fullWidth, className, id, disabled, placeholder, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintId = `${inputId}-hint`;
  const [reveal, setReveal] = useState(false);
  const leadingIcon: IconName | null | undefined =
    type === 'search' ? 'MagnifyingGlass' : type === 'password' ? 'Lock' : type === 'share-link' ? 'Link' : type === 'basic' ? (icon === undefined ? 'User' : icon) : null;
  const nativeType = type === 'password' && !reveal ? 'password' : type === 'phone' ? 'tel' : type === 'website' ? 'url' : type === 'search' ? 'search' : type === 'amount' ? 'text' : 'text';
  const defaultPlaceholder: Record<InputType, string> = { basic: 'Placeholder', phone: '(555) 000-0000', website: 'www.example.com', amount: '0.00', search: 'Search…', password: '••••••••••', 'share-link': 'www.example.com/share' };
  return (
    <div className={['rv-input', fullWidth ? 'rv-input--full' : '', className ?? ''].join(' ').trim()} data-type={type} data-status={status} data-disabled={disabled || undefined}>
      {label && (
        <Label htmlFor={inputId} required={required} optional={optional} info={labelInfo} disabled={disabled}>
          {label}
        </Label>
      )}
      <div className="rv-input__field">
        {type === 'phone' && (
          <span className="rv-input__addon rv-input__addon--leading">
            <Icon name="Globe" size="3xs" weight="medium" />
            <span>{countryCode}</span>
            <Icon name="CaretDown" size="3xs" weight="medium" />
          </span>
        )}
        {type === 'website' && <span className="rv-input__addon rv-input__addon--leading">{prefix}</span>}
        <span className="rv-input__content">
          {leadingIcon && <Icon name={leadingIcon} size="3xs" weight="medium" className="rv-input__icon" />}
          {type === 'amount' && <span className="rv-input__currency">{currencySymbol}</span>}
          <input
            ref={ref}
            id={inputId}
            type={nativeType}
            className="rv-input__control"
            placeholder={placeholder ?? defaultPlaceholder[type]}
            disabled={disabled}
            aria-invalid={status === 'error' || undefined}
            aria-describedby={hint ? hintId : undefined}
            inputMode={type === 'amount' ? 'decimal' : undefined}
            {...rest}
          />
          {type === 'basic' && info && <Icon name="Info" size="3xs" weight="medium" className="rv-input__icon rv-input__info" />}
          {type === 'search' && <span className="rv-input__shortcut">{shortcut}</span>}
          {type === 'password' && (
            <button type="button" className="rv-input__toggle" aria-label={reveal ? 'Hide password' : 'Show password'} onClick={() => setReveal((v) => !v)} disabled={disabled}>
              <Icon name={reveal ? 'EyeSlash' : 'Eye'} size="3xs" weight="medium" />
            </button>
          )}
        </span>
        {type === 'amount' && (
          <span className="rv-input__addon rv-input__addon--trailing">
            <span>{currencyCode}</span>
            <Icon name="CaretDown" size="3xs" weight="medium" />
          </span>
        )}
        {type === 'share-link' && (
          <button type="button" className="rv-input__addon rv-input__addon--trailing rv-input__copy" aria-label="Copy link" onClick={onCopy} disabled={disabled}>
            <Icon name="Copy" size="3xs" weight="medium" />
          </button>
        )}
      </div>
      {hint && (
        <Hint id={hintId} status={disabled ? 'disabled' : status}>
          {hint}
        </Hint>
      )}
    </div>
  );
});
