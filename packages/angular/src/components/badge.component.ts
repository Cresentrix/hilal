import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalBadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';
export type HilalBadgeSize = 'sm' | 'md';

@Component({
  selector: 'hilal-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()">
      <ng-content *ngIf="!dot"></ng-content>
    </span>
  `,
})
export class HilalBadgeComponent {
  @Input() tone: HilalBadgeTone = 'neutral';
  @Input() size: HilalBadgeSize = 'sm';
  @Input() dot = false;

  protected readonly classes = computed(() => {
    const parts = ['hilal-badge', `hilal-badge--${this.tone}`];
    if (this.size === 'md') parts.push('hilal-badge--md');
    if (this.dot) parts.push('hilal-badge--dot');
    return parts.join(' ');
  });
}
