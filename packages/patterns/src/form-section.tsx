import type { ReactNode } from 'react';

export interface FormSectionProps {
  title: ReactNode;
  description?: ReactNode;
  /** Form fields. Stacked with consistent spacing. */
  children: ReactNode;
  /** Optional right-aligned trailing content next to the title (e.g. a switch or a "Learn more" link). */
  aside?: ReactNode;
  /** Render as a full-bleed two-column layout (label-on-left, fields-on-right). Default false. */
  twoColumn?: boolean;
}

/**
 * FormSection — title + description + a vertical stack of fields.
 * Pair multiple sections inside a settings page, separated by visible borders.
 */
export function FormSection({ title, description, children, aside, twoColumn = false }: FormSectionProps) {
  if (twoColumn) {
    return (
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 18rem) minmax(0, 1fr)',
          gap: 'var(--hilal-spacing-8)',
          paddingBlock: 'var(--hilal-spacing-6)',
          borderBlockEnd: '1px solid var(--hilal-border-subtle)',
        }}
      >
        <header>
          <h2 style={titleStyle}>{title}</h2>
          {description ? <p style={descStyle}>{description}</p> : null}
          {aside ? <div style={{ marginBlockStart: 'var(--hilal-spacing-3)' }}>{aside}</div> : null}
        </header>
        <div style={fieldsStyle}>{children}</div>
      </section>
    );
  }
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--hilal-spacing-4)',
        paddingBlock: 'var(--hilal-spacing-5)',
        borderBlockEnd: '1px solid var(--hilal-border-subtle)',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--hilal-spacing-3)' }}>
        <div style={{ minInlineSize: 0 }}>
          <h2 style={titleStyle}>{title}</h2>
          {description ? <p style={descStyle}>{description}</p> : null}
        </div>
        {aside ? <div style={{ flexShrink: 0 }}>{aside}</div> : null}
      </header>
      <div style={fieldsStyle}>{children}</div>
    </section>
  );
}

const titleStyle = {
  margin: 0,
  fontSize: 'var(--hilal-font-size-16)',
  fontWeight: 'var(--hilal-font-weight-semibold)',
  color: 'var(--hilal-fg-primary)',
} as const;

const descStyle = {
  margin: 0,
  marginBlockStart: 'var(--hilal-spacing-1)',
  fontSize: 'var(--hilal-font-size-14)',
  color: 'var(--hilal-fg-tertiary)',
  lineHeight: 1.5,
} as const;

const fieldsStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--hilal-spacing-4)',
};
