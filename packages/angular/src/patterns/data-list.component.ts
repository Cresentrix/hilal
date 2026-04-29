import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalDataListItem {
  id: string;
  label: string;
  meta?: string;
  avatarSrc?: string;
  initials?: string;
  href?: string;
}

@Component({
  selector: 'hilal-data-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="loading; else content">
      <ul class="hilal-data-list">
        <li *ngFor="let _ of skeletonRows()" class="hilal-data-list__row">
          <span class="hilal-skeleton hilal-skeleton--circle" style="--size: 2.5rem;"></span>
          <div class="hilal-data-list__col">
            <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 60%;"></span>
            <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 40%; margin-block-start: var(--hilal-spacing-1);"></span>
          </div>
        </li>
      </ul>
    </ng-container>

    <ng-template #content>
      <div *ngIf="items.length === 0" class="hilal-empty">
        <h3 class="hilal-empty__title">{{ emptyTitle }}</h3>
        <p *ngIf="emptyDescription" class="hilal-empty__desc">{{ emptyDescription }}</p>
        <div class="hilal-empty__actions">
          <ng-content select="[hilalDataListEmptyActions]"></ng-content>
        </div>
      </div>

      <ul *ngIf="items.length > 0" class="hilal-data-list">
        <li *ngFor="let item of items" class="hilal-data-list__item">
          <a *ngIf="item.href; else divRow" [href]="item.href" class="hilal-data-list__row hilal-data-list__row--interactive">
            <ng-container *ngTemplateOutlet="rowContent; context: { item }"></ng-container>
          </a>
          <ng-template #divRow>
            <div class="hilal-data-list__row" (click)="rowClick.emit(item)">
              <ng-container *ngTemplateOutlet="rowContent; context: { item }"></ng-container>
            </div>
          </ng-template>
        </li>
      </ul>

      <ng-template #rowContent let-item="item">
        <span *ngIf="item.avatarSrc || item.initials"
          [class]="'hilal-avatar hilal-avatar--md' + (item.initials && !item.avatarSrc ? ' hilal-avatar--initials' : '')">
          <img *ngIf="item.avatarSrc" class="hilal-avatar__img" [src]="item.avatarSrc" alt="" />
          <ng-container *ngIf="!item.avatarSrc && item.initials">{{ item.initials }}</ng-container>
        </span>
        <div class="hilal-data-list__col">
          <span class="hilal-data-list__label">{{ item.label }}</span>
          <span *ngIf="item.meta" class="hilal-data-list__meta">{{ item.meta }}</span>
        </div>
      </ng-template>
    </ng-template>
  `,
})
export class HilalDataListComponent {
  @Input() items: HilalDataListItem[] = [];
  @Input() loading = false;
  @Input() loadingRows = 4;
  @Input() emptyTitle = 'Nothing here yet';
  @Input() emptyDescription?: string;
  @Output() rowClick = new EventEmitter<HilalDataListItem>();

  protected skeletonRows(): unknown[] { return Array.from({ length: this.loadingRows }); }
}
