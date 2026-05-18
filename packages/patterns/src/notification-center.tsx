import type { ReactNode } from 'react';
import {
  Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose,
  Avatar, Button, EmptyState,
} from '@hilal/react';
import { cn } from './utils/cn.js';

export interface NotificationItem {
  id: string;
  /** Primary title line. */
  title: ReactNode;
  /** Optional body / preview text. */
  body?: ReactNode;
  /** Timestamp string. Caller formats — no Date logic baked in. */
  time?: ReactNode;
  /** Avatar src or icon. Pass either avatarSrc/initials or a custom leading slot via icon. */
  avatarSrc?: string;
  initials?: string;
  icon?: ReactNode;
  /** Bucket label, e.g. "Today", "Earlier". Items keep ordering within a group. */
  group?: string;
  /** Unread items get a dot + emphasized title. */
  unread?: boolean;
  /** Clicking the row. */
  onClick?: () => void;
  /** Optional explicit href instead of onClick. */
  href?: string;
}

export interface NotificationCenterProps {
  open: boolean;
  onClose: () => void;
  items: NotificationItem[];
  title?: ReactNode;
  /** Group display order. Unlisted groups appear after, in first-seen order. */
  groupOrder?: string[];
  /** Show the "Mark all as read" button. Only enabled when there are unread items. */
  onMarkAllRead?: () => void;
  /** Drawer side. Default 'end'. */
  side?: 'start' | 'end';
  /** Optional footer slot — replaces the default footer if provided. */
  footer?: ReactNode;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  className?: string;
}

/**
 * NotificationCenter — Drawer-based notification feed grouped by bucket
 * (Today / Earlier / etc.). Renders unread state, mark-all-read action,
 * and an empty state when items.length === 0.
 */
