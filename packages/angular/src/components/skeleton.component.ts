import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalSkeletonVariant = 'rectangle' | 'text' | 'circle';

@Component({
  selector: 'hilal-skeleton',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="classes()" [style.--size]="size" [style.inline-size]="width" [style.block-size]="height" aria-hidden="true"></span>`,
})
export class HilalSkeletonComponent {
  @Input() variant: HilalSkeletonVariant = 'rectangle';
  @Input() width?: string;
  @Input() height?: string;
  @Input() size?: string;

  protected readonly classes = computed(() => {
    const parts = ['hilal-skeleton'];
    if (this.variant !== 'rectangle') parts.push(`hilal-skeleton--${this.variant}`);
    return parts.join(' ');
  });
}
