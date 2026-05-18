import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from './_components/Header';
import { Footer } from './_components/Footer';

export const metadata: Metadata = {
  title: { default: 'Hilal — multi-framework design system', template: '%s · Hilal' },
  description:
    'One DOM. One CSS. Three frameworks. Hilal ships pixel-identical components for React, Angular, and Blade — built from a single token system synced from Figma.',
};

const themeScript = `(() => {
  try {
    const html = document.documentElement;
    const stored = localStorage.getItem('hilal-theme');
    const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    html.dataset.theme = stored || sys;

    const apply = (key, attr) => {
      const v = localStorage.getItem(key);
      if (v && v !== 'cozy' && v !== 'ltr') html.setAttribute('data-' + attr, v);
    };
    apply('hilal-density', 'density');
    apply('hilal-motion', 'motion');

    const dir = localStorage.getItem('hilal-dir');
    if (dir === 'rtl') html.setAttribute('dir', 'rtl');
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
