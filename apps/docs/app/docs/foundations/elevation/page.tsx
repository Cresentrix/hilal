import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Elevation' };

const STEPS = [
  { token: '0',     hint: 'Flat — for inline elements and disabled surfaces.' },
  { token: '1',     hint: 'Subtle lift — cards, list rows.' },
  { token: '2',     hint: 'Popovers, dropdowns.' },
  { token: '3',     hint: 'Sticky bars, dialogs.' },
  { token: '4',     hint: 'Modals.' },
  { token: '5',     hint: 'High-priority overlays, command palette.' },
  { token: 'inner', hint: 'Inset shadow — wells, depressed states.' },
  { token: 'focus', hint: 'Focus ring — applied via :focus-visible.' },
];

export default function ElevationPage() {
  return (
    <>
      <h1>Elevation</h1>
      <p className="lede">
        Six elevation steps for depth, plus dedicated inset and focus-ring tokens. Apply via{' '}
        <code>box-shadow: var(--hilal-elevation-3)</code>.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
          gap: 'var(--hilal-spacing-5)',
          marginBlock: 'var(--hilal-spacing-5)',
        }}
      >
        {STEPS.map((s) => (
          <div
            key={s.token}
            style={{
              background: 'var(--hilal-bg-page)',
              border: '1px solid var(--hilal-border-subtle)',
              borderRadius: 'var(--hilal-radius-lg)',
              padding: 'var(--hilal-spacing-4)',
              boxShadow: `var(--hilal-elevation-${s.token})`,
            }}
          >
            <div style={{ fontWeight: 'var(--hilal-font-weight-medium)', fontSize: 'var(--hilal-font-size-15)' }}>
              elevation-{s.token}
            </div>
            <div style={{ fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)', color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-12)', marginBlockStart: '0.2rem' }}>
              {`--hilal-elevation-${s.token}`}
            </div>
            <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)', marginBlockStart: '0.4rem' }}>
              {s.hint}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
