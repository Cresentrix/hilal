import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Patterns' };

interface Item { slug: string; name: string; hint: string; documented?: boolean; }

const PATTERNS: Item[] = [
  { slug: 'stats-grid',          name: 'StatsGrid',          hint: 'Row of KPI cards with delta badges.', documented: true },
  { slug: 'command-palette',     name: 'CommandPalette',     hint: '⌘K modal with grouped actions and keyboard nav.', documented: true },
  { slug: 'notification-center', name: 'NotificationCenter', hint: 'Drawer-based notification feed with unread state.', documented: true },
  { slug: 'multi-step-form',     name: 'MultiStepForm',      hint: 'Wizard with stepper + back/next/submit.', documented: true },
  { slug: 'auth-form',           name: 'AuthForm',           hint: 'Sign-in / sign-up / reset password forms.' },
  { slug: 'page-header',         name: 'PageHeader',         hint: 'Breadcrumbs + title + actions.' },
  { slug: 'data-list',           name: 'DataList',           hint: 'Vertical list with avatar + meta + trailing.' },
  { slug: 'confirm-dialog',      name: 'ConfirmDialog',      hint: 'Modal preset for confirm-then-action.' },
  { slug: 'form-section',        name: 'FormSection',        hint: 'Titled section with fields and two-column layout.' },
  { slug: 'search-header',       name: 'SearchHeader',       hint: 'Top bar with search input + trailing actions.' },
  { slug: 'filter-bar',          name: 'FilterBar',          hint: 'Pill-based filter toolbar with active state.' },
  { slug: 'dashboard-shell',     name: 'DashboardShell',     hint: 'Sidebar + topbar + main app layout.' },
];

export default function PatternsIndex() {
  return (
    <>
      <h1>Patterns</h1>
      <p className="lede">
        Composed building blocks that solve common UI scenarios. Each pattern uses Hilal
        primitives under the hood and renders identically across React, Angular, and Blade.
      </p>
      <div className="card-grid">
        {PATTERNS.map((p) => (
          <Link
            key={p.slug}
            href={p.documented ? `/docs/patterns/${p.slug}` : '#'}
            style={p.documented ? undefined : { opacity: 0.55, pointerEvents: 'none' }}
            aria-disabled={p.documented ? undefined : true}
          >
            <div className="card-grid__title">
              {p.name} {p.documented ? null : <span style={{ fontSize: '0.7rem', color: 'var(--hilal-fg-tertiary)' }}>· soon</span>}
            </div>
            <div className="card-grid__hint">{p.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
