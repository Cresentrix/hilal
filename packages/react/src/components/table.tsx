import {
  forwardRef, useState, useMemo, useCallback,
  type HTMLAttributes, type ReactNode, type Key, type MouseEvent,
} from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const tableVariants = cva('hilal-table', {
  variants: {
    size:   { sm: 'hilal-table--sm', md: '' },
    sticky: { true: 'hilal-table--sticky', false: '' },
  },
  defaultVariants: { size: 'md', sticky: false },
});

export type SortDirection = 'asc' | 'desc';
export interface SortState { columnId: string; direction: SortDirection; }

export interface TableColumn<Row> {
  /** Stable id used for sort state and React keys. */
  id: string;
  /** Header cell content. */
  header: ReactNode;
  /** Cell renderer for a given row. */
  cell: (row: Row, rowIndex: number) => ReactNode;
  /** Set true to enable sorting on this column. */
  sortable?: boolean;
  /** Optional comparator. Defaults to localeCompare on the cell's string representation. */
  sortFn?: (a: Row, b: Row) => number;
  /** Visual alignment helper. */
  align?: 'start' | 'center' | 'end';
  /** Numeric formatting — tabular-nums + right-aligned. */
  numeric?: boolean;
  /** Fixed column width. */
  width?: string | number;
  /** className passed to <th> and <td>. */
  className?: string;
}

export interface TableProps<Row>
  extends Omit<HTMLAttributes<HTMLTableElement>, 'children'>,
    VariantProps<typeof tableVariants> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Stable key per row. Required for React reconciliation. */
  getRowId: (row: Row, index: number) => Key;
  /** Render a caption above the table. */
  caption?: ReactNode;
  /** Uncontrolled initial sort. */
  defaultSort?: SortState;
  /** Controlled sort (pair with onSortChange). */
  sort?: SortState | null;
  onSortChange?: (next: SortState | null) => void;
  /** Make rows clickable. */
  onRowClick?: (row: Row, index: number, e: MouseEvent<HTMLTableRowElement>) => void;
  /** Highlight a row as selected. */
  isRowSelected?: (row: Row, index: number) => boolean;
  loading?: boolean;
  loadingRows?: number;
  emptyState?: ReactNode;
}

const defaultEmpty = 'No rows to display.';

function defaultCompare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export const Table = forwardRef(function Table<Row>(
  {
    columns, rows, getRowId, caption,
    defaultSort, sort, onSortChange,
    onRowClick, isRowSelected,
    loading, loadingRows = 4, emptyState,
    size, sticky, className, ...rest
  }: TableProps<Row>,
  ref: React.Ref<HTMLTableElement>,
) {
  const isControlled = sort !== undefined;
  const [internal, setInternal] = useState<SortState | null>(defaultSort ?? null);
  const sortState = isControlled ? sort : internal;

  const setSort = useCallback((next: SortState | null) => {
    if (!isControlled) setInternal(next);
    onSortChange?.(next);
  }, [isControlled, onSortChange]);

  const toggleSort = useCallback((colId: string) => {
    if (!sortState || sortState.columnId !== colId) { setSort({ columnId: colId, direction: 'asc' }); return; }
    if (sortState.direction === 'asc')               { setSort({ columnId: colId, direction: 'desc' }); return; }
    setSort(null);
  }, [sortState, setSort]);

  const sortedRows = useMemo(() => {
    if (!sortState) return rows;
    const col = columns.find((c) => c.id === sortState.columnId);
    if (!col || !col.sortable) return rows;
    const cmp = col.sortFn
      ? col.sortFn
      : (a: Row, b: Row) => defaultCompare(col.cell(a, 0), col.cell(b, 0));
    const sorted = [...rows].sort(cmp);
    return sortState.direction === 'desc' ? sorted.reverse() : sorted;
  }, [rows, sortState, columns]);

  return (
    <div className="hilal-table-wrap">
      <table
        ref={ref}
        className={cn(tableVariants({ size, sticky }), className)}
        {...rest}
      >
        {caption ? <caption className="hilal-table__caption">{caption}</caption> : null}
        <thead className="hilal-table__head">
          <tr>
            {columns.map((col) => {
              const ariaSort: 'ascending' | 'descending' | 'none' | undefined =
                col.sortable
                  ? sortState?.columnId === col.id
                    ? sortState.direction === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                  : undefined;
              return (
                <th
                  key={col.id}
                  scope="col"
                  className={cn(
                    col.align === 'center' ? 'hilal-table__cell--center' : undefined,
                    col.align === 'end' || col.numeric ? 'hilal-table__cell--num' : undefined,
                    col.className,
                  )}
                  style={col.width ? { inlineSize: col.width } : undefined}
                  aria-sort={ariaSort}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      className="hilal-table__sort"
                      aria-sort={ariaSort}
                      onClick={() => toggleSort(col.id)}
                    >
                      <span>{col.header}</span>
                      <span aria-hidden className="hilal-table__sort-arrow">
                        {sortState?.columnId === col.id
                          ? sortState.direction === 'asc' ? '↑' : '↓'
                          : '↕'}
                      </span>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="hilal-table__body">
          {loading ? (
            Array.from({ length: loadingRows }).map((_, i) => (
              <tr key={`loading-${i}`} className="hilal-table__loading-row">
                {columns.map((col) => (
                  <td key={col.id} className={col.className}>
                    <span className="hilal-skeleton hilal-skeleton--text" style={{ inlineSize: '60%' }} />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="hilal-table__empty">
                {emptyState ?? defaultEmpty}
              </td>
            </tr>
          ) : (
            sortedRows.map((row, i) => {
              const selected = isRowSelected?.(row, i);
              const interactive = !!onRowClick;
              return (
                <tr
                  key={getRowId(row, i)}
                  className={cn(
                    interactive ? 'hilal-table__row--interactive' : undefined,
                    selected ? 'hilal-table__row--selected' : undefined,
                  )}
                  onClick={interactive ? (e) => onRowClick(row, i, e) : undefined}
                  aria-selected={selected || undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn(
                        col.align === 'center' ? 'hilal-table__cell--center' : undefined,
                        col.align === 'end' || col.numeric ? 'hilal-table__cell--num' : undefined,
                        col.className,
                      )}
                    >
                      {col.cell(row, i)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}) as <Row>(props: TableProps<Row> & { ref?: React.Ref<HTMLTableElement> }) => React.ReactElement;
