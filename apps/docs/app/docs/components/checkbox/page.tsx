'use client';

import { Checkbox } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function CheckboxPage() {
  return (
    <>
      <h1>Checkbox</h1>
      <p className="lede">
        Binary form input with label, indeterminate state, and three sizes.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Checkbox defaultChecked>Accept terms</Checkbox>
            <Checkbox indeterminate>Some selected</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
          </div>
        }
        react={`<Checkbox defaultChecked>Accept terms</Checkbox>
<Checkbox indeterminate>Some selected</Checkbox>
<Checkbox disabled>Disabled</Checkbox>`}
        angular={`<hilal-checkbox [checked]="true">Accept terms</hilal-checkbox>
<hilal-checkbox [indeterminate]="true">Some selected</hilal-checkbox>
<hilal-checkbox [disabled]="true">Disabled</hilal-checkbox>`}
        blade={`<x-hilal-checkbox :checked="true">Accept terms</x-hilal-checkbox>
<x-hilal-checkbox :indeterminate="true">Some selected</x-hilal-checkbox>
<x-hilal-checkbox :disabled="true">Disabled</x-hilal-checkbox>`}
      />
    </>
  );
}
