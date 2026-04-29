import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalStepStatus = 'complete' | 'current' | 'upcoming';
export type HilalStepperOrientation = 'horizontal' | 'vertical';

export interface HilalStepItem {
  label: string;
  status?: HilalStepStatus;
  indicator?: string;
}

@Component({
  selector: 'hilal-stepper',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="hilal-stepper" [attr.data-orientation]="orientation">
      <li *ngFor="let s of steps; let i = index"
          class="hilal-stepper__step"
          [attr.data-status]="s.status ?? 'upcoming'"
          [attr.aria-current]="(s.status ?? 'upcoming') === 'current' ? 'step' : null">
        <span class="hilal-stepper__indicator" aria-hidden="true">
          {{ s.indicator ?? ((s.status ?? 'upcoming') === 'complete' ? '✓' : i + 1) }}
        </span>
        <span class="hilal-stepper__label">{{ s.label }}</span>
      </li>
    </ol>
  `,
})
export class HilalStepperComponent {
  @Input() steps: HilalStepItem[] = [];
  @Input() orientation: HilalStepperOrientation = 'horizontal';
}
