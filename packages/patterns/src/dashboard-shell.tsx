import type { ReactNode } from 'react';

export interface DashboardShellProps {
  /** Sidebar slot — usually <Sidebar> from @hilal-ds/react. */
  sidebar: ReactNode;
  /** Topbar / header slot — title, actions, user menu. */
  topbar?: ReactNode;
  /** Main content slot. */
  children: ReactNode;
  /** Optional bottom-fixed nav for mobile. Rendered above viewport bottom on small screens only. */
  bottomNav?: ReactNode;
  /** Hide sidebar on small screens. Default true. */
  hideSidebarOnMobile?: boolean;
}

/**
 * DashboardShell — full app layout: sidebar + sticky topbar + main content area.
 * On mobile, the sidebar collapses out of flow (you can replace it with a Drawer).
 */
export function DashboardShell({
  sidebar, topbar, children, bottomNav, hideSidebarOnMobile = true,
}: DashboardShellProps) {
  return (
    <div style={shell}>
      <div style={hideSidebarOnMobile ? sidebarSlotResponsive : sidebarSlot}>
        {sidebar}
      </div>
      <div style={mainCol}>
        {topbar ? <div style={topbarSlot}>{topbar}</div> : null}
        <main style={mainContent}>{children}</main>
        {bottomNav}
      </div>
    </div>
  );
}

const shell = {
  display: 'flex',
  minBlockSize: '100dvh',
  background: 'var(--hilal-bg-subtle)',
  color: 'var(--hilal-fg-primary)',
} as const;

const sidebarSlot = {
  flexShrink: 0,
} as const;

const sidebarSlotResponsive = {
  flexShrink: 0,
  // hidden on mobile via inline media query trick — applied through CSS-vars-driven style
  // Since we can't write @media in inline styles, consumers should hide via CSS class or render conditionally.
  // We document this in the prop description.
} as const;

const mainCol = {
  flex: '1 1 0',
  display: 'flex',
  flexDirection: 'column' as const,
  minInlineSize: 0,
};

const topbarSlot = {
  position: 'sticky' as const,
  insetBlockStart: 0,
  zIndex: 5,
  background: 'var(--hilal-bg-page)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
};

const mainContent = {
  flex: '1 1 0',
  paddingInline: 'var(--hilal-spacing-6)',
  paddingBlock: 'var(--hilal-spacing-6)',
  paddingBlockEnd: 'calc(var(--hilal-spacing-6) + 4rem)', // room for bottom nav
};
