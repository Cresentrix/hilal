import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalToggleSize = 'sm' | 'md';

@Component({
  selector: 'hilal-toggle',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="classes()">
      <input type="checkbox" role="switch" class="hilal-toggle__input" [checked]="checked" [disabled]="disabled" />
      <span class="hilal-toggle__track" aria-hidden="true">
        <span class="hilal-toggle__thumb"></span>
      </span>
      <span *ngIf="label" class="hilal-toggle__label">{{ label }}</span>
    </label>
  `,
})
export class HilalToggleComponent {
  @Input() size: HilalToggleSize = 'md';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label?: string;

  protected readonly classes = computed(() => `hilal-toggle hilal-toggle--${this.size}`);
}
