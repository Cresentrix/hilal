import { forwardRef, useState, useMemo, useCallback, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn.js';

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect'> {
  /** Selected date (ISO yyyy-mm-dd or Date). Controlled. */
  value?: string | Date | null;
  /** Initial month to display when uncontrolled. */
  defaultMonth?: Date;
  onSelect?: (iso: string, date: Date) => void;
  /** First day of week. 0 = Sunday, 1 = Monday (default), 6 = Saturday. */
  weekStartsOn?: Weekday;
  /** Disable specific dates. */
  isDisabled?: (date: Date) => boolean;
  /** Locale for month / weekday names. Defaults to navigator language. */
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
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

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    value, defaultMonth, onSelect, weekStartsOn = 1, isDisabled,
    locale, minDate, maxDate, className, ...rest
  },
  ref,
) {
  const selected = toDate(value);
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    startOfMonth(selected ?? defaultMonth ?? new Date()),
  );
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
    // pick a known Sunday (1970-01-04) to compute weekday names
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

  return (
    <div ref={ref} className={cn('hilal-calendar', className)} {...rest}>
      <header className="hilal-calendar__header">
        <button type="button" className="hilal-calendar__nav" data-prev aria-label="Previous month" onClick={goPrev}>‹</button>
        <span className="hilal-calendar__title" aria-live="polite">{monthFormatter.format(viewMonth)}</span>
        <button type="button" className="hilal-calendar__nav" data-next aria-label="Next month" onClick={goNext}>›</button>
      </header>
      <div className="hilal-calendar__weekdays" aria-hidden>
        {weekdayLabels.map((l) => <span key={l}>{l}</span>)}
      </div>
      <div className="hilal-calendar__grid" role="grid">
        {days.map((d) => {
          const outside = d.getMonth() !== viewMonth.getMonth();
          const isToday = isSameDay(d, today);
          const isSelected = selected ? isSameDay(d, selected) : false;
          const disabled = dayDisabled(d);
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
              )}
              aria-selected={isSelected}
              disabled={disabled}
              onClick={() => onSelect?.(toIso(d), d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
});
