'use client';

import { Toggle } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function TogglePage() {
  return (
    <>
      <h1>Toggle</h1>
      <p className="lede">
        Switch input for boolean state. Same form semantics as Checkbox, different affordance.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Toggle defaultChecked>Email notifications</Toggle>
            <Toggle>Beta features</Toggle>
            <Toggle disabled>Disabled</Toggle>
          </div>
        }
        react={`<Toggle defaultChecked>Email notifications</Toggle>
<Toggle>Beta features</Toggle>
<Toggle disabled>Disabled</Toggle>`}
        angular={`<hilal-toggle [checked]="true">Email notifications</hilal-toggle>
<hilal-toggle>Beta features</hilal-toggle>
<hilal-toggle [disabled]="true">Disabled</hilal-toggle>`}
        blade={`<x-hilal-toggle :checked="true">Email notifications</x-hilal-toggle>
<x-hilal-toggle>Beta features</x-hilal-toggle>
<x-hilal-toggle :disabled="true">Disabled</x-hilal-toggle>`}
      />
    </>
  );
}
