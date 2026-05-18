import type { ChangeEvent, ReactNode } from 'react';
import { Input, Badge } from '@hilal-ds/react';

export interface SearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder?: string;
  /** Total result count, shown next to the query summary. */
  totalCount?: number;
  /** Filter chips / sort controls rendered on the trailing edge. */
  trailing?: ReactNode;
  /** Leading content rendered before the search input (icon, back button). */
  leading?: ReactNode;
  /** Active filter count — shown as a badge next to "Filters" if you supply your own filters area. */
  activeFiltersCount?: number;
  /** Callback when the user clears the query. */
  onClear?: () => void;
}

/**
 * SearchHeader — a search input + result-count summary + trailing controls.
 * Use at the top of search-results, list, or directory pages.
 */
export function SearchHeader({
  query, onQueryChange, placeholder = 'Search…',
  totalCount, trailing, leading, activeFiltersCount, onClear,
}: SearchHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--hilal-spacing-3)',
        paddingBlock: 'var(--hilal-spacing-4)',
        borderBlockEnd: '1px solid var(--hilal-border-subtle)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-3)', flexWrap: 'wrap' }}>
        {leading}
        <div style={{ flex: '1 1 min(20rem, 100%)', minInlineSize: '12rem' }}>
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onQueryChange(e.target.value)}
            leadingIcon={<span aria-hidden>🔎</span>}
            trailingIcon={
              query && onClear ? (
                <button
                  type="button"
                  onClick={onClear}
                  aria-label="Clear search"
                  style={{ border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer', font: 'inherit' }}
                >
                  ×
                </button>
              ) : undefined
            }
          />
        </div>
        {trailing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-2)', flexShrink: 0 }}>
            {trailing}
          </div>
        ) : null}
      </div>
      {(totalCount !== undefined || activeFiltersCount) ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--hilal-spacing-2)',
            fontSize: 'var(--hilal-font-size-13)',
            color: 'var(--hilal-fg-tertiary)',
          }}
        >
          {totalCount !== undefined ? (
            <span>
              {query ? <>Showing <strong style={{ color: 'var(--hilal-fg-primary)' }}>{totalCount.toLocaleString()}</strong> results for "{query}"</>
                     : <><strong style={{ color: 'var(--hilal-fg-primary)' }}>{totalCount.toLocaleString()}</strong> total</>}
            </span>
          ) : null}
          {activeFiltersCount ? (
            <>
              <span aria-hidden>·</span>
              <span>
                {activeFiltersCount} active <Badge tone="brand">{activeFiltersCount}</Badge>
              </span>
            </>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
