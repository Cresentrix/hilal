import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HilalCalendarMode = 'single' | 'range';

export interface HilalDateRange {
  start: string | null;
  end: string | null;
}

export interface HilalCalendarPreset {
  id: string;
  label: string;
  /** Returns either a Date (single mode) or a HilalDateRange (range mode). */
  getValue(): Date | HilalDateRange;
}

function startOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), 1); }
function endOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth() + 1, 0); }
function addMonths(d: Date, n: number): Date { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
function addDays(d: Date, n: number): Date { const o = new Date(d); o.setDate(o.getDate() + n); return o; }
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

function defaultPresets(mode: HilalCalendarMode): HilalCalendarPreset[] {
  const today = (): Date => new Date();
  if (mode === 'single') {
    return [
      { id: 'today',     label: 'Today',     getValue: () => today() },
      { id: 'yesterday', label: 'Yesterday', getValue: () => addDays(today(), -1) },
    ];
  }
  return [
    { id: 'today',       label: 'Today',         getValue: () => ({ start: toIso(today()),               end: toIso(today()) }) },
    { id: 'yesterday',   label: 'Yesterday',     getValue: () => ({ start: toIso(addDays(today(), -1)),  end: toIso(addDays(today(), -1)) }) },
    { id: 'last-7-days', label: 'Last 7 days',   getValue: () => ({ start: toIso(addDays(today(), -6)),  end: toIso(today()) }) },
    { id: 'last-30',     label: 'Last 30 days',  getValue: () => ({ start: toIso(addDays(today(), -29)), end: toIso(today()) }) },
    { id: 'this-month',  label: 'This month',    getValue: () => ({ start: toIso(startOfMonth(today())), end: toIso(today()) }) },
    { id: 'last-month',  label: 'Last month',    getValue: () => {
      const t = today();
      const last = new Date(t.getFullYear(), t.getMonth() - 1, 1);
      return { start: toIso(startOfMonth(last)), end: toIso(endOfMonth(last)) };
    }},
    { id: 'this-year',   label: 'This year',     getValue: () => ({ start: toIso(new Date(today().getFullYear(), 0, 1)), end: toIso(today()) }) },
  ];
}

@Component({
  selector: 'hilal-calendar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #panel let-vm="vm" let-i="i" let-isFirst="isFirst" let-isLast="isLast">
      <div class="hilal-calendar">
        <header class="hilal-calendar__header">
          <button type="button" class="hilal-calendar__nav" data-prev aria-label="Previous month"
            [style.visibility]="isFirst ? null : 'hidden'"
            (click)="prev()">‹</button>
          <button *ngIf="!hideYearPicker && isFirst; else titleSpan"
            type="button" class="hilal-calendar__title-btn"
            [attr.aria-expanded]="showYears()" (click)="showYears.set(!showYears())">
            {{ titleFor(vm) }}
          </button>
          <ng-template #titleSpan>
            <span class="hilal-calendar__title" aria-live="polite">{{ titleFor(vm) }}</span>
          </ng-template>
          <button type="button" class="hilal-calendar__nav" data-next aria-label="Next month"
            [style.visibility]="isLast ? null : 'hidden'"
            (click)="next()">›</button>
        </header>

        <div *ngIf="isFirst && showYears()" class="hilal-calendar__years" role="grid" aria-label="Year">
          <button *ngFor="let y of yearsToShow()"
            type="button" class="hilal-calendar__year" role="gridcell"
            [attr.aria-selected]="y === viewMonth().getFullYear()"
            (click)="pickYear(y)">{{ y }}</button>
        </div>

        <ng-container *ngIf="!(isFirst && showYears())">
          <div class="hilal-calendar__weekdays" aria-hidden="true">
            <span *ngFor="let l of weekdayLabels()">{{ l }}</span>
          </div>
          <div class="hilal-calendar__grid" role="grid">
            <button *ngFor="let d of daysFor(vm)"
              type="button" role="gridcell"
              [class]="dayClass(d, vm)"
              [attr.aria-selected]="ariaSelected(d)"
              [disabled]="isDayDisabled(d)"
              (click)="onClick(d)"
            >{{ d.getDate() }}</button>
          </div>
        </ng-container>
      </div>
    </ng-template>

    <ng-container *ngIf="numberOfMonths === 1 && !resolvedPresets().length; else wrapped">
      <ng-container *ngTemplateOutlet="panel; context: { vm: viewMonth(), i: 0, isFirst: true, isLast: true }"></ng-container>
    </ng-container>

    <ng-template #wrapped>
      <div class="hilal-calendar-wrap">
        <div *ngIf="resolvedPresets().length > 0" class="hilal-calendar-presets" role="group" aria-label="Quick ranges">
          <button *ngFor="let p of resolvedPresets()"
            type="button" class="hilal-calendar-preset"
            [attr.aria-pressed]="isPresetActive(p)"
            (click)="applyPreset(p)">{{ p.label }}</button>
        </div>
        <div class="hilal-calendar-wrap__months">
          <ng-container *ngFor="let m of months(); let i = index; let isFirst = first; let isLast = last">
            <ng-container *ngTemplateOutlet="panel; context: { vm: m, i: i, isFirst: isFirst, isLast: isLast }"></ng-container>
          </ng-container>
        </div>
      </div>
    </ng-template>
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
  @Input() numberOfMonths = 1;
  @Input() presets: 'default' | HilalCalendarPreset[] | null = null;
  @Output() selected = new EventEmitter<{ iso: string; date: Date }>();
  @Output() rangeSelected = new EventEmitter<HilalDateRange>();

  protected readonly _selected = signal<Date | null>(null);
  protected readonly _range = signal<HilalDateRange>({ start: null, end: null });
  protected readonly viewMonth = signal<Date>(startOfMonth(new Date()));
  protected readonly showYears = signal(false);

  protected readonly resolvedLocale = computed(
    () => this.locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US'),
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

  protected readonly months = computed(() =>
    Array.from({ length: this.numberOfMonths }, (_, i) => addMonths(this.viewMonth(), i)),
  );

  protected readonly resolvedPresets = computed<HilalCalendarPreset[]>(() => {
    if (!this.presets) return [];
    return this.presets === 'default' ? defaultPresets(this.mode) : this.presets;
  });

  protected readonly yearsToShow = computed(() => {
    const center = this.viewMonth().getFullYear();
    return Array.from({ length: 12 }, (_, i) => center - 6 + i);
  });

  protected titleFor(month: Date): string {
    return new Intl.DateTimeFormat(this.resolvedLocale(), { month: 'long', year: 'numeric' }).format(month);
  }

  protected daysFor(month: Date): Date[] {
    const first = startOfMonth(month);
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
  }

  prev(): void { this.viewMonth.update((m) => addMonths(m, -1)); }
  next(): void { this.viewMonth.update((m) => addMonths(m, 1)); }

  protected pickYear(y: number): void {
    this.viewMonth.set(new Date(y, this.viewMonth().getMonth(), 1));
    this.showYears.set(false);
  }

  protected isDayDisabled(d: Date): boolean {
    if (this.minDate && d < this.minDate) return true;
    if (this.maxDate && d > this.maxDate) return true;
    return this.isDisabled ? this.isDisabled(d) : false;
  }

  protected dayClass(d: Date, vm: Date): string {
    const parts = ['hilal-calendar__day'];
    if (d.getMonth() !== vm.getMonth()) parts.push('hilal-calendar__day--outside');
    if (isSameDay(d, new Date()))       parts.push('hilal-calendar__day--today');
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

  protected applyPreset(p: HilalCalendarPreset): void {
    const v = p.getValue();
    if (v instanceof Date) {
      this._selected.set(v);
      this.viewMonth.set(startOfMonth(v));
      this.selected.emit({ iso: toIso(v), date: v });
    } else {
      this._range.set(v);
      const s = parseIso(v.start);
      if (s) this.viewMonth.set(startOfMonth(s));
      this.rangeSelected.emit(v);
    }
  }

  protected isPresetActive(p: HilalCalendarPreset): boolean {
    const v = p.getValue();
    if (this.mode === 'single' && v instanceof Date) {
      const sel = this._selected();
      return !!(sel && isSameDay(v, sel));
    }
    if (this.mode === 'range' && !(v instanceof Date)) {
      const r = this._range();
      return v.start === r.start && v.end === r.end;
    }
    return false;
  }
}
