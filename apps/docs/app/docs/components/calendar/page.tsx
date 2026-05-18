'use client';

import { useState } from 'react';
import { Calendar, type DateRange } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export default function CalendarPage() {
  const [single, setSingle] = useState<string | undefined>(undefined);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [rangeWithPresets, setRangeWithPresets] = useState<DateRange>({ start: null, end: null });

  return (
    <>
      <h1>Calendar</h1>
      <p className="lede">
        Inline date picker with single &amp; range modes, multi-month layouts, presets, year
        picker, and configurable locale / first day of week.
      </p>

      <h2>Single date</h2>
      <FrameworkTabs
        preview={<Calendar mode="single" value={single} onSelect={(iso) => setSingle(iso)} />}
        react={`const [date, setDate] = useState<string | undefined>();

<Calendar mode="single" value={date} onSelect={setDate} />`}
        angular={`<hilal-calendar mode="single" [value]="date" (selected)="date = $event"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="single" :value="$date" />`}
      />

      <h2>Date range</h2>
      <FrameworkTabs
        preview={
          <Calendar
            mode="range"
            rangeValue={range}
            onRangeSelect={(r) => setRange(r)}
          />
        }
        react={`<Calendar
  mode="range"
  rangeValue={range}
  onRangeSelect={setRange}
/>`}
        angular={`<hilal-calendar mode="range" [rangeValue]="range" (rangeSelected)="range = $event"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="range" :range-value="$range" />`}
      />

      <h2>Multi-month</h2>
      <p>Show two or three months side-by-side. Great for booking-style range selection.</p>
      <FrameworkTabs
        preview={
          <Calendar
            mode="range"
            rangeValue={range}
            onRangeSelect={(r) => setRange(r)}
            numberOfMonths={2}
          />
        }
        react={`<Calendar mode="range" numberOfMonths={2} {…} />`}
        angular={`<hilal-calendar mode="range" [numberOfMonths]="2"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="range" :number-of-months="2" />`}
      />

      <h2>Presets</h2>
      <p>Pass <code>presets=&quot;default&quot;</code> for built-ins (Today / Yesterday / Last 7 days / etc.), or your own array.</p>
      <FrameworkTabs
        preview={
          <Calendar
            mode="range"
            rangeValue={rangeWithPresets}
            onRangeSelect={(r) => setRangeWithPresets(r)}
            presets="default"
            numberOfMonths={2}
          />
        }
        react={`<Calendar
  mode="range"
  presets="default"
  numberOfMonths={2}
  rangeValue={range}
  onRangeSelect={setRange}
/>

// Custom presets:
const presets = [
  { id: 'q1', label: 'Q1', getValue: () => ({ start: '2026-01-01', end: '2026-03-31' }) },
  { id: 'q2', label: 'Q2', getValue: () => ({ start: '2026-04-01', end: '2026-06-30' }) },
];
<Calendar mode="range" presets={presets} … />`}
        angular={`<hilal-calendar mode="range" presets="default" [numberOfMonths]="2"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="range" presets="default" :number-of-months="2" />`}
      />

      <h2>Min / max constraints</h2>
      <FrameworkTabs
        preview={
          <Calendar
            mode="single"
            minDate={new Date(2026, 0, 1)}
            maxDate={new Date(2026, 11, 31)}
            defaultMonth={new Date(2026, 5, 1)}
          />
        }
        react={`<Calendar
  mode="single"
  minDate={new Date(2026, 0, 1)}
  maxDate={new Date(2026, 11, 31)}
  defaultMonth={new Date(2026, 5, 1)}
/>`}
        angular={`<hilal-calendar mode="single" [minDate]="min" [maxDate]="max"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="single" min="2026-01-01" max="2026-12-31" />`}
      />

      <h2>Disabled days</h2>
      <p>Pass <code>isDisabled</code> for fine-grained per-day disabling — e.g. weekends, holidays.</p>
      <FrameworkTabs
        preview={
          <Calendar
            mode="single"
            isDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
          />
        }
        react={`<Calendar
  mode="single"
  isDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
/>`}
        angular={`<hilal-calendar mode="single" [isDisabled]="weekendsDisabled"></hilal-calendar>`}
        blade={`{{-- Use a JS-side filter: weekend blocking has no PHP equivalent --}}`}
      />

      <h2>Week start &amp; locale</h2>
      <FrameworkTabs
        preview={
          <Calendar
            mode="single"
            weekStartsOn={6}
            locale="ar"
          />
        }
        react={`<Calendar mode="single" weekStartsOn={6} locale="ar" />`}
        angular={`<hilal-calendar mode="single" [weekStartsOn]="6" locale="ar"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="single" :week-starts-on="6" locale="ar" />`}
      />

      <h2>Hide the year picker</h2>
      <FrameworkTabs
        preview={<Calendar mode="single" hideYearPicker />}
        react={`<Calendar mode="single" hideYearPicker />`}
        angular={`<hilal-calendar mode="single" [hideYearPicker]="true"></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="single" :hide-year-picker="true" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`mode             'single' | 'range'        default: 'single'
value            string | Date             single-mode selection
rangeValue       { start, end }            range-mode selection
defaultMonth     Date                      initial month (uncontrolled)
onSelect         (iso, date) => void       single-mode change
onRangeSelect    (range) => void           range-mode change
weekStartsOn     0..6                      0 = Sun, 1 = Mon (default), 6 = Sat
isDisabled       (date) => boolean         per-day disable
locale           string                    BCP-47 (e.g. 'ar', 'en-GB')
minDate          Date
maxDate          Date
hideYearPicker   boolean                   default: false
numberOfMonths   number                    default: 1
presets          'default' | CalendarPreset[]`}</code></pre>
      <Accessibility
        summary={<>Uses <code>{"role=\"grid\""}</code> with <code>{"role=\"gridcell\""}</code> for each day. Disabled days set <code>{"aria-disabled"}</code>; the selected day sets <code>{"aria-selected"}</code>.</>}
        keys={[
                {
                        "keys": "← / →",
                        "action": "Previous / next day"
                },
                {
                        "keys": "↑ / ↓",
                        "action": "Previous / next week"
                },
                {
                        "keys": "PgUp / PgDn",
                        "action": "Previous / next month"
                },
                {
                        "keys": "Home / End",
                        "action": "Start / end of current row"
                },
                {
                        "keys": "Enter",
                        "action": "Select the focused day"
                }
        ]}
      />
    </>
  );
}
