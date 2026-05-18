import { Skeleton } from '@hilal-ds/react';

export default function DocsLoading() {
  return (
    <div className="doc-split">
      <aside className="doc-sidebar" aria-hidden>
        <Skeleton variant="text" width="40%" />
        <div style={{ marginBlockStart: '0.6rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="60%" />
        </div>
      </aside>
      <main className="doc-content">
        <Skeleton variant="text" width="40%" style={{ blockSize: '2rem' }} />
        <div style={{ marginBlockStart: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="85%" />
          <Skeleton variant="text" width="60%" />
        </div>
        <div style={{ marginBlockStart: '2rem' }}>
          <Skeleton variant="rectangle" width="100%" height="14rem" />
        </div>
      </main>
    </div>
  );
}
