import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Badge } from '../Badge/Badge';
import './Tabs.css';

export interface TabItem {
  id: string;
  /** Figma `label` */
  label: ReactNode;
  /** Figma `show-icon` + `icon` (default SquaresFour) */
  icon?: IconName | null;
  /** Figma `show-badge` — Badge information sm after the label */
  badge?: string;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[];
  /** Figma `type` — line (underline indicator + bottom rule) | segmented (pill container); default "line" */
  type?: 'line' | 'segmented';
  /** Figma `size` — sm | md; default "sm" */
  size?: 'sm' | 'md';
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** Accessible name of the tab list */
  label?: string;
}

/**
 * Tabs — Figma "Tabs" / "_Tab item" (page ↳ Tabs).
 * line: items gap md (sm) / lg (md), heights size/md / size/xl, indicator border/sm border/brand/base, rule border/xs.
 * segmented: container pad 3xs, gap 3xs, background/neutral/subtler, radius/md; selected item extra-subtle + shadow/xs.
 */
export function Tabs({ items, type = 'line', size = 'sm', value, defaultValue, onChange, label, className, ...rest }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const current = value ?? internal;
  const baseId = useId();
  const select = (id: string) => { setInternal(id); onChange?.(id); };
  const onKey = (e: React.KeyboardEvent, idx: number) => {
    const enabled = items.filter((t) => !t.disabled);
    const pos = enabled.findIndex((t) => t.id === items[idx].id);
    let next = -1;
    if (e.key === 'ArrowRight') next = (pos + 1) % enabled.length;
    if (e.key === 'ArrowLeft') next = (pos - 1 + enabled.length) % enabled.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = enabled.length - 1;
    if (next >= 0) { e.preventDefault(); select(enabled[next].id); (document.getElementById(`${baseId}-${enabled[next].id}`) as HTMLButtonElement | null)?.focus(); }
  };
  return (
    <div className={['rv-tabs', className ?? ''].join(' ').trim()} data-type={type} data-size={size} role="tablist" aria-label={label} {...rest}>
      {items.map((t, i) => {
        const selected = t.id === current;
        return (
          <button
            key={t.id}
            id={`${baseId}-${t.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${baseId}-${t.id}-panel`}
            tabIndex={selected ? 0 : -1}
            className="rv-tab"
            data-selected={selected || undefined}
            disabled={t.disabled}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.icon !== null && <Icon name={t.icon ?? 'SquaresFour'} size="3xs" weight="medium" className="rv-tab__icon" />}
            <span className="rv-tab__label">{t.label}</span>
            {t.badge && <Badge label={t.badge} status="information" size="sm" showIcon={false} />}
            {type === 'line' && <span className="rv-tab__indicator" aria-hidden="true" />}
          </button>
        );
      })}
      {type === 'line' && <span className="rv-tabs__rule" aria-hidden="true" />}
    </div>
  );
}
