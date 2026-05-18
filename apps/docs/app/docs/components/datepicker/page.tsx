import type { Metadata } from 'next';
import { Datepicker } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Datepicker' };

export default function DatepickerPage() {
  return (
    <>
      <h1>Datepicker</h1>
      <p className="lede">
        Native input wrappers for date, datetime-local, time, month, and week — styled to match
        the rest of the form fields. Use Calendar for a popover-style picker.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', minWidth: '32rem' }}>
            <Datepicker label="Date" kind="date" />
            <Datepicker label="Time" kind="time" />
            <Datepicker label="Date &amp; time" kind="datetime-local" />
            <Datepicker label="Month" kind="month" />
          </div>
        }
        react={`<Datepicker label="Date" kind="date" />
<Datepicker label="Time" kind="time" />
<Datepicker label="Date & time" kind="datetime-local" />
<Datepicker label="Month" kind="month" />`}
        angular={`<hilal-datepicker label="Date" kind="date"></hilal-datepicker>
<hilal-datepicker label="Time" kind="time"></hilal-datepicker>`}
        blade={`<x-hilal-datepicker label="Date" kind="date" />
<x-hilal-datepicker label="Time" kind="time" />`}
      />
    </>
  );
}
