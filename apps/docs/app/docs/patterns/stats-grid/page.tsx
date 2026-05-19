import type { Metadata } from 'next';
import { StatsGrid, type StatItem } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'StatsGrid' };

const fourItems: StatItem[] = [
  { id: '1', label: 'Revenue',     value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  { id: '2', label: 'Active users', value: '8,204',   delta: '3.1%',  trend: 'up',   hint: 'vs last week' },
  { id: '3', label: 'Refund rate',  value: '0.42%',   delta: '0.05%', trend: 'down', hint: 'vs last week' },
  { id: '4', label: 'NPS',          value: '57',      delta: '—',     trend: 'flat', hint: 'no change' },
];

const withIcons: StatItem[] = [
  { id: '1', label: 'Sales',     value: '$128k', delta: '8.2%',  trend: 'up',   icon: <span aria-hidden>$</span> },
  { id: '2', label: 'Visitors',  value: '24,103', delta: '14.0%', trend: 'up',   icon: <span aria-hidden>◔</span> },
  { id: '3', label: 'Bounce',    value: '38%',    delta: '1.4%',  trend: 'down', icon: <span aria-hidden>↗</span> },
];

const linked: StatItem[] = [
  { id: '1', label: 'Open tickets', value: '24', href: '#', hint: 'Click to triage' },
  { id: '2', label: 'In progress',  value: '7',  href: '#', hint: 'Click to triage' },
  { id: '3', label: 'Closed today', value: '12', href: '#', hint: 'Click to view' },
];

export default function StatsGridPage() {
  return (
    <>
      <h1>StatsGrid</h1>
      <p className="lede">
        Responsive row of KPI cards. Auto-fits columns at the configured minimum width, with
        delta badges, trend coloring, optional icons, and clickable cards.
      </p>

      <H2>Default</H2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={fourItems} /></div>}
        react={`const items = [
  { id: '1', label: 'Revenue', value: '$42,318', delta: '12.4%', trend: 'up' },
  { id: '2', label: 'Active users', value: '8,204', delta: '3.1%', trend: 'up' },
  { id: '3', label: 'Refund rate', value: '0.42%', delta: '0.05%', trend: 'down' },
  { id: '4', label: 'NPS', value: '57', delta: '—', trend: 'flat' },
];

<StatsGrid items={items} />`}
        angular={`<hilal-stats-grid [items]="items"></hilal-stats-grid>`}
        blade={`<x-hilal-stats-grid :items="$items" />`}
      />

      <H2>With icons</H2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={withIcons} /></div>}
        react={`const items = [
  { id: '1', label: 'Sales', value: '$128k', icon: <DollarIcon />, delta: '8.2%', trend: 'up' },
  // …
];`}
        angular={`items = [{ id: '1', label: 'Sales', value: '$128k', delta: '8.2%', trend: 'up' }];`}
        blade={`$items = [['id' => '1', 'label' => 'Sales', 'value' => '$128k', 'delta' => '8.2%', 'trend' => 'up']];`}
      />

      <H2>Clickable cards</H2>
      <p>Pass <code>href</code> or <code>onClick</code> on each item and the card surfaces hover styles.</p>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={linked} /></div>}
        react={`const items = [
  { id: '1', label: 'Open tickets', value: '24', href: '/tickets?status=open' },
  // …
];`}
        angular={`<hilal-stats-grid [items]="items" (itemClick)="open($event)"></hilal-stats-grid>`}
        blade={`<x-hilal-stats-grid :items="$items" />`}
      />

      <H2>Custom column width</H2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={fourItems} minColumnWidth="10rem" /></div>}
        react={`<StatsGrid items={items} minColumnWidth="10rem" />`}
        angular={`<hilal-stats-grid [items]="items" minColumnWidth="10rem"></hilal-stats-grid>`}
        blade={`<x-hilal-stats-grid :items="$items" min-column-width="10rem" />`}
      />

      <H2>Loading skeleton</H2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={[]} loading loadingCount={4} /></div>}
        react={`<StatsGrid items={[]} loading loadingCount={4} />`}
        angular={`<hilal-stats-grid [loading]="true" [loadingCount]="4"></hilal-stats-grid>`}
        blade={`<x-hilal-stats-grid :loading="true" :loading-count="4" />`}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`items            StatItem[]
minColumnWidth   string         default: '14rem'
loading          boolean
loadingCount     number         default: items.length || 4

StatItem {
  id        string             required
  label     ReactNode
  value     ReactNode
  hint      ReactNode
  icon      ReactNode
  delta     ReactNode
  trend     'up' | 'down' | 'flat'   default: 'up'
  href      string             makes the card a link
  onClick   () => void         makes the card a button
}`}</code></pre>
    </>
  );
}
