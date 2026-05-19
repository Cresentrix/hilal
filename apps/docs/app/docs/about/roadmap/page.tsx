import type { Metadata } from 'next';
import { Badge } from '@hilal-ds/react';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Roadmap' };

interface Item { title: string; status: 'planned' | 'in-progress' | 'shipped'; description: string; }

const NOW: Item[] = [
  { title: 'Vue 3 package',                  status: 'planned',     description: 'Same DOM, same CSS — fourth framework wrapper. Targeting 0.2.' },
  { title: 'Form integration helpers',       status: 'planned',     description: 'Adapters for react-hook-form, Angular Reactive Forms, Laravel form-request validation.' },
  { title: 'Anatomy diagrams per component', status: 'planned',     description: 'Hover/inspect any part of a rendered component to see its CSS class + tokens.' },
  { title: 'Per-prop playgrounds',           status: 'planned',     description: 'Live prop tweaker on every component page (sliders, selects).' },
];

const NEXT: Item[] = [
  { title: 'Brand customization page',  status: 'planned',     description: 'Step-by-step retheming guide with a live brand-color picker.' },
  { title: 'CLI: hilal init',           status: 'planned',     description: 'Bootstrap a new app with the right CSS imports and example pages already wired up.' },
  { title: 'Changeset-based releases',  status: 'in-progress', description: 'Move from manual version bumps to Changesets + GitHub Actions auto-publish.' },
  { title: 'Visual regression tests',   status: 'planned',     description: 'Per-component screenshot diffs across React/Angular/Blade so the parity story stays honest.' },
];

const LATER: Item[] = [
  { title: 'Data table',          status: 'planned', description: 'Sortable, filterable, virtualized table — biggest gap right now.' },
  { title: 'Charts',              status: 'planned', description: 'Token-driven line / bar / area charts. Probably wrapping recharts or visx.' },
  { title: 'Rich text editor',    status: 'planned', description: 'Tiptap-based editor with Hilal-styled controls.' },
  { title: 'Code editor surface', status: 'planned', description: 'Monaco-wrapped code editor for in-product code editing experiences.' },
];

const TONE: Record<Item['status'], 'success' | 'warning' | 'neutral'> = {
  shipped: 'success',
  'in-progress': 'warning',
  planned: 'neutral',
};

function Section({ items }: { items: Item[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-3)' }}>
      {items.map((it) => (
        <li
          key={it.title}
          style={{
            padding: 'var(--hilal-spacing-4)',
            border: '1px solid var(--hilal-border-subtle)',
            borderRadius: 'var(--hilal-radius-md)',
            background: 'var(--hilal-bg-page)',
            display: 'flex',
            gap: 'var(--hilal-spacing-3)',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minInlineSize: '14rem' }}>
            <div style={{ fontWeight: 'var(--hilal-font-weight-medium)', color: 'var(--hilal-fg-primary)' }}>{it.title}</div>
            <div style={{ color: 'var(--hilal-fg-secondary)', fontSize: 'var(--hilal-font-size-14)', marginBlockStart: '0.25rem' }}>
              {it.description}
            </div>
          </div>
          <Badge tone={TONE[it.status]} size="sm">{it.status}</Badge>
        </li>
      ))}
    </ul>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <h1>Roadmap</h1>
      <p className="lede">
        Where Hilal is going. Not a commitment — direction. Open an issue if you want to push
        something up the list.
      </p>

      <H2>Now</H2>
      <p>Active work or up-next within the current minor.</p>
      <Section items={NOW} />

      <H2>Next</H2>
      <p>Likely in the 0.2 / 0.3 timeframe.</p>
      <Section items={NEXT} />

      <H2>Later</H2>
      <p>Bigger surface bets. Will only land when there&rsquo;s a clear shape.</p>
      <Section items={LATER} />
    </>
  );
}
