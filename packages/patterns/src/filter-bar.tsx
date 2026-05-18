import type { ReactNode } from 'react';
import { Button } from '@hilal-ds/react';

export interface FilterPill {
  id: string;
  label: ReactNode;
  /** Optional count badge to render after the label. */
  count?: number;
  active?: boolean;
  disabled?: boolean;
}

export interface FilterBarProps {
  filters: FilterPill[];
  onToggle: (id: string) => void;
  /** Show "Clear all" when at least one filter is active. */
  onClearAll?: () => void;
  /** Optional leading content (e.g. a "Filters:" label). */
  leading?: ReactNode;
  /** Optional trailing content (e.g. a sort dropdown). */
  trailing?: ReactNode;
}

/**
 * FilterBar — horizontal row of toggleable filter pills.
 * Each pill is a button with `aria-pressed`. Renders "Clear all" when any are active.
 */
export function FilterBar({ filters, onToggle, onClearAll, leading, trailing }: FilterBarProps) {
  const hasActive = filters.some((f) => f.active);
  return (
    <div
      role="toolbar"
      aria-label="Filters"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--hilal-spacing-2)',
        paddingBlock: 'var(--hilal-spacing-3)',
      }}
    >
      {leading ? (
        <div style={{ fontSize: 'var(--hilal-font-size-13)', color: 'var(--hilal-fg-tertiary)', marginInlineEnd: 'var(--hilal-spacing-1)' }}>
          {leading}
        </div>
      ) : null}
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="switch"
          aria-pressed={!!f.active}
          aria-label={typeof f.label === 'string' ? f.label : undefined}
          disabled={f.disabled}
          onClick={() => onToggle(f.id)}
          style={pillStyle(!!f.active, !!f.disabled)}
        >
          {f.label}
          {f.count !== undefined ? (
            <span style={countStyle(!!f.active)}>{f.count.toLocaleString()}</span>
          ) : null}
        </button>
      ))}
      {hasActive && onClearAll ? (
        <Button variant="tertiary" size="sm" onClick={onClearAll}>Clear all</Button>
      ) : null}
      {trailing ? (
        <div style={{ marginInlineStart: 'auto', display: 'flex', gap: 'var(--hilal-spacing-2)' }}>{trailing}</div>
      ) : null}
    </div>
  );
}

function pillStyle(active: boolean, disabled: boolean) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--hilal-spacing-2)',
    paddingInline: 'var(--hilal-spacing-3)',
    paddingBlock: '0.375rem',
    borderRadius: 'var(--hilal-radius-full)',
    border: '1px solid',
    borderColor: active ? 'var(--hilal-button-primary-default)' : 'var(--hilal-border-default)',
    background: active ? 'var(--hilal-color-brand-blue-10)' : 'var(--hilal-bg-page)',
    color: active ? 'var(--hilal-button-primary-default)' : 'var(--hilal-fg-secondary)',
    fontFamily: 'inherit',
    fontSize: 'var(--hilal-font-size-13)',
    fontWeight: 'var(--hilal-font-weight-medium)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  } as const;
}

function countStyle(active: boolean) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    minInlineSize: '1.25rem',
    paddingInline: '0.375rem',
    borderRadius: 'var(--hilal-radius-full)',
    background: active ? 'var(--hilal-button-primary-default)' : 'var(--hilal-bg-raised)',
    color: active ? 'var(--hilal-fg-inverse)' : 'var(--hilal-fg-tertiary)',
    fontSize: 'var(--hilal-font-size-12)',
    fontWeight: 'var(--hilal-font-weight-semibold)',
    lineHeight: 1,
  } as const;
}
