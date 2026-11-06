import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../../icons/Icon';
import './Accordion.css';

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma `heading` */
  heading: ReactNode;
  /** Figma `description` — the content shown when open */
  children: ReactNode;
  /** Figma `show-icon` + `icon` (default Sun in Figma; pass null to hide) */
  icon?: IconName | null;
  /** Figma `open` (controlled) */
  open?: boolean;
  /** Figma `open` default (uncontrolled) */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Figma `grouped` — inside an AccordionBlock: no outline, radius none, bottom rule */
  grouped?: boolean;
}

/**
 * Accordion — Figma "Accordion" (page ↳ Accordion). Pad md/lg, gap sm, min-height size/xl; standalone: border/neutral/subtler + radius/md.
 * Heading sm/medium, description sm/regular text/neutral/soft, indicator Plus/Minus (icon/neutral/soft), icon 14 px stroke 1.4 (as in Figma).
 */
export function Accordion({ heading, children, icon = 'Sun', open, defaultOpen = false, onOpenChange, grouped = false, className, ...rest }: AccordionProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const isOpen = open ?? internal;
  const id = useId();
  const toggle = () => { const next = !isOpen; setInternal(next); onOpenChange?.(next); };
  return (
    <div className={['rv-accordion', className ?? ''].join(' ').trim()} data-open={isOpen || undefined} data-grouped={grouped || undefined} {...rest}>
      <button type="button" className="rv-accordion__header" aria-expanded={isOpen} aria-controls={`${id}-panel`} id={`${id}-button`} onClick={toggle}>
        {icon && <span className="rv-accordion__iconwrap"><Icon name={icon} size={14} strokeWidth={1.4} className="rv-accordion__icon" /></span>}
        <span className="rv-accordion__texts">
          <span className="rv-accordion__heading">{heading}</span>
          {isOpen && <span className="rv-accordion__description" id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`}>{children}</span>}
        </span>
        <span className="rv-accordion__indicatorwrap"><Icon name={isOpen ? 'Minus' : 'Plus'} size={14} strokeWidth={1.4} className="rv-accordion__indicator" /></span>
      </button>
    </div>
  );
}

/** Accordion block — Figma "Accordion_block": vertical stack of grouped accordions, 400 px, extra-subtle, border, radius/lg, shadow/xs. */
export function AccordionBlock({ children, className, fullWidth, ...rest }: HTMLAttributes<HTMLDivElement> & { fullWidth?: boolean }) {
  return (
    <div className={['rv-accordion-block', fullWidth ? 'rv-accordion-block--full' : '', className ?? ''].join(' ').trim()} {...rest}>
      {children}
    </div>
  );
}
