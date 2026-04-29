import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalInputSize = 'sm' | 'md' | 'lg';
export type HilalInputState = 'default' | 'error' | 'success' | 'disabled';

@Component({
  selector: 'hilal-input',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="fieldClasses()" [attr.data-state]="resolvedState()">
      <label *ngIf="label" class="hilal-field__label" [attr.for]="inputId">{{ label }}</label>
      <div class="hilal-field__control">
        <span *ngIf="leadingIcon" class="hilal-field__icon hilal-field__icon--leading" aria-hidden="true">{{ leadingIcon }}</span>
        <input
          class="hilal-input"
          [id]="inputId"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          [attr.aria-invalid]="!!error"
        />
        <span *ngIf="trailingIcon" class="hilal-field__icon hilal-field__icon--trailing" aria-hidden="true">{{ trailingIcon }}</span>
      </div>
      <p *ngIf="message()" class="hilal-field__hint">{{ message() }}</p>
    </div>
  `,
})
export class HilalInputComponent {
  @Input() size: HilalInputSize = 'md';
  @Input() label?: string;
  @Input() hint?: string;
  @Input() error?: string;
  @Input() success?: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() leadingIcon?: string;
  @Input() trailingIcon?: string;
  @Input() inputId = `hilal-input-${Math.random().toString(36).slice(2, 9)}`;

  protected readonly fieldClasses = computed(() => `hilal-field hilal-field--${this.size}`);
  protected readonly resolvedState = computed<HilalInputState>(() =>
    this.error ? 'error' : this.success ? 'success' : this.disabled ? 'disabled' : 'default',
  );
  protected readonly message = computed(() => this.error ?? this.success ?? this.hint ?? '');
}
