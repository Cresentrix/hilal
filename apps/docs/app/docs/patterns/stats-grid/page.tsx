import type { Metadata } from 'next';
import { StatsGrid, type StatItem } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'StatsGrid' };

const items: StatItem[] = [
  { id: '1', label: 'Revenue',     value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  { id: '2', label: 'Active users', value: '8,204',   delta: '3.1%',  trend: 'up',   hint: 'vs last week' },
  { id: '3', label: 'Refund rate',  value: '0.42%',   delta: '0.05%', trend: 'down', hint: 'vs last week' },
  { id: '4', label: 'NPS',          value: '57',      delta: '—',     trend: 'flat', hint: 'no change' },
];

export default function StatsGridPage() {
  return (
    <>
      <h1>StatsGrid</h1>
      <p className="lede">
        Responsive row of KPI cards. Auto-fits as many columns as fit the container at the
        configured minimum width, with delta badges and trend coloring.
      </p>

      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><StatsGrid items={items} /></div>}
        react={`import { StatsGrid } from '@hilal-ds/patterns';

const items = [
  { id: '1', label: 'Revenue', value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  { id: '2', label: 'Active users', value: '8,204', delta: '3.1%', trend: 'up',   hint: 'vs last week' },
  { id: '3', label: 'Refund rate', value: '0.42%', delta: '0.05%', trend: 'down', hint: 'vs last week' },
  { id: '4', label: 'NPS', value: '57', delta: '—', trend: 'flat', hint: 'no change' },
];

<StatsGrid items={items} />`}
        angular={`<hilal-stats-grid [items]="items"></hilal-stats-grid>

// Component class
items: HilalStatItem[] = [
  { id: '1', label: 'Revenue', value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  // …
];`}
        blade={`<x-hilal-stats-grid :items="$items" />

{{-- @php
  $items = [
    ['id' => '1', 'label' => 'Revenue', 'value' => '$42,318', 'delta' => '12.4%', 'trend' => 'up',   'hint' => 'vs last week'],
    // …
  ];
@endphp --}}`}
      />
    </>
  );
}
