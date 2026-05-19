'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommandPalette, type CommandItem } from '@hilal-ds/patterns';

interface DocLink { label: string; href: string; group: string; keywords?: string[]; }

const LINKS: DocLink[] = [
  // Getting started
  { group: 'Getting started', label: 'Introduction', href: '/docs/getting-started' },
  { group: 'Getting started', label: 'Why Hilal',    href: '/docs/about/why' },
  { group: 'Getting started', label: 'FAQ',          href: '/docs/about/faq' },
  { group: 'Getting started', label: 'Compared',     href: '/docs/about/compare' },
  { group: 'Getting started', label: 'Roadmap',      href: '/docs/about/roadmap' },
  { group: 'Getting started', label: 'Showcase',     href: '/docs/about/showcase' },
  { group: 'Getting started', label: 'Changelog',    href: '/docs/changelog' },
  // Foundations
  { group: 'Foundations', label: 'Overview',    href: '/docs/foundations' },
  { group: 'Foundations', label: 'Colors',      href: '/docs/foundations/colors',     keywords: ['palette', 'swatch', 'tokens'] },
  { group: 'Foundations', label: 'Typography',  href: '/docs/foundations/typography', keywords: ['font', 'size', 'weight'] },
  { group: 'Foundations', label: 'Spacing',     href: '/docs/foundations/spacing',    keywords: ['margin', 'padding', 'gap'] },
  { group: 'Foundations', label: 'Radius',      href: '/docs/foundations/radius',     keywords: ['rounded', 'corner'] },
  { group: 'Foundations', label: 'Elevation',   href: '/docs/foundations/elevation',  keywords: ['shadow', 'depth'] },
  { group: 'Foundations', label: 'Motion',      href: '/docs/foundations/motion',     keywords: ['animation', 'duration', 'easing'] },
  { group: 'Foundations', label: 'Iconography', href: '/docs/iconography',            keywords: ['icons', 'lucide'] },
  // Components
  ...['Accordion', 'Alert', 'Avatar', 'Badge', 'BottomNav', 'Button', 'Calendar', 'Card', 'Checkbox',
      'Combobox', 'Datepicker', 'Drawer', 'EmptyState', 'Input', 'Modal', 'Pagination', 'Select',
      'Sidebar', 'Skeleton', 'Stepper', 'Tabs', 'Toast', 'Toggle', 'Tooltip']
    .map((name): DocLink => {
      const slug = name === 'EmptyState' ? 'empty'
                 : name === 'BottomNav' ? 'bottomnav'
                 : name.toLowerCase();
      return { group: 'Components', label: name, href: `/docs/components/${slug}` };
    }),
  // Patterns
  ...['AuthForm', 'CommandPalette', 'ConfirmDialog', 'DashboardShell', 'DataList', 'FilterBar',
      'FormSection', 'MultiStepForm', 'NotificationCenter', 'PageHeader', 'SearchHeader', 'StatsGrid']
    .map((name): DocLink => {
      const slug = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return { group: 'Patterns', label: name, href: `/docs/patterns/${slug}` };
    }),
  // Recipes
  { group: 'Recipes', label: 'Marketing landing',  href: '/docs/recipes/landing' },
  { group: 'Recipes', label: 'Login',              href: '/docs/recipes/login' },
  { group: 'Recipes', label: 'Onboarding wizard',  href: '/docs/recipes/onboarding' },
  { group: 'Recipes', label: 'Dashboard',          href: '/docs/recipes/dashboard' },
  { group: 'Recipes', label: 'Inbox',              href: '/docs/recipes/inbox' },
  { group: 'Recipes', label: 'Pricing',            href: '/docs/recipes/pricing' },
  { group: 'Recipes', label: 'Settings',           href: '/docs/recipes/settings' },
  { group: 'Recipes', label: '404 page',           href: '/docs/recipes/not-found' },
];

const GROUP_ORDER = ['Getting started', 'Foundations', 'Components', 'Patterns', 'Recipes'];

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const items = useMemo<CommandItem[]>(
    () => LINKS.map((l) => ({
      id: l.href,
      label: l.label,
      group: l.group,
      keywords: l.keywords,
      hint: l.href,
      onSelect: () => router.push(l.href),
    })),
    [router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="search-trigger"
        aria-label="Search docs"
      >
        <span aria-hidden>⌕</span>
        <span className="search-trigger__placeholder">Search docs…</span>
        <kbd className="search-trigger__kbd">⌘K</kbd>
      </button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        groupOrder={GROUP_ORDER}
        placeholder="Search components, patterns, foundations…"
      />
    </>
  );
}
