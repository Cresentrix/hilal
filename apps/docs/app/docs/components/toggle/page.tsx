'use client';

import { useState } from 'react';
import { Toggle } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';

export default function TogglePage() {
  const [on, setOn] = useState(false);
  return (
    <>
      <h1>Toggle</h1>
      <p className="lede">
        Switch input for boolean state. Same form semantics as Checkbox, different affordance —
        use for &ldquo;turn this on/off&rdquo; settings rather than &ldquo;select this option&rdquo;.
      </p>

      <H2>States</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Toggle>Off</Toggle>
            <Toggle defaultChecked>On</Toggle>
            <Toggle disabled>Disabled, off</Toggle>
            <Toggle disabled defaultChecked>Disabled, on</Toggle>
          </div>
        }
        react={`<Toggle>Off</Toggle>
<Toggle defaultChecked>On</Toggle>
<Toggle disabled>Disabled, off</Toggle>
<Toggle disabled defaultChecked>Disabled, on</Toggle>`}
        angular={`<hilal-toggle>Off</hilal-toggle>
<hilal-toggle [checked]="true">On</hilal-toggle>
<hilal-toggle [disabled]="true">Disabled</hilal-toggle>`}
        blade={`<x-hilal-toggle>Off</x-hilal-toggle>
<x-hilal-toggle :checked="true">On</x-hilal-toggle>
<x-hilal-toggle :disabled="true">Disabled</x-hilal-toggle>`}
      />

      <H2>Sizes</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Toggle size="sm" defaultChecked>Small</Toggle>
            <Toggle size="md" defaultChecked>Medium</Toggle>
          </div>
        }
        react={`<Toggle size="sm" defaultChecked>Small</Toggle>
<Toggle size="md" defaultChecked>Medium</Toggle>`}
        angular={`<hilal-toggle size="sm" [checked]="true">Small</hilal-toggle>
<hilal-toggle size="md" [checked]="true">Medium</hilal-toggle>`}
        blade={`<x-hilal-toggle size="sm" :checked="true">Small</x-hilal-toggle>
<x-hilal-toggle size="md" :checked="true">Medium</x-hilal-toggle>`}
      />

      <H2>Controlled</H2>
      <FrameworkTabs
        preview={
          <Toggle checked={on} onChange={(e) => setOn(e.currentTarget.checked)}>
            Email notifications ({on ? 'on' : 'off'})
          </Toggle>
        }
        react={`const [on, setOn] = useState(false);

<Toggle checked={on} onChange={(e) => setOn(e.currentTarget.checked)}>
  Email notifications
</Toggle>`}
        angular={`<hilal-toggle [checked]="on" (change)="on = $event.currentTarget.checked">Email notifications</hilal-toggle>`}
        blade={`<x-hilal-toggle name="email_notifications" :checked="(bool) old('email_notifications')">Email notifications</x-hilal-toggle>`}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`size       'sm' | 'md'   default: 'md'
children   ReactNode     inline label rendered next to the switch
…          all native <input type="checkbox"> attributes`}</code></pre>
      <Accessibility
        summary={<>Rendered with <code>{"role=\"switch\""}</code> and <code>{"aria-checked"}</code> so screen readers announce on/off rather than checked/unchecked.</>}
        keys={[
                {
                        "keys": "Space",
                        "action": "Toggle the switch"
                }
        ]}
      />
    </>
  );
}
