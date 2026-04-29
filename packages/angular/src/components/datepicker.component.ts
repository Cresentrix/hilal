import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalDatepickerKind = 'date' | 'datetime-local' | 'time' | 'month' | 'week';
export type HilalDatepickerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'hilal-datepicker',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="fieldClasses()" [attr.data-state]="resolvedState()">
      <label *ngIf="label" class="hilal-field__label" [attr.for]="inputId">{{ label }}</label>
      <div class="hilal-field__control">
        <input
          class="hilal-input"
          [id]="inputId"
          [type]="kind"
          [disabled]="disabled"
          [value]="value"
          [attr.min]="min"
          [attr.max]="max"
          [attr.aria-invalid]="!!error"
        />
      </div>
      <p *ngIf="message()" class="hilal-field__hint">{{ message() }}</p>
    </div>
  `,
})
export class HilalDatepickerComponent {
  @Input() kind: HilalDatepickerKind = 'date';
  @Input() size: HilalDatepickerSize = 'md';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() value = '';
  @Input() min?: string;
  @Input() max?: string;
  @Input() disabled = false;
  @Input() inputId = `hilal-dp-${Math.random().toString(36).slice(2, 9)}`;

  protected readonly fieldClasses = computed(() => `hilal-field hilal-field--${this.size}`);
  protected readonly resolvedState = computed(() =>
    this.error ? 'error' : this.disabled ? 'disabled' : 'default',
  );
  protected readonly message = computed(() => this.error ?? this.hint ?? '');
}
