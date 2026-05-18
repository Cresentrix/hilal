import type { Metadata } from 'next';
import { Badge } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'Changelog' };

interface Release {
  version: string;
  date: string;
  tone?: 'brand' | 'success' | 'info';
  summary: string;
  changes: string[];
}

const RELEASES: Release[] = [
  {
    version: 'unreleased',
    date: '2026-05-18',
    tone: 'info',
    summary: 'Docs site: comprehensive variants, foundations, recipes, and chrome.',
    changes: [
      'Live demo controls in the header — toggle theme / density / motion / direction site-wide.',
      '⌘K global search palette indexing every doc page (uses @hilal-ds/patterns CommandPalette).',
      'Foundations section: Colors, Typography, Spacing, Radius, Elevation, Motion + Iconography.',
      'Recipes section: 8 composed page examples (Login, Dashboard, Pricing, Settings, Inbox, Marketing landing, Onboarding wizard, 404).',
      'About section: Why Hilal, FAQ, Compared (vs shadcn / Radix / Mantine).',
      'Accessibility section per component — keyboard maps, ARIA notes, focus behavior.',
      'Copy-to-clipboard on every code panel.',
      'Anchor links on h2/h3, footer, branded 404, docs loading skeleton, Edit-on-GitHub link.',
      'Mobile sidebar drawer with hamburger trigger.',
    ],
  },
  {
    version: '0.1.2',
    date: '2026-05-18',
    tone: 'success',
    summary: 'core@0.1.2 — recovery from first-publish CDN lag.',
    changes: [
      'Bumped @hilal-ds/core to 0.1.2 to force a fresh npm metadata write after the read endpoint lagged on first publish at 0.1.1. Other packages stay at 0.1.1.',
      'Fix: gate ToastProvider portal behind a mounted state flag so SSR + the first client render match (no more hydration warning).',
    ],
  },
  {
    version: '0.1.1',
    date: '2026-05-18',
    tone: 'brand',
    summary: 'First npm release. Multi-framework component library shipped.',
    changes: [
      'Renamed npm scope to @hilal-ds (the @hilal scope was taken).',
      'Added "use client" directive to @hilal-ds/react and @hilal-ds/patterns barrels so Next.js consumers can import directly into server components.',
      'Patterns added: StatsGrid, CommandPalette, NotificationCenter, MultiStepForm — bringing the pattern total to 12.',
      'Tokens: dark theme, density + motion presets, real values synced from the Figma source of truth.',
      'Components: full primitive set — Button, Input, Checkbox, Toggle, Card, Avatar, Badge, Tooltip, Skeleton, Pagination, Tabs, Modal, Drawer, Select, Datepicker, Alert, EmptyState, Accordion, Stepper, Sidebar, BottomNav, Toast, Calendar, Combobox.',
      'Calendar v3: single + range modes, multi-month layouts, presets, year picker, locale + week-starts-on, min/max.',
      'Three-framework parity established: React, Angular (standalone 19), and Blade (Laravel via Packagist).',
    ],
  },
];

function toneFor(version: string): 'brand' | 'success' | 'info' | 'neutral' {
  if (version === 'unreleased') return 'info';
  if (version === '0.1.1') return 'brand';
  return 'success';
}

export default function ChangelogPage() {
  return (
    <>
      <h1>Changelog</h1>
      <p className="lede">
        Release notes. Versions match what&rsquo;s on npm for the public packages.{' '}
        <code>@hilal-ds/core</code> is one patch ahead due to a first-publish recovery.
      </p>

      {RELEASES.map((r) => (
        <section key={r.version} style={{ marginBlockStart: 'var(--hilal-spacing-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-3)', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>{r.version}</h2>
            <Badge tone={toneFor(r.version)} size="sm">{r.date}</Badge>
          </div>
          <p style={{ color: 'var(--hilal-fg-secondary)', marginBlock: 'var(--hilal-spacing-2)' }}>{r.summary}</p>
          <ul>
            {r.changes.map((c, i) => <li key={i} style={{ marginBlock: 'var(--hilal-spacing-1)' }}>{c}</li>)}
          </ul>
        </section>
      ))}

      <h2 style={{ marginBlockStart: 'var(--hilal-spacing-10)' }}>Versioning policy</h2>
      <p>
        We follow semver. While on <code>0.x</code>, patch bumps may contain breaking changes if
        they&rsquo;re needed to fix correctness issues — those will be called out in the entry.
        Once we hit <code>1.0</code>, all breaking changes will require a major bump.
      </p>
    </>
  );
}
