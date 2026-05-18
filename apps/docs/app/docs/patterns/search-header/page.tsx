'use client';

import { useState, useMemo } from 'react';
import { SearchHeader } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

const corpus = [
  'Project starlight', 'Project nebula', 'Project obsidian',
  'Customer · Acme', 'Customer · Globex', 'Customer · Initech',
  'Invoice 1284', 'Invoice 1285', 'Invoice 1290',
];

export default function SearchHeaderPage() {
  const [query, setQuery] = useState('');
  const results = useMemo(
    () => corpus.filter((s) => s.toLowerCase().includes(query.toLowerCase().trim())),
    [query],
  );
  return (
    <>
      <h1>SearchHeader</h1>
      <p className="lede">
        Page-top search input with leading icon, total-results summary, and trailing controls.
        Renders a clear button automatically when the query is non-empty.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <SearchHeader
              query={query}
              onQueryChange={setQuery}
              placeholder="Search projects, customers, invoices…"
              totalCount={results.length}
              onClear={() => setQuery('')}
            />
          </div>
        }
        react={`<SearchHeader
  query={query}
  onQueryChange={setQuery}
  placeholder="Search projects, customers, invoices…"
  totalCount={results.length}
  onClear={() => setQuery('')}
/>`}
        angular={`<hilal-search-header
  [query]="query"
  (queryChange)="query = $event"
  placeholder="Search projects, customers, invoices…"
  [totalCount]="results.length"
></hilal-search-header>`}
        blade={`<x-hilal-search-header
  :query="$query"
  placeholder="Search…"
  :total-count="$results->count()"
  action="/search"
/>`}
      />
    </>
  );
}
