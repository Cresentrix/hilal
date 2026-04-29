import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalWeekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

function startOfMonth(d: Date): Date { return new Date(d.getFullYear(), d.getMonth(), 1); }
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function toIso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
        <span class="hilal-calendar__title" aria-live="polite">{{ titleText() }}</span>
        <button type="button" class="hilal-calendar__nav" data-next aria-label="Next month" (click)="next()">›</button>
      </header>
      <div class="hilal-calendar__weekdays" aria-hidden="true">
        <span *ngFor="let l of weekdayLabels()">{{ l }}</span>
      </div>
      <div class="hilal-calendar__grid" role="grid">
        <button *ngFor="let d of days()"
          type="button"
          role="gridcell"
          [class]="dayClass(d)"
          [attr.aria-selected]="isSelected(d)"
          [disabled]="isDayDisabled(d)"
          (click)="select(d)"
        >{{ d.getDate() }}</button>
      </div>
    </div>
  `,
})
export class HilalCalendarComponent {
  @Input() set value(v: string | Date | null | undefined) {
    if (!v) { this._selected.set(null); return; }
    const d = v instanceof Date ? v : new Date(v);
    this._selected.set(isNaN(d.getTime()) ? null : d);
    if (d) this.viewMonth.set(startOfMonth(d));
  }
  @Input() weekStartsOn: HilalWeekday = 1;
  @Input() locale?: string;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() isDisabled?: (d: Date) => boolean;
  @Output() selected = new EventEmitter<{ iso: string; date: Date }>();

  protected readonly _selected = signal<Date | null>(null);
  protected readonly viewMonth = signal<Date>(startOfMonth(new Date()));

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

  prev(): void { this.viewMonth.update((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)); }
  next(): void { this.viewMonth.update((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)); }

  protected isSelected(d: Date): boolean {
    const sel = this._selected();
    return sel ? isSameDay(d, sel) : false;
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
    if (this.isSelected(d))                           parts.push('hilal-calendar__day--selected');
    return parts.join(' ');
  }
  protected select(d: Date): void {
    if (this.isDayDisabled(d)) return;
    this._selected.set(d);
    this.selected.emit({ iso: toIso(d), date: d });
  }
}
