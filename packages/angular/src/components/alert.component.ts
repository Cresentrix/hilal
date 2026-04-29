import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalAlertTone = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'hilal-alert',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()" role="status">
      <span *ngIf="icon" class="hilal-alert__icon" aria-hidden="true">{{ icon }}</span>
      <div class="hilal-alert__body">
        <p *ngIf="title" class="hilal-alert__title">{{ title }}</p>
        <p *ngIf="description" class="hilal-alert__desc">{{ description }}</p>
        <ng-content></ng-content>
      </div>
      <button *ngIf="dismissible" type="button" class="hilal-alert__close" [attr.aria-label]="dismissLabel" (click)="onDismiss()">×</button>
    </div>
  `,
})
export class HilalAlertComponent {
  @Input() tone: HilalAlertTone = 'info';
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: string;
  @Input() dismissible = false;
  @Input() dismissLabel = 'Dismiss';
  @Output() dismiss = new EventEmitter<void>();

  protected readonly classes = computed(() => `hilal-alert hilal-alert--${this.tone}`);
  protected onDismiss(): void { this.dismiss.emit(); }
}
