import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type HilalButtonSize = 'sm' | 'md' | 'lg';

/**
 * Hilal Button (Angular)
 * Emits the same DOM as @hilal/react and hilal/blade — relies on @hilal/core CSS.
 *
 *   <hilal-button variant="primary" size="md">Click me</hilal-button>
 */
@Component({
  selector: 'hilal-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="classes()"
      [disabled]="disabled || loading"
      [attr.data-state]="loading ? 'loading' : null"
    >
      <span *ngIf="loading" class="hilal-btn__spinner" aria-hidden="true"></span>
      <ng-content></ng-content>
    </button>
  `,
})
export class HilalButtonComponent {
  @Input() variant: HilalButtonVariant = 'primary';
  @Input() size: HilalButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;

  protected readonly classes = computed(() =>
    ['hilal-btn', `hilal-btn--${this.variant}`, `hilal-btn--${this.size}`].join(' '),
  );
}
