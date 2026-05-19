'use client';

import { useState } from 'react';
import { Badge, Button, Avatar, Input } from '@hilal-ds/react';
import { DataList, type DataListItem, FilterBar, type FilterPill, SearchHeader } from '@hilal-ds/patterns';
import { H2, H3 } from '../../../_components/Heading';

interface Msg {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  category: 'inbox' | 'starred' | 'mentions' | 'archive';
}

const ALL: Msg[] = [
  { id: '1', from: 'Sara Al-Mutairi',  subject: 'Q2 retrospective draft',    preview: 'Pasting my notes here so we can riff before tomorrow…',  time: '2h ago',  unread: true,  category: 'inbox' },
  { id: '2', from: 'Khaled Petersen',  subject: 'Re: Pricing page copy',     preview: 'Looks good. One nit on the third bullet — too much…',     time: '3h ago',  unread: true,  category: 'mentions' },
  { id: '3', from: 'Jane Lee',         subject: 'Customer reference call',   preview: 'They are happy to do it next Tuesday. I will set it up…', time: '5h ago',  unread: false, category: 'starred' },
  { id: '4', from: 'Mohamed M.',       subject: 'Deploy went out',           preview: 'main is live. No errors so far. Quiet morning so let us…', time: 'Yesterday', unread: false, category: 'inbox' },
  { id: '5', from: 'Acme Billing',     subject: 'Your May invoice',          preview: 'Invoice 1284 is ready. Amount due: $128.00. Auto-charge…', time: 'Yesterday', unread: false, category: 'archive' },
  { id: '6', from: 'Reza T.',          subject: 'Feedback on the docs',      preview: 'The new Foundations pages look great. One question on…',  time: '2d ago', unread: false, category: 'inbox' },
];

export default function InboxRecipe() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<Msg['category']>('inbox');

  const filtered = ALL
    .filter((m) => m.category === active)
    .filter((m) => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return m.from.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.preview.toLowerCase().includes(q);
    });

  const filters: FilterPill[] = [
    { id: 'inbox',    label: 'Inbox',    count: ALL.filter((m) => m.category === 'inbox').length,    active: active === 'inbox' },
    { id: 'mentions', label: 'Mentions', count: ALL.filter((m) => m.category === 'mentions').length, active: active === 'mentions' },
    { id: 'starred',  label: 'Starred',  count: ALL.filter((m) => m.category === 'starred').length,  active: active === 'starred' },
    { id: 'archive',  label: 'Archive',  count: ALL.filter((m) => m.category === 'archive').length,  active: active === 'archive' },
  ];

  const items: DataListItem[] = filtered.map((m) => ({
    id: m.id,
    label: <strong style={{ fontWeight: m.unread ? 600 : 400 }}>{m.subject}</strong>,
    meta: (
      <span>
        <span style={{ color: 'var(--hilal-fg-primary)', fontWeight: m.unread ? 500 : 400 }}>{m.from}</span>
        {' · '}{m.preview}
      </span>
    ),
    initials: m.from.split(' ').map((s) => s[0]).slice(0, 2).join(''),
    trailing: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-2)' }}>
        <span style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-12)' }}>{m.time}</span>
        {m.unread ? <Badge tone="brand" size="sm" dot /> : null}
      </div>
    ),
    onClick: () => {},
  }));

  return (
    <>
      <h1>Inbox</h1>
      <p className="lede">
        Email-style inbox with filter pills, search, and a DataList of messages. Click anywhere
        on a row to open it.
      </p>

      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          padding: 'var(--hilal-spacing-4)',
          background: 'var(--hilal-bg-page)',
        }}
      >
        <SearchHeader
          query={query}
          onQueryChange={setQuery}
          placeholder="Search inbox…"
          totalCount={filtered.length}
          onClear={() => setQuery('')}
          trailing={<Button size="sm">New message</Button>}
        />
        <div style={{ marginBlock: 'var(--hilal-spacing-3)' }}>
          <FilterBar
            filters={filters}
            onToggle={(id) => setActive(id as Msg['category'])}
          />
        </div>
        <DataList
          items={items}
          emptyTitle="Inbox zero"
          emptyDescription="You're all caught up in this folder."
        />
      </div>

      <H2>Source</H2>
      <pre className="preview__code"><code>{`<SearchHeader query={query} onQueryChange={setQuery} totalCount={filtered.length} />
<FilterBar filters={filters} onToggle={setActive} />
<DataList items={filtered.map(toItem)} />`}</code></pre>
    </>
  );
}
