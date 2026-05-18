import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Typography' };

const SIZES = [
  { token: 12, px: 12, rem: '0.75rem' },
  { token: 13, px: 13, rem: '0.8125rem' },
  { token: 14, px: 14, rem: '0.875rem' },
  { token: 15, px: 15, rem: '0.9375rem' },
  { token: 16, px: 16, rem: '1rem' },
  { token: 20, px: 20, rem: '1.25rem' },
  { token: 24, px: 24, rem: '1.5rem' },
  { token: 32, px: 32, rem: '2rem' },
  { token: 36, px: 36, rem: '2.25rem' },
  { token: 48, px: 48, rem: '3rem' },
  { token: 64, px: 64, rem: '4rem' },
];

const WEIGHTS = [
  { name: 'Regular',  varName: '--hilal-font-weight-regular',  value: '400' },
  { name: 'Medium',   varName: '--hilal-font-weight-medium',   value: '500' },
  { name: 'Semibold', varName: '--hilal-font-weight-semibold', value: '600' },
  { name: 'Bold',     varName: '--hilal-font-weight-bold',     value: '700' },
];

const row = {
  display: 'grid',
  gridTemplateColumns: '8rem 6rem 1fr',
  gap: 'var(--hilal-spacing-3)',
  alignItems: 'baseline',
  paddingBlock: 'var(--hilal-spacing-3)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
} as const;

const code = {
  fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)',
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-12)',
} as const;

export default function TypographyPage() {
  return (
    <>
      <h1>Typography</h1>
      <p className="lede">
        A 4-step weight scale and an 11-step size scale, with a parallel Arabic line-height set
        for visual rhythm parity across scripts.
      </p>

      <h2>Size scale</h2>
      <div>
        {SIZES.map((s) => (
          <div key={s.token} style={row}>
            <span style={code}>{`--hilal-font-size-${s.token}`}</span>
            <span style={code}>{s.rem} · {s.px}px</span>
            <span style={{ fontSize: `var(--hilal-font-size-${s.token})`, lineHeight: `var(--hilal-font-line-height-${s.token})`, color: 'var(--hilal-fg-primary)' }}>
              The quick brown fox jumps.
            </span>
          </div>
        ))}
      </div>

      <h2>Weights</h2>
      <div>
        {WEIGHTS.map((w) => (
          <div key={w.varName} style={row}>
            <span style={code}>{w.varName}</span>
            <span style={code}>{w.value}</span>
            <span style={{ fontSize: 'var(--hilal-font-size-20)', fontWeight: w.value as never }}>
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
        ))}
      </div>

      <h2>Line heights</h2>
      <p>Each size has a paired line-height token. Arabic variants live under <code>--hilal-font-line-height-arabic-*</code> for the same numeric size.</p>
      <pre className="preview__code"><code>{`--hilal-font-line-height-12 → 1rem
--hilal-font-line-height-13 → 1.25rem
--hilal-font-line-height-14 → 1.25rem
--hilal-font-line-height-15 → 1.375rem
--hilal-font-line-height-16 → 1.5rem
--hilal-font-line-height-20 → 1.5rem
--hilal-font-line-height-24 → 2rem
--hilal-font-line-height-32 → 2.5rem
--hilal-font-line-height-36 → 2.75rem
--hilal-font-line-height-48 → 3.625rem
--hilal-font-line-height-64 → 4.875rem`}</code></pre>

      <h2>Font families</h2>
      <pre className="preview__code"><code>{`--hilal-font-family-sans     # Latin UI stack
--hilal-font-family-arabic   # Arabic UI stack
--hilal-font-family-mono     # Code / numeric tabular`}</code></pre>
    </>
  );
}
