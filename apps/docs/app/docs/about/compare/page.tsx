import type { Metadata } from 'next';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Compare' };

interface Row { feature: string; hilal: string; shadcn: string; radix: string; mantine: string; }

const ROWS: Row[] = [
  { feature: 'React',             hilal: '✓',                 shadcn: '✓',               radix: '✓',           mantine: '✓' },
  { feature: 'Angular',           hilal: '✓ (same DOM)',      shadcn: '—',               radix: '—',           mantine: '—' },
  { feature: 'Blade / PHP',       hilal: '✓ (same DOM)',      shadcn: '—',               radix: '—',           mantine: '—' },
  { feature: 'Source of styles',  hilal: 'Stylesheet (CSS)',  shadcn: 'Tailwind classes', radix: 'Headless',   mantine: 'CSS-in-JS / CSS' },
  { feature: 'Install model',     hilal: 'npm (versioned)',   shadcn: 'Copy-paste CLI',  radix: 'npm',         mantine: 'npm' },
  { feature: 'Figma token sync',  hilal: '✓ (real)',          shadcn: '—',               radix: '—',           mantine: 'Manual' },
  { feature: 'Dark theme',        hilal: 'Built-in',          shadcn: 'Built-in',        radix: 'Headless (DIY)', mantine: 'Built-in' },
  { feature: 'Density preset',    hilal: '✓',                 shadcn: '—',               radix: '—',           mantine: '—' },
  { feature: 'Motion preset',     hilal: '✓',                 shadcn: '—',               radix: '—',           mantine: '—' },
  { feature: 'RTL out of the box',hilal: '✓ (logical props)', shadcn: 'Tailwind dir',    radix: 'Per-component',mantine: '✓' },
  { feature: 'License',           hilal: 'Apache 2.0',        shadcn: 'MIT',             radix: 'MIT',         mantine: 'MIT' },
];

const th = {
  textAlign: 'start' as const,
  padding: 'var(--hilal-spacing-3)',
  fontSize: 'var(--hilal-font-size-13)',
  fontWeight: 'var(--hilal-font-weight-semibold)' as never,
  color: 'var(--hilal-fg-tertiary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  borderBlockEnd: '1px solid var(--hilal-border-default)',
};
const td = {
  padding: 'var(--hilal-spacing-3)',
  fontSize: 'var(--hilal-font-size-14)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
  verticalAlign: 'top' as const,
};

export default function ComparePage() {
  return (
    <>
      <h1>Compared with…</h1>
      <p className="lede">
        Honest comparison. If one of the others is a better fit for your stack, use it — they&rsquo;re
        all excellent.
      </p>

      <div style={{ overflowX: 'auto', marginBlock: 'var(--hilal-spacing-4)' }}>
        <table style={{ inlineSize: '100%', borderCollapse: 'collapse', minInlineSize: '40rem' }}>
          <thead>
            <tr>
              <th style={th}>Feature</th>
              <th style={th}>Hilal</th>
              <th style={th}>shadcn/ui</th>
              <th style={th}>Radix UI</th>
              <th style={th}>Mantine</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.feature}>
                <td style={{ ...td, fontWeight: 500, color: 'var(--hilal-fg-primary)' }}>{r.feature}</td>
                <td style={td}>{r.hilal}</td>
                <td style={td}>{r.shadcn}</td>
                <td style={td}>{r.radix}</td>
                <td style={td}>{r.mantine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Quick rules of thumb</H2>
      <ul>
        <li><strong>Ship in more than one stack?</strong> Hilal — the multi-framework parity is the whole point.</li>
        <li><strong>React-only, Tailwind-only, want to own the code?</strong> shadcn/ui.</li>
        <li><strong>Need primitives with serious accessibility research?</strong> Radix UI.</li>
        <li><strong>React, big component catalog, batteries included?</strong> Mantine.</li>
      </ul>
    </>
  );
}
