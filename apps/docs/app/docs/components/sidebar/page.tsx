import type { Metadata } from 'next';
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarItem, SidebarFooter, Avatar,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Sidebar' };

export default function SidebarPage() {
  return (
    <>
      <h1>Sidebar</h1>
      <p className="lede">
        Vertical app navigation with header, scrollable nav, and footer slots. Pairs with
        DashboardShell for full app layouts.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '16rem', border: '1px solid var(--hilal-border-subtle)', borderRadius: 'var(--hilal-radius-lg)', overflow: 'hidden' }}>
            <Sidebar>
              <SidebarHeader>
                <strong>Acme</strong>
              </SidebarHeader>
              <SidebarNav>
                <SidebarItem href="#" label="Dashboard" active />
                <SidebarItem href="#" label="Projects" />
                <SidebarItem href="#" label="Customers" />
                <SidebarItem href="#" label="Settings" />
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
    <SidebarItem href="/" label="Dashboard" active />
    <SidebarItem href="/projects" label="Projects" />
    <SidebarItem href="/settings" label="Settings" />
  </SidebarNav>
  <SidebarFooter>…</SidebarFooter>
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
    </>
  );
}
