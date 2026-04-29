import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  current?: boolean;
}

export interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  /** Optional avatar / icon block before the title. */
  leading?: ReactNode;
}

/**
 * PageHeader — title + optional breadcrumbs + actions row, used as the top
 * of a page. Renders semantic <header> with proper landmarks.
 */
export function PageHeader({ title, description, breadcrumbs, actions, leading }: PageHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--hilal-spacing-3)',
        paddingBlock: 'var(--hilal-spacing-5)',
        borderBlockEnd: '1px solid var(--hilal-border-subtle)',
      }}
    >
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav aria-label="Breadcrumb">
          <ol style={{ display: 'flex', gap: 'var(--hilal-spacing-2)', margin: 0, padding: 0, listStyle: 'none', fontSize: 'var(--hilal-font-size-13)', color: 'var(--hilal-fg-tertiary)', alignItems: 'center', flexWrap: 'wrap' }}>
            {breadcrumbs.map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-2)' }}>
                {b.href && !b.current ? (
                  <a href={b.href} style={{ color: 'inherit', textDecoration: 'none' }}>{b.label}</a>
                ) : (
                  <span aria-current={b.current ? 'page' : undefined} style={{ color: b.current ? 'var(--hilal-fg-primary)' : 'inherit', fontWeight: b.current ? 'var(--hilal-font-weight-medium)' : undefined }}>
                    {b.label}
                  </span>
                )}
                {i < breadcrumbs.length - 1 ? <span aria-hidden>/</span> : null}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--hilal-spacing-4)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-3)', minInlineSize: 0 }}>
          {leading}
          <div style={{ minInlineSize: 0 }}>
            <h1 style={{ margin: 0, fontSize: 'var(--hilal-font-size-32)', fontWeight: 'var(--hilal-font-weight-semibold)', lineHeight: 'var(--hilal-font-line-height-32)', color: 'var(--hilal-fg-primary)' }}>
              {title}
            </h1>
            {description ? (
              <p style={{ margin: 0, marginBlockStart: 'var(--hilal-spacing-1)', color: 'var(--hilal-fg-secondary)', fontSize: 'var(--hilal-font-size-14)' }}>
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {actions ? (
          <div style={{ display: 'flex', gap: 'var(--hilal-spacing-2)', flexShrink: 0 }}>{actions}</div>
        ) : null}
      </div>
    </header>
  );
}
