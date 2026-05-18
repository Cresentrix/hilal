import type { Metadata } from 'next';
import { Datepicker } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Datepicker' };

export default function DatepickerPage() {
  return (
    <>
      <h1>Datepicker</h1>
      <p className="lede">
        Native input wrappers styled to match every other form field. Five kinds:{' '}
        <code>date</code>, <code>datetime-local</code>, <code>time</code>, <code>month</code>,{' '}
        <code>week</code>. Use Calendar for an inline popover-style picker.
      </p>

      <h2>Kinds</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', minWidth: '32rem' }}>
            <Datepicker label="Date"          kind="date"           />
            <Datepicker label="Time"          kind="time"           />
            <Datepicker label="Date &amp; time"   kind="datetime-local" />
            <Datepicker label="Month"         kind="month"          />
            <Datepicker label="Week"          kind="week"           />
          </div>
        }
        react={`<Datepicker label="Date"          kind="date"           />
<Datepicker label="Time"          kind="time"           />
<Datepicker label="Date & time"   kind="datetime-local" />
<Datepicker label="Month"         kind="month"          />
<Datepicker label="Week"          kind="week"           />`}
        angular={`<hilal-datepicker label="Date" kind="date"></hilal-datepicker>
<hilal-datepicker label="Time" kind="time"></hilal-datepicker>`}
        blade={`<x-hilal-datepicker label="Date" kind="date" />
<x-hilal-datepicker label="Time" kind="time" />`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '20rem' }}>
            <Datepicker size="sm" label="Small"  kind="date" />
            <Datepicker size="md" label="Medium" kind="date" />
            <Datepicker size="lg" label="Large"  kind="date" />
          </div>
        }
        react={`<Datepicker size="sm" label="Small" />
<Datepicker size="md" label="Medium" />
<Datepicker size="lg" label="Large" />`}
        angular={`<hilal-datepicker size="sm" label="Small"></hilal-datepicker>`}
        blade={`<x-hilal-datepicker size="sm" label="Small" />`}
      />

      <h2>Validation states</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '22rem' }}>
            <Datepicker label="Start date" kind="date" hint="Must be in the future." />
            <Datepicker label="Start date" kind="date" defaultValue="2024-01-01" error="Date is in the past." />
          </div>
        }
        react={`<Datepicker label="Start date" hint="Must be in the future." />
<Datepicker label="Start date" defaultValue="2024-01-01" error="Date is in the past." />`}
        angular={`<hilal-datepicker label="Start date" hint="…"></hilal-datepicker>
<hilal-datepicker label="Start date" error="…"></hilal-datepicker>`}
        blade={`<x-hilal-datepicker label="Start date" hint="…" />
<x-hilal-datepicker label="Start date" error="…" />`}
      />

      <h2>Min/max constraints</h2>
      <p>Pass native <code>min</code> and <code>max</code> attributes — the browser handles validation.</p>
      <FrameworkTabs
        preview={
          <div style={{ minWidth: '22rem' }}>
            <Datepicker
              label="Pick a date in 2026"
              kind="date"
              min="2026-01-01"
              max="2026-12-31"
              defaultValue="2026-06-15"
            />
          </div>
        }
        react={`<Datepicker
  label="Pick a date in 2026"
  min="2026-01-01"
  max="2026-12-31"
/>`}
        angular={`<hilal-datepicker label="…" min="2026-01-01" max="2026-12-31"></hilal-datepicker>`}
        blade={`<x-hilal-datepicker label="…" min="2026-01-01" max="2026-12-31" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`kind     'date' | 'datetime-local' | 'time' | 'month' | 'week'   default: 'date'
size     'sm' | 'md' | 'lg'                                      default: 'md'
label    string
hint     string
error    string
…        all native <input> attributes (min, max, step, value, …)`}</code></pre>
    </>
  );
}
