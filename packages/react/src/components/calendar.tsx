import { forwardRef, useState, useMemo, useCallback, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn.js';

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CalendarMode = 'single' | 'range';

export interface DateRange {
  start: string | null;
  end: string | null;
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

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function clamp(d: Date, min?: Date, max?: Date): Date {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    mode = 'single', value, rangeValue, defaultMonth, onSelect, onRangeSelect,
    weekStartsOn = 1, isDisabled, locale, minDate, maxDate, hideYearPicker = false,
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
  const today = new Date();

  const resolvedLocale = useMemo(
    () => locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US'),
    [locale],
  );

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

  const goPrev = useCallback(
    () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)),
    [],
  );
  const goNext = useCallback(
    () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)),
    [],
  );

  const dayDisabled = (d: Date): boolean => {
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return isDisabled ? isDisabled(d) : false;
  };

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

  const isInRange = (d: Date): boolean => {
    if (mode !== 'range' || !rStart || !rEnd) return false;
    return d > rStart && d < rEnd;
  };
  const isRangeStart = (d: Date): boolean => mode === 'range' && !!rStart && isSameDay(d, rStart);
  const isRangeEnd   = (d: Date): boolean => mode === 'range' && !!rEnd   && isSameDay(d, rEnd);

  const yearsToShow = useMemo(() => {
    const center = viewMonth.getFullYear();
    const start = center - 6;
    return Array.from({ length: 12 }, (_, i) => start + i);
  }, [viewMonth]);

  const pickYear = (y: number): void => {
    const next = clamp(new Date(y, viewMonth.getMonth(), 1), minDate, maxDate);
    setViewMonth(startOfMonth(next));
    setShowYears(false);
  };

  return (
    <div ref={ref} className={cn('hilal-calendar', className)} {...rest}>
      <header className="hilal-calendar__header">
        <button type="button" className="hilal-calendar__nav" data-prev aria-label="Previous month" onClick={goPrev}>‹</button>
        {hideYearPicker ? (
          <span className="hilal-calendar__title" aria-live="polite">{monthFormatter.format(viewMonth)}</span>
        ) : (
          <button
            type="button"
            className="hilal-calendar__title-btn"
            aria-expanded={showYears}
            onClick={() => setShowYears((v) => !v)}
          >
            {monthFormatter.format(viewMonth)}
          </button>
        )}
        <button type="button" className="hilal-calendar__nav" data-next aria-label="Next month" onClick={goNext}>›</button>
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
                  onClick={() => handleClick(d)}
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
});
