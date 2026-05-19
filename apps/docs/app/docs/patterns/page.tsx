import type { Metadata } from 'next';
import Link from 'next/link';
import { StatusBadge, PATTERN_STATUS } from '../../_components/StatusBadge';

export const metadata: Metadata = { title: 'Patterns' };

interface Item { slug: string; name: string; hint: string; }

const PATTERNS: Item[] = [
  { slug: 'auth-form',           name: 'AuthForm',           hint: 'Sign-in / sign-up / reset password forms.' },
  { slug: 'command-palette',     name: 'CommandPalette',     hint: '⌘K modal with grouped actions + keyboard nav.' },
  { slug: 'confirm-dialog',      name: 'ConfirmDialog',      hint: 'Modal preset for confirm-then-action.' },
  { slug: 'dashboard-shell',     name: 'DashboardShell',     hint: 'Sidebar + topbar + main app layout.' },
  { slug: 'data-list',           name: 'DataList',           hint: 'Vertical list with avatar + meta + trailing.' },
  { slug: 'filter-bar',          name: 'FilterBar',          hint: 'Pill-based filter toolbar with active state.' },
  { slug: 'form-section',        name: 'FormSection',        hint: 'Titled section with fields and two-column option.' },
  { slug: 'multi-step-form',     name: 'MultiStepForm',      hint: 'Wizard with stepper + back/next/submit.' },
  { slug: 'notification-center', name: 'NotificationCenter', hint: 'Drawer-based notification feed.' },
  { slug: 'page-header',         name: 'PageHeader',         hint: 'Breadcrumbs + title + actions.' },
  { slug: 'search-header',       name: 'SearchHeader',       hint: 'Top bar with search input + trailing actions.' },
  { slug: 'stats-grid',          name: 'StatsGrid',          hint: 'Row of KPI cards with delta badges.' },
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
          <Link key={p.slug} href={`/docs/patterns/${p.slug}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--hilal-spacing-2)' }}>
              <div className="card-grid__title">{p.name}</div>
              <StatusBadge status={PATTERN_STATUS[p.slug] ?? 'stable'} />
            </div>
            <div className="card-grid__hint">{p.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
