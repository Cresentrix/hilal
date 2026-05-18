import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from './_components/Header';

export const metadata: Metadata = {
  title: { default: 'Hilal — multi-framework design system', template: '%s · Hilal' },
  description:
    'One DOM. One CSS. Three frameworks. Hilal ships pixel-identical components for React, Angular, and Blade — built from a single token system synced from Figma.',
};

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('hilal-theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = stored || sys;
  } catch (_) {}
})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="doc-shell">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
