import type { HTMLAttributes } from 'react';
import { Avatar, type AvatarSize } from './Avatar';
import { Icon } from '../../icons/Icon';
import './Avatar.css';

export interface AvatarGroupItem { src?: string; initials?: string; name?: string }

export interface AvatarGroupProps extends HTMLAttributes<HTMLSpanElement> {
  /** Up to four people shown; the rest goes in the counter */
  items: AvatarGroupItem[];
  /** Figma `size` */
  size?: AvatarSize;
  /** Figma `show-counter` + `counter` — computed from `items` beyond `max` unless `counter` is given */
  counter?: string | false;
  max?: number;
  /** Figma `show-add` — dashed "+" button (_Avatar add) */
  onAdd?: () => void;
}

/** Avatar group — Figma "Avatar group": stacked avatars with a ring (negative overlap per size) + counter + optional add button. */
export function AvatarGroup({ items, size = 'xs', counter, max = 4, onAdd, className, ...rest }: AvatarGroupProps) {
  const shown = items.slice(0, max);
  const rest_ = items.length - shown.length;
  const counterText = counter === false ? null : counter ?? (rest_ > 0 ? `+${rest_}` : null);
  const addIcon = { xs: '4xs', sm: '4xs', md: '3xs', lg: '2xs', xl: 'xs' } as const;
  return (
    <span className={['rv-avatar-group', className ?? ''].join(' ').trim()} data-size={size} {...rest}>
      {shown.map((it, i) => (
        <span key={i} className="rv-avatar-group__item">
          <Avatar type={it.src ? 'image' : 'initials'} src={it.src} initials={it.initials} size={size} alt={it.name} />
        </span>
      ))}
      {counterText && (
        <span className="rv-avatar-group__item">
          <span className="rv-avatar-group__counter">{counterText}</span>
        </span>
      )}
      {onAdd && (
        <span className="rv-avatar-group__item">
          <button type="button" className="rv-avatar-group__add" aria-label="Add" onClick={onAdd}>
            <Icon name="Plus" size={addIcon[size]} weight="medium" />
          </button>
        </span>
      )}
    </span>
  );
}
