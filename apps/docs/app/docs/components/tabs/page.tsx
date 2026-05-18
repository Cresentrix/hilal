'use client';

import { Tabs, TabList, Tab, TabPanel, Badge } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export default function TabsPage() {
  return (
    <>
      <h1>Tabs</h1>
      <p className="lede">
        Tabbed content with three visual variants, two sizes, and horizontal or vertical
        orientation. Built on ARIA tab semantics — Home/End/arrow keys move focus.
      </p>

      <h2>Variants</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            {(['line', 'enclosed', 'pill'] as const).map((v) => (
              <div key={v}>
                <div style={{ fontSize: 'var(--hilal-font-size-12)', color: 'var(--hilal-fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{v}</div>
                <Tabs defaultValue="overview" variant={v}>
                  <TabList>
                    <Tab value="overview">Overview</Tab>
                    <Tab value="activity">Activity</Tab>
                    <Tab value="settings">Settings</Tab>
                  </TabList>
                  <TabPanel value="overview" style={{ padding: '0.75rem 0' }}>Overview content.</TabPanel>
                  <TabPanel value="activity" style={{ padding: '0.75rem 0' }}>Activity content.</TabPanel>
                  <TabPanel value="settings" style={{ padding: '0.75rem 0' }}>Settings content.</TabPanel>
                </Tabs>
              </div>
            ))}
          </div>
        }
        react={`<Tabs defaultValue="overview" variant="line">…</Tabs>
<Tabs defaultValue="overview" variant="enclosed">…</Tabs>
<Tabs defaultValue="overview" variant="pill">…</Tabs>`}
        angular={`<hilal-tabs value="overview" variant="line">…</hilal-tabs>
<hilal-tabs value="overview" variant="enclosed">…</hilal-tabs>
<hilal-tabs value="overview" variant="pill">…</hilal-tabs>`}
        blade={`<x-hilal-tabs default-value="overview" variant="pill">…</x-hilal-tabs>`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <Tabs defaultValue="one" size="sm">
              <TabList>
                <Tab value="one">Small</Tab>
                <Tab value="two">Tab</Tab>
                <Tab value="three">Tab</Tab>
              </TabList>
              <TabPanel value="one" />
              <TabPanel value="two" />
              <TabPanel value="three" />
            </Tabs>
            <Tabs defaultValue="one" size="md">
              <TabList>
                <Tab value="one">Medium</Tab>
                <Tab value="two">Tab</Tab>
                <Tab value="three">Tab</Tab>
              </TabList>
              <TabPanel value="one" />
              <TabPanel value="two" />
              <TabPanel value="three" />
            </Tabs>
          </div>
        }
        react={`<Tabs size="sm">…</Tabs>
<Tabs size="md">…</Tabs>`}
        angular={`<hilal-tabs size="sm">…</hilal-tabs>`}
        blade={`<x-hilal-tabs size="sm">…</x-hilal-tabs>`}
      />

      <h2>Vertical orientation</h2>
      <FrameworkTabs
        preview={
          <Tabs defaultValue="profile" orientation="vertical" style={{ width: '100%' }}>
            <TabList>
              <Tab value="profile">Profile</Tab>
              <Tab value="billing">Billing</Tab>
              <Tab value="team">Team</Tab>
              <Tab value="api">API keys</Tab>
            </TabList>
            <TabPanel value="profile" style={{ padding: '0.75rem 1rem' }}>Profile settings.</TabPanel>
            <TabPanel value="billing" style={{ padding: '0.75rem 1rem' }}>Billing settings.</TabPanel>
            <TabPanel value="team" style={{ padding: '0.75rem 1rem' }}>Team settings.</TabPanel>
            <TabPanel value="api" style={{ padding: '0.75rem 1rem' }}>API keys.</TabPanel>
          </Tabs>
        }
        react={`<Tabs orientation="vertical" defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="billing">Billing</Tab>
  </TabList>
  <TabPanel value="profile">…</TabPanel>
  <TabPanel value="billing">…</TabPanel>
</Tabs>`}
        angular={`<hilal-tabs orientation="vertical" value="profile">…</hilal-tabs>`}
        blade={`<x-hilal-tabs orientation="vertical" default-value="profile">…</x-hilal-tabs>`}
      />

      <h2>With counts &amp; disabled tabs</h2>
      <FrameworkTabs
        preview={
          <Tabs defaultValue="inbox" style={{ width: '100%' }}>
            <TabList>
              <Tab value="inbox">Inbox <Badge tone="brand" size="sm">12</Badge></Tab>
              <Tab value="archive">Archive</Tab>
              <Tab value="spam" disabled>Spam</Tab>
            </TabList>
            <TabPanel value="inbox" style={{ padding: '0.75rem 0' }}>Inbox content.</TabPanel>
            <TabPanel value="archive" style={{ padding: '0.75rem 0' }}>Archive content.</TabPanel>
            <TabPanel value="spam" style={{ padding: '0.75rem 0' }}>Spam content.</TabPanel>
          </Tabs>
        }
        react={`<TabList>
  <Tab value="inbox">Inbox <Badge tone="brand">12</Badge></Tab>
  <Tab value="archive">Archive</Tab>
  <Tab value="spam" disabled>Spam</Tab>
</TabList>`}
        angular={`<button hilalTab="inbox">Inbox <hilal-badge tone="brand">12</hilal-badge></button>
<button hilalTab="spam" [disabled]="true">Spam</button>`}
        blade={`<button data-value="inbox">Inbox <x-hilal-badge tone="brand">12</x-hilal-badge></button>
<button data-value="spam" disabled>Spam</button>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`<Tabs>
  variant        'line' | 'enclosed' | 'pill'   default: 'line'
  size           'sm' | 'md'                    default: 'md'
  orientation    'horizontal' | 'vertical'      default: 'horizontal'
  defaultValue   string                         uncontrolled initial tab
  value          string                         controlled active tab
  onChange       (value) => void

<Tab value=…>      one item in TabList
<TabPanel value=…> content shown when its value matches`}</code></pre>
      <Accessibility
        summary={<>Implements the WAI-ARIA tabs pattern. Tab list uses <code>{"role=\"tablist\""}</code>; each tab uses <code>{"role=\"tab\""}</code> with <code>{"aria-controls"}</code>; panels use <code>{"role=\"tabpanel\""}</code>.</>}
        keys={[
                {
                        "keys": "← / →",
                        "action": "Move between tabs (horizontal)"
                },
                {
                        "keys": "↑ / ↓",
                        "action": "Move between tabs (vertical)"
                },
                {
                        "keys": "Home / End",
                        "action": "Jump to first / last tab"
                },
                {
                        "keys": "Enter / Space",
                        "action": "Activate the focused tab"
                }
        ]}
      />
    </>
  );
}
