'use client';

import { useState } from 'react';
import { Combobox, type ComboboxOption } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

const options: ComboboxOption[] = [
  { value: 'react',   label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte',  label: 'Svelte' },
  { value: 'vue',     label: 'Vue' },
  { value: 'solid',   label: 'Solid' },
  { value: 'qwik',    label: 'Qwik' },
];

export default function ComboboxPage() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <>
      <h1>Combobox</h1>
      <p className="lede">
        Filterable select with keyboard navigation. Type to filter, ↑/↓ to navigate, Enter to commit.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Combobox
              label="Framework"
              options={options}
              value={value}
              onChange={setValue}
              placeholder="Pick one…"
            />
          </div>
        }
        react={`const options = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  // …
];

<Combobox
  label="Framework"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="Pick one…"
/>`}
        angular={`options = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
];

<hilal-combobox
  label="Framework"
  [options]="options"
  [value]="value"
  (valueChange)="value = $event"
  placeholder="Pick one…"
></hilal-combobox>`}
        blade={`<x-hilal-combobox
  label="Framework"
  :options="$options"
  placeholder="Pick one…"
/>`}
      />
    </>
  );
}
