'use client';

import { DataList, type DataListItem } from '@hilal-ds/patterns';
import { Badge, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

const members: DataListItem[] = [
  { id: '1', label: 'Sara Al-Mutairi', meta: 'sara@acme.com',    initials: 'SA', trailing: <Badge tone="success" size="sm">Owner</Badge> },
  { id: '2', label: 'Mohamed M.',      meta: 'mohamed@acme.com', initials: 'MM', trailing: <Badge tone="info"    size="sm">Admin</Badge> },
  { id: '3', label: 'Jane Lee',        meta: 'jane@acme.com',    initials: 'JL', trailing: <Badge tone="neutral" size="sm">Member</Badge> },
  { id: '4', label: 'Khaled P.',       meta: 'khaled@acme.com',  initials: 'KP', trailing: <Badge tone="warning" size="sm">Pending</Badge> },
];

export default function DataListPage() {
  return (
    <>
      <h1>DataList</h1>
      <p className="lede">
        Vertical list with optional leading avatar, primary + secondary text, and trailing
        action / badge. Handles loading skeletons and empty states out of the box.
      </p>

      <h2>Basic</h2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><DataList items={members} /></div>}
        react={`const members = [
  { id: '1', label: 'Sara A.',    meta: 'sara@acme.com',    initials: 'SA', trailing: <Badge tone="success">Owner</Badge> },
  { id: '2', label: 'Mohamed M.', meta: 'mohamed@acme.com', initials: 'MM', trailing: <Badge tone="info">Admin</Badge> },
];

<DataList items={members} />`}
        angular={`<hilal-data-list [items]="members"></hilal-data-list>`}
        blade={`<x-hilal-data-list :items="$members" />`}
      />

      <h2>Clickable rows</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <DataList items={members.map((m) => ({ ...m, href: '#' }))} />
          </div>
        }
        react={`<DataList items={members.map((m) => ({ ...m, href: \`/members/\${m.id}\` }))} />

// Or with onClick:
<DataList items={members.map((m) => ({ ...m, onClick: () => open(m) }))} />`}
        angular={`<hilal-data-list [items]="members" (rowClick)="open($event)"></hilal-data-list>`}
        blade={`<x-hilal-data-list :items="$members" />`}
      />

      <h2>Loading state</h2>
      <FrameworkTabs
        preview={<div style={{ width: '100%' }}><DataList items={[]} loading loadingRows={4} /></div>}
        react={`<DataList items={[]} loading loadingRows={4} />`}
        angular={`<hilal-data-list [loading]="true" [loadingRows]="4"></hilal-data-list>`}
        blade={`<x-hilal-data-list :loading="true" :loading-rows="4" />`}
      />

      <h2>Empty state</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <DataList
              items={[]}
              emptyTitle="No members yet"
              emptyDescription="Invite your first teammate to start collaborating."
              emptyActions={<Button>Invite teammate</Button>}
            />
          </div>
        }
        react={`<DataList
  items={[]}
  emptyTitle="No members yet"
  emptyDescription="Invite your first teammate to start collaborating."
  emptyActions={<Button>Invite teammate</Button>}
/>`}
        angular={`<hilal-data-list [items]="[]" emptyTitle="No members yet" emptyDescription="…">
  <hilal-button hilalDataListEmptyActions>Invite teammate</hilal-button>
</hilal-data-list>`}
        blade={`<x-hilal-data-list :items="[]" empty-title="No members yet" empty-description="…">
  <x-slot:empty-actions><x-hilal-button>Invite teammate</x-hilal-button></x-slot:empty-actions>
</x-hilal-data-list>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`items                 DataListItem[]
loading               boolean
loadingRows           number         default: 4
emptyTitle            ReactNode
emptyDescription      ReactNode
emptyActions          ReactNode

DataListItem {
  id          string                  required
  label       ReactNode               primary line
  meta        ReactNode               secondary line
  leading     ReactNode               custom leading slot
  avatarSrc   string                  shorthand
  initials    string                  shorthand
  trailing    ReactNode               right edge content
  href        string
  onClick     (e) => void
}`}</code></pre>
    </>
  );
}
