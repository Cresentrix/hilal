'use client';

import { usePathname } from 'next/navigation';

const REPO_BASE = 'https://github.com/Cresentrix/hilal/edit/main/apps/docs/app';

export function EditOnGithub() {
  const pathname = usePathname() || '/';
  // Map URL → file path. Special cases: '/' and pages with overview indexes.
  let file: string;
  if (pathname === '/') {
    file = '/page.tsx';
  } else {
    file = `${pathname}/page.tsx`;
  }
  const href = `${REPO_BASE}${file}`;
  return (
    <div className="doc-edit">
      <a href={href} target="_blank" rel="noreferrer">
        Edit this page on GitHub →
      </a>
    </div>
  );
}
