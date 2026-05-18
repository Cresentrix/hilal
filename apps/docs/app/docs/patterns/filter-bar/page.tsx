'use client';

import { useState } from 'react';
import { FilterBar, type FilterPill } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function FilterBarPage() {
  const [active, setActive] = useState<Record<string, boolean>>({ open: true });
  const filters: FilterPill[] = [
    { id: 'open',     label: 'Open',     count: 24, active: !!active.open },
    { id: 'inprog',   label: 'In progress', count: 7, active: !!active.inprog },
    { id: 'done',     label: 'Done',     count: 132, active: !!active.done },
    { id: 'cancelled',label: 'Cancelled', count: 3, active: !!active.cancelled },
  ];

  return (
    <>
      <h1>FilterBar</h1>
      <p className="lede">
        Toggle-pill toolbar for filter sets. Pills show a count, support active state, and the
        bar surfaces a &ldquo;Clear all&rdquo; action when anything is active.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <FilterBar
              filters={filters}
              onToggle={(id) => setActive((s) => ({ ...s, [id]: !s[id] }))}
              onClearAll={() => setActive({})}
            />
          </div>
        }
        react={`<FilterBar
  filters={filters}
  onToggle={(id) => toggleFilter(id)}
  onClearAll={() => clearFilters()}
/>`}
        angular={`<hilal-filter-bar
  [filters]="filters"
  (toggled)="toggleFilter($event)"
  (clearAll)="clearFilters()"
></hilal-filter-bar>`}
        blade={`<x-hilal-filter-bar :filters="$filters" />`}
      />
    </>
  );
}
