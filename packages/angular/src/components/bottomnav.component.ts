import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalBottomNavVariant = 'default' | 'floating';

@Component({
  selector: 'hilal-bottomnav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav [class]="classes()" [attr.aria-label]="ariaLabel"><ng-content></ng-content></nav>`,
})
export class HilalBottomNavComponent {
  @Input() variant: HilalBottomNavVariant = 'default';
  @Input() ariaLabel = 'Primary';

  protected readonly classes = computed(() =>
    this.variant === 'floating' ? 'hilal-bottomnav hilal-bottomnav--floating' : 'hilal-bottomnav',
  );
}

@Component({
  selector: 'hilal-bottomnav-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="hilal-bottomnav__item" [href]="href" [attr.aria-current]="active ? 'page' : null">
      <span *ngIf="icon" class="hilal-bottomnav__icon" aria-hidden="true">{{ icon }}</span>
      <span class="hilal-bottomnav__label">{{ label }}</span>
    </a>
  `,
})
export class HilalBottomNavItemComponent {
  @Input() href = '#';
  @Input() icon?: string;
  @Input() label = '';
  @Input() active = false;
}
