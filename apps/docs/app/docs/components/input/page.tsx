import type { Metadata } from 'next';
import { Input } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Input' };

export default function InputPage() {
  return (
    <>
      <h1>Input</h1>
      <p className="lede">
        Single-line text input with label, hint, error, success, and icon slots. Sizes match the
        rest of the field family (Select, Datepicker, Combobox).
      </p>

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '20rem' }}>
            <Input size="sm" label="Small"  placeholder="sm field" />
            <Input size="md" label="Medium" placeholder="md field" />
            <Input size="lg" label="Large"  placeholder="lg field" />
          </div>
        }
        react={`<Input size="sm" label="Small"  placeholder="sm field" />
<Input size="md" label="Medium" placeholder="md field" />
<Input size="lg" label="Large"  placeholder="lg field" />`}
        angular={`<hilal-input size="sm" label="Small"></hilal-input>
<hilal-input size="md" label="Medium"></hilal-input>
<hilal-input size="lg" label="Large"></hilal-input>`}
        blade={`<x-hilal-input size="sm" label="Small" />
<x-hilal-input size="md" label="Medium" />
<x-hilal-input size="lg" label="Large" />`}
      />

      <h2>Label, hint, error, success</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '24rem' }}>
            <Input label="Email"    placeholder="you@example.com" hint="We'll never share it." />
            <Input label="Username" defaultValue="sara_42" success="Available." />
            <Input label="Password" type="password" defaultValue="123" error="Must be at least 8 characters." />
          </div>
        }
        react={`<Input label="Email"    placeholder="you@example.com" hint="We'll never share it." />
<Input label="Username" defaultValue="sara_42" success="Available." />
<Input label="Password" type="password" error="Must be at least 8 characters." />`}
        angular={`<hilal-input label="Email"    hint="We'll never share it."></hilal-input>
<hilal-input label="Username" success="Available."></hilal-input>
<hilal-input label="Password" type="password" error="Must be at least 8 characters."></hilal-input>`}
        blade={`<x-hilal-input label="Email" hint="We'll never share it." />
<x-hilal-input label="Username" success="Available." />
<x-hilal-input label="Password" type="password" error="Must be at least 8 characters." />`}
      />

      <h2>Leading &amp; trailing icons</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '24rem' }}>
            <Input
              label="Search"
              placeholder="Search projects…"
              leadingIcon={<span aria-hidden>⌕</span>}
            />
            <Input
              label="Amount"
              placeholder="0.00"
              leadingIcon={<span aria-hidden>KD</span>}
              trailingIcon={<span aria-hidden>↻</span>}
            />
          </div>
        }
        react={`<Input
  label="Search"
  placeholder="Search projects…"
  leadingIcon={<SearchIcon />}
/>
<Input
  label="Amount"
  leadingIcon={<span>KD</span>}
  trailingIcon={<RefreshIcon />}
/>`}
        angular={`<hilal-input label="Search" placeholder="Search…">
  <span hilalInputLeading>⌕</span>
</hilal-input>`}
        blade={`<x-hilal-input label="Search" placeholder="Search…">
  <x-slot:leading>⌕</x-slot:leading>
</x-hilal-input>`}
      />

      <h2>Disabled &amp; readonly</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '20rem' }}>
            <Input label="Disabled" defaultValue="Can't touch this" disabled />
            <Input label="Readonly" defaultValue="Read-only value" readOnly />
          </div>
        }
        react={`<Input label="Disabled" defaultValue="Can't touch this" disabled />
<Input label="Readonly" defaultValue="Read-only value" readOnly />`}
        angular={`<hilal-input label="Disabled" [disabled]="true" value="Can't touch this"></hilal-input>
<hilal-input label="Readonly" [readonly]="true" value="Read-only value"></hilal-input>`}
        blade={`<x-hilal-input label="Disabled" :disabled="true" value="Can't touch this" />
<x-hilal-input label="Readonly" :readonly="true" value="Read-only value" />`}
      />

      <h2>Input types</h2>
      <p>Any native <code>type</code> works — <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>url</code>, <code>search</code>.</p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', minWidth: '32rem' }}>
            <Input label="Email"    type="email"    placeholder="you@example.com" />
            <Input label="Phone"    type="tel"      placeholder="+965 …" />
            <Input label="URL"      type="url"      placeholder="https://" />
            <Input label="Number"   type="number"   placeholder="0" />
          </div>
        }
        react={`<Input label="Email"  type="email" />
<Input label="Phone"  type="tel"   />
<Input label="URL"    type="url"   />
<Input label="Number" type="number" />`}
        angular={`<hilal-input label="Email" type="email"></hilal-input>
<hilal-input label="Phone" type="tel"></hilal-input>`}
        blade={`<x-hilal-input label="Email" type="email" />
<x-hilal-input label="Phone" type="tel" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`size           'sm' | 'md' | 'lg'    default: 'md'
label          string                accessible label rendered above
hint           string                helper text (neutral)
error          string                error message (overrides success)
success        string                success message
leadingIcon    ReactNode             inline element rendered before input
trailingIcon   ReactNode             inline element rendered after input
…              all native <input> attributes (type, name, value, etc.)`}</code></pre>
    </>
  );
}
