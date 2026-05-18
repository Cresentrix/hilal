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
      { label: 'Overview',    href: '/docs/components' },
      { label: 'Accordion',   href: '/docs/components/accordion' },
      { label: 'Alert',       href: '/docs/components/alert' },
      { label: 'Avatar',      href: '/docs/components/avatar' },
      { label: 'Badge',       href: '/docs/components/badge' },
      { label: 'BottomNav',   href: '/docs/components/bottomnav' },
      { label: 'Button',      href: '/docs/components/button' },
      { label: 'Calendar',    href: '/docs/components/calendar' },
      { label: 'Card',        href: '/docs/components/card' },
      { label: 'Checkbox',    href: '/docs/components/checkbox' },
      { label: 'Combobox',    href: '/docs/components/combobox' },
      { label: 'Datepicker',  href: '/docs/components/datepicker' },
      { label: 'Drawer',      href: '/docs/components/drawer' },
      { label: 'EmptyState',  href: '/docs/components/empty' },
      { label: 'Input',       href: '/docs/components/input' },
      { label: 'Modal',       href: '/docs/components/modal' },
      { label: 'Pagination',  href: '/docs/components/pagination' },
      { label: 'Select',      href: '/docs/components/select' },
      { label: 'Sidebar',     href: '/docs/components/sidebar' },
      { label: 'Skeleton',    href: '/docs/components/skeleton' },
      { label: 'Stepper',     href: '/docs/components/stepper' },
      { label: 'Tabs',        href: '/docs/components/tabs' },
      { label: 'Toast',       href: '/docs/components/toast' },
      { label: 'Toggle',      href: '/docs/components/toggle' },
      { label: 'Tooltip',     href: '/docs/components/tooltip' },
    ],
  },
  {
    heading: 'Patterns',
    items: [
      { label: 'Overview',            href: '/docs/patterns' },
      { label: 'AuthForm',            href: '/docs/patterns/auth-form' },
      { label: 'CommandPalette',      href: '/docs/patterns/command-palette' },
      { label: 'ConfirmDialog',       href: '/docs/patterns/confirm-dialog' },
      { label: 'DashboardShell',      href: '/docs/patterns/dashboard-shell' },
      { label: 'DataList',            href: '/docs/patterns/data-list' },
      { label: 'FilterBar',           href: '/docs/patterns/filter-bar' },
      { label: 'FormSection',         href: '/docs/patterns/form-section' },
      { label: 'MultiStepForm',       href: '/docs/patterns/multi-step-form' },
      { label: 'NotificationCenter',  href: '/docs/patterns/notification-center' },
      { label: 'PageHeader',          href: '/docs/patterns/page-header' },
      { label: 'SearchHeader',        href: '/docs/patterns/search-header' },
      { label: 'StatsGrid',           href: '/docs/patterns/stats-grid' },
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
