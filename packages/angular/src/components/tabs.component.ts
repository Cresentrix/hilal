import {
  Component, Directive, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ContentChildren, QueryList, signal, computed,
} from '@angular/core';
import type { AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalTabsVariant = 'line' | 'enclosed' | 'pill';
export type HilalTabsSize = 'sm' | 'md';
export type HilalTabsOrientation = 'horizontal' | 'vertical';

@Directive({ selector: 'hilal-tab', standalone: true })
export class HilalTabDirective {
  @Input() value!: string;
  @Input() label!: string;
  @Input() disabled = false;
}

@Component({
  selector: 'hilal-tabs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes()" [attr.data-orientation]="orientation">
      <div class="hilal-tabs__list" role="tablist">
        <button
          *ngFor="let t of tabs"
          type="button"
          role="tab"
          class="hilal-tabs__tab"
          [attr.aria-selected]="t.value === value()"
          [attr.tabindex]="t.value === value() ? 0 : -1"
          [disabled]="t.disabled"
          (click)="select(t.value)"
        >{{ t.label }}</button>
      </div>
      <div role="tabpanel" class="hilal-tabs__panel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class HilalTabsComponent implements AfterContentInit {
  @Input() variant: HilalTabsVariant = 'line';
  @Input() size: HilalTabsSize = 'md';
  @Input() orientation: HilalTabsOrientation = 'horizontal';
  @Input() set defaultValue(v: string) { if (!this.value()) this.value.set(v); }
  @Output() valueChange = new EventEmitter<string>();

  @ContentChildren(HilalTabDirective) declared!: QueryList<HilalTabDirective>;

  protected readonly value = signal('');
  protected tabs: HilalTabDirective[] = [];

  protected readonly classes = computed(() => {
    const parts = ['hilal-tabs'];
    if (this.variant !== 'line') parts.push(`hilal-tabs--${this.variant}`);
    if (this.size === 'sm') parts.push('hilal-tabs--sm');
    return parts.join(' ');
  });

  ngAfterContentInit(): void {
    this.tabs = this.declared.toArray();
    const first = this.tabs[0];
    if (!this.value() && first) this.value.set(first.value);
  }

  protected select(v: string): void {
    this.value.set(v);
    this.valueChange.emit(v);
  }
}
