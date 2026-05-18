import type { Metadata } from 'next';
import { Accordion, AccordionItem } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Accordion' };

const items = [
  { title: 'Is Hilal free to use?',     body: 'Yes — Apache 2.0 license, no usage caps.' },
  { title: 'Does it support RTL?',      body: 'Yes. Every layout uses CSS logical properties (block / inline).' },
  { title: 'Can I use it without React?', body: 'Yes — there are Angular and Blade packages that emit the same DOM.' },
];

export default function AccordionPage() {
  return (
    <>
      <h1>Accordion</h1>
      <p className="lede">
        Collapsible sections built on the native <code>&lt;details&gt;</code> element. Works
        without JavaScript; three visual variants for different contexts.
      </p>

      <h2>Variants</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            {(['default', 'bordered', 'separated'] as const).map((v) => (
              <div key={v}>
                <div style={{ fontSize: 'var(--hilal-font-size-12)', color: 'var(--hilal-fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{v}</div>
                <Accordion variant={v}>
                  {items.map((it) => (
                    <AccordionItem key={it.title} title={it.title}>{it.body}</AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        }
        react={`<Accordion variant="default">…</Accordion>
<Accordion variant="bordered">…</Accordion>
<Accordion variant="separated">…</Accordion>`}
        angular={`<hilal-accordion variant="bordered">…</hilal-accordion>`}
        blade={`<x-hilal-accordion variant="bordered">…</x-hilal-accordion>`}
      />

      <h2>Default open</h2>
      <FrameworkTabs
        preview={
          <Accordion variant="bordered" style={{ width: '100%' }}>
            <AccordionItem title="Already expanded" open>This one starts open via the native <code>open</code> attribute.</AccordionItem>
            <AccordionItem title="Closed by default">Click to reveal.</AccordionItem>
          </Accordion>
        }
        react={`<AccordionItem title="…" open>Starts expanded</AccordionItem>`}
        angular={`<hilal-accordion-item title="…" [open]="true">Starts expanded</hilal-accordion-item>`}
        blade={`<x-hilal-accordion-item title="…" :open="true">Starts expanded</x-hilal-accordion-item>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`<Accordion>
  variant   'default' | 'bordered' | 'separated'   default: 'default'

<AccordionItem>
  title     ReactNode    summary row
  open      boolean      starts expanded
  …         all native <details> attributes`}</code></pre>
    </>
  );
}
