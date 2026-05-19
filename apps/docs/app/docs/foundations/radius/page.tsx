import type { Metadata } from 'next';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Radius' };

const RADII = [
  { token: 'none', value: '0' },
  { token: 'sm',   value: '0.25rem' },
  { token: 'md',   value: '0.5rem' },
  { token: 'lg',   value: '0.75rem' },
  { token: 'xl',   value: '1rem' },
  { token: '2xl',  value: '1.5rem' },
  { token: 'full', value: '9999px' },
];

export default function RadiusPage() {
  return (
    <>
      <h1>Radius</h1>
      <p className="lede">
        Six rounding steps plus a full-pill option. Components reach for these instead of literal
        values so a single override re-rounds the whole UI.
      </p>

      <H2>Scale</H2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
          gap: 'var(--hilal-spacing-3)',
          marginBlock: 'var(--hilal-spacing-4)',
        }}
      >
        {RADII.map((r) => (
          <div
            key={r.token}
            style={{
              border: '1px solid var(--hilal-border-subtle)',
              borderRadius: 'var(--hilal-radius-md)',
              overflow: 'hidden',
              background: 'var(--hilal-bg-page)',
            }}
          >
            <div
              style={{
                blockSize: '5rem',
                background: 'var(--hilal-bg-subtle)',
                borderBlockEnd: '1px solid var(--hilal-border-subtle)',
                margin: 'var(--hilal-spacing-3)',
                borderRadius: `var(--hilal-radius-${r.token})`,
              }}
            />
            <div style={{ padding: 'var(--hilal-spacing-3)', paddingBlockStart: 0 }}>
              <div style={{ fontWeight: 'var(--hilal-font-weight-medium)' }}>{r.token}</div>
              <div style={{ fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)', color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-12)' }}>
                {`--hilal-radius-${r.token}`}
              </div>
              <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)', marginBlockStart: '0.2rem' }}>{r.value}</div>
            </div>
          </div>
        ))}
      </div>

      <H2>Where each is used</H2>
      <pre className="preview__code"><code>{`--hilal-radius-sm    chips, keyboard kbd
--hilal-radius-md    inputs, selects, alerts
--hilal-radius-lg    cards, modals, drawers
--hilal-radius-xl    hero panels, large illustrations
--hilal-radius-2xl   feature cards, large containers
--hilal-radius-full  avatars, pills, status dots`}</code></pre>
    </>
  );
}
