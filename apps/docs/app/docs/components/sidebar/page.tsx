import type { Metadata } from 'next';
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarSection, SidebarItem, SidebarFooter, Avatar, Badge,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Sidebar' };

const frame = {
  border: '1px solid var(--hilal-border-subtle)',
  borderRadius: 'var(--hilal-radius-lg)',
  overflow: 'hidden',
} as const;

export default function SidebarPage() {
  return (
    <>
      <h1>Sidebar</h1>
      <p className="lede">
        Vertical app navigation. Composes Header / Nav / Section / Item / Footer slots.
        Pair with DashboardShell for a full app layout.
      </p>

      <H2>Basic</H2>
      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '16rem', ...frame }}>
            <Sidebar>
              <SidebarHeader><strong>Acme</strong></SidebarHeader>
              <SidebarNav>
                <SidebarItem href="#" label="Dashboard" active />
                <SidebarItem href="#" label="Projects" />
                <SidebarItem href="#" label="Customers" />
                <SidebarItem href="#" label="Settings" />
              </SidebarNav>
            </Sidebar>
          </div>
        }
        react={`<Sidebar>
  <SidebarHeader><strong>Acme</strong></SidebarHeader>
  <SidebarNav>
    <SidebarItem href="/" label="Dashboard" active />
    <SidebarItem href="/projects" label="Projects" />
    <SidebarItem href="/customers" label="Customers" />
    <SidebarItem href="/settings" label="Settings" />
  </SidebarNav>
</Sidebar>`}
        angular={`<hilal-sidebar>
  <hilal-sidebar-header><strong>Acme</strong></hilal-sidebar-header>
  <hilal-sidebar-nav>
    <hilal-sidebar-item href="/" label="Dashboard" [active]="true"></hilal-sidebar-item>
    <hilal-sidebar-item href="/projects" label="Projects"></hilal-sidebar-item>
  </hilal-sidebar-nav>
</hilal-sidebar>`}
        blade={`<x-hilal-sidebar>
  <x-slot:header><strong>Acme</strong></x-slot:header>
  <x-hilal-sidebar-item href="/" label="Dashboard" :active="true" />
  <x-hilal-sidebar-item href="/projects" label="Projects" />
</x-hilal-sidebar>`}
      />

      <H2>With sections, icons, badges, and footer</H2>
      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '16rem', ...frame }}>
            <Sidebar>
              <SidebarHeader><strong>Acme</strong></SidebarHeader>
              <SidebarNav>
                <SidebarSection>
                  <SidebarItem href="#" icon={<span aria-hidden>◧</span>} label="Dashboard" active />
                  <SidebarItem href="#" icon={<span aria-hidden>◫</span>} label="Inbox" trailing={<Badge tone="brand" size="sm">12</Badge>} />
                  <SidebarItem href="#" icon={<span aria-hidden>☷</span>} label="Projects" />
                </SidebarSection>
                <SidebarSection>
                  <SidebarItem href="#" icon={<span aria-hidden>⚙</span>} label="Settings" />
                  <SidebarItem href="#" icon={<span aria-hidden>?</span>} label="Help" />
                </SidebarSection>
              </SidebarNav>
              <SidebarFooter>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Avatar initials="SA" size="sm" />
                  <span style={{ fontSize: 'var(--hilal-font-size-13)' }}>Sara A.</span>
                </div>
              </SidebarFooter>
            </Sidebar>
          </div>
        }
        react={`<Sidebar>
  <SidebarHeader><strong>Acme</strong></SidebarHeader>
  <SidebarNav>
    <SidebarSection>
      <SidebarItem icon={<DashboardIcon />} label="Dashboard" href="/" active />
      <SidebarItem icon={<InboxIcon />}     label="Inbox" trailing={<Badge tone="brand">12</Badge>} />
    </SidebarSection>
    <SidebarSection>
      <SidebarItem icon={<SettingsIcon />}  label="Settings" />
    </SidebarSection>
  </SidebarNav>
  <SidebarFooter>
    <Avatar initials="SA" size="sm" />
    <span>Sara A.</span>
  </SidebarFooter>
</Sidebar>`}
        angular={`<hilal-sidebar>
  <hilal-sidebar-nav>
    <hilal-sidebar-item href="/" label="Dashboard" [active]="true">
      <span hilalSidebarItemIcon>◧</span>
    </hilal-sidebar-item>
  </hilal-sidebar-nav>
</hilal-sidebar>`}
        blade={`<x-hilal-sidebar>
  <x-hilal-sidebar-item href="/" label="Dashboard" :active="true" />
</x-hilal-sidebar>`}
      />

      <H2>Collapsed</H2>
      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '5rem', ...frame }}>
            <Sidebar collapsed>
              <SidebarNav>
                <SidebarItem href="#" icon={<span aria-hidden>◧</span>} label="Dashboard" active />
                <SidebarItem href="#" icon={<span aria-hidden>◫</span>} label="Inbox" />
                <SidebarItem href="#" icon={<span aria-hidden>☷</span>} label="Projects" />
                <SidebarItem href="#" icon={<span aria-hidden>⚙</span>} label="Settings" />
              </SidebarNav>
            </Sidebar>
          </div>
        }
        react={`<Sidebar collapsed>
  <SidebarNav>
    <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
    <SidebarItem icon={<InboxIcon />}     label="Inbox" />
  </SidebarNav>
</Sidebar>`}
        angular={`<hilal-sidebar [collapsed]="true">…</hilal-sidebar>`}
        blade={`<x-hilal-sidebar :collapsed="true">…</x-hilal-sidebar>`}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`<Sidebar>
  collapsed   boolean    icon-only mode (default: false)

<SidebarItem>
  icon        ReactNode
  label       ReactNode    required
  active      boolean      highlights as current
  trailing    ReactNode    e.g. badge or shortcut
  …           all native <a> attributes`}</code></pre>
      <Accessibility
        summary={<>Renders as <code>{"<aside>"}</code>. Sidebar items render as links; the active item carries <code>{"aria-current=\"page\""}</code>.</>}
        keys={[
                {
                        "keys": "Tab",
                        "action": "Move through items"
                },
                {
                        "keys": "Enter",
                        "action": "Activate the focused link"
                }
        ]}
      />
    </>
  );
}
