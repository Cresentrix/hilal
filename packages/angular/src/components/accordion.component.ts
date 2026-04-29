import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalAccordionVariant = 'default' | 'bordered' | 'separated';

@Component({
  selector: 'hilal-accordion',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [class]="classes()"><ng-content></ng-content></div>`,
})
export class HilalAccordionComponent {
  @Input() variant: HilalAccordionVariant = 'default';

  protected readonly classes = computed(() => {
    const parts = ['hilal-accordion'];
    if (this.variant !== 'default') parts.push(`hilal-accordion--${this.variant}`);
    return parts.join(' ');
  });
}

@Component({
  selector: 'hilal-accordion-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details class="hilal-accordion__item" [attr.open]="open ? '' : null">
      <summary class="hilal-accordion__trigger">{{ label }}</summary>
      <div class="hilal-accordion__content"><ng-content></ng-content></div>
    </details>
  `,
})
export class HilalAccordionItemComponent {
  @Input() label = '';
  @Input() open = false;
}
