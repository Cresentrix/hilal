import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Components' };

interface Item { slug: string; name: string; hint: string; documented?: boolean; }

const COMPONENTS: Item[] = [
  { slug: 'button',     name: 'Button',     hint: 'Primary, secondary, tertiary, sizes, loading state.', documented: true },
  { slug: 'input',      name: 'Input',      hint: 'Text input with label, hint, and error.', documented: true },
  { slug: 'card',       name: 'Card',       hint: 'Container with header, body, and footer slots.', documented: true },
  { slug: 'modal',      name: 'Modal',      hint: 'Centered dialog with backdrop and sizes.', documented: true },
  { slug: 'calendar',   name: 'Calendar',   hint: 'Single, range, and multi-month modes.', documented: true },
  { slug: 'combobox',   name: 'Combobox',   hint: 'Filterable select with keyboard nav.', documented: true },
  { slug: 'checkbox',   name: 'Checkbox',   hint: 'Binary toggle with label and indeterminate.' },
  { slug: 'toggle',     name: 'Toggle',     hint: 'Switch input for boolean state.' },
  { slug: 'avatar',     name: 'Avatar',     hint: 'Image / initials with size and status dot.' },
  { slug: 'badge',      name: 'Badge',      hint: 'Compact label with tone variants.' },
  { slug: 'tooltip',    name: 'Tooltip',    hint: 'Hover/focus hint with positioning.' },
  { slug: 'skeleton',   name: 'Skeleton',   hint: 'Loading placeholder shapes.' },
  { slug: 'pagination', name: 'Pagination', hint: 'Page controls with prev/next.' },
  { slug: 'tabs',       name: 'Tabs',       hint: 'Tab list with panel switching.' },
  { slug: 'drawer',     name: 'Drawer',     hint: 'Side panel with side and size options.' },
  { slug: 'select',     name: 'Select',     hint: 'Native select with field styling.' },
  { slug: 'datepicker', name: 'Datepicker', hint: 'Single / range / multi date inputs.' },
  { slug: 'alert',      name: 'Alert',      hint: 'Inline message with tone.' },
  { slug: 'empty',      name: 'EmptyState', hint: 'Empty placeholder with action.' },
  { slug: 'accordion',  name: 'Accordion',  hint: 'Collapsible content sections.' },
  { slug: 'stepper',    name: 'Stepper',    hint: 'Horizontal / vertical progress steps.' },
  { slug: 'sidebar',    name: 'Sidebar',    hint: 'Vertical nav with sections.' },
  { slug: 'bottomnav',  name: 'BottomNav',  hint: 'Mobile bottom tab bar.' },
  { slug: 'toast',      name: 'Toast',      hint: 'Transient notification with provider.' },
];

export default function ComponentsIndex() {
  return (
    <>
      <h1>Components</h1>
      <p className="lede">
        Primitive building blocks. Every component renders identical DOM across React, Angular,
        and Blade — what changes is the authoring syntax.
      </p>
      <div className="card-grid">
        {COMPONENTS.map((c) => (
          <Link
            key={c.slug}
            href={c.documented ? `/docs/components/${c.slug}` : '#'}
            style={c.documented ? undefined : { opacity: 0.55, pointerEvents: 'none' }}
            aria-disabled={c.documented ? undefined : true}
          >
            <div className="card-grid__title">
              {c.name} {c.documented ? null : <span style={{ fontSize: '0.7rem', color: 'var(--hilal-fg-tertiary)' }}>· soon</span>}
            </div>
            <div className="card-grid__hint">{c.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
