import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalTooltipSide = 'top' | 'bottom' | 'start' | 'end';

@Component({
  selector: 'hilal-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="hilal-tooltip" [attr.data-side]="side">
      <ng-content></ng-content>
      <span class="hilal-tooltip__content" role="tooltip">{{ label }}</span>
    </span>
  `,
})
export class HilalTooltipComponent {
  @Input() label = '';
  @Input() side: HilalTooltipSide = 'top';
}
