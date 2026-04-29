import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalFilterPill {
  id: string;
  label: string;
  count?: number;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'hilal-filter-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div role="toolbar" aria-label="Filters" class="hilal-filter-bar">
      <ng-content select="[hilalFilterLeading]"></ng-content>
      <button *ngFor="let f of filters"
        type="button" role="switch"
        [attr.aria-pressed]="!!f.active"
        [attr.aria-label]="f.label"
        [disabled]="f.disabled"
        [class]="'hilal-filter-pill' + (f.active ? ' hilal-filter-pill--active' : '')"
        (click)="onToggle(f.id)"
      >
        {{ f.label }}
        <span *ngIf="f.count !== undefined" class="hilal-filter-pill__count">{{ f.count.toLocaleString() }}</span>
      </button>
      <button *ngIf="hasActive()" type="button" class="hilal-btn hilal-btn--tertiary hilal-btn--sm" (click)="clearAll.emit()">Clear all</button>
      <div class="hilal-filter-bar__trailing"><ng-content select="[hilalFilterTrailing]"></ng-content></div>
    </div>
  `,
})
export class HilalFilterBarComponent {
  @Input() filters: HilalFilterPill[] = [];
  @Output() toggled = new EventEmitter<string>();
  @Output() clearAll = new EventEmitter<void>();

  protected onToggle(id: string): void { this.toggled.emit(id); }
  protected hasActive(): boolean { return this.filters.some((f) => f.active); }
}
