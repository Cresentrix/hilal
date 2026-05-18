import type { Metadata } from 'next';
import { BottomNav, BottomNavItem } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'BottomNav' };

const frame = {
  border: '1px solid var(--hilal-border-subtle)',
  borderRadius: 'var(--hilal-radius-lg)',
  overflow: 'hidden',
  background: 'var(--hilal-bg-page)',
} as const;

export default function BottomNavPage() {
  return (
    <>
      <h1>BottomNav</h1>
      <p className="lede">
        Bottom tab bar for mobile-style navigation. Each item shows an icon + label and an
        active state. Two visual variants.
      </p>

      <h2>Default</h2>
      <FrameworkTabs
        preview={
          <div style={{ inlineSize: '24rem', ...frame }}>
            <BottomNav ariaLabel="Bottom navigation">
              <BottomNavItem href="#" label="Home"    icon={<span aria-hidden>◧</span>} active />
              <BottomNavItem href="#" label="Search"  icon={<span aria-hidden>⌕</span>} />
              <BottomNavItem href="#" label="Inbox"   icon={<span aria-hidden>◫</span>} />
              <BottomNavItem href="#" label="Profile" icon={<span aria-hidden>☺</span>} />
            </BottomNav>
          </div>
        }
        react={`<BottomNav ariaLabel="Bottom navigation">
  <BottomNavItem href="/" icon={<HomeIcon />} label="Home" active />
  <BottomNavItem href="/search" icon={<SearchIcon />} label="Search" />
  <BottomNavItem href="/inbox" icon={<InboxIcon />} label="Inbox" />
  <BottomNavItem href="/me" icon={<UserIcon />} label="Profile" />
</BottomNav>`}
        angular={`<hilal-bottom-nav ariaLabel="Bottom navigation">
  <hilal-bottom-nav-item href="/" label="Home" [active]="true">
    <span hilalBottomNavItemIcon>◧</span>
  </hilal-bottom-nav-item>
</hilal-bottom-nav>`}
        blade={`<x-hilal-bottom-nav>
  <x-hilal-bottom-nav-item href="/" label="Home" :active="true">
    <x-slot:icon>◧</x-slot:icon>
  </x-hilal-bottom-nav-item>
</x-hilal-bottom-nav>`}
      />

      <h2>Floating variant</h2>
      <FrameworkTabs
        preview={
          <div style={{ position: 'relative', inlineSize: '24rem', blockSize: '8rem', background: 'var(--hilal-bg-subtle)', borderRadius: 'var(--hilal-radius-lg)' }}>
            <div style={{ position: 'absolute', insetInline: '0.75rem', insetBlockEnd: '0.75rem' }}>
              <BottomNav variant="floating" ariaLabel="Floating navigation">
                <BottomNavItem href="#" label="Home"   icon={<span aria-hidden>◧</span>} active />
                <BottomNavItem href="#" label="Search" icon={<span aria-hidden>⌕</span>} />
                <BottomNavItem href="#" label="Inbox"  icon={<span aria-hidden>◫</span>} />
              </BottomNav>
            </div>
          </div>
        }
        react={`<BottomNav variant="floating">…</BottomNav>`}
        angular={`<hilal-bottom-nav variant="floating">…</hilal-bottom-nav>`}
        blade={`<x-hilal-bottom-nav variant="floating">…</x-hilal-bottom-nav>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`<BottomNav>
  variant     'default' | 'floating'   default: 'default'
  ariaLabel   string                   passed through to aria-label

<BottomNavItem>
  icon        ReactNode
  label       ReactNode    required
  active      boolean
  …           all native <a> attributes`}</code></pre>
    </>
  );
}
