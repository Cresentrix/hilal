import type { ReactNode } from 'react';
import { Skeleton, Badge } from '@hilal-ds/react';
import { cn } from './utils/cn.js';

export type StatDeltaTrend = 'up' | 'down' | 'flat';

export interface StatItem {
  id: string;
  /** Short label above the value, e.g. "Revenue". */
  label: ReactNode;
  /** Big primary number/string, e.g. "$42,318". */
  value: ReactNode;
  /** Optional supporting text below the value, e.g. "vs. last week". */
  hint?: ReactNode;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional delta — renders as a Badge with trend-colored tone. */
  delta?: ReactNode;
  /** Trend direction for the delta badge. Default 'up'. */
  trend?: StatDeltaTrend;
  /** Make the card clickable. */
  href?: string;
  onClick?: () => void;
}

export interface StatsGridProps {
  items: StatItem[];
  /** Min card width — controls how many columns fit per row. Default '14rem'. */
  minColumnWidth?: string;
  loading?: boolean;
  /** Skeleton card count. Default = items.length || 4. */
  loadingCount?: number;
  className?: string;
}

/**
 * StatsGrid — responsive row of KPI cards. Auto-fits as many columns as fit
 * the container at `minColumnWidth`, wrapping on smaller screens.
 */
export function StatsGrid({
  items, minColumnWidth = '14rem',
  loading = false, loadingCount, className,
}: StatsGridProps) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
    gap: 'var(--hilal-spacing-4)',
  } as const;

  if (loading) {
    const count = loadingCount ?? items.length ?? 4;
    return (
      <div className={cn(className)} style={gridStyle}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={cardStyle}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="70%" style={{ marginBlockStart: 'var(--hilal-spacing-2)', height: '1.5rem' }} />
            <Skeleton variant="text" width="35%" style={{ marginBlockStart: 'var(--hilal-spacing-2)' }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(className)} style={gridStyle}>
      {items.map((item) => {
        const Tag: 'a' | 'button' | 'div' = item.href ? 'a' : item.onClick ? 'button' : 'div';
        const interactive = !!(item.href || item.onClick);
        return (
          <Tag
            key={item.id}
            {...(item.href ? { href: item.href } : {})}
            {...(Tag === 'button' ? { type: 'button' as const } : {})}
            onClick={item.onClick}
            style={{
              ...cardStyle,
              ...(interactive ? interactiveCard : {}),
              textAlign: 'start' as const,
              textDecoration: 'none',
              color: 'inherit',
              font: 'inherit',
            }}
          >
            <div style={headerRow}>
              <span style={labelStyle}>{item.label}</span>
              {item.icon ? <span style={iconStyle} aria-hidden>{item.icon}</span> : null}
            </div>
            <div style={valueStyle}>{item.value}</div>
            {(item.delta || item.hint) ? (
              <div style={footerRow}>
                {item.delta ? (
                  <Badge tone={trendTone(item.trend ?? 'up')} size="sm">
                    {trendGlyph(item.trend ?? 'up')} {item.delta}
                  </Badge>
                ) : null}
                {item.hint ? <span style={hintStyle}>{item.hint}</span> : null}
              </div>
            ) : null}
          </Tag>
        );
      })}
    </div>
  );
}

function trendTone(t: StatDeltaTrend): 'success' | 'danger' | 'neutral' {
  if (t === 'up') return 'success';
  if (t === 'down') return 'danger';
  return 'neutral';
}

function trendGlyph(t: StatDeltaTrend): string {
  if (t === 'up') return '↑';
  if (t === 'down') return '↓';
  return '→';
}

const cardStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--hilal-spacing-2)',
  padding: 'var(--hilal-spacing-4)',
  background: 'var(--hilal-bg-page)',
  border: '1px solid var(--hilal-border-subtle)',
  borderRadius: 'var(--hilal-radius-lg)',
  minInlineSize: 0,
};

const interactiveCard = {
  cursor: 'pointer',
  transition: 'border-color var(--hilal-motion-duration-fast) var(--hilal-motion-easing-standard), background-color var(--hilal-motion-duration-fast) var(--hilal-motion-easing-standard)',
} as const;

const headerRow = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 'var(--hilal-spacing-2)',
} as const;

const labelStyle = {
  fontSize: 'var(--hilal-font-size-13)',
  color: 'var(--hilal-fg-tertiary)',
  fontWeight: 'var(--hilal-font-weight-medium)',
} as const;

const iconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '1.5rem',
  blockSize: '1.5rem',
  color: 'var(--hilal-fg-tertiary)',
} as const;

const valueStyle = {
  fontSize: 'var(--hilal-font-size-24)',
  fontWeight: 'var(--hilal-font-weight-semibold)',
  color: 'var(--hilal-fg-primary)',
  lineHeight: 1.2,
} as const;

const footerRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--hilal-spacing-2)',
  marginBlockStart: 'var(--hilal-spacing-1)',
} as const;

const hintStyle = {
  fontSize: 'var(--hilal-font-size-13)',
  color: 'var(--hilal-fg-tertiary)',
} as const;
