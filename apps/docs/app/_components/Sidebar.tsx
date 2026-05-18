'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem { label: string; href: string; }
interface SidebarSection { heading: string; items: SidebarItem[]; }

const SECTIONS: SidebarSection[] = [
  {
    heading: 'Getting started',
    items: [
      { label: 'Introduction', href: '/docs/getting-started' },
    ],
  },
  {
    heading: 'Components',
    items: [
      { label: 'Overview', href: '/docs/components' },
      { label: 'Button', href: '/docs/components/button' },
      { label: 'Input', href: '/docs/components/input' },
      { label: 'Card', href: '/docs/components/card' },
      { label: 'Modal', href: '/docs/components/modal' },
      { label: 'Calendar', href: '/docs/components/calendar' },
      { label: 'Combobox', href: '/docs/components/combobox' },
    ],
  },
  {
    heading: 'Patterns',
    items: [
      { label: 'Overview', href: '/docs/patterns' },
      { label: 'StatsGrid', href: '/docs/patterns/stats-grid' },
      { label: 'CommandPalette', href: '/docs/patterns/command-palette' },
      { label: 'NotificationCenter', href: '/docs/patterns/notification-center' },
      { label: 'MultiStepForm', href: '/docs/patterns/multi-step-form' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="doc-sidebar">
      {SECTIONS.map((section) => (
        <div className="doc-sidebar__section" key={section.heading}>
          <div className="doc-sidebar__heading">{section.heading}</div>
          <ul className="doc-sidebar__list">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
