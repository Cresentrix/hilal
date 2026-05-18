'use client';

import { useState } from 'react';
import { Combobox, type ComboboxOption } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

const frameworks: ComboboxOption[] = [
  { value: 'react',   label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte',  label: 'Svelte' },
  { value: 'vue',     label: 'Vue' },
  { value: 'solid',   label: 'Solid' },
  { value: 'qwik',    label: 'Qwik' },
  { value: 'astro',   label: 'Astro', disabled: true },
];

export default function ComboboxPage() {
  const [a, setA] = useState<string | undefined>();
  const [b, setB] = useState<string | undefined>();
  const [c, setC] = useState<string | undefined>();
  return (
    <>
      <h1>Combobox</h1>
      <p className="lede">
        Filterable select. Type to filter, ↑/↓ to navigate, Enter to commit, Esc to close.
        Three sizes; supports disabled options, custom filters, and a configurable empty
        message.
      </p>

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '22rem' }}>
            <Combobox size="sm" label="Small"  options={frameworks} value={a} onChange={setA} />
            <Combobox size="md" label="Medium" options={frameworks} value={b} onChange={setB} />
            <Combobox size="lg" label="Large"  options={frameworks} value={c} onChange={setC} />
          </div>
        }
        react={`<Combobox size="sm" label="Small"  options={opts} />
<Combobox size="md" label="Medium" options={opts} />
<Combobox size="lg" label="Large"  options={opts} />`}
        angular={`<hilal-combobox size="sm" label="…" [options]="opts"></hilal-combobox>`}
        blade={`<x-hilal-combobox size="sm" label="…" :options="$opts" />`}
      />

      <h2>Hint, error, disabled</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '22rem' }}>
            <Combobox label="Framework" options={frameworks} hint="Used to label your project." />
            <Combobox label="Framework" options={frameworks} error="Pick at least one option." />
            <Combobox label="Framework" options={frameworks} disabled />
          </div>
        }
        react={`<Combobox label="Framework" hint="Used to label your project." />
<Combobox label="Framework" error="Pick at least one option." />
<Combobox label="Framework" disabled />`}
        angular={`<hilal-combobox label="…" hint="…"></hilal-combobox>`}
        blade={`<x-hilal-combobox label="…" hint="…" />`}
      />

      <h2>Disabled options</h2>
      <p>Mark an option <code>disabled: true</code> — it&rsquo;s rendered but not selectable. <code>Astro</code> below is disabled.</p>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Combobox label="Framework" options={frameworks} />
          </div>
        }
        react={`const options = [
  { value: 'react',   label: 'React' },
  { value: 'astro',   label: 'Astro',   disabled: true },
];

<Combobox label="Framework" options={options} />`}
        angular={`options = [
  { value: 'react',   label: 'React' },
  { value: 'astro',   label: 'Astro',   disabled: true },
];`}
        blade={`$options = [
  ['value' => 'react',   'label' => 'React'],
  ['value' => 'astro',   'label' => 'Astro',   'disabled' => true],
];`}
      />

      <h2>Custom filter</h2>
      <p>Default filter is case-insensitive substring on <code>label</code>. Pass a custom function for fuzzy match or scoped filtering.</p>
      <pre className="preview__code"><code>{`<Combobox
  options={options}
  filter={(opt, query) => opt.value.includes(query.toLowerCase())}
/>`}</code></pre>

      <h2>Empty state</h2>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Combobox
              label="Empty list"
              options={[]}
              emptyMessage="No options yet — add one."
            />
          </div>
        }
        react={`<Combobox
  options={[]}
  emptyMessage="No options yet — add one."
/>`}
        angular={`<hilal-combobox [options]="[]" emptyMessage="No options yet"></hilal-combobox>`}
        blade={`<x-hilal-combobox :options="[]" empty-message="No options yet" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`size           'sm' | 'md' | 'lg'                                 default: 'md'
options        ComboboxOption[]                                   required
value          string                                             controlled selection
onChange       (value) => void
label          string
hint           string
error          string
placeholder    string                                             default: 'Select…'
disabled       boolean
filter         (opt, query) => boolean                            override default substring filter
emptyMessage   string                                             default: 'No results'

ComboboxOption {
  value      string    required
  label      string    required
  disabled?  boolean
}`}</code></pre>
      <Accessibility
        summary={<>Uses <code>{"role=\"combobox\""}</code> on the input with <code>{"aria-expanded"}</code>, <code>{"aria-controls"}</code>, and <code>{"aria-activedescendant"}</code>. Listbox uses <code>{"role=\"listbox\""}</code>; options use <code>{"role=\"option\""}</code> + <code>{"aria-selected"}</code>.</>}
        keys={[
                {
                        "keys": "↑ / ↓",
                        "action": "Move through options"
                },
                {
                        "keys": "Enter",
                        "action": "Commit the focused option"
                },
                {
                        "keys": "Esc",
                        "action": "Close the listbox"
                },
                {
                        "keys": "Home / End",
                        "action": "Jump to first / last option"
                }
        ]}
      />
    </>
  );
}
