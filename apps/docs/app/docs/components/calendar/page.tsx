'use client';

import { useState } from 'react';
import { Calendar, type DateRange } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function CalendarPage() {
  const [single, setSingle] = useState<string | undefined>(undefined);
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  return (
    <>
      <h1>Calendar</h1>
      <p className="lede">
        Date picker UI with single, range, and multi-month modes. Supports presets, year picker,
        and configurable week start.
      </p>

      <h2>Single date</h2>
      <FrameworkTabs
        preview={<Calendar mode="single" value={single} onSelect={(iso) => setSingle(iso)} />}
        react={`const [date, setDate] = useState<string | undefined>();

<Calendar mode="single" value={date} onSelect={setDate} />`}
        angular={`<hilal-calendar
  mode="single"
  [value]="date"
  (selected)="date = $event"
></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="single" :value="$date" />`}
      />

      <h2>Date range</h2>
      <FrameworkTabs
        preview={
          <Calendar
            mode="range"
            rangeValue={range}
            onRangeSelect={(r) => setRange(r)}
            numberOfMonths={2}
          />
        }
        react={`<Calendar
  mode="range"
  rangeValue={range}
  onRangeSelect={setRange}
  numberOfMonths={2}
/>`}
        angular={`<hilal-calendar
  mode="range"
  [rangeValue]="range"
  (rangeSelected)="range = $event"
  [numberOfMonths]="2"
></hilal-calendar>`}
        blade={`<x-hilal-calendar mode="range" :range-value="$range" :number-of-months="2" />`}
      />
    </>
  );
}
