import type { ReactNode } from 'react';
import { Sidebar } from '../_components/Sidebar';
import { EditOnGithub } from '../_components/EditOnGithub';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="doc-split">
      <Sidebar />
      <main className="doc-content">
        {children}
        <EditOnGithub />
      </main>
    </div>
  );
}
