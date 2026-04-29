import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalPaginationSize = 'sm' | 'md';

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}

@Component({
  selector: 'hilal-pagination',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [class]="classes()" aria-label="Pagination">
      <button type="button" class="hilal-pagination__btn" data-prev [disabled]="page <= 1" (click)="go(page - 1)" [attr.aria-label]="prevLabel">‹</button>
      <ng-container *ngFor="let p of pages()">
        <span *ngIf="p === 'ellipsis'" class="hilal-pagination__ellipsis" aria-hidden="true">…</span>
        <button *ngIf="p !== 'ellipsis'" type="button" class="hilal-pagination__btn" [attr.aria-current]="p === page ? 'page' : null" (click)="go(p)">{{ p }}</button>
      </ng-container>
      <button type="button" class="hilal-pagination__btn" data-next [disabled]="page >= total" (click)="go(page + 1)" [attr.aria-label]="nextLabel">›</button>
    </nav>
  `,
})
export class HilalPaginationComponent {
  @Input() page = 1;
  @Input() total = 1;
  @Input() siblingCount = 1;
  @Input() size: HilalPaginationSize = 'md';
  @Input() prevLabel = 'Previous';
  @Input() nextLabel = 'Next';
  @Output() pageChange = new EventEmitter<number>();

  protected readonly classes = computed(() => `hilal-pagination${this.size === 'sm' ? ' hilal-pagination--sm' : ''}`);

  protected readonly pages = computed<(number | 'ellipsis')[]>(() => {
    if (this.total <= 7) return range(1, this.total);
    const start = Math.max(2, this.page - this.siblingCount);
    const end   = Math.min(this.total - 1, this.page + this.siblingCount);
    const out: (number | 'ellipsis')[] = [1];
    if (start > 2) out.push('ellipsis');
    out.push(...range(start, end));
    if (end < this.total - 1) out.push('ellipsis');
    out.push(this.total);
    return out;
  });

  protected go(target: number): void {
    const clamped = Math.min(Math.max(1, target), this.total);
    if (clamped !== this.page) this.pageChange.emit(clamped);
  }
}
