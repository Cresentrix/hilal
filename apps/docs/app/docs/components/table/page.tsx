'use client';

import { useState } from 'react';
import { Table, Badge, Pagination, Button, type TableColumn, type SortState } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';
import { Anatomy } from '../../../_components/Anatomy';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  status: 'active' | 'invited' | 'suspended';
  signups: number;
}

const USERS: User[] = [
  { id: '1', name: 'Sara Al-Mutairi', email: 'sara@acme.com',    role: 'owner',  status: 'active',    signups: 124 },
  { id: '2', name: 'Mohamed M.',      email: 'mohamed@acme.com', role: 'admin',  status: 'active',    signups: 87 },
  { id: '3', name: 'Jane Lee',        email: 'jane@acme.com',    role: 'member', status: 'active',    signups: 41 },
  { id: '4', name: 'Khaled Petersen', email: 'khaled@acme.com',  role: 'member', status: 'invited',   signups: 0 },
  { id: '5', name: 'Reza T.',         email: 'reza@acme.com',    role: 'member', status: 'suspended', signups: 6 },
  { id: '6', name: 'Yuki S.',         email: 'yuki@acme.com',    role: 'admin',  status: 'active',    signups: 312 },
];

const ROLE_TONE: Record<User['role'], 'success' | 'info' | 'neutral'> = {
  owner: 'success', admin: 'info', member: 'neutral',
};
const STATUS_TONE: Record<User['status'], 'success' | 'warning' | 'danger'> = {
  active: 'success', invited: 'warning', suspended: 'danger',
};

const columns: TableColumn<User>[] = [
  { id: 'name',    header: 'Name',    sortable: true, cell: (r) => r.name, sortFn: (a, b) => a.name.localeCompare(b.name) },
  { id: 'email',   header: 'Email',   cell: (r) => r.email },
  { id: 'role',    header: 'Role',    sortable: true, cell: (r) => <Badge tone={ROLE_TONE[r.role]} size="sm">{r.role}</Badge>, sortFn: (a, b) => a.role.localeCompare(b.role) },
  { id: 'status',  header: 'Status',  sortable: true, cell: (r) => <Badge tone={STATUS_TONE[r.status]} size="sm">{r.status}</Badge>, sortFn: (a, b) => a.status.localeCompare(b.status) },
  { id: 'signups', header: 'Signups', sortable: true, numeric: true, cell: (r) => r.signups.toLocaleString(), sortFn: (a, b) => a.signups - b.signups },
];

const reactSnippet = `import { Table, Badge, type TableColumn } from '@hilal-ds/react';

interface User { id: string; name: string; email: string; role: string; signups: number; }

const columns: TableColumn<User>[] = [
  { id: 'name',    header: 'Name',    sortable: true,  cell: (r) => r.name },
  { id: 'email',   header: 'Email',                    cell: (r) => r.email },
  { id: 'role',    header: 'Role',    sortable: true,  cell: (r) => <Badge>{r.role}</Badge> },
  { id: 'signups', header: 'Signups', sortable: true,  numeric: true, cell: (r) => r.signups.toLocaleString() },
];

<Table columns={columns} rows={users} getRowId={(r) => r.id} />`;

const angularSnippet = `<hilal-table
  [columns]="columns"
  [rows]="users"
  [sort]="sort"
  (sortChange)="sort = $event"
></hilal-table>

// columns: HilalTableColumn[] = [
//   { id: 'name',    header: 'Name',    sortable: true, accessor: r => r.name },
//   { id: 'email',   header: 'Email',                   accessor: r => r.email },
//   { id: 'signups', header: 'Signups', sortable: true, numeric: true, accessor: r => r.signups },
// ];`;

const bladeSnippet = `{{-- Inline column shape --}}
<x-hilal-table
  :columns="[
    ['id' => 'name',    'header' => 'Name',    'accessor' => 'name',    'sortable' => true],
    ['id' => 'email',   'header' => 'Email',   'accessor' => 'email'],
    ['id' => 'signups', 'header' => 'Signups', 'accessor' => 'signups', 'sortable' => true, 'numeric' => true],
  ]"
  :rows="$users"
  :sort-column="request('sort')"
  :sort-direction="request('dir')"
/>`;

