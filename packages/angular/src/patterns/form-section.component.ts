import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hilal-form-section',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [class]="classes()">
      <header class="hilal-form-section__header">
        <div>
          <h2 class="hilal-form-section__title">{{ title }}</h2>
          <p *ngIf="description" class="hilal-form-section__desc">{{ description }}</p>
          <ng-content select="[hilalFormSectionAside]"></ng-content>
        </div>
      </header>
      <div class="hilal-form-section__fields">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class HilalFormSectionComponent {
  @Input() title = '';
  @Input() description?: string;
  @Input() twoColumn = false;

  protected readonly classes = computed(() =>
    this.twoColumn ? 'hilal-form-section hilal-form-section--two-column' : 'hilal-form-section',
  );
}
