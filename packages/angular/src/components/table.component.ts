import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type HilalSortDirection = 'asc' | 'desc';

export interface HilalSortState {
  columnId: string;
  direction: HilalSortDirection;
}

export interface HilalTableColumn<Row = unknown> {
  id: string;
  header: string;
  /** Accessor function returning the cell value. */
  accessor: (row: Row) => unknown;
  sortable?: boolean;
  align?: 'start' | 'center' | 'end';
  numeric?: boolean;
  width?: string;
  className?: string;
}

@Component({
  selector: 'hilal-table',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hilal-table-wrap">
      <table [class]="tableClasses()">
        <caption *ngIf="caption" class="hilal-table__caption">{{ caption }}</caption>
        <thead class="hilal-table__head">
          <tr>
            <th *ngFor="let col of columns"
                scope="col"
                [class]="headClasses(col)"
                [style.inline-size]="col.width || null"
                [attr.aria-sort]="ariaSort(col)">
              <ng-container *ngIf="col.sortable; else plainHeader">
                <button type="button" class="hilal-table__sort"
                        [attr.aria-sort]="ariaSort(col)"
                        (click)="toggleSort(col.id)">
                  <span>{{ col.header }}</span>
                  <span aria-hidden="true" class="hilal-table__sort-arrow">{{ sortArrow(col.id) }}</span>
                </button>
              </ng-container>
              <ng-template #plainHeader>{{ col.header }}</ng-template>
            </th>
          </tr>
        </thead>
        <tbody class="hilal-table__body">
          <ng-container *ngIf="loading; else liveRows">
            <tr *ngFor="let _ of skeletonRows()" class="hilal-table__loading-row">
              <td *ngFor="let col of columns" [class]="col.className || ''">
                <span class="hilal-skeleton hilal-skeleton--text" style="inline-size: 60%;"></span>
              </td>
            </tr>
          </ng-container>
          <ng-template #liveRows>
            <ng-container *ngIf="!sortedRows().length; else dataRows">
              <tr>
                <td [attr.colspan]="columns.length" class="hilal-table__empty">{{ emptyState || 'No rows to display.' }}</td>
              </tr>
            </ng-container>
            <ng-template #dataRows>
              <tr *ngFor="let row of sortedRows(); let i = index"
                  [class]="rowClasses(row, i)"
                  (click)="onRowClick(row, i)"
                  [attr.aria-selected]="isRowSelected?.(row, i) ? true : null">
                <td *ngFor="let col of columns" [class]="cellClasses(col)">
                  {{ col.accessor(row) }}
                </td>
              </tr>
            </ng-template>
          </ng-template>
        </tbody>
      </table>
    </div>
  `,
})
export class HilalTableComponent {
  @Input() columns: HilalTableColumn[] = [];
  @Input() rows: unknown[] = [];
  @Input() caption?: string;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() sticky = false;
  @Input() loading = false;
  @Input() loadingRows = 4;
  @Input() emptyState?: string;
  @Input() sort: HilalSortState | null = null;
  @Input() isRowSelected?: (row: unknown, index: number) => boolean;
  @Output() sortChange = new EventEmitter<HilalSortState | null>();
  @Output() rowClick = new EventEmitter<{ row: unknown; index: number }>();

  protected tableClasses(): string {
    return [
      'hilal-table',
      this.size === 'sm' ? 'hilal-table--sm' : '',
      this.sticky ? 'hilal-table--sticky' : '',
    ].filter(Boolean).join(' ');
  }

  protected headClasses(col: HilalTableColumn): string {
    return [
      col.align === 'center' ? 'hilal-table__cell--center' : '',
      col.align === 'end' || col.numeric ? 'hilal-table__cell--num' : '',
      col.className || '',
    ].filter(Boolean).join(' ');
  }
  protected cellClasses(col: HilalTableColumn): string { return this.headClasses(col); }

  protected ariaSort(col: HilalTableColumn): 'ascending' | 'descending' | 'none' | null {
    if (!col.sortable) return null;
    if (this.sort?.columnId !== col.id) return 'none';
    return this.sort.direction === 'asc' ? 'ascending' : 'descending';
  }

  protected sortArrow(colId: string): string {
    if (this.sort?.columnId !== colId) return '↕';
    return this.sort.direction === 'asc' ? '↑' : '↓';
  }

  protected toggleSort(colId: string): void {
    if (!this.sort || this.sort.columnId !== colId) {
      this.sortChange.emit({ columnId: colId, direction: 'asc' });
      return;
    }
    if (this.sort.direction === 'asc') {
      this.sortChange.emit({ columnId: colId, direction: 'desc' });
      return;
    }
    this.sortChange.emit(null);
  }

  protected rowClasses(row: unknown, index: number): string {
    const selected = this.isRowSelected?.(row, index) ?? false;
    const interactive = this.rowClick.observed;
    return [
      interactive ? 'hilal-table__row--interactive' : '',
      selected ? 'hilal-table__row--selected' : '',
    ].filter(Boolean).join(' ');
  }

  protected onRowClick(row: unknown, index: number): void {
    if (this.rowClick.observed) this.rowClick.emit({ row, index });
  }

  protected sortedRows(): unknown[] {
    if (!this.sort) return this.rows;
    const col = this.columns.find((c) => c.id === this.sort!.columnId);
    if (!col || !col.sortable) return this.rows;
    const cmp = (a: unknown, b: unknown) => {
      const av = col.accessor(a);
      const bv = col.accessor(b);
      if (av === bv) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv), undefined, { numeric: true });
    };
    const next = [...this.rows].sort(cmp);
    return this.sort.direction === 'desc' ? next.reverse() : next;
  }

  protected skeletonRows(): unknown[] {
    return Array.from({ length: this.loadingRows });
  }
}
