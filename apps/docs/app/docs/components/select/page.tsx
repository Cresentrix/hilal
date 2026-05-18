import type { Metadata } from 'next';
import { Select } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export const metadata: Metadata = { title: 'Select' };

const Countries = () => (
  <>
    <option value="kw">Kuwait</option>
    <option value="ae">United Arab Emirates</option>
    <option value="sa">Saudi Arabia</option>
    <option value="qa">Qatar</option>
    <option value="bh">Bahrain</option>
    <option value="om">Oman</option>
  </>
);

export default function SelectPage() {
  return (
    <>
      <h1>Select</h1>
      <p className="lede">
        Native <code>&lt;select&gt;</code> styled to match the rest of the field family. Use Combobox
        when you need filtering, multi-select, or custom item rendering.
      </p>

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '20rem' }}>
            <Select size="sm" label="Small"  defaultValue="kw"><Countries /></Select>
            <Select size="md" label="Medium" defaultValue="ae"><Countries /></Select>
            <Select size="lg" label="Large"  defaultValue="sa"><Countries /></Select>
          </div>
        }
        react={`<Select size="sm" label="Small">…</Select>
<Select size="md" label="Medium">…</Select>
<Select size="lg" label="Large">…</Select>`}
        angular={`<hilal-select size="sm" label="Small">…</hilal-select>`}
        blade={`<x-hilal-select size="sm" label="Small">…</x-hilal-select>`}
      />

      <h2>Label, hint, error, success</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '22rem' }}>
            <Select label="Country" defaultValue="kw" hint="Used for billing region."><Countries /></Select>
            <Select label="Country" defaultValue="kw" success="Allowed in your plan."><Countries /></Select>
            <Select label="Country" defaultValue="kw" error="This region isn't supported yet."><Countries /></Select>
          </div>
        }
        react={`<Select label="Country" hint="Used for billing region.">…</Select>
<Select label="Country" success="Allowed in your plan.">…</Select>
<Select label="Country" error="This region isn't supported yet.">…</Select>`}
        angular={`<hilal-select label="Country" hint="…">…</hilal-select>`}
        blade={`<x-hilal-select label="Country" hint="…">…</x-hilal-select>`}
      />

      <h2>Disabled</h2>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Select label="Country" defaultValue="kw" disabled><Countries /></Select>
          </div>
        }
        react={`<Select label="Country" disabled defaultValue="kw">…</Select>`}
        angular={`<hilal-select label="Country" [disabled]="true">…</hilal-select>`}
        blade={`<x-hilal-select label="Country" :disabled="true">…</x-hilal-select>`}
      />

      <h2>With option groups</h2>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '22rem' }}>
            <Select label="Region" defaultValue="kw">
              <optgroup label="GCC">
                <option value="kw">Kuwait</option>
                <option value="ae">UAE</option>
                <option value="sa">Saudi Arabia</option>
              </optgroup>
              <optgroup label="Levant">
                <option value="jo">Jordan</option>
                <option value="lb">Lebanon</option>
              </optgroup>
            </Select>
          </div>
        }
        react={`<Select label="Region">
  <optgroup label="GCC">
    <option value="kw">Kuwait</option>
    <option value="ae">UAE</option>
  </optgroup>
  <optgroup label="Levant">
    <option value="jo">Jordan</option>
    <option value="lb">Lebanon</option>
  </optgroup>
</Select>`}
        angular={`<hilal-select label="Region">
  <optgroup label="GCC">…</optgroup>
  <optgroup label="Levant">…</optgroup>
</hilal-select>`}
        blade={`<x-hilal-select label="Region">
  <optgroup label="GCC">…</optgroup>
</x-hilal-select>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`size      'sm' | 'md' | 'lg'   default: 'md'
label     string
hint      string
error     string                overrides success
success   string
…         all native <select> attributes (name, value, defaultValue, …)`}</code></pre>
      <Accessibility
        summary={<>Native <code>{"<select>"}</code>. Inherits the platform-native dropdown, keyboard, and screen-reader behavior.</>}
      />
    </>
  );
}
