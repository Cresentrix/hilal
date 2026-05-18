import type { Metadata } from 'next';
import { Skeleton } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Skeleton' };

export default function SkeletonPage() {
  return (
    <>
      <h1>Skeleton</h1>
      <p className="lede">
        Loading placeholder shapes — text, rect, circle — with shimmer animation.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', width: '100%' }}>
            <Skeleton variant="circle" size="2.5rem" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>
        }
        react={`<Skeleton variant="circle" size="2.5rem" />
<Skeleton variant="text" width="60%" />
<Skeleton variant="text" width="40%" />`}
        angular={`<span class="hilal-skeleton hilal-skeleton--circle" style="--size: 2.5rem;"></span>
<span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 60%;"></span>`}
        blade={`<x-hilal-skeleton variant="circle" size="2.5rem" />
<x-hilal-skeleton variant="text" width="60%" />`}
      />
    </>
  );
}
