import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hilal-search-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="hilal-search-header">
      <div class="hilal-search-header__row">
        <ng-content select="[hilalSearchLeading]"></ng-content>
        <div class="hilal-search-header__input-wrap">
          <div class="hilal-field hilal-field--md">
            <div class="hilal-field__control">
              <span class="hilal-field__icon hilal-field__icon--leading" aria-hidden="true">🔎</span>
              <input class="hilal-input" type="search" [placeholder]="placeholder"
                [value]="query" (input)="onInput($event)" />
              <button *ngIf="query" type="button" class="hilal-field__icon hilal-field__icon--trailing"
                aria-label="Clear search" (click)="onClear()"
                style="border:0;background:transparent;color:inherit;cursor:pointer;font:inherit">×</button>
            </div>
          </div>
        </div>
        <div class="hilal-search-header__trailing">
          <ng-content select="[hilalSearchTrailing]"></ng-content>
        </div>
      </div>
      <div *ngIf="totalCount !== undefined || activeFiltersCount" class="hilal-search-header__summary">
        <span *ngIf="totalCount !== undefined">
          <ng-container *ngIf="query; else noQuery">
            Showing <strong>{{ totalCount.toLocaleString() }}</strong> results for "{{ query }}"
          </ng-container>
          <ng-template #noQuery><strong>{{ totalCount.toLocaleString() }}</strong> total</ng-template>
        </span>
        <span *ngIf="activeFiltersCount" aria-hidden="true">·</span>
        <span *ngIf="activeFiltersCount">
          {{ activeFiltersCount }} active <span class="hilal-badge hilal-badge--brand">{{ activeFiltersCount }}</span>
        </span>
      </div>
    </header>
  `,
})
export class HilalSearchHeaderComponent {
  @Input() query = '';
  @Input() placeholder = 'Search…';
  @Input() totalCount?: number;
  @Input() activeFiltersCount?: number;
  @Output() queryChange = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  protected onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.query = v;
    this.queryChange.emit(v);
  }
  protected onClear(): void {
    this.query = '';
    this.queryChange.emit('');
    this.cleared.emit();
  }
}
