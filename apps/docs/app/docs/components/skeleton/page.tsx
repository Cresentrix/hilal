import type { Metadata } from 'next';
import { Skeleton } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Skeleton' };

export default function SkeletonPage() {
  return (
    <>
      <h1>Skeleton</h1>
      <p className="lede">
        Animated placeholder shapes shown while real content is loading. Three variants
        (text, rectangle, circle) and free-form sizing.
      </p>

      <H2>Variants</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton variant="circle" size="3rem" />
            <Skeleton variant="rectangle" width="6rem" height="3rem" />
            <Skeleton variant="text" width="12rem" />
          </div>
        }
        react={`<Skeleton variant="circle"    size="3rem" />
<Skeleton variant="rectangle" width="6rem" height="3rem" />
<Skeleton variant="text"      width="12rem" />`}
        angular={`<span class="hilal-skeleton hilal-skeleton--circle" style="--size: 3rem;"></span>
<span class="hilal-skeleton" style="inline-size: 6rem; block-size: 3rem;"></span>
<span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 12rem;"></span>`}
        blade={`<x-hilal-skeleton variant="circle" size="3rem" />
<x-hilal-skeleton variant="rectangle" width="6rem" height="3rem" />
<x-hilal-skeleton variant="text" width="12rem" />`}
      />

      <H2>Card skeleton</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', width: '100%' }}>
            <Skeleton variant="circle" size="2.5rem" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="55%" />
            </div>
          </div>
        }
        react={`<div className="row">
  <Skeleton variant="circle" size="2.5rem" />
  <div className="col">
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="55%" />
  </div>
</div>`}
        angular={`<div class="row">
  <span class="hilal-skeleton hilal-skeleton--circle"></span>
  <div class="col">
    <span class="hilal-skeleton hilal-skeleton--text"></span>
    <span class="hilal-skeleton hilal-skeleton--text"></span>
  </div>
</div>`}
        blade={`<div class="row">
  <x-hilal-skeleton variant="circle" size="2.5rem" />
  <div class="col">
    <x-hilal-skeleton variant="text" width="40%" />
    <x-hilal-skeleton variant="text" width="60%" />
  </div>
</div>`}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`variant   'rectangle' | 'text' | 'circle'   default: 'rectangle'
width     number | string                   any CSS length
height    number | string                   any CSS length
size      number | string                   convenience for circle variant`}</code></pre>
      <Accessibility
        summary={<>Rendered with <code>{"aria-hidden=\"true\""}</code> — assistive tech announces the real content once it loads, not the placeholder.</>}
      />
    </>
  );
}
