import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HilalBreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

@Component({
  selector: 'hilal-page-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="hilal-page-header">
      <nav *ngIf="breadcrumbs?.length" aria-label="Breadcrumb" class="hilal-page-header__crumbs">
        <ol>
          <li *ngFor="let b of breadcrumbs; let last = last">
            <a *ngIf="b.href && !b.current; else crumbSpan" [href]="b.href">{{ b.label }}</a>
            <ng-template #crumbSpan>
              <span [attr.aria-current]="b.current ? 'page' : null"
                [class.hilal-page-header__crumb-current]="b.current">{{ b.label }}</span>
            </ng-template>
            <span *ngIf="!last" aria-hidden="true">/</span>
          </li>
        </ol>
      </nav>
      <div class="hilal-page-header__row">
        <div class="hilal-page-header__title-wrap">
          <ng-content select="[hilalPageHeaderLeading]"></ng-content>
          <div>
            <h1 class="hilal-page-header__title">{{ title }}</h1>
            <p *ngIf="description" class="hilal-page-header__desc">{{ description }}</p>
          </div>
        </div>
        <div class="hilal-page-header__actions">
          <ng-content select="[hilalPageHeaderActions]"></ng-content>
        </div>
      </div>
    </header>
  `,
})
export class HilalPageHeaderComponent {
  @Input() title = '';
  @Input() description?: string;
  @Input() breadcrumbs: HilalBreadcrumbItem[] = [];
}
