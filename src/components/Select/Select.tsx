import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Label } from '../Input/Label';
import { Hint } from '../Input/Hint';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import './Select.css';

export interface SelectOption { value: string; label: string; description?: string; icon?: IconName; disabled?: boolean }

export interface SelectProps {
  /** Figma Label */
  label?: ReactNode;
  required?: boolean;
  optional?: boolean | string;
  labelInfo?: boolean;
  /** Figma Hint */
  hint?: ReactNode;
  /** Figma `status` */
  status?: 'default' | 'error';
  /** Figma `placeholder` — default "Select an option" */
  placeholder?: string;
  /** Figma `show-icon` + `icon` — leading icon in the field (default User, pass null to hide) */
  icon?: IconName | null;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

/**
 * Select — Figma "Select" (page ↳ Dropdown): same anatomy as the Input (Label, field, Hint); the open panel is a Dropdown size=md
 * placed under the field (Figma: absolute, covers the Hint). Keyboard: Enter/Space/ArrowDown open, arrows move, Enter picks, Escape closes.
 */
export function Select({ label, required, optional, labelInfo, hint, status = 'default', placeholder = 'Select an option', icon = 'User', options, value, defaultValue, onChange, disabled, fullWidth, className, id, name }: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const [internal, setInternal] = useState<string | undefined>(defaultValue);
  const current = value ?? internal;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === current);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!rootRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const pick = (o: SelectOption) => { if (o.disabled) return; setInternal(o.value); onChange?.(o.value); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) { e.preventDefault(); setOpen(true); setActive(Math.max(0, options.findIndex((o) => o.value === current))); return; }
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(options.length - 1, i + 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(options[active]); }
  };

  return (
    <div ref={rootRef} className={['rv-select', fullWidth ? 'rv-select--full' : '', className ?? ''].join(' ').trim()} data-status={status} data-disabled={disabled || undefined} data-open={open || undefined}>
      {label && <Label htmlFor={fieldId} required={required} optional={optional} info={labelInfo} disabled={disabled}>{label}</Label>}
      <div className="rv-select__wrap">
        <button
          type="button"
          id={fieldId}
          className="rv-select__field"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-invalid={status === 'error' || undefined}
          disabled={disabled}
          data-filled={selected ? true : undefined}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onKey}
        >
          {icon && <Icon name={icon} size="3xs" className="rv-select__icon" />}
          <span className="rv-select__value">{selected ? selected.label : placeholder}</span>
          <Icon name={open ? 'CaretUp' : 'CaretDown'} size="3xs" className="rv-select__chevron" />
        </button>
        {name && <input type="hidden" name={name} value={current ?? ''} />}
        {open && (
          <Dropdown size="md" className="rv-select__panel" role="listbox" aria-labelledby={fieldId}>
            {options.map((o, i) => (
              <DropdownItem
                key={o.value}
                role="option"
                aria-selected={o.value === current}
                label={o.label}
                description={o.description}
                leading={o.icon ? 'icon' : 'none'}
                icon={o.icon}
                size="md"
                selected={o.value === current}
                disabled={o.disabled}
                className={i === active ? 'rv-dropdown-item--active' : undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(o)}
              />
            ))}
          </Dropdown>
        )}
      </div>
      {hint && <Hint status={disabled ? 'disabled' : status}>{hint}</Hint>}
    </div>
  );
}
