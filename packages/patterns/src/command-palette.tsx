import {
  useEffect, useMemo, useRef, useState,
  type KeyboardEvent, type ReactNode,
} from 'react';
import { Modal, ModalBody } from '@hilal/react';
import { cn } from './utils/cn.js';

export interface CommandItem {
  id: string;
  label: string;
  /** Secondary text rendered under the label. */
  hint?: ReactNode;
  /** Leading icon. */
  icon?: ReactNode;
  /** Keyboard shortcut hint, e.g. "⌘N". */
  shortcut?: string;
  /** Additional terms that should match the query but aren't shown. */
  keywords?: string[];
  /** Group key — items with the same group are rendered under one heading. */
  group?: string;
  disabled?: boolean;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: ReactNode;
  /** Heading order for groups. Items not listed here go after, in first-seen order. */
  groupOrder?: string[];
  /** Custom filter — default is case-insensitive substring on label + keywords. */
  filter?: (item: CommandItem, query: string) => boolean;
  className?: string;
}

const defaultFilter = (item: CommandItem, query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  if (item.label.toLowerCase().includes(q)) return true;
  return (item.keywords ?? []).some((k) => k.toLowerCase().includes(q));
};

/**
 * CommandPalette — Modal-based ⌘K palette. Filters items by query, groups
 * results by `group`, supports keyboard navigation (↑/↓, Enter, Esc).
 */
export function CommandPalette({
  open, onClose, items,
  placeholder = 'Type a command or search…',
  emptyMessage = 'No matches.',
  groupOrder,
  filter = defaultFilter,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filtered + flattened list, plus per-group structure for rendering.
  const { flat, groups } = useMemo(() => {
    const matched = items.filter((it) => filter(it, query));
    const groupMap = new Map<string, CommandItem[]>();
    for (const it of matched) {
      const key = it.group ?? '';
      const arr = groupMap.get(key) ?? [];
      arr.push(it);
      groupMap.set(key, arr);
    }
    const orderedKeys: string[] = [];
    if (groupOrder) for (const g of groupOrder) if (groupMap.has(g)) orderedKeys.push(g);
    for (const k of groupMap.keys()) if (!orderedKeys.includes(k)) orderedKeys.push(k);
    const _groups = orderedKeys.map((k) => ({ key: k, items: groupMap.get(k)! }));
    const _flat = _groups.flatMap((g) => g.items);
    return { flat: _flat, groups: _groups };
  }, [items, query, filter, groupOrder]);

  // Reset state when opening; focus the input.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      // input focus runs after the dialog is shown.
      const id = window.setTimeout(() => inputRef.current?.focus(), 0);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Keep activeIndex in range as the filter changes.
  useEffect(() => {
    if (activeIndex >= flat.length) setActiveIndex(0);
  }, [flat.length, activeIndex]);

  // Scroll active item into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-cmd-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const move = (delta: number) => {
    if (flat.length === 0) return;
    setActiveIndex((i) => {
      const next = (i + delta + flat.length) % flat.length;
      return next;
    });
  };

  const commit = (item?: CommandItem) => {
    const target = item ?? flat[activeIndex];
    if (!target || target.disabled) return;
    target.onSelect();
    onClose();
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); move(-1); return; }
    if (e.key === 'Enter')     { e.preventDefault(); commit(); return; }
  };

  let runningIndex = -1;

  return (
    <Modal open={open} onClose={onClose} size="md" className={cn('hilal-cmd-palette', className)}>
      <div onKeyDown={onKey} style={rootStyle}>
        <div style={inputRow}>
          <span aria-hidden style={searchGlyph}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            style={inputStyle}
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd style={kbdHint}>Esc</kbd>
        </div>
        <ModalBody style={bodyStyle}>
          {flat.length === 0 ? (
            <div style={emptyStyle}>{emptyMessage}</div>
          ) : (
            <ul ref={listRef} style={listStyle} role="listbox">
              {groups.map((g) => (
                <li key={g.key || '__none'}>
                  {g.key ? <div style={groupHeading}>{g.key}</div> : null}
                  <ul style={listStyle}>
                    {g.items.map((it) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const active = idx === activeIndex;
                      return (
                        <li
                          key={it.id}
                          role="option"
                          aria-selected={active}
                          aria-disabled={it.disabled || undefined}
                          data-cmd-index={idx}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={() => commit(it)}
                          style={{
                            ...rowStyle,
                            ...(active ? activeRow : {}),
                            ...(it.disabled ? disabledRow : {}),
                          }}
                        >
                          {it.icon ? <span style={iconCell} aria-hidden>{it.icon}</span> : <span style={iconSpacer} />}
                          <div style={{ flex: 1, minInlineSize: 0 }}>
                            <div style={labelLine}>{it.label}</div>
                            {it.hint ? <div style={hintLine}>{it.hint}</div> : null}
                          </div>
                          {it.shortcut ? <kbd style={kbdHint}>{it.shortcut}</kbd> : null}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
      </div>
    </Modal>
  );
}

const rootStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  minBlockSize: 0,
};

const inputRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--hilal-spacing-2)',
  paddingInline: 'var(--hilal-spacing-4)',
  paddingBlock: 'var(--hilal-spacing-3)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
} as const;

const searchGlyph = {
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-16)',
} as const;

const inputStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: 'var(--hilal-fg-primary)',
  fontSize: 'var(--hilal-font-size-15)',
  paddingBlock: 'var(--hilal-spacing-1)',
} as const;

const bodyStyle = {
  maxBlockSize: '60vh',
  overflowY: 'auto' as const,
  paddingInline: 'var(--hilal-spacing-1)',
  paddingBlock: 'var(--hilal-spacing-1)',
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
  alignItems: 'center',
  gap: 'var(--hilal-spacing-3)',
  paddingInline: 'var(--hilal-spacing-3)',
  paddingBlock: 'var(--hilal-spacing-2)',
  borderRadius: 'var(--hilal-radius-md)',
  cursor: 'pointer',
  color: 'var(--hilal-fg-primary)',
} as const;

const activeRow = {
  background: 'var(--hilal-bg-subtle)',
} as const;

const disabledRow = {
  opacity: 0.5,
  pointerEvents: 'none' as const,
};

const iconCell = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  inlineSize: '1.5rem',
  blockSize: '1.5rem',
  color: 'var(--hilal-fg-tertiary)',
  flexShrink: 0,
} as const;

const iconSpacer = {
  display: 'inline-block',
  inlineSize: '1.5rem',
  flexShrink: 0,
} as const;

const labelLine = {
  fontSize: 'var(--hilal-font-size-14)',
  fontWeight: 'var(--hilal-font-weight-medium)',
  color: 'var(--hilal-fg-primary)',
} as const;

const hintLine = {
  fontSize: 'var(--hilal-font-size-13)',
  color: 'var(--hilal-fg-tertiary)',
  marginBlockStart: '2px',
} as const;

const kbdHint = {
  fontFamily: 'var(--hilal-font-family-mono, ui-monospace, SFMono-Regular, monospace)',
  fontSize: 'var(--hilal-font-size-12)',
  color: 'var(--hilal-fg-tertiary)',
  background: 'var(--hilal-bg-subtle)',
  border: '1px solid var(--hilal-border-subtle)',
  borderRadius: 'var(--hilal-radius-sm)',
  paddingInline: 'var(--hilal-spacing-2)',
  paddingBlock: '2px',
  flexShrink: 0,
} as const;

const emptyStyle = {
  textAlign: 'center' as const,
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-14)',
  paddingBlock: 'var(--hilal-spacing-6)',
};
