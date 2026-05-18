import type { Metadata } from 'next';
import { Badge } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export const metadata: Metadata = { title: 'Badge' };

export default function BadgePage() {
  return (
    <>
      <h1>Badge</h1>
      <p className="lede">
        Compact label for counts, statuses, and tags. Six tones, two sizes, and an optional
        dot-only variant.
      </p>

      <h2>Tones</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="brand">Brand</Badge>
          </div>
        }
        react={`<Badge tone="neutral">Neutral</Badge>
<Badge tone="info">Info</Badge>
<Badge tone="success">Success</Badge>
<Badge tone="warning">Warning</Badge>
<Badge tone="danger">Danger</Badge>
<Badge tone="brand">Brand</Badge>`}
        angular={`<hilal-badge tone="neutral">Neutral</hilal-badge>
<hilal-badge tone="success">Success</hilal-badge>
<hilal-badge tone="warning">Warning</hilal-badge>
<hilal-badge tone="danger">Danger</hilal-badge>`}
        blade={`<x-hilal-badge tone="neutral">Neutral</x-hilal-badge>
<x-hilal-badge tone="success">Success</x-hilal-badge>
<x-hilal-badge tone="warning">Warning</x-hilal-badge>
<x-hilal-badge tone="danger">Danger</x-hilal-badge>`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <Badge tone="brand" size="sm">Small</Badge>
            <Badge tone="brand" size="md">Medium</Badge>
          </div>
        }
        react={`<Badge tone="brand" size="sm">Small</Badge>
<Badge tone="brand" size="md">Medium</Badge>`}
        angular={`<hilal-badge tone="brand" size="sm">Small</hilal-badge>
<hilal-badge tone="brand" size="md">Medium</hilal-badge>`}
        blade={`<x-hilal-badge tone="brand" size="sm">Small</x-hilal-badge>
<x-hilal-badge tone="brand" size="md">Medium</x-hilal-badge>`}
      />

      <h2>Dot</h2>
      <p>For status indicators where text would be noise, pair a tone with <code>dot</code>.</p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Badge tone="success" dot /> Online</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Badge tone="warning" dot /> Idle</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}><Badge tone="danger"  dot /> Offline</span>
          </div>
        }
        react={`<Badge tone="success" dot /> Online
<Badge tone="warning" dot /> Idle
<Badge tone="danger"  dot /> Offline`}
        angular={`<hilal-badge tone="success" [dot]="true"></hilal-badge>
<hilal-badge tone="warning" [dot]="true"></hilal-badge>`}
        blade={`<x-hilal-badge tone="success" :dot="true" />
<x-hilal-badge tone="warning" :dot="true" />`}
      />

      <h2>Composition: counts</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>Inbox <Badge tone="brand">12</Badge></span>
            <span>Mentions <Badge tone="neutral">3</Badge></span>
            <span>Failed <Badge tone="danger">2</Badge></span>
          </div>
        }
        react={`<span>Inbox <Badge tone="brand">12</Badge></span>
<span>Mentions <Badge tone="neutral">3</Badge></span>
<span>Failed <Badge tone="danger">2</Badge></span>`}
        angular={`<span>Inbox <hilal-badge tone="brand">12</hilal-badge></span>`}
        blade={`<span>Inbox <x-hilal-badge tone="brand">12</x-hilal-badge></span>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`tone   'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand'   default: 'neutral'
size   'sm' | 'md'                                                       default: 'sm'
dot    boolean   render as a small dot only (children are ignored)`}</code></pre>
      <Accessibility
        summary={<>Decorative by default. For icon-only counts (e.g. notification dots), wrap in an element with an <code>{"aria-label"}</code>.</>}
      />
    </>
  );
}
