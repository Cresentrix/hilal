import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type HilalAvatarStatus = 'online' | 'offline' | 'busy' | 'away';

@Component({
  selector: 'hilal-avatar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span [class]="classes()" [attr.data-status]="status">
      <img *ngIf="src" class="hilal-avatar__img" [src]="src" [alt]="alt ?? ''" />
      <ng-container *ngIf="!src && initials">{{ initials }}</ng-container>
      <ng-content *ngIf="!src && !initials"></ng-content>
    </span>
  `,
})
export class HilalAvatarComponent {
  @Input() size: HilalAvatarSize = 'md';
  @Input() src?: string;
  @Input() alt?: string;
  @Input() initials?: string;
  @Input() status?: HilalAvatarStatus;

  protected readonly classes = computed(() => {
    const parts = ['hilal-avatar', `hilal-avatar--${this.size}`];
    if (!this.src && this.initials) parts.push('hilal-avatar--initials');
    return parts.join(' ');
  });
}

@Component({
  selector: 'hilal-avatar-group',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="hilal-avatar-group"><ng-content></ng-content></span>`,
})
export class HilalAvatarGroupComponent {}
