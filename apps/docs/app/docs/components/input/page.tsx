import type { Metadata } from 'next';
import { Input } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Input' };

export default function InputPage() {
  return (
    <>
      <h1>Input</h1>
      <p className="lede">
        Text input with label, hint, and error states. Handles all standard input types.
      </p>

      <h2>Basic</h2>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Input label="Email" placeholder="you@example.com" hint="We'll never share it." />
          </div>
        }
        react={`<Input
  label="Email"
  placeholder="you@example.com"
  hint="We'll never share it."
/>`}
        angular={`<hilal-input
  label="Email"
  placeholder="you@example.com"
  hint="We'll never share it."
></hilal-input>`}
        blade={`<x-hilal-input
  label="Email"
  placeholder="you@example.com"
  hint="We'll never share it."
/>`}
      />

      <h2>Error state</h2>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem' }}>
            <Input label="Email" defaultValue="not-an-email" error="Please enter a valid email." />
          </div>
        }
        react={`<Input label="Email" value="not-an-email" error="Please enter a valid email." />`}
        angular={`<hilal-input label="Email" value="not-an-email" error="Please enter a valid email."></hilal-input>`}
        blade={`<x-hilal-input label="Email" value="not-an-email" error="Please enter a valid email." />`}
      />
    </>
  );
}
