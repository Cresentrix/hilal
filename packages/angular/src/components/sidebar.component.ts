import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hilal-sidebar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<aside [class]="classes()"><ng-content></ng-content></aside>`,
})
export class HilalSidebarComponent {
  @Input() collapsed = false;
  protected readonly classes = computed(() =>
    this.collapsed ? 'hilal-sidebar hilal-sidebar--collapsed' : 'hilal-sidebar',
  );
}

@Component({
  selector: 'hilal-sidebar-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<header class="hilal-sidebar__header"><ng-content></ng-content></header>`,
})
export class HilalSidebarHeaderComponent {}

@Component({
  selector: 'hilal-sidebar-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<footer class="hilal-sidebar__footer"><ng-content></ng-content></footer>`,
})
export class HilalSidebarFooterComponent {}

@Component({
  selector: 'hilal-sidebar-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<nav class="hilal-sidebar__nav"><ng-content></ng-content></nav>`,
})
export class HilalSidebarNavComponent {}

@Component({
  selector: 'hilal-sidebar-item',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="hilal-sidebar__item" [href]="href" [attr.aria-current]="active ? 'page' : null">
      <span *ngIf="icon" class="hilal-sidebar__icon" aria-hidden="true">{{ icon }}</span>
      <span class="hilal-sidebar__label">{{ label }}</span>
      <ng-content></ng-content>
    </a>
  `,
})
export class HilalSidebarItemComponent {
  @Input() href = '#';
  @Input() icon?: string;
  @Input() label = '';
  @Input() active = false;
}
