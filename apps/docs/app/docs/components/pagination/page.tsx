'use client';

import { useState } from 'react';
import { Pagination } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function PaginationPage() {
  const [page, setPage] = useState(3);
  return (
    <>
      <h1>Pagination</h1>
      <p className="lede">
        Page controls with numeric buttons, ellipses for large ranges, and prev/next arrows.
      </p>

      <FrameworkTabs
        preview={<Pagination page={page} total={12} onChange={setPage} />}
        react={`const [page, setPage] = useState(1);

<Pagination page={page} total={12} onChange={setPage} />`}
        angular={`<hilal-pagination
  [page]="page"
  [total]="12"
  (pageChange)="page = $event"
></hilal-pagination>`}
        blade={`<x-hilal-pagination :page="$page" :total="12" />`}
      />
    </>
  );
}
