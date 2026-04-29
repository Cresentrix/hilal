import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalEmptySize = 'default' | 'compact';

@Component({
  selector: 'hilal-empty-state',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()">
      <div *ngIf="icon" class="hilal-empty__icon" aria-hidden="true">{{ icon }}</div>
      <h3 *ngIf="title" class="hilal-empty__title">{{ title }}</h3>
      <p  *ngIf="description" class="hilal-empty__desc">{{ description }}</p>
      <div class="hilal-empty__actions"><ng-content select="[hilalEmptyActions]"></ng-content></div>
      <ng-content></ng-content>
    </div>
  `,
})
export class HilalEmptyStateComponent {
  @Input() size: HilalEmptySize = 'default';
  @Input() icon?: string;
  @Input() title?: string;
  @Input() description?: string;

  protected readonly classes = computed(() =>
    this.size === 'compact' ? 'hilal-empty hilal-empty--compact' : 'hilal-empty',
  );
}
