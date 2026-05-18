import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Components' };

interface Item { slug: string; name: string; hint: string; }

const COMPONENTS: Item[] = [
  { slug: 'accordion',  name: 'Accordion',  hint: 'Collapsible content sections.' },
  { slug: 'alert',      name: 'Alert',      hint: 'Inline message with tone.' },
  { slug: 'avatar',     name: 'Avatar',     hint: 'Image / initials with size and status dot.' },
  { slug: 'badge',      name: 'Badge',      hint: 'Compact label with tone variants.' },
  { slug: 'bottomnav',  name: 'BottomNav',  hint: 'Mobile bottom tab bar.' },
  { slug: 'button',     name: 'Button',     hint: 'Primary, secondary, tertiary, sizes, loading state.' },
  { slug: 'calendar',   name: 'Calendar',   hint: 'Single, range, and multi-month modes.' },
  { slug: 'card',       name: 'Card',       hint: 'Container with header, body, and footer slots.' },
  { slug: 'checkbox',   name: 'Checkbox',   hint: 'Binary toggle with label and indeterminate.' },
  { slug: 'combobox',   name: 'Combobox',   hint: 'Filterable select with keyboard nav.' },
  { slug: 'datepicker', name: 'Datepicker', hint: 'Date, datetime, time, month, week inputs.' },
  { slug: 'drawer',     name: 'Drawer',     hint: 'Side panel with side and size options.' },
  { slug: 'empty',      name: 'EmptyState', hint: 'Empty placeholder with optional action.' },
  { slug: 'input',      name: 'Input',      hint: 'Text input with label, hint, and error.' },
  { slug: 'modal',      name: 'Modal',      hint: 'Centered dialog with backdrop and sizes.' },
  { slug: 'pagination', name: 'Pagination', hint: 'Page controls with prev/next + ellipses.' },
  { slug: 'select',     name: 'Select',     hint: 'Native select with field styling.' },
  { slug: 'sidebar',    name: 'Sidebar',    hint: 'Vertical nav with header / nav / footer slots.' },
  { slug: 'skeleton',   name: 'Skeleton',   hint: 'Loading placeholder shapes with shimmer.' },
  { slug: 'stepper',    name: 'Stepper',    hint: 'Horizontal / vertical progress steps.' },
  { slug: 'tabs',       name: 'Tabs',       hint: 'Tab list with panel switching.' },
  { slug: 'toast',      name: 'Toast',      hint: 'Transient notifications via context provider.' },
  { slug: 'toggle',     name: 'Toggle',     hint: 'Switch input for boolean state.' },
  { slug: 'tooltip',    name: 'Tooltip',    hint: 'Hover/focus hint with positioning.' },
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
          <Link key={c.slug} href={`/docs/components/${c.slug}`}>
            <div className="card-grid__title">{c.name}</div>
            <div className="card-grid__hint">{c.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