export default function TablePage() {
  const [sort, setSort] = useState<SortState | null>({ columnId: 'signups', direction: 'desc' });
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const paged = USERS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <h1>Table</h1>
      <p className="lede">
        Data table with typed column definitions, click-to-sort, sticky header, loading
        skeleton, empty state, and configurable size. Works for thousands of rows; for
        virtualization, pair with your own windowing layer (the row markup is plain{' '}
        <code>{'<tr>'}</code> so it composes).
      </p>

      <H2>Basic</H2>
      <FrameworkTabs
        preview={<Table columns={columns} rows={USERS} getRowId={(r) => r.id} />}
        react={reactSnippet}
        angular={angularSnippet}
        blade={bladeSnippet}
      />

      <H2>Sortable columns</H2>
      <p>Click any sortable header to cycle through ascending → descending → unsorted.</p>
      <FrameworkTabs
        preview={
          <Table
            columns={columns}
            rows={USERS}
            getRowId={(r) => r.id}
            sort={sort}
            onSortChange={setSort}
          />
        }
        react={`const [sort, setSort] = useState<SortState | null>({ columnId: 'signups', direction: 'desc' });

<Table columns={columns} rows={users} getRowId={(r) => r.id} sort={sort} onSortChange={setSort} />`}
        angular={`<hilal-table [columns]="columns" [rows]="users" [sort]="sort" (sortChange)="sort = $event"></hilal-table>`}
        blade={`<x-hilal-table :columns="$columns" :rows="$users" :sort-column="$sort" :sort-direction="$dir" />`}
      />

      <H2>Sizes</H2>
      <FrameworkTabs
        preview={
          <Table columns={columns} rows={USERS.slice(0, 3)} getRowId={(r) => r.id} size="sm" />
        }
        react={`<Table size="sm" ... />
<Table size="md" ... />  {/* default */}`}
        angular={`<hilal-table size="sm" [columns]="columns" [rows]="users"></hilal-table>`}
        blade={`<x-hilal-table size="sm" :columns="$columns" :rows="$users" />`}
      />

      <H2>Clickable rows</H2>
      <FrameworkTabs
        preview={
          <Table
            columns={columns}
            rows={USERS.slice(0, 4)}
            getRowId={(r) => r.id}
            onRowClick={(row) => console.log('clicked', row.email)}
          />
        }
        react={`<Table
  columns={columns}
  rows={users}
  getRowId={(r) => r.id}
  onRowClick={(row) => router.push(\`/users/\${row.id}\`)}
/>`}
        angular={`<hilal-table [columns]="columns" [rows]="users" (rowClick)="open($event.row)"></hilal-table>`}
        blade={`<x-hilal-table :columns="$columns" :rows="$users" />
{{-- Native links — wrap the cell renderer in an <a> via a custom view. --}}`}
      />

      <H2>Loading state</H2>
      <FrameworkTabs
        preview={<Table columns={columns} rows={[]} getRowId={(r) => (r as User).id} loading loadingRows={4} />}
        react={`<Table columns={columns} rows={[]} getRowId={(r) => r.id} loading loadingRows={4} />`}
        angular={`<hilal-table [columns]="columns" [rows]="[]" [loading]="true" [loadingRows]="4"></hilal-table>`}
        blade={`<x-hilal-table :columns="$columns" :rows="[]" :loading="true" :loading-rows="4" />`}
      />

      <H2>Empty state</H2>
      <FrameworkTabs
        preview={<Table columns={columns} rows={[]} getRowId={(r) => (r as User).id} emptyState="No members yet — invite your first teammate." />}
        react={`<Table
  columns={columns}
  rows={[]}
  getRowId={(r) => r.id}
  emptyState="No members yet — invite your first teammate."
/>`}
        angular={`<hilal-table [columns]="columns" [rows]="[]" emptyState="No members yet."></hilal-table>`}
        blade={`<x-hilal-table :columns="$columns" :rows="[]" empty-state="No members yet." />`}
      />

      <H2>Composition: with Pagination</H2>
      <p>Table doesn&rsquo;t embed pagination — pair it with the Pagination primitive for explicit control.</p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-3)' }}>
            <Table columns={columns} rows={paged} getRowId={(r) => r.id} />
            <Pagination page={page} total={Math.ceil(USERS.length / pageSize)} onChange={setPage} />
          </div>
        }
        react={`const pageSize = 10;
const paged = users.slice((page - 1) * pageSize, page * pageSize);

<Table columns={columns} rows={paged} getRowId={(r) => r.id} />
<Pagination page={page} total={Math.ceil(users.length / pageSize)} onChange={setPage} />`}
        angular={`<hilal-table [columns]="columns" [rows]="paged"></hilal-table>
<hilal-pagination [page]="page" [total]="total" (pageChange)="page = $event"></hilal-pagination>`}
        blade={`<x-hilal-table :columns="$columns" :rows="$users->forPage($page, $perPage)->toArray()" />
<x-hilal-pagination :page="$page" :total="$users->lastPage()" />`}
      />

      <H2>Sticky header</H2>
      <p>For long tables, pass <code>sticky</code> to keep the header visible while scrolling.</p>
      <pre className="preview__code"><code>{`<Table columns={columns} rows={rows} sticky />`}</code></pre>

      <H2>Parts</H2>
      <Anatomy
        diagram={`Table
├─ <caption>          (optional)
├─ <thead>
│   └─ <th> · sort button (when sortable)
└─ <tbody>
    └─ <tr> · <td>     (interactive when onRowClick is set)`}
        parts={[
          { label: 'columns',       description: 'Array of TableColumn — id, header, cell renderer, sortable flag, optional sortFn / numeric / align.' },
          { label: 'rows',          description: 'The data. Plain array of objects — no opinion on shape.' },
          { label: 'getRowId',      description: 'Stable key per row. Required.' },
          { label: 'sort',          description: 'Controlled sort state (paired with onSortChange). Use defaultSort for uncontrolled.' },
          { label: 'onRowClick',    description: 'Row-level click handler. Adds interactive styling automatically.' },
          { label: 'isRowSelected', description: 'Per-row boolean → applies selected-row styling. Pairs naturally with your own selection state.' },
        ]}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`columns         TableColumn<Row>[]                       required
rows            Row[]                                    required
getRowId        (row, index) => Key                      required
caption         ReactNode                                rendered above the table
size            'sm' | 'md'                              default: 'md'
sticky          boolean                                  sticky header
loading         boolean
loadingRows     number                                   default: 4
emptyState      ReactNode                                shown when rows is empty
defaultSort     { columnId, direction }                  uncontrolled initial sort
sort            { columnId, direction } | null           controlled sort
onSortChange    (next) => void
onRowClick      (row, index, e) => void
isRowSelected   (row, index) => boolean

TableColumn<Row> {
  id          string
  header      ReactNode
  cell        (row, rowIndex) => ReactNode
  sortable    boolean
  sortFn      (a, b) => number                comparator override
  numeric     boolean                          tabular-nums + right-align
  align       'start' | 'center' | 'end'
  width       string | number
  className   string
}`}</code></pre>

      <Accessibility
        summary={<>Native <code>{'<table>'}</code> markup with <code>scope=&quot;col&quot;</code> on header cells. Sortable headers wrap a button with <code>aria-sort</code> set to <code>ascending</code> / <code>descending</code> / <code>none</code>.</>}
        keys={[
          { keys: 'Tab', action: 'Move between sortable headers and clickable rows' },
          { keys: 'Enter / Space', action: 'Toggle sort on the focused header (or activate the focused row)' },
        ]}
        notes={[
          <>Use the <code>caption</code> prop to give the table a screen-reader-visible name.</>,
          <>For wide tables on small screens, the wrapper provides horizontal scroll — keep the first column meaningful (name / id) so context isn&rsquo;t lost.</>,
        ]}
      />
    </>
  );
}
