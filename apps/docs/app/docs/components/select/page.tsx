import type { Metadata } from 'next';
import { Select } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Select' };

export default function SelectPage() {
  return (
    <>
      <h1>Select</h1>
      <p className="lede">
        Native <code>&lt;select&gt;</code> with field-style label, hint, and error. Use Combobox if you
        need filtering or rich item rendering.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Select label="Country" defaultValue="kw" hint="Used for billing region.">
              <option value="kw">Kuwait</option>
              <option value="ae">United Arab Emirates</option>
              <option value="sa">Saudi Arabia</option>
              <option value="qa">Qatar</option>
              <option value="bh">Bahrain</option>
            </Select>
          </div>
        }
        react={`<Select label="Country" defaultValue="kw">
  <option value="kw">Kuwait</option>
  <option value="ae">United Arab Emirates</option>
  <option value="sa">Saudi Arabia</option>
</Select>`}
        angular={`<hilal-select label="Country" value="kw">
  <option value="kw">Kuwait</option>
  <option value="ae">United Arab Emirates</option>
</hilal-select>`}
        blade={`<x-hilal-select label="Country" value="kw">
  <option value="kw">Kuwait</option>
  <option value="ae">United Arab Emirates</option>
</x-hilal-select>`}
      />
    </>
  );
}
