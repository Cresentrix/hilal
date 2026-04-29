import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hilal-dashboard-shell',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hilal-dashboard">
      <div class="hilal-dashboard__sidebar">
        <ng-content select="[hilalDashboardSidebar]"></ng-content>
      </div>
      <div class="hilal-dashboard__main-col">
        <div class="hilal-dashboard__topbar">
          <ng-content select="[hilalDashboardTopbar]"></ng-content>
        </div>
        <main class="hilal-dashboard__main"><ng-content></ng-content></main>
        <ng-content select="[hilalDashboardBottomNav]"></ng-content>
      </div>
    </div>
  `,
})
export class HilalDashboardShellComponent {}
