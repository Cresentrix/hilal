import { forwardRef, useState, useMemo, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn.js';

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CalendarMode = 'single' | 'range';

export interface DateRange {
  start: string | null;
  end: string | null;
}

export interface CalendarPreset {
  id: string;
  label: ReactNode;
  /** When mode='single', return a Date. When mode='range', return a DateRange. */
  getValue: () => Date | DateRange;
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  /** Selection mode. Default 'single'. */
  mode?: CalendarMode;
  /** When mode='single': ISO yyyy-mm-dd or Date. */
  value?: string | Date | null;
  /** When mode='range': { start, end } as ISO strings. */
  rangeValue?: DateRange;
  /** Initial month to display when uncontrolled. */
  defaultMonth?: Date;
  onSelect?: (iso: string, date: Date) => void;
  onRangeSelect?: (range: DateRange) => void;
  /** First day of week. 0 = Sunday, 1 = Monday (default), 6 = Saturday. */
  weekStartsOn?: Weekday;
  isDisabled?: (date: Date) => boolean;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  /** Hide the year picker button. Default false. */
  hideYearPicker?: boolean;
  /** Number of months to display side-by-side. Default 1. */
  numberOfMonths?: number;
  /**
   * Quick-select presets shown as a column to the start of the calendar(s).
   * Pass `'default'` for built-ins, an array of CalendarPreset, or omit to hide.
   */
  presets?: 'default' | CalendarPreset[];
}

function toDate(v: string | Date | null | undefined): Date | null {
  if (!v) return null;
  if (v instanceof Date) return v;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function toIso(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function clamp(d: Date, min?: Date, max?: Date): Date {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
}

function defaultPresets(mode: CalendarMode): CalendarPreset[] {
  const today = () => new Date();
  if (mode === 'single') {
    return [
      { id: 'today',     label: 'Today',     getValue: () => today() },
      { id: 'yesterday', label: 'Yesterday', getValue: () => addDays(today(), -1) },
    ];
  }
  return [
    { id: 'today',       label: 'Today',         getValue: () => ({ start: toIso(today()),                end: toIso(today()) }) },
    { id: 'yesterday',   label: 'Yesterday',     getValue: () => ({ start: toIso(addDays(today(), -1)),   end: toIso(addDays(today(), -1)) }) },
    { id: 'last-7-days', label: 'Last 7 days',   getValue: () => ({ start: toIso(addDays(today(), -6)),   end: toIso(today()) }) },
    { id: 'last-30',     label: 'Last 30 days',  getValue: () => ({ start: toIso(addDays(today(), -29)),  end: toIso(today()) }) },
    { id: 'this-month',  label: 'This month',    getValue: () => ({ start: toIso(startOfMonth(today())),  end: toIso(today()) }) },
    { id: 'last-month',  label: 'Last month',    getValue: () => {
      const t = today();
      const last = new Date(t.getFullYear(), t.getMonth() - 1, 1);
      return { start: toIso(startOfMonth(last)), end: toIso(endOfMonth(last)) };
    }},
    { id: 'this-year',   label: 'This year',     getValue: () => ({ start: toIso(new Date(today().getFullYear(), 0, 1)), end: toIso(today()) }) },
  ];
}

// ---------- internal: a single month's grid + header ----------
interface MonthPanelProps {
  viewMonth: Date;
  setViewMonth: (d: Date) => void;
  weekStartsOn: Weekday;
  resolvedLocale: string;
  hideYearPicker: boolean;
  showYears: boolean;
  setShowYears: (v: boolean) => void;
  selected: Date | null;
  rStart: Date | null;
  rEnd: Date | null;
  mode: CalendarMode;
  onClick: (d: Date) => void;
  dayDisabled: (d: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  /** When false, hide month-nav arrows (used for the right-side panel in multi-month). */
  showNav?: { prev: boolean; next: boolean };
}

function MonthPanel({
  viewMonth, setViewMonth, weekStartsOn, resolvedLocale, hideYearPicker, showYears, setShowYears,
  selected, rStart, rEnd, mode, onClick, dayDisabled, minDate, maxDate, showNav = { prev: true, next: true },
}: MonthPanelProps) {
  const today = new Date();

  const monthFormatter = useMemo(
    () => new Intl.DateTimeFormat(resolvedLocale, { month: 'long', year: 'numeric' }),
    [resolvedLocale],
  );

  const weekdayLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(resolvedLocale, { weekday: 'short' });
    const labels: string[] = [];
    const baseSunday = new Date(Date.UTC(1970, 0, 4));
    for (let i = 0; i < 7; i++) {
      const day = (weekStartsOn + i) % 7;
      const d = new Date(baseSunday);
      d.setUTCDate(baseSunday.getUTCDate() + day);
      labels.push(fmt.format(d));
    }
    return labels;
  }, [resolvedLocale, weekStartsOn]);

  const days = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const firstWeekday = (first.getDay() - weekStartsOn + 7) % 7;
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - firstWeekday);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      cells.push(d);
    }
    return cells;
  }, [viewMonth, weekStartsOn]);

  const yearsToShow = useMemo(() => {
    const center = viewMonth.getFullYear();
    return Array.from({ length: 12 }, (_, i) => center - 6 + i);
  }, [viewMonth]);

  const pickYear = (y: number) => {
    setViewMonth(startOfMonth(clamp(new Date(y, viewMonth.getMonth(), 1), minDate, maxDate)));
    setShowYears(false);
  };

  const isInRange = (d: Date): boolean => {
    if (mode !== 'range' || !rStart || !rEnd) return false;
    return d > rStart && d < rEnd;
  };
  const isRangeStart = (d: Date): boolean => mode === 'range' && !!rStart && isSameDay(d, rStart);
  const isRangeEnd   = (d: Date): boolean => mode === 'range' && !!rEnd   && isSameDay(d, rEnd);

  return (
    <div className="hilal-calendar">
      <header className="hilal-calendar__header">
        <button
          type="button"
          className="hilal-calendar__nav"
          data-prev
          aria-label="Previous month"
          style={showNav.prev ? undefined : { visibility: 'hidden' }}
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
        >‹</button>
        {hideYearPicker ? (
          <span className="hilal-calendar__title" aria-live="polite">{monthFormatter.format(viewMonth)}</span>
        ) : (
          <button
            type="button"
            className="hilal-calendar__title-btn"
            aria-expanded={showYears}
            onClick={() => setShowYears(!showYears)}
          >
            {monthFormatter.format(viewMonth)}
          </button>
        )}
        <button
          type="button"
          className="hilal-calendar__nav"
          data-next
          aria-label="Next month"
          style={showNav.next ? undefined : { visibility: 'hidden' }}
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
        >›</button>
      </header>

      {showYears ? (
        <div className="hilal-calendar__years" role="grid" aria-label="Year">
          {yearsToShow.map((y) => (
            <button
              key={y}
              type="button"
              className="hilal-calendar__year"
              role="gridcell"
              aria-selected={y === viewMonth.getFullYear()}
              onClick={() => pickYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="hilal-calendar__weekdays" aria-hidden>
            {weekdayLabels.map((l) => <span key={l}>{l}</span>)}
          </div>
          <div className="hilal-calendar__grid" role="grid">
            {days.map((d) => {
              const outside    = d.getMonth() !== viewMonth.getMonth();
              const isToday    = isSameDay(d, today);
              const isSelected = selected ? isSameDay(d, selected) : false;
              const inRange    = isInRange(d);
              const isStart    = isRangeStart(d);
              const isEnd      = isRangeEnd(d);
              const disabled   = dayDisabled(d);
              return (
                <button
                  key={toIso(d)}
                  type="button"
                  role="gridcell"
                  className={cn(
                    'hilal-calendar__day',
                    outside    && 'hilal-calendar__day--outside',
                    isToday    && 'hilal-calendar__day--today',
                    isSelected && 'hilal-calendar__day--selected',
                    inRange    && 'hilal-calendar__day--in-range',
                    isStart    && 'hilal-calendar__day--range-start',
                    isEnd      && 'hilal-calendar__day--range-end',
                  )}
                  aria-selected={isSelected || isStart || isEnd}
                  disabled={disabled}
                  onClick={() => onClick(d)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ---------- public Calendar ----------
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    mode = 'single', value, rangeValue, defaultMonth, onSelect, onRangeSelect,
    weekStartsOn = 1, isDisabled, locale, minDate, maxDate, hideYearPicker = false,
    numberOfMonths = 1, presets,
    className, ...rest
  },
  ref,
) {
  const selected = mode === 'single' ? toDate(value) : null;
  const rStart   = mode === 'range'  ? toDate(rangeValue?.start) : null;
  const rEnd     = mode === 'range'  ? toDate(rangeValue?.end)   : null;

  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(selected ?? rStart ?? defaultMonth ?? new Date()),
  );
  const [showYears, setShowYears] = useState(false);

  const resolvedLocale = useMemo(
    () => locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US'),
    [locale],
  );

  const dayDisabled = useCallback((d: Date): boolean => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return isDisabled ? isDisabled(d) : false;
  }, [minDate, maxDate, isDisabled]);

  const handleClick = (d: Date): void => {
    if (mode === 'single') {
      onSelect?.(toIso(d), d);
      return;
    }
    const cur: DateRange = rangeValue ?? { start: null, end: null };
    const startD = toDate(cur.start);
    const endD   = toDate(cur.end);
    let next: DateRange;
    if (!startD || (startD && endD)) {
      next = { start: toIso(d), end: null };
    } else if (d < startD) {
      next = { start: toIso(d), end: cur.start };
    } else {
      next = { start: cur.start, end: toIso(d) };
    }
    onRangeSelect?.(next);
  };

  const resolvedPresets = useMemo<CalendarPreset[] | null>(() => {
    if (!presets) return null;
    return presets === 'default' ? defaultPresets(mode) : presets;
  }, [presets, mode]);

  const applyPreset = (p: CalendarPreset) => {
    const v = p.getValue();
    if (v instanceof Date) {
      onSelect?.(toIso(v), v);
      setViewMonth(startOfMonth(v));
    } else {
      onRangeSelect?.(v);
      const s = toDate(v.start);
      if (s) setViewMonth(startOfMonth(s));
    }
  };

  const isPresetActive = (p: CalendarPreset): boolean => {
    const v = p.getValue();
    if (mode === 'single' && v instanceof Date) {
      return selected ? isSameDay(v, selected) : false;
    }
    if (mode === 'range' && !(v instanceof Date)) {
      return v.start === rangeValue?.start && v.end === rangeValue?.end;
    }
    return false;
  };

  // single panel, no presets — render just the month (preserves original DOM contract)
  if (numberOfMonths === 1 && !resolvedPresets) {
    return (
      <div ref={ref} className={cn(className)} {...rest}>
        <MonthPanel
          viewMonth={viewMonth} setViewMonth={setViewMonth}
          weekStartsOn={weekStartsOn} resolvedLocale={resolvedLocale}
          hideYearPicker={hideYearPicker} showYears={showYears} setShowYears={setShowYears}
          selected={selected} rStart={rStart} rEnd={rEnd} mode={mode}
          onClick={handleClick} dayDisabled={dayDisabled}
          minDate={minDate} maxDate={maxDate}
        />
      </div>
    );
  }

  // multi-panel and/or with presets — wrap them
  const months = Array.from({ length: numberOfMonths }, (_, i) => addMonths(viewMonth, i));
  const lastIndex = months.length - 1;

  return (
    <div ref={ref} className={cn('hilal-calendar-wrap', className)} {...rest}>
      {resolvedPresets ? (
        <div className="hilal-calendar-presets" role="group" aria-label="Quick ranges">
          {resolvedPresets.map((p) => (
            <button
              key={p.id}
              type="button"
              className="hilal-calendar-preset"
              aria-pressed={isPresetActive(p)}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}
      <div className="hilal-calendar-wrap__months">
        {months.map((m, i) => (
          <MonthPanel
            key={i}
            viewMonth={m}
            setViewMonth={(d) => setViewMonth(addMonths(d, -i))}
            weekStartsOn={weekStartsOn}
            resolvedLocale={resolvedLocale}
            hideYearPicker={hideYearPicker || i !== 0}
            showYears={i === 0 && showYears}
            setShowYears={setShowYears}
            selected={selected} rStart={rStart} rEnd={rEnd} mode={mode}
            onClick={handleClick} dayDisabled={dayDisabled}
            minDate={minDate} maxDate={maxDate}
            showNav={{ prev: i === 0, next: i === lastIndex }}
          />
        ))}
      </div>
    </div>
  );
});
