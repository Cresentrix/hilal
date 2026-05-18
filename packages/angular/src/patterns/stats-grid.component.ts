import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalStatTrend = 'up' | 'down' | 'flat';

export interface HilalStatItem {
  id: string;
  label: string;
  value: string | number;
  hint?: string;
  delta?: string;
  trend?: HilalStatTrend;
  href?: string;
}

@Component({
  selector: 'hilal-stats-grid',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hilal-stats-grid" [style.grid-template-columns]="gridColumns()">
      <ng-container *ngIf="loading; else liveItems">
        <div *ngFor="let _ of skeletonCount()" class="hilal-stats-grid__card">
          <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 40%;"></span>
          <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 70%; block-size: 1.5rem; margin-block-start: var(--hilal-spacing-2);"></span>
          <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 35%; margin-block-start: var(--hilal-spacing-2);"></span>
        </div>
      </ng-container>

      <ng-template #liveItems>
        <ng-container *ngFor="let item of items">
          <a *ngIf="item.href; else clickCard" [href]="item.href"
             class="hilal-stats-grid__card hilal-stats-grid__card--interactive">
            <ng-container *ngTemplateOutlet="cardBody; context: { item }"></ng-container>
          </a>
          <ng-template #clickCard>
            <button *ngIf="hasClickListener; else divCard"
                    type="button"
                    class="hilal-stats-grid__card hilal-stats-grid__card--interactive"
                    (click)="itemClick.emit(item)">
              <ng-container *ngTemplateOutlet="cardBody; context: { item }"></ng-container>
            </button>
          </ng-template>
          <ng-template #divCard>
            <div class="hilal-stats-grid__card">
              <ng-container *ngTemplateOutlet="cardBody; context: { item }"></ng-container>
            </div>
          </ng-template>
        </ng-container>
      </ng-template>

      <ng-template #cardBody let-item="item">
        <div class="hilal-stats-grid__header">
          <span class="hilal-stats-grid__label">{{ item.label }}</span>
        </div>
        <div class="hilal-stats-grid__value">{{ item.value }}</div>
        <div *ngIf="item.delta || item.hint" class="hilal-stats-grid__footer">
          <span *ngIf="item.delta" [class]="badgeClass(item.trend)">
            {{ trendGlyph(item.trend) }} {{ item.delta }}
          </span>
          <span *ngIf="item.hint" class="hilal-stats-grid__hint">{{ item.hint }}</span>
        </div>
      </ng-template>
    </div>
  `,
})
export class HilalStatsGridComponent {
  @Input() items: HilalStatItem[] = [];
  @Input() loading = false;
  @Input() loadingCount?: number;
  @Input() minColumnWidth = '14rem';
  @Output() itemClick = new EventEmitter<HilalStatItem>();

  protected get hasClickListener(): boolean { return this.itemClick.observed; }

  protected gridColumns(): string {
    return `repeat(auto-fit, minmax(${this.minColumnWidth}, 1fr))`;
  }

  protected skeletonCount(): unknown[] {
    return Array.from({ length: this.loadingCount ?? this.items.length ?? 4 });
  }

  protected badgeClass(trend?: HilalStatTrend): string {
    const tone = trend === 'down' ? 'danger' : trend === 'flat' ? 'neutral' : 'success';
    return `hilal-badge hilal-badge--${tone}`;
  }

  protected trendGlyph(trend?: HilalStatTrend): string {
    if (trend === 'down') return '↓';
    if (trend === 'flat') return '→';
    return '↑';
  }
}
