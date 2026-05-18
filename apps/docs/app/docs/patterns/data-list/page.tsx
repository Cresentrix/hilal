import type { Metadata } from 'next';
import { DataList, type DataListItem } from '@hilal-ds/patterns';
import { Badge } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'DataList' };

const items: DataListItem[] = [
  { id: '1', label: 'Sara Al-Mutairi', meta: 'sara@acme.com', initials: 'SA', trailing: <Badge tone="success" size="sm">Owner</Badge> },
  { id: '2', label: 'Mohamed M.',      meta: 'mohamed@acme.com', initials: 'MM', trailing: <Badge tone="info"    size="sm">Admin</Badge> },
  { id: '3', label: 'Jane Lee',        meta: 'jane@acme.com',   initials: 'JL', trailing: <Badge tone="neutral" size="sm">Member</Badge> },
];

export default function DataListPage() {
  return (
    <>
      <h1>DataList</h1>
      <p className="lede">
        Vertical list with avatar / leading slot, primary + secondary text, and trailing
        actions. Handles loading skeletons and empty states.
      </p>

      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><DataList items={items} /></div>}
        react={`const items = [
  { id: '1', label: 'Sara A.', meta: 'sara@acme.com', initials: 'SA', trailing: <Badge tone="success">Owner</Badge> },
  // …
];

<DataList items={items} />`}
        angular={`<hilal-data-list [items]="members"></hilal-data-list>`}
        blade={`<x-hilal-data-list :items="$members" />`}
      />
    </>
  );
}
