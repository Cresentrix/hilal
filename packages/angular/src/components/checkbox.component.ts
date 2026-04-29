import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalCheckboxSize = 'sm' | 'md';

@Component({
  selector: 'hilal-checkbox',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [class]="classes()">
      <input type="checkbox" class="hilal-check__input" [checked]="checked" [disabled]="disabled" />
      <span class="hilal-check__box" aria-hidden="true">
        <svg class="hilal-check__tick" viewBox="0 0 16 16" focusable="false">
          <path d="M3 8l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span *ngIf="label" class="hilal-check__label">{{ label }}</span>
    </label>
  `,
})
export class HilalCheckboxComponent {
  @Input() size: HilalCheckboxSize = 'md';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label?: string;

  protected readonly classes = computed(() => `hilal-check hilal-check--${this.size}`);
}
