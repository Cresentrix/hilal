import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HilalCalendarMode = 'single' | 'range';

export interface HilalDateRange {
  start: string | null;
  end: string | null;
}

function startOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), 1); }
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function parseIso(v: string | null): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

@Component({
  selector: 'hilal-calendar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hilal-calendar">
      <header class="hilal-calendar__header">
        <button type="button" class="hilal-calendar__nav" data-prev aria-label="Previous month" (click)="prev()">‹</button>
        <button *ngIf="!hideYearPicker; else titleSpan"
          type="button" class="hilal-calendar__title-btn"
          [attr.aria-expanded]="showYears()" (click)="showYears.set(!showYears())">
          {{ titleText() }}
        </button>
        <ng-template #titleSpan>
          <span class="hilal-calendar__title" aria-live="polite">{{ titleText() }}</span>
        </ng-template>
        <button type="button" class="hilal-calendar__nav" data-next aria-label="Next month" (click)="next()">›</button>
      </header>

      <div *ngIf="showYears()" class="hilal-calendar__years" role="grid" aria-label="Year">
        <button *ngFor="let y of yearsToShow()"
          type="button" class="hilal-calendar__year" role="gridcell"
          [attr.aria-selected]="y === viewMonth().getFullYear()"
          (click)="pickYear(y)">{{ y }}</button>
      </div>

      <ng-container *ngIf="!showYears()">
        <div class="hilal-calendar__weekdays" aria-hidden="true">
          <span *ngFor="let l of weekdayLabels()">{{ l }}</span>
        </div>
        <div class="hilal-calendar__grid" role="grid">
          <button *ngFor="let d of days()"
            type="button" role="gridcell"
            [class]="dayClass(d)"
            [attr.aria-selected]="ariaSelected(d)"
            [disabled]="isDayDisabled(d)"
            (click)="onClick(d)"
          >{{ d.getDate() }}</button>
        </div>
      </ng-container>
    </div>
  `,
})
export class HilalCalendarComponent {
  @Input() mode: HilalCalendarMode = 'single';
  @Input() set value(v: string | Date | null | undefined) {
    if (!v) { this._selected.set(null); return; }
    const d = v instanceof Date ? v : new Date(v);
    if (!isNaN(d.getTime())) {
      this._selected.set(d);
      this.viewMonth.set(startOfMonth(d));
    }
  }
  @Input() set rangeValue(r: HilalDateRange | null | undefined) {
    this._range.set(r ?? { start: null, end: null });
    const s = parseIso(r?.start ?? null);
    if (s) this.viewMonth.set(startOfMonth(s));
  }
  @Input() weekStartsOn: HilalWeekday = 1;
  @Input() locale?: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() hideYearPicker = false;
  @Input() isDisabled?: (d: Date) => boolean;
  @Output() selected = new EventEmitter<{ iso: string; date: Date }>();
  @Output() rangeSelected = new EventEmitter<HilalDateRange>();

  protected readonly _selected = signal<Date | null>(null);
  protected readonly _range = signal<HilalDateRange>({ start: null, end: null });
  protected readonly viewMonth = signal<Date>(startOfMonth(new Date()));
  protected readonly showYears = signal(false);

  protected readonly resolvedLocale = computed(
    () => this.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US'),
  );

  protected readonly titleText = computed(() =>
    new Intl.DateTimeFormat(this.resolvedLocale(), { month: 'long', year: 'numeric' }).format(this.viewMonth()),
  );

  protected readonly weekdayLabels = computed(() => {
    const fmt = new Intl.DateTimeFormat(this.resolvedLocale(), { weekday: 'short' });
    const baseSunday = new Date(Date.UTC(1970, 0, 4));
    const labels: string[] = [];
    for (let i = 0; i < 7; i++) {
      const day = (this.weekStartsOn + i) % 7;
      const d = new Date(baseSunday);
      d.setUTCDate(baseSunday.getUTCDate() + day);
      labels.push(fmt.format(d));
    }
    return labels;
  });

  protected readonly days = computed(() => {
    const first = startOfMonth(this.viewMonth());
    const firstWeekday = (first.getDay() - this.weekStartsOn + 7) % 7;
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - firstWeekday);
    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      cells.push(d);
    }
    return cells;
  });

  protected readonly yearsToShow = computed(() => {
    const center = this.viewMonth().getFullYear();
    return Array.from({ length: 12 }, (_, i) => center - 6 + i);
  });

  prev(): void { this.viewMonth.update((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)); }
  next(): void { this.viewMonth.update((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)); }

  protected pickYear(y: number): void {
    this.viewMonth.set(new Date(y, this.viewMonth().getMonth(), 1));
    this.showYears.set(false);
  }

  protected isDayDisabled(d: Date): boolean {
    if (this.minDate && d < this.minDate) return true;
    if (this.maxDate && d > this.maxDate) return true;
    return this.isDisabled ? this.isDisabled(d) : false;
  }

  protected dayClass(d: Date): string {
    const parts = ['hilal-calendar__day'];
    if (d.getMonth() !== this.viewMonth().getMonth()) parts.push('hilal-calendar__day--outside');
    if (isSameDay(d, new Date()))                     parts.push('hilal-calendar__day--today');
    if (this.mode === 'single') {
      const sel = this._selected();
      if (sel && isSameDay(d, sel)) parts.push('hilal-calendar__day--selected');
    } else {
      const r = this._range();
      const s = parseIso(r.start), e = parseIso(r.end);
      if (s && isSameDay(d, s)) parts.push('hilal-calendar__day--range-start');
      if (e && isSameDay(d, e)) parts.push('hilal-calendar__day--range-end');
      if (s && e && d > s && d < e) parts.push('hilal-calendar__day--in-range');
    }
    return parts.join(' ');
  }

  protected ariaSelected(d: Date): boolean {
    if (this.mode === 'single') {
      const sel = this._selected();
      return !!(sel && isSameDay(d, sel));
    }
    const r = this._range();
    const s = parseIso(r.start), e = parseIso(r.end);
    return !!(s && isSameDay(d, s)) || !!(e && isSameDay(d, e));
  }

  protected onClick(d: Date): void {
    if (this.isDayDisabled(d)) return;
    if (this.mode === 'single') {
      this._selected.set(d);
      this.selected.emit({ iso: toIso(d), date: d });
      return;
    }
    const cur = this._range();
    const s = parseIso(cur.start), e = parseIso(cur.end);
    let next: HilalDateRange;
    if (!s || (s && e)) {
      next = { start: toIso(d), end: null };
    } else if (d < s) {
      next = { start: toIso(d), end: cur.start };
    } else {
      next = { start: cur.start, end: toIso(d) };
    }
    this._range.set(next);
    this.rangeSelected.emit(next);
  }
}
