import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ElementRef, ViewChild,
} from '@angular/core';
import type { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalNotificationItem {
  id: string;
  title: string;
  body?: string;
  time?: string;
  avatarSrc?: string;
  initials?: string;
  group?: string;
  unread?: boolean;
  href?: string;
}

interface NotifGroup { key: string; items: HilalNotificationItem[]; }

@Component({
  selector: 'hilal-notification-center',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #dlg [class]="'hilal-drawer hilal-drawer--' + side + ' hilal-drawer--md hilal-notification-center'"
            (close)="onClose()" (click)="onBackdrop($event)">
      <header class="hilal-drawer__header">
        <h2 class="hilal-drawer__title">
          {{ title }}
          <span *ngIf="unreadCount() > 0" class="hilal-notification-center__count">{{ unreadCount() }}</span>
        </h2>
        <button type="button" class="hilal-drawer__close" aria-label="Close" (click)="close()">×</button>
      </header>
      <div class="hilal-drawer__body">
        <div *ngIf="items.length === 0" class="hilal-empty">
          <h3 class="hilal-empty__title">{{ emptyTitle }}</h3>
          <p *ngIf="emptyDescription" class="hilal-empty__desc">{{ emptyDescription }}</p>
        </div>
        <ul *ngIf="items.length > 0" class="hilal-notification-center__list">
          <li *ngFor="let g of groups()" class="hilal-notification-center__group">
            <div *ngIf="g.key" class="hilal-notification-center__group-heading">{{ g.key }}</div>
            <ul class="hilal-notification-center__list">
              <li *ngFor="let it of g.items">
                <a *ngIf="it.href; else clickRow" [href]="it.href"
                   [class]="rowClasses(it, true)">
                  <ng-container *ngTemplateOutlet="rowBody; context: { it }"></ng-container>
                </a>
                <ng-template #clickRow>
                  <button type="button"
                          [class]="rowClasses(it, true)"
                          (click)="itemClick.emit(it)">
                    <ng-container *ngTemplateOutlet="rowBody; context: { it }"></ng-container>
                  </button>
                </ng-template>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <footer *ngIf="markAllReadObserved()" class="hilal-drawer__footer">
        <button type="button" class="hilal-btn hilal-btn--tertiary hilal-btn--md"
                [disabled]="unreadCount() === 0"
                (click)="markAllRead.emit()">
          Mark all as read
        </button>
      </footer>
    </dialog>

    <ng-template #rowBody let-it="it">
      <span class="hilal-notification-center__dot-cell" aria-hidden="true">
        <span *ngIf="it.unread" class="hilal-notification-center__dot"></span>
      </span>
      <span *ngIf="it.avatarSrc || it.initials"
            [class]="'hilal-avatar hilal-avatar--sm' + (it.initials && !it.avatarSrc ? ' hilal-avatar--initials' : '')">
        <img *ngIf="it.avatarSrc" class="hilal-avatar__img" [src]="it.avatarSrc" alt="" />
        <ng-container *ngIf="!it.avatarSrc && it.initials">{{ it.initials }}</ng-container>
      </span>
      <div class="hilal-notification-center__col">
        <div class="hilal-notification-center__title">{{ it.title }}</div>
        <div *ngIf="it.body" class="hilal-notification-center__body">{{ it.body }}</div>
        <div *ngIf="it.time" class="hilal-notification-center__time">{{ it.time }}</div>
      </div>
    </ng-template>
  `,
})
export class HilalNotificationCenterComponent implements OnChanges {
  @Input() open = false;
  @Input() items: HilalNotificationItem[] = [];
  @Input() title = 'Notifications';
  @Input() side: 'start' | 'end' = 'end';
  @Input() groupOrder?: string[];
  @Input() emptyTitle = 'You’re all caught up';
  @Input() emptyDescription = 'New notifications will show up here.';
  @Output() openChange = new EventEmitter<boolean>();
  @Output() itemClick = new EventEmitter<HilalNotificationItem>();
  @Output() markAllRead = new EventEmitter<void>();

  @ViewChild('dlg', { static: true }) dlg!: ElementRef<HTMLDialogElement>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      const d = this.dlg.nativeElement;
      if (this.open && !d.open) d.showModal();
      if (!this.open && d.open) d.close();
    }
  }

  protected unreadCount(): number { return this.items.filter((i) => i.unread).length; }

  protected markAllReadObserved(): boolean { return this.markAllRead.observed; }

  protected rowClasses(it: HilalNotificationItem, interactive: boolean): string {
    const base = 'hilal-notification-center__row';
    return [
      base,
      interactive ? `${base}--interactive` : '',
      it.unread ? `${base}--unread` : '',
    ].filter(Boolean).join(' ');
  }

  protected groups(): NotifGroup[] {
    const map = new Map<string, HilalNotificationItem[]>();
    for (const it of this.items) {
      const k = it.group ?? '';
      const arr = map.get(k) ?? [];
      arr.push(it);
      map.set(k, arr);
    }
    const keys: string[] = [];
    if (this.groupOrder) for (const g of this.groupOrder) if (map.has(g)) keys.push(g);
    for (const k of map.keys()) if (!keys.includes(k)) keys.push(k);
    return keys.map((k) => ({ key: k, items: map.get(k)! }));
  }

  protected close(): void {
    this.open = false;
    this.openChange.emit(false);
    if (this.dlg.nativeElement.open) this.dlg.nativeElement.close();
  }

  protected onClose(): void {
    if (this.open) {
      this.open = false;
      this.openChange.emit(false);
    }
  }

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.dlg.nativeElement) this.close();
  }
}
