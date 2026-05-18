'use client';

import { useState } from 'react';
import { Pagination } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function PaginationPage() {
  const [pageA, setPageA] = useState(3);
  const [pageB, setPageB] = useState(7);
  const [pageC, setPageC] = useState(50);
  return (
    <>
      <h1>Pagination</h1>
      <p className="lede">
        Page selector with numeric buttons, ellipses for long ranges, and labeled prev/next
        arrows. Two sizes.
      </p>

      <h2>Basic</h2>
      <FrameworkTabs
        preview={<Pagination page={pageA} total={8} onChange={setPageA} />}
        react={`const [page, setPage] = useState(1);

<Pagination page={page} total={8} onChange={setPage} />`}
        angular={`<hilal-pagination [page]="page" [total]="8" (pageChange)="page = $event"></hilal-pagination>`}
        blade={`<x-hilal-pagination :page="$page" :total="8" />`}
      />

      <h2>Long range with ellipses</h2>
      <FrameworkTabs
        preview={<Pagination page={pageB} total={50} siblingCount={1} onChange={setPageB} />}
        react={`<Pagination page={page} total={50} siblingCount={1} onChange={setPage} />`}
        angular={`<hilal-pagination [page]="page" [total]="50" [siblingCount]="1" (pageChange)="page = $event"></hilal-pagination>`}
        blade={`<x-hilal-pagination :page="$page" :total="50" :sibling-count="1" />`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Pagination size="sm" page={pageC} total={50} onChange={setPageC} />
            <Pagination size="md" page={pageC} total={50} onChange={setPageC} />
          </div>
        }
        react={`<Pagination size="sm" page={page} total={50} onChange={setPage} />
<Pagination size="md" page={page} total={50} onChange={setPage} />`}
        angular={`<hilal-pagination size="sm" [page]="page" [total]="50"></hilal-pagination>`}
        blade={`<x-hilal-pagination size="sm" :page="$page" :total="50" />`}
      />

      <h2>Custom labels</h2>
      <FrameworkTabs
        preview={<Pagination page={pageA} total={8} prevLabel="Previous" nextLabel="Next" onChange={setPageA} />}
        react={`<Pagination
  page={page} total={8}
  prevLabel="Previous"
  nextLabel="Next"
  onChange={setPage}
/>`}
        angular={`<hilal-pagination [page]="page" [total]="8" prevLabel="Previous" nextLabel="Next"></hilal-pagination>`}
        blade={`<x-hilal-pagination :page="$page" :total="8" prev-label="Previous" next-label="Next" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`page           number          1-based current page
total          number          total page count
siblingCount   number          max numeric buttons either side of current (default: 1)
size           'sm' | 'md'     default: 'md'
prevLabel      string          default: 'Previous'
nextLabel      string          default: 'Next'
onChange       (page) => void`}</code></pre>
    </>
  );
}