export function NotificationCenter({
  open, onClose, items,
  title = 'Notifications',
  groupOrder,
  onMarkAllRead,
  side = 'end',
  footer,
  emptyTitle = 'You’re all caught up',
  emptyDescription = 'New notifications will show up here.',
  className,
}: NotificationCenterProps) {
  const groups = groupItems(items, groupOrder);
  const unreadCount = items.filter((i) => i.unread).length;

  return (
    <Drawer open={open} onClose={onClose} side={side} size="md" className={cn('hilal-notification-center', className)}>
      <DrawerHeader>
        <DrawerTitle>
          {title}
          {unreadCount > 0 ? (
            <span style={countPill} aria-label={`${unreadCount} unread`}>{unreadCount}</span>
          ) : null}
        </DrawerTitle>
        <DrawerClose onClick={onClose} />
      </DrawerHeader>
      <DrawerBody style={bodyStyle}>
        {items.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <ul style={listStyle}>
            {groups.map((g) => (
              <li key={g.key || '__none'} style={{ marginBlockEnd: 'var(--hilal-spacing-4)' }}>
                {g.key ? <div style={groupHeading}>{g.key}</div> : null}
                <ul style={listStyle}>
                  {g.items.map((it) => {
                    const Tag: 'a' | 'button' | 'div' = it.href ? 'a' : it.onClick ? 'button' : 'div';
                    const interactive = !!(it.href || it.onClick);
                    return (
                      <li key={it.id}>
                        <Tag
                          {...(it.href ? { href: it.href } : {})}
                          {...(Tag === 'button' ? { type: 'button' as const } : {})}
                          onClick={it.onClick}
                          style={{
                            ...rowStyle,
                            ...(interactive ? interactiveRow : {}),
                            ...(it.unread ? unreadRow : {}),
                            textAlign: 'start' as const,
                            textDecoration: 'none',
                            color: 'inherit',
                            font: 'inherit',
                          }}
                        >
                          <span style={unreadDotCell} aria-hidden>
                            {it.unread ? <span style={unreadDot} /> : null}
                          </span>
                          {it.icon ? (
                            <span style={leadingIcon} aria-hidden>{it.icon}</span>
                          ) : (it.avatarSrc || it.initials) ? (
                            <Avatar size="sm" src={it.avatarSrc} initials={it.initials} />
                          ) : null}
                          <div style={{ flex: 1, minInlineSize: 0 }}>
                            <div style={{ ...titleLine, ...(it.unread ? unreadTitle : {}) }}>
                              {it.title}
                            </div>
                            {it.body ? <div style={bodyLine}>{it.body}</div> : null}
                            {it.time ? <div style={timeLine}>{it.time}</div> : null}
                          </div>
                        </Tag>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </DrawerBody>
      {footer !== undefined ? (
        <DrawerFooter>{footer}</DrawerFooter>
      ) : onMarkAllRead ? (
        <DrawerFooter>
          <Button variant="tertiary" onClick={onMarkAllRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </DrawerFooter>
      ) : null}
    </Drawer>
  );
}

function groupItems(items: NotificationItem[], order?: string[]) {
  const map = new Map<string, NotificationItem[]>();
  for (const it of items) {
    const k = it.group ?? '';
    const arr = map.get(k) ?? [];
    arr.push(it);
    map.set(k, arr);
  }
  const keys: string[] = [];
  if (order) for (const g of order) if (map.has(g)) keys.push(g);
  for (const k of map.keys()) if (!keys.includes(k)) keys.push(k);
  return keys.map((k) => ({ key: k, items: map.get(k)! }));
}

const bodyStyle = {
  paddingInline: 'var(--hilal-spacing-2)',
};

const listStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none' as const,
} as const;

const groupHeading = {
  paddingInline: 'var(--hilal-spacing-3)',
  paddingBlock: 'var(--hilal-spacing-2)',
  fontSize: 'var(--hilal-font-size-12)',
  fontWeight: 'var(--hilal-font-weight-semibold)',
  color: 'var(--hilal-fg-tertiary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
} as const;

const rowStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 'var(--hilal-spacing-3)',
  paddingInline: 'var(--hilal-spacing-3)',
  paddingBlock: 'var(--hilal-spacing-3)',
  borderRadius: 'var(--hilal-radius-md)',
  inlineSize: '100%',
  background: 'transparent',
  border: 'none',
} as const;

const interactiveRow = {
  cursor: 'pointer',
  transition: 'background-color var(--hilal-motion-duration-fast) var(--hilal-motion-easing-standard)',
} as const;

const unreadRow = {
  background: 'var(--hilal-bg-subtle)',
} as const;

const unreadDotCell = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '0.625rem',
  blockSize: '0.625rem',
  marginBlockStart: '0.45rem',
  flexShrink: 0,
} as const;

const unreadDot = {
  inlineSize: '0.5rem',
  blockSize: '0.5rem',
  borderRadius: '50%',
  background: 'var(--hilal-bg-brand)',
} as const;

const leadingIcon = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '2rem',
  blockSize: '2rem',
  borderRadius: '50%',
  background: 'var(--hilal-bg-subtle)',
  color: 'var(--hilal-fg-tertiary)',
  flexShrink: 0,
} as const;

const titleLine = {
  fontSize: 'var(--hilal-font-size-14)',
  color: 'var(--hilal-fg-primary)',
  fontWeight: 'var(--hilal-font-weight-regular)',
  lineHeight: 1.4,
} as const;

const unreadTitle = {
  fontWeight: 'var(--hilal-font-weight-semibold)',
} as const;

const bodyLine = {
  fontSize: 'var(--hilal-font-size-13)',
  color: 'var(--hilal-fg-tertiary)',
  marginBlockStart: '2px',
  lineHeight: 1.4,
} as const;

const timeLine = {
  fontSize: 'var(--hilal-font-size-12)',
  color: 'var(--hilal-fg-tertiary)',
  marginBlockStart: 'var(--hilal-spacing-1)',
} as const;

const countPill = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginInlineStart: 'var(--hilal-spacing-2)',
  paddingInline: 'var(--hilal-spacing-2)',
  minInlineSize: '1.25rem',
  blockSize: '1.25rem',
  fontSize: 'var(--hilal-font-size-12)',
  fontWeight: 'var(--hilal-font-weight-semibold)',
  background: 'var(--hilal-bg-brand)',
  color: 'var(--hilal-fg-on-brand, #fff)',
  borderRadius: '999px',
} as const;
