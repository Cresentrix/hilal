import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalCardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';
export type HilalCardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'hilal-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<article [class]="classes()"><ng-content></ng-content></article>`,
})
export class HilalCardComponent {
  @Input() variant: HilalCardVariant = 'default';
  @Input() padding: HilalCardPadding = 'md';
  @Input() interactive = false;

  protected readonly classes = computed(() => {
    const parts = ['hilal-card', `hilal-card--${this.variant}`];
    if (this.padding !== 'none') parts.push(`hilal-card--${this.padding}`);
    if (this.interactive) parts.push('hilal-card--interactive');
    return parts.join(' ');
  });
}

@Component({
  selector: 'hilal-card-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<header class="hilal-card__header"><ng-content></ng-content></header>`,
})
export class HilalCardHeaderComponent {}

@Component({
  selector: 'hilal-card-body',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="hilal-card__body"><ng-content></ng-content></div>`,
})
export class HilalCardBodyComponent {}

@Component({
  selector: 'hilal-card-footer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<footer class="hilal-card__footer"><ng-content></ng-content></footer>`,
})
export class HilalCardFooterComponent {}
