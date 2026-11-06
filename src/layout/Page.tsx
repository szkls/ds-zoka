import type { HTMLAttributes, ReactNode } from 'react';
import './page.css';

/**
 * Page layout — the validated page anatomy (see docs/guidelines/page-template.md).
 * Header (16) › Breadcrumb (40) › Title + description (8) › 40 › sections.
 * Between sections: 32, a divider (border/neutral/subtler), 32. Section: title (8) description (24) content; 16 between content blocks.
 * Forms: fields stacked, never side by side. Avoid sub-sections; prefer another section.
 */
export interface PageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Rendered above the page padding (Header component) */
  header?: ReactNode;
  /** Breadcrumb component */
  breadcrumb?: ReactNode;
  title: ReactNode;
  /** The "chapeau" under the title */
  description?: ReactNode;
  children: ReactNode;
}

export function Page({ header, breadcrumb, title, description, children, className, ...rest }: PageProps) {
  return (
    <div className={['rv-page', className ?? ''].join(' ').trim()} {...rest}>
      {header}
      <div className="rv-page__body">
        {breadcrumb && <div className="rv-page__breadcrumb">{breadcrumb}</div>}
        <div className="rv-page__title">
          <h1 className="rv-page__h1">{title}</h1>
          {description && <p className="rv-page__description">{description}</p>}
        </div>
        <div className="rv-page__sections">{children}</div>
      </div>
    </div>
  );
}

export interface PageSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
}

/** Section: lg/semi-bold title, sm/regular soft description, content 24 below. */
export function PageSection({ title, description, children, className, ...rest }: PageSectionProps) {
  return (
    <section className={['rv-section', className ?? ''].join(' ').trim()} {...rest}>
      <div className="rv-section__head">
        <h2 className="rv-section__h2">{title}</h2>
        {description && <p className="rv-section__description">{description}</p>}
      </div>
      <div className="rv-section__content">{children}</div>
    </section>
  );
}

/** Sub-section (avoid when possible, prefer a new section): md/medium title, content 16 below. */
export function PageSubsection({ title, children, className, ...rest }: Omit<PageSectionProps, 'description'>) {
  return (
    <div className={['rv-subsection', className ?? ''].join(' ').trim()} {...rest}>
      <h3 className="rv-subsection__h3">{title}</h3>
      <div className="rv-subsection__content">{children}</div>
    </div>
  );
}
