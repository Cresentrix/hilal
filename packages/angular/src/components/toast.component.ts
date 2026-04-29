import { Injectable, signal, computed, Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalToastTone = 'info' | 'success' | 'warning' | 'danger';
export type HilalToastPosition =
  'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end';

export interface HilalToast {
  id: string;
  tone?: HilalToastTone;
  title?: string;
  description?: string;
  icon?: string;
  durationMs?: number;
}

@Injectable({ providedIn: 'root' })
export class HilalToastService {
  private readonly _toasts = signal<HilalToast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  position: HilalToastPosition = 'bottom-end';
  defaultDurationMs = 5000;

  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  show(t: Omit<HilalToast, 'id'>): string {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const duration = t.durationMs ?? this.defaultDurationMs;
    this._toasts.update((all) => [...all, { ...t, id }]);
    if (duration > 0) {
      this.timers.set(id, setTimeout(() => this.dismiss(id), duration));
    }
    return id;
  }

  dismiss(id: string): void {
    this._toasts.update((all) => all.filter((t) => t.id !== id));
    const timer = this.timers.get(id);
    if (timer) { clearTimeout(timer); this.timers.delete(id); }
  }
}

@Component({
  selector: 'hilal-toast-region',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hilal-toast-region" [attr.data-position]="svc.position" role="region" aria-label="Notifications">
      <div *ngFor="let t of toasts()" [class]="toastClass(t)" role="status">
        <span *ngIf="t.icon" class="hilal-toast__icon" aria-hidden="true">{{ t.icon }}</span>
        <div class="hilal-toast__body">
          <p *ngIf="t.title" class="hilal-toast__title">{{ t.title }}</p>
          <p *ngIf="t.description" class="hilal-toast__desc">{{ t.description }}</p>
        </div>
        <button type="button" class="hilal-toast__close" aria-label="Dismiss" (click)="svc.dismiss(t.id)">×</button>
      </div>
    </div>
  `,
})
export class HilalToastRegionComponent {
  protected readonly toasts;
  constructor(public readonly svc: HilalToastService) {
    this.toasts = computed(() => this.svc.toasts());
  }
  protected toastClass(t: HilalToast): string {
    return t.tone ? `hilal-toast hilal-toast--${t.tone}` : 'hilal-toast';
  }
}
