import type { ReactNode, MouseEvent } from 'react';
import { Avatar, EmptyState, Skeleton } from '@hilal/react';
import { cn } from './utils/cn.js';

export interface DataListItem {
  id: string;
  /** Primary text. */
  label: ReactNode;
  /** Secondary text rendered below the label. */
  meta?: ReactNode;
  /** Avatar / icon shown at the start of the row. */
  leading?: ReactNode;
  /** Image src for an avatar — shorthand if you don't want to pass a custom leading. */
  avatarSrc?: string;
  /** Initials fallback for the avatar. */
  initials?: string;
  /** Trailing controls (badge, button, switch, etc.). */
  trailing?: ReactNode;
  /** Make the whole row clickable. */
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface DataListProps {
  items: DataListItem[];
  loading?: boolean;
  /** Skeleton row count. Default 4. */
  loadingRows?: number;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  emptyActions?: ReactNode;
  className?: string;
}

/**
 * DataList — a vertical list of rows with optional avatar/leading, primary +
 * secondary text, and trailing actions. Handles loading and empty states.
 */
export function DataList({
  items, loading = false, loadingRows = 4,
  emptyTitle = 'Nothing here yet', emptyDescription, emptyActions, className,
}: DataListProps) {
  if (loading) {
    return (
      <ul className={cn(className)} style={listStyle}>
        {Array.from({ length: loadingRows }).map((_, i) => (
          <li key={i} style={rowStyle}>
            <Skeleton variant="circle" size="2.5rem" />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" style={{ marginBlockStart: 'var(--hilal-spacing-1)' }} />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} actions={emptyActions} />;
  }

  return (
    <ul className={cn(className)} style={listStyle}>
      {items.map((item) => {
        const Tag: 'a' | 'div' = item.href ? 'a' : 'div';
        const interactive = !!(item.href || item.onClick);
        return (
          <li key={item.id}>
            <Tag
              {...(item.href ? { href: item.href } : {})}
              onClick={item.onClick}
              style={{
                ...rowStyle,
                ...(interactive ? interactiveRow : {}),
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {item.leading ?? (
                item.avatarSrc || item.initials
                  ? <Avatar size="md" src={item.avatarSrc} initials={item.initials} />
                  : null
              )}
              <div style={{ flex: 1, minInlineSize: 0 }}>
                <div style={{ fontWeight: 'var(--hilal-font-weight-medium)', color: 'var(--hilal-fg-primary)' }}>
                  {item.label}
                </div>
                {item.meta ? (
                  <div style={{ fontSize: 'var(--hilal-font-size-13)', color: 'var(--hilal-fg-tertiary)', marginBlockStart: '2px' }}>
                    {item.meta}
                  </div>
                ) : null}
              </div>
              {item.trailing ? <div style={{ flexShrink: 0 }}>{item.trailing}</div> : null}
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

const listStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none' as const,
  display: 'flex',
  flexDirection: 'column' as const,
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--hilal-spacing-3)',
  paddingBlock: 'var(--hilal-spacing-3)',
  paddingInline: 'var(--hilal-spacing-3)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
};

const interactiveRow = {
  cursor: 'pointer',
  transition: 'background-color var(--hilal-motion-duration-fast) var(--hilal-motion-easing-standard)',
};
