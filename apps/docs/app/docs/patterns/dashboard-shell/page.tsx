import type { Metadata } from 'next';
import { DashboardShell } from '@hilal-ds/patterns';
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarItem, SidebarFooter, Avatar, Button,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'DashboardShell' };

export default function DashboardShellPage() {
  return (
    <>
      <h1>DashboardShell</h1>
      <p className="lede">
        Full app chrome — sidebar slot, sticky topbar, main content area, and an optional
        mobile bottom-nav. Mostly a layout primitive; pair with Sidebar + your own topbar.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%', border: '1px solid var(--hilal-border-subtle)', borderRadius: 'var(--hilal-radius-lg)', overflow: 'hidden', height: '24rem' }}>
            <DashboardShell
              sidebar={
                <div style={{ inlineSize: '14rem', borderInlineEnd: '1px solid var(--hilal-border-subtle)', blockSize: '100%' }}>
                  <Sidebar>
                    <SidebarHeader><strong>Acme</strong></SidebarHeader>
                    <SidebarNav>
                      <SidebarItem href="#" label="Dashboard" active />
                      <SidebarItem href="#" label="Projects" />
                      <SidebarItem href="#" label="Customers" />
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
              topbar={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 'var(--hilal-spacing-6)', paddingBlock: 'var(--hilal-spacing-3)' }}>
                  <strong>Dashboard</strong>
                  <Button size="sm">New project</Button>
                </div>
              }
            >
              <p style={{ color: 'var(--hilal-fg-secondary)' }}>Main content lives here.</p>
            </DashboardShell>
          </div>
        }
        react={`<DashboardShell
  sidebar={<Sidebar>…</Sidebar>}
  topbar={<MyTopbar />}
>
  {/* page content */}
</DashboardShell>`}
        angular={`<hilal-dashboard-shell>
  <hilal-sidebar hilalDashboardSidebar>…</hilal-sidebar>
  <my-topbar hilalDashboardTopbar></my-topbar>
  <router-outlet></router-outlet>
</hilal-dashboard-shell>`}
        blade={`<x-hilal-dashboard-shell>
  <x-slot:sidebar><x-hilal-sidebar>…</x-hilal-sidebar></x-slot:sidebar>
  <x-slot:topbar>{{ $topbar }}</x-slot:topbar>
  {{ $slot }}
</x-hilal-dashboard-shell>`}
      />
    </>
  );
}
