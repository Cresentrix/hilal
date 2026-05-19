import type { Metadata } from 'next';
import {
  Sidebar, SidebarHeader, SidebarNav, SidebarSection, SidebarItem, SidebarFooter,
  Avatar, Badge, Button,
} from '@hilal-ds/react';
import {
  DashboardShell, StatsGrid, DataList, PageHeader, type StatItem, type DataListItem,
} from '@hilal-ds/patterns';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Dashboard' };

const stats: StatItem[] = [
  { id: '1', label: 'Revenue',      value: '$42,318', delta: '12.4%', trend: 'up',   hint: 'vs last week' },
  { id: '2', label: 'Active users', value: '8,204',   delta: '3.1%',  trend: 'up',   hint: 'vs last week' },
  { id: '3', label: 'Refund rate',  value: '0.42%',   delta: '0.05%', trend: 'down', hint: 'vs last week' },
  { id: '4', label: 'NPS',          value: '57',      delta: '—',     trend: 'flat', hint: 'no change' },
];

const recent: DataListItem[] = [
  { id: '1', label: 'Sara Al-Mutairi closed PR #1284', meta: '2h ago · Project starlight', initials: 'SA', trailing: <Badge tone="success" size="sm">Merged</Badge> },
  { id: '2', label: 'Mohamed M. invited Khaled',        meta: '3h ago · Team',              initials: 'MM', trailing: <Badge tone="info" size="sm">Sent</Badge> },
  { id: '3', label: 'Deployment to production',         meta: '4h ago · main → prod',       trailing: <Badge tone="success" size="sm">OK</Badge> },
  { id: '4', label: 'New billing invoice',              meta: '1d ago · $128.00',           trailing: <Badge tone="neutral" size="sm">Unpaid</Badge> },
];

export default function DashboardRecipe() {
  return (
    <>
      <h1>Dashboard</h1>
      <p className="lede">
        DashboardShell with a Sidebar, page header, KPI grid, and a recent-activity list. A
        complete admin home built from primitives + patterns.
      </p>

      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          overflow: 'hidden',
          background: 'var(--hilal-bg-page)',
          blockSize: '40rem',
        }}
      >
        <DashboardShell
          sidebar={
            <div style={{ inlineSize: '14rem', borderInlineEnd: '1px solid var(--hilal-border-subtle)', blockSize: '100%', background: 'var(--hilal-bg-page)' }}>
              <Sidebar>
                <SidebarHeader><strong>Acme</strong></SidebarHeader>
                <SidebarNav>
                  <SidebarSection>
                    <SidebarItem href="#" icon={<span aria-hidden>◧</span>} label="Dashboard" active />
                    <SidebarItem href="#" icon={<span aria-hidden>◫</span>} label="Inbox" trailing={<Badge tone="brand" size="sm">12</Badge>} />
                    <SidebarItem href="#" icon={<span aria-hidden>☷</span>} label="Projects" />
                    <SidebarItem href="#" icon={<span aria-hidden>♟</span>} label="Customers" />
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
          topbar={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: 'var(--hilal-spacing-6)', paddingBlock: 'var(--hilal-spacing-3)' }}>
              <strong>Dashboard</strong>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button size="sm" variant="tertiary">Invite</Button>
                <Button size="sm">New project</Button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-6)' }}>
            <PageHeader
              title="Overview"
              description="Last 7 days, all projects."
            />
            <StatsGrid items={stats} />
            <div>
              <h2 style={{ marginBlock: '0 var(--hilal-spacing-3)', fontSize: 'var(--hilal-font-size-16)' }}>Recent activity</h2>
              <DataList items={recent} />
            </div>
          </div>
        </DashboardShell>
      </div>

      <H2>Source</H2>
      <pre className="preview__code"><code>{`<DashboardShell
  sidebar={<Sidebar>…</Sidebar>}
  topbar={<TopBar />}
>
  <PageHeader title="Overview" description="Last 7 days, all projects." />
  <StatsGrid items={stats} />
  <h2>Recent activity</h2>
  <DataList items={recent} />
</DashboardShell>`}</code></pre>
    </>
  );
}
