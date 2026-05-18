'use client';

import { useState } from 'react';
import { Checkbox } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export default function CheckboxPage() {
  const [agree, setAgree] = useState(false);
  return (
    <>
      <h1>Checkbox</h1>
      <p className="lede">
        Binary form input with label, indeterminate state, two sizes, and full native form
        semantics (works with submit, FormData, and form validation).
      </p>

      <h2>States</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Checkbox>Unchecked</Checkbox>
            <Checkbox defaultChecked>Checked</Checkbox>
            <Checkbox indeterminate>Indeterminate</Checkbox>
            <Checkbox disabled>Disabled, unchecked</Checkbox>
            <Checkbox disabled defaultChecked>Disabled, checked</Checkbox>
          </div>
        }
        react={`<Checkbox>Unchecked</Checkbox>
<Checkbox defaultChecked>Checked</Checkbox>
<Checkbox indeterminate>Indeterminate</Checkbox>
<Checkbox disabled>Disabled</Checkbox>
<Checkbox disabled defaultChecked>Disabled, checked</Checkbox>`}
        angular={`<hilal-checkbox>Unchecked</hilal-checkbox>
<hilal-checkbox [checked]="true">Checked</hilal-checkbox>
<hilal-checkbox [indeterminate]="true">Indeterminate</hilal-checkbox>
<hilal-checkbox [disabled]="true">Disabled</hilal-checkbox>`}
        blade={`<x-hilal-checkbox>Unchecked</x-hilal-checkbox>
<x-hilal-checkbox :checked="true">Checked</x-hilal-checkbox>
<x-hilal-checkbox :indeterminate="true">Indeterminate</x-hilal-checkbox>
<x-hilal-checkbox :disabled="true">Disabled</x-hilal-checkbox>`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Checkbox size="sm" defaultChecked>Small</Checkbox>
            <Checkbox size="md" defaultChecked>Medium</Checkbox>
          </div>
        }
        react={`<Checkbox size="sm" defaultChecked>Small</Checkbox>
<Checkbox size="md" defaultChecked>Medium</Checkbox>`}
        angular={`<hilal-checkbox size="sm" [checked]="true">Small</hilal-checkbox>
<hilal-checkbox size="md" [checked]="true">Medium</hilal-checkbox>`}
        blade={`<x-hilal-checkbox size="sm" :checked="true">Small</x-hilal-checkbox>
<x-hilal-checkbox size="md" :checked="true">Medium</x-hilal-checkbox>`}
      />

      <h2>Controlled</h2>
      <FrameworkTabs
        preview={
          <Checkbox checked={agree} onChange={(e) => setAgree(e.currentTarget.checked)}>
            I agree to the terms ({agree ? 'yes' : 'no'})
          </Checkbox>
        }
        react={`const [agree, setAgree] = useState(false);

<Checkbox checked={agree} onChange={(e) => setAgree(e.currentTarget.checked)}>
  I agree to the terms
</Checkbox>`}
        angular={`<hilal-checkbox [checked]="agree" (change)="agree = $event.currentTarget.checked">I agree</hilal-checkbox>`}
        blade={`<x-hilal-checkbox name="agree" :checked="old('agree')">I agree</x-hilal-checkbox>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`size            'sm' | 'md'   default: 'md'
indeterminate   boolean       independent of checked
children        ReactNode     label text rendered alongside
…               all native <input type="checkbox"> attributes`}</code></pre>
      <Accessibility
        summary={<>Native <code>{"<input type=\"checkbox\">"}</code> wrapped with a label. <code>{"indeterminate"}</code> is mapped to the DOM property (not an attribute, per spec).</>}
        keys={[
                {
                        "keys": "Space",
                        "action": "Toggle the checkbox"
                }
        ]}
      />
    </>
  );
}
