import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalSelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'hilal-select',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="fieldClasses()" [attr.data-state]="resolvedState()">
      <label *ngIf="label" class="hilal-field__label" [attr.for]="selectId">{{ label }}</label>
      <div class="hilal-field__control hilal-select-control">
        <select
          class="hilal-select"
          [id]="selectId"
          [disabled]="disabled"
          [value]="value"
          [attr.aria-invalid]="!!error"
        >
          <ng-content></ng-content>
        </select>
        <span class="hilal-select__chevron" aria-hidden="true">▾</span>
      </div>
      <p *ngIf="message()" class="hilal-field__hint">{{ message() }}</p>
    </div>
  `,
})
export class HilalSelectComponent {
  @Input() size: HilalSelectSize = 'md';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() success?: string;
  @Input() value = '';
  @Input() disabled = false;
  @Input() selectId = `hilal-select-${Math.random().toString(36).slice(2, 9)}`;

  protected readonly fieldClasses = computed(() => `hilal-field hilal-field--${this.size}`);
  protected readonly resolvedState = computed(() =>
    this.error ? 'error' : this.success ? 'success' : this.disabled ? 'disabled' : 'default',
  );
  protected readonly message = computed(() => this.error ?? this.success ?? this.hint ?? '');
}
