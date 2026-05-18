import type { Metadata } from 'next';
import { Tooltip, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Tooltip' };

export default function TooltipPage() {
  return (
    <>
      <h1>Tooltip</h1>
      <p className="lede">
        Lightweight hint shown on hover / focus. Wraps any trigger element with four positions.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Tooltip content="Saves the current draft" side="top">
              <Button>Save</Button>
            </Tooltip>
            <Tooltip content="Permanently delete" side="bottom">
              <Button variant="tertiary">Delete</Button>
            </Tooltip>
          </div>
        }
        react={`<Tooltip content="Saves the current draft" side="top">
  <Button>Save</Button>
</Tooltip>`}
        angular={`<hilal-tooltip content="Saves the current draft" side="top">
  <hilal-button>Save</hilal-button>
</hilal-tooltip>`}
        blade={`<x-hilal-tooltip content="Saves the current draft" side="top">
  <x-hilal-button>Save</x-hilal-button>
</x-hilal-tooltip>`}
      />
    </>
  );
}
