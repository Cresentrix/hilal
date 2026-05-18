import type { Metadata } from 'next';
import { Badge } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Badge' };

export default function BadgePage() {
  return (
    <>
      <h1>Badge</h1>
      <p className="lede">
        Compact label with six tones (neutral, info, success, warning, danger, brand), two sizes,
        and an optional dot variant.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="brand">Brand</Badge>
            <Badge tone="success" dot>Live</Badge>
          </div>
        }
        react={`<Badge tone="neutral">Neutral</Badge>
<Badge tone="info">Info</Badge>
<Badge tone="success">Success</Badge>
<Badge tone="warning">Warning</Badge>
<Badge tone="danger">Danger</Badge>
<Badge tone="brand">Brand</Badge>
<Badge tone="success" dot>Live</Badge>`}
        angular={`<hilal-badge tone="neutral">Neutral</hilal-badge>
<hilal-badge tone="success">Success</hilal-badge>
<hilal-badge tone="success" [dot]="true">Live</hilal-badge>`}
        blade={`<x-hilal-badge tone="neutral">Neutral</x-hilal-badge>
<x-hilal-badge tone="success">Success</x-hilal-badge>
<x-hilal-badge tone="success" :dot="true">Live</x-hilal-badge>`}
      />
    </>
  );
}
