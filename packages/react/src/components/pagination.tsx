import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn.js';

const paginationVariants = cva('hilal-pagination', {
  variants: { size: { sm: 'hilal-pagination--sm', md: '' } },
  defaultVariants: { size: 'md' },
});

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'>,
    VariantProps<typeof paginationVariants> {
  /** 1-based current page. */
  page: number;
  /** Total page count. */
  total: number;
  /** Maximum number of numeric buttons (excluding ellipses & arrows). */
  siblingCount?: number;
  onChange?: (page: number) => void;
  prevLabel?: string;
  nextLabel?: string;
}

function range(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}

function buildPages(page: number, total: number, siblingCount: number): (number | 'ellipsis')[] {
  if (total <= 7) return range(1, total);
  const start = Math.max(2, page - siblingCount);
  const end = Math.min(total - 1, page + siblingCount);
  const pages: (number | 'ellipsis')[] = [1];
  if (start > 2) pages.push('ellipsis');
  pages.push(...range(start, end));
  if (end < total - 1) pages.push('ellipsis');
  pages.push(total);
  return pages;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { page, total, siblingCount = 1, onChange, size, prevLabel = 'Previous', nextLabel = 'Next', className, ...rest },
  ref,
) {
  const pages = buildPages(page, total, siblingCount);
  const go = (p: number) => onChange?.(Math.min(Math.max(1, p), total));

  return (
    <nav ref={ref} className={cn(paginationVariants({ size }), className)} aria-label="Pagination" {...rest}>
      <button type="button" className="hilal-pagination__btn" data-prev disabled={page <= 1} onClick={() => go(page - 1)} aria-label={prevLabel}>‹</button>
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="hilal-pagination__ellipsis" aria-hidden>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className="hilal-pagination__btn"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => go(p)}
          >
            {p}
          </button>
        ),
      )}
      <button type="button" className="hilal-pagination__btn" data-next disabled={page >= total} onClick={() => go(page + 1)} aria-label={nextLabel}>›</button>
    </nav>
  );
});
