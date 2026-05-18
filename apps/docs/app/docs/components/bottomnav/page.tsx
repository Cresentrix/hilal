import type { Metadata } from 'next';
import { BottomNav, BottomNavItem } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'BottomNav' };

export default function BottomNavPage() {
  return (
    <>
      <h1>BottomNav</h1>
      <p className="lede">
        Mobile-style bottom tab bar. Renders icons + labels for each destination, with an
        active state.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '24rem', border: '1px solid var(--hilal-border-subtle)', borderRadius: 'var(--hilal-radius-lg)', overflow: 'hidden' }}>
            <BottomNav ariaLabel="Bottom navigation">
              <BottomNavItem href="#" label="Home" active />
              <BottomNavItem href="#" label="Search" />
              <BottomNavItem href="#" label="Inbox" />
              <BottomNavItem href="#" label="Profile" />
            </BottomNav>
          </div>
        }
        react={`<BottomNav ariaLabel="Bottom navigation">
  <BottomNavItem href="/" label="Home" active />
  <BottomNavItem href="/search" label="Search" />
  <BottomNavItem href="/inbox" label="Inbox" />
  <BottomNavItem href="/me" label="Profile" />
</BottomNav>`}
        angular={`<hilal-bottom-nav>
  <hilal-bottom-nav-item href="/" label="Home" [active]="true"></hilal-bottom-nav-item>
  <hilal-bottom-nav-item href="/search" label="Search"></hilal-bottom-nav-item>
</hilal-bottom-nav>`}
        blade={`<x-hilal-bottom-nav>
  <x-hilal-bottom-nav-item href="/" label="Home" :active="true" />
  <x-hilal-bottom-nav-item href="/search" label="Search" />
</x-hilal-bottom-nav>`}
      />
    </>
  );
}
