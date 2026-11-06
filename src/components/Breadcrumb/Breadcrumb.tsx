import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  /** Figma `show-icon` + `icon` (House for the root, Folder between, FileText for the page) */
  icon?: IconName;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Ordered path from the root to the current page (last item = current, not a link) */
  items: BreadcrumbItem[];
  /** Figma `show-icon` on every level — default true */
  showIcons?: boolean;
  /** Beyond this many levels, the middle ones collapse behind the ellipsis (Figma 5+ variant). Default 4. */
  maxVisible?: number;
  /** Render custom anchors (e.g. a router Link) */
  renderLink?: (item: BreadcrumbItem, props: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => ReactNode;
  className?: string;
}

const defaultIcon = (i: number, n: number): IconName => (i === 0 ? 'House' : i === n - 1 ? 'FileText' : 'Folder');

/**
 * Breadcrumb — Figma "Breadcrumb" (page ↳ Breadcrumb). Items gap/2xs, separators CaretRight 16 px icon/neutral/subtler (1.5);
 * item: pad 0 3xs, radius/sm, sm/regular text/neutral/soft (hover strongest, focus-ring/neutral), current sm/medium strongest.
 * 5+ levels: root › … (ellipsis opens a Dropdown sm with the hidden levels) › current page.
 */
export function Breadcrumb({ items, showIcons = true, maxVisible = 4, renderLink, className }: BreadcrumbProps) {
  const n = items.length;
  const collapse = n > maxVisible;
  const hidden = collapse ? items.slice(1, n - 1) : [];
  const visible: (BreadcrumbItem | 'ellipsis')[] = collapse ? [items[0], 'ellipsis', items[n - 1]] : items;
  const [open, setOpen] = useState(false);
  const ellipsisRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ellipsisRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const link = (item: BreadcrumbItem, idx: number, current: boolean) => {
    const icon = item.icon ?? defaultIcon(idx, n);
    const content = (
      <>
        {showIcons && <Icon name={icon} size="3xs" weight={current ? 'medium' : 'regular'} />}
        <span>{item.label}</span>
      </>
    );
    if (current) return <span className="rv-breadcrumb__item" data-current aria-current="page">{content}</span>;
    const props = { className: 'rv-breadcrumb__item', href: item.href ?? '#', onClick: item.onClick ? (e: React.MouseEvent) => { if (!item.href) e.preventDefault(); item.onClick?.(); } : undefined, children: content };
    return renderLink ? renderLink(item, props) : <a {...props} />;
  };

  return (
    <nav aria-label="Breadcrumb" className={['rv-breadcrumb', className ?? ''].join(' ').trim()}>
      <ol className="rv-breadcrumb__list">
        {visible.map((v, i) => (
          <li key={i} className="rv-breadcrumb__li" ref={v === 'ellipsis' ? ellipsisRef : undefined}>
            {i > 0 && <Icon name="CaretRight" size="3xs" weight="medium" className="rv-breadcrumb__separator" />}
            {v === 'ellipsis' ? (
              <span className="rv-breadcrumb__ellipsis-wrap">
                <button type="button" className="rv-breadcrumb__ellipsis" aria-label="Show hidden levels" aria-expanded={open} data-open={open || undefined} onClick={() => setOpen((o) => !o)}>
                  <Icon name="DotsThree" size="3xs" weight="medium" />
                </button>
                {open && (
                  <Dropdown size="sm" className="rv-breadcrumb__menu">
                    {hidden.map((h, j) => (
                      <DropdownItem key={j} label={h.label} leading="none" size="sm" onClick={() => { setOpen(false); if (h.href) window.location.assign(h.href); h.onClick?.(); }} />
                    ))}
                  </Dropdown>
                )}
              </span>
            ) : (
              link(v, items.indexOf(v), v === items[n - 1])
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
