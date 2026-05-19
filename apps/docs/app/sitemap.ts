import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hilal-ds.dev';

const COMPONENTS = [
  'accordion', 'alert', 'avatar', 'badge', 'bottomnav', 'button', 'calendar', 'card',
  'checkbox', 'combobox', 'datepicker', 'drawer', 'empty', 'input', 'modal', 'pagination',
  'select', 'sidebar', 'skeleton', 'stepper', 'tabs', 'toast', 'toggle', 'tooltip',
];

const PATTERNS = [
  'auth-form', 'command-palette', 'confirm-dialog', 'dashboard-shell', 'data-list',
  'filter-bar', 'form-section', 'multi-step-form', 'notification-center', 'page-header',
  'search-header', 'stats-grid',
];

const RECIPES = [
  'landing', 'login', 'onboarding', 'dashboard', 'inbox', 'pricing', 'settings', 'not-found',
];

const FOUNDATIONS = ['colors', 'typography', 'spacing', 'radius', 'elevation', 'motion', 'theming'];

const ABOUT = ['why', 'faq', 'compare', 'roadmap', 'showcase'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,                         lastModified: now, priority: 1.0 },
    { url: `${SITE}/docs/getting-started`,     lastModified: now, priority: 0.9 },
    { url: `${SITE}/docs/foundations`,         lastModified: now, priority: 0.7 },
    { url: `${SITE}/docs/components`,          lastModified: now, priority: 0.9 },
    { url: `${SITE}/docs/patterns`,            lastModified: now, priority: 0.9 },
    { url: `${SITE}/docs/recipes`,             lastModified: now, priority: 0.7 },
    { url: `${SITE}/docs/iconography`,         lastModified: now, priority: 0.6 },
    { url: `${SITE}/docs/changelog`,           lastModified: now, priority: 0.6 },
    { url: `${SITE}/docs/about`,               lastModified: now, priority: 0.5 },
  ];
  for (const slug of FOUNDATIONS) entries.push({ url: `${SITE}/docs/foundations/${slug}`, lastModified: now, priority: 0.7 });
  for (const slug of COMPONENTS)  entries.push({ url: `${SITE}/docs/components/${slug}`,  lastModified: now, priority: 0.8 });
  for (const slug of PATTERNS)    entries.push({ url: `${SITE}/docs/patterns/${slug}`,    lastModified: now, priority: 0.8 });
  for (const slug of RECIPES)     entries.push({ url: `${SITE}/docs/recipes/${slug}`,     lastModified: now, priority: 0.6 });
  for (const slug of ABOUT)       entries.push({ url: `${SITE}/docs/about/${slug}`,       lastModified: now, priority: 0.5 });
  return entries;
}
