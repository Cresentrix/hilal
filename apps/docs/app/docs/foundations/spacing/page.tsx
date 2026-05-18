import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Spacing' };

const SCALE = [
  { token: '0',   rem: '0',         px: 0 },
  { token: 'px',  rem: '1px',       px: 1 },
  { token: '0-5', rem: '0.125rem',  px: 2 },
  { token: '1',   rem: '0.25rem',   px: 4 },
  { token: '1-5', rem: '0.375rem',  px: 6 },
  { token: '2',   rem: '0.5rem',    px: 8 },
  { token: '3',   rem: '0.75rem',   px: 12 },
  { token: '4',   rem: '1rem',      px: 16 },
  { token: '5',   rem: '1.25rem',   px: 20 },
  { token: '6',   rem: '1.5rem',    px: 24 },
  { token: '8',   rem: '2rem',      px: 32 },
  { token: '10',  rem: '2.5rem',    px: 40 },
  { token: '12',  rem: '3rem',      px: 48 },
  { token: '16',  rem: '4rem',      px: 64 },
  { token: '20',  rem: '5rem',      px: 80 },
  { token: '24',  rem: '6rem',      px: 96 },
  { token: '32',  rem: '8rem',      px: 128 },
];

const row = {
  display: 'grid',
  gridTemplateColumns: '8rem 6rem 1fr',
  gap: 'var(--hilal-spacing-3)',
  alignItems: 'center',
  paddingBlock: 'var(--hilal-spacing-2)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
} as const;

const codeStyle = {
  fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)',
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-12)',
} as const;

export default function SpacingPage() {
  return (
    <>
      <h1>Spacing</h1>
      <p className="lede">
        A base-4 (with half-steps) spacing scale used for padding, margin, and gap throughout
        the system. Use logical properties (<code>padding-inline</code>, <code>margin-block</code>)
        to support RTL without conditionals.
      </p>

      <h2>Scale</h2>
      <div>
        {SCALE.map((s) => (
          <div key={s.token} style={row}>
            <span style={codeStyle}>{`--hilal-spacing-${s.token}`}</span>
            <span style={codeStyle}>{s.rem}{s.px ? ` · ${s.px}px` : ''}</span>
            <span
              style={{
                background: 'var(--hilal-bg-brand)',
                blockSize: '1rem',
                inlineSize: `var(--hilal-spacing-${s.token})`,
                borderRadius: 'var(--hilal-radius-sm)',
                minInlineSize: s.px === 0 ? 0 : undefined,
              }}
            />
          </div>
        ))}
      </div>

      <h2>Density preset</h2>
      <p>
        Layer the density preset CSS to compress the scale globally. Useful for high-density data
        screens.
      </p>
      <pre className="preview__code"><code>{`@import '@hilal-ds/tokens/themes/density';

[data-density="compact"] { /* scale is overridden */ }`}</code></pre>
    </>
  );
}
