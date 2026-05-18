import type { Metadata } from 'next';
import { Tooltip, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Tooltip' };

export default function TooltipPage() {
  return (
    <>
      <h1>Tooltip</h1>
      <p className="lede">
        Lightweight hint shown on hover and focus. Wraps any trigger element with four
        positions and follows ARIA <code>tooltip</code> semantics.
      </p>

      <h2>Sides</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Tooltip content="Top tooltip" side="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" side="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="Start tooltip" side="start">
              <Button variant="secondary">Start</Button>
            </Tooltip>
            <Tooltip content="End tooltip" side="end">
              <Button variant="secondary">End</Button>
            </Tooltip>
          </div>
        }
        react={`<Tooltip content="Top tooltip" side="top">
  <Button>Hover me</Button>
</Tooltip>`}
        angular={`<hilal-tooltip content="Top tooltip" side="top">
  <hilal-button>Hover me</hilal-button>
</hilal-tooltip>`}
        blade={`<x-hilal-tooltip content="Top tooltip" side="top">
  <x-hilal-button>Hover me</x-hilal-button>
</x-hilal-tooltip>`}
      />

      <h2>On any element</h2>
      <p>Tooltip is purely a wrapper — it works on buttons, links, icons, even text spans.</p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Tooltip content="Permanently delete">
              <Button variant="tertiary" aria-label="Delete">⌫</Button>
            </Tooltip>
            <Tooltip content="Acme Corp. · joined Apr 2024">
              <span style={{ textDecoration: 'underline dotted', cursor: 'help' }}>Acme</span>
            </Tooltip>
          </div>
        }
        react={`<Tooltip content="Permanently delete">
  <Button variant="tertiary" aria-label="Delete"><TrashIcon /></Button>
</Tooltip>

<Tooltip content="Acme Corp. · joined Apr 2024">
  <span>Acme</span>
</Tooltip>`}
        angular={`<hilal-tooltip content="Permanently delete">
  <hilal-button variant="tertiary" aria-label="Delete">⌫</hilal-button>
</hilal-tooltip>`}
        blade={`<x-hilal-tooltip content="Permanently delete">
  <x-hilal-button variant="tertiary" aria-label="Delete">⌫</x-hilal-button>
</x-hilal-tooltip>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`content   ReactNode                                          required
side      'top' | 'bottom' | 'start' | 'end'                 default: 'top'
children  ReactNode  the trigger element wrapped by Tooltip`}</code></pre>
    </>
  );
}
