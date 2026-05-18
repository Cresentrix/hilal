'use client';

import { Tabs, TabList, Tab, TabPanel } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function TabsPage() {
  return (
    <>
      <h1>Tabs</h1>
      <p className="lede">
        Tab list with associated panels. Horizontal or vertical orientation, with three visual variants.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <Tabs defaultValue="overview">
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="activity">Activity</Tab>
                <Tab value="settings">Settings</Tab>
              </TabList>
              <TabPanel value="overview" style={{ padding: '1rem 0' }}>
                Overview content. Anything renders here.
              </TabPanel>
              <TabPanel value="activity" style={{ padding: '1rem 0' }}>
                Activity feed lives here.
              </TabPanel>
              <TabPanel value="settings" style={{ padding: '1rem 0' }}>
                Project settings.
              </TabPanel>
            </Tabs>
          </div>
        }
        react={`<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="overview">Overview content.</TabPanel>
  <TabPanel value="activity">Activity feed.</TabPanel>
  <TabPanel value="settings">Project settings.</TabPanel>
</Tabs>`}
        angular={`<hilal-tabs value="overview">
  <button hilalTab="overview">Overview</button>
  <button hilalTab="activity">Activity</button>
  <button hilalTab="settings">Settings</button>
</hilal-tabs>`}
        blade={`<x-hilal-tabs default-value="overview">
  <x-slot:tabs>
    <button data-value="overview">Overview</button>
    <button data-value="activity">Activity</button>
    <button data-value="settings">Settings</button>
  </x-slot:tabs>
  <div data-value="overview">Overview content.</div>
  <div data-value="activity">Activity feed.</div>
  <div data-value="settings">Project settings.</div>
</x-hilal-tabs>`}
      />
    </>
  );
}
