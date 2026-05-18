import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Recipes' };

const ITEMS = [
  { slug: 'landing',    name: 'Marketing landing', hint: 'Hero + social proof + features + testimonial.' },
  { slug: 'login',      name: 'Login page',        hint: 'Centered AuthForm with social section and footer links.' },
  { slug: 'onboarding', name: 'Onboarding wizard', hint: 'Four-step MultiStepForm with success state.' },
  { slug: 'dashboard',  name: 'Dashboard',         hint: 'DashboardShell + Sidebar + StatsGrid + DataList.' },
  { slug: 'inbox',      name: 'Inbox',             hint: 'Search + filter pills + a DataList of messages.' },
  { slug: 'pricing',    name: 'Pricing',           hint: 'Three-column plan comparison with feature lists.' },
  { slug: 'settings',   name: 'Settings page',     hint: 'Tabs + FormSection compositions for an account screen.' },
  { slug: 'not-found',  name: '404 page',          hint: 'Friendly not-found screen built on EmptyState.' },
];

export default function RecipesIndex() {
  return (
    <>
      <h1>Recipes</h1>
      <p className="lede">
        Full-page examples composed entirely from Hilal primitives and patterns. Copy the
        whole page, swap copy and data, and you have a working screen.
      </p>
      <div className="card-grid">
        {ITEMS.map((it) => (
          <Link key={it.slug} href={`/docs/recipes/${it.slug}`}>
            <div className="card-grid__title">{it.name}</div>
            <div className="card-grid__hint">{it.hint}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
