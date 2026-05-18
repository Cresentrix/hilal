'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DemoControls } from './DemoControls';
import { SearchPalette } from './SearchPalette';

export function Header() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith('/docs');
  return (
    <header className="doc-header">
      <Link href="/" className="doc-header__brand">
        <span className="doc-header__logo" aria-hidden />
        <span>Hilal</span>
      </Link>
      <SearchPalette />
      <nav className="doc-header__nav" aria-label="Primary">
        <Link href="/docs/getting-started" aria-current={pathname === '/docs/getting-started' ? 'page' : undefined}>
          Get started
        </Link>
        <Link href="/docs/foundations" aria-current={isDocs && pathname.startsWith('/docs/foundations') ? 'page' : undefined}>
          Foundations
        </Link>
        <Link href="/docs/components" aria-current={isDocs && pathname.startsWith('/docs/components') ? 'page' : undefined}>
          Components
        </Link>
        <Link href="/docs/patterns" aria-current={isDocs && pathname.startsWith('/docs/patterns') ? 'page' : undefined}>
          Patterns
        </Link>
        <Link href="/docs/recipes" aria-current={isDocs && pathname.startsWith('/docs/recipes') ? 'page' : undefined}>
          Recipes
        </Link>
        <a href="https://github.com/Cresentrix/hilal" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <DemoControls />
      </nav>
    </header>
  );
}
