import type { Metadata } from 'next';
import { Accordion, AccordionItem } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Accordion' };

export default function AccordionPage() {
  return (
    <>
      <h1>Accordion</h1>
      <p className="lede">
        Collapsible content sections built on the native <code>&lt;details&gt;</code> element. Each
        item works without JavaScript.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <Accordion>
              <AccordionItem title="Is Hilal free to use?">
                Yes — Apache 2.0 license, no usage caps, no analytics phone-home.
              </AccordionItem>
              <AccordionItem title="Does it support RTL?">
                Yes. Every layout uses CSS logical properties (block / inline) so RTL works automatically.
              </AccordionItem>
              <AccordionItem title="Can I use it without React?">
                Yes — there's an Angular package and a Blade package that emit the same DOM and CSS.
              </AccordionItem>
            </Accordion>
          </div>
        }
        react={`<Accordion>
  <AccordionItem title="Is Hilal free to use?">
    Yes — Apache 2.0…
  </AccordionItem>
  <AccordionItem title="Does it support RTL?">
    Yes.
  </AccordionItem>
</Accordion>`}
        angular={`<hilal-accordion>
  <hilal-accordion-item title="Is Hilal free to use?">…</hilal-accordion-item>
  <hilal-accordion-item title="Does it support RTL?">…</hilal-accordion-item>
</hilal-accordion>`}
        blade={`<x-hilal-accordion>
  <x-hilal-accordion-item title="Is Hilal free to use?">…</x-hilal-accordion-item>
  <x-hilal-accordion-item title="Does it support RTL?">…</x-hilal-accordion-item>
</x-hilal-accordion>`}
      />
    </>
  );
}
