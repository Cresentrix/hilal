import type { Metadata } from 'next';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Colors' };

interface Swatch { name: string; varName: string; description?: string; }

const FG: Swatch[] = [
  { name: 'Primary',   varName: '--hilal-fg-primary',   description: 'Body text, headings, primary content.' },
  { name: 'Secondary', varName: '--hilal-fg-secondary', description: 'Supporting text, lede paragraphs.' },
  { name: 'Tertiary',  varName: '--hilal-fg-tertiary',  description: 'Meta, hints, timestamps.' },
  { name: 'Disabled',  varName: '--hilal-fg-disabled' },
  { name: 'Inverse',   varName: '--hilal-fg-inverse',   description: 'Text on dark / inverse backgrounds.' },
  { name: 'Link',      varName: '--hilal-fg-link' },
];

const BG: Swatch[] = [
  { name: 'Page',     varName: '--hilal-bg-page',     description: 'Default page background.' },
  { name: 'Subtle',   varName: '--hilal-bg-subtle',   description: 'Inputs, cards on darker pages, hover fills.' },
  { name: 'Raised',   varName: '--hilal-bg-raised',   description: 'Elevated surfaces, menu items.' },
  { name: 'Overlay',  varName: '--hilal-bg-overlay',  description: 'Modal/drawer backdrop.' },
  { name: 'Disabled', varName: '--hilal-bg-disabled' },
  { name: 'Inverse',  varName: '--hilal-bg-inverse' },
];

const BORDER: Swatch[] = [
  { name: 'Default', varName: '--hilal-border-default' },
  { name: 'Subtle',  varName: '--hilal-border-subtle',  description: 'The hairline used by most components.' },
  { name: 'Focus',   varName: '--hilal-border-focus' },
  { name: 'Error',   varName: '--hilal-border-error' },
  { name: 'Success', varName: '--hilal-border-success' },
  { name: 'Disabled', varName: '--hilal-border-disabled' },
];

const STATUS: Swatch[] = [
  { name: 'Info',    varName: '--hilal-status-info' },
  { name: 'Success', varName: '--hilal-status-success' },
  { name: 'Warning', varName: '--hilal-status-warning' },
  { name: 'Error',   varName: '--hilal-status-error' },
];

const BRAND_RAMP = [0, 10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const swatchGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
  gap: 'var(--hilal-spacing-3)',
  marginBlock: 'var(--hilal-spacing-4)',
} as const;

const card = {
  border: '1px solid var(--hilal-border-subtle)',
  borderRadius: 'var(--hilal-radius-md)',
  overflow: 'hidden',
  background: 'var(--hilal-bg-page)',
} as const;

const cardBody = {
  padding: 'var(--hilal-spacing-3)',
  fontSize: 'var(--hilal-font-size-13)',
} as const;

const codeStyle = {
  fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)',
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-12)',
} as const;

function SwatchCard({ s, swatchStyle }: { s: Swatch; swatchStyle?: React.CSSProperties }) {
  return (
    <div style={card}>
      <div
        style={{
          background: `var(${s.varName})`,
          blockSize: '4.5rem',
          borderBlockEnd: '1px solid var(--hilal-border-subtle)',
          ...swatchStyle,
        }}
      />
      <div style={cardBody}>
        <div style={{ fontWeight: 'var(--hilal-font-weight-medium)', color: 'var(--hilal-fg-primary)' }}>{s.name}</div>
        <div style={codeStyle}>{s.varName}</div>
        {s.description ? (
          <div style={{ color: 'var(--hilal-fg-tertiary)', marginBlockStart: '0.35rem' }}>{s.description}</div>
        ) : null}
      </div>
    </div>
  );
}

function Ramp({ name, prefix }: { name: string; prefix: string }) {
  return (
    <div>
      <H3>{name}</H3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BRAND_RAMP.length}, 1fr)`,
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-md)',
          overflow: 'hidden',
        }}
      >
        {BRAND_RAMP.map((step) => (
          <div key={step} style={{ background: `var(--hilal-color-${prefix}-${step})`, blockSize: '3.5rem' }} />
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BRAND_RAMP.length}, 1fr)`,
          marginBlockStart: '0.25rem',
          fontSize: 'var(--hilal-font-size-12)',
          color: 'var(--hilal-fg-tertiary)',
          textAlign: 'center',
        }}
      >
        {BRAND_RAMP.map((step) => (
          <span key={step}>{step}</span>
        ))}
      </div>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <>
      <h1>Colors</h1>
      <p className="lede">
        Hilal uses a two-layer color system: a raw palette (numeric ramps from 0 to 1000) and a
        semantic alias layer that components reference. Override aliases in <code>data-theme</code>{' '}
        scopes to retheme everything without touching component code.
      </p>

      <H2>Foreground</H2>
      <div style={swatchGrid}>
        {FG.map((s) => <SwatchCard key={s.varName} s={s} />)}
      </div>

      <H2>Background</H2>
      <div style={swatchGrid}>
        {BG.map((s) => <SwatchCard key={s.varName} s={s} />)}
      </div>

      <H2>Border</H2>
      <div style={swatchGrid}>
        {BORDER.map((s) => <SwatchCard key={s.varName} s={s} />)}
      </div>

      <H2>Status</H2>
      <div style={swatchGrid}>
        {STATUS.map((s) => <SwatchCard key={s.varName} s={s} />)}
      </div>

      <H2>Palette ramps</H2>
      <p>Raw palette. Aliases above are mapped from these; you usually shouldn&rsquo;t reference them directly in components.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-5)' }}>
        <Ramp name="Brand blue" prefix="brand-blue" />
        <Ramp name="Neutral"    prefix="neutral" />
        <Ramp name="Green"      prefix="green" />
        <Ramp name="Orange"     prefix="orange" />
        <Ramp name="Red"        prefix="red" />
      </div>

      <H2>Theming</H2>
      <p>Hilal switches themes via a single <code>data-theme</code> attribute. The bundled dark theme is one example — define your own brand themes the same way.</p>
      <pre className="preview__code"><code>{`/* Activate by setting on <html> or any ancestor. */
document.documentElement.dataset.theme = 'dark';

/* Define a custom theme that overrides the semantic layer. */
[data-theme="acme"] {
  --hilal-bg-brand: #ff5500;
  --hilal-fg-link:  #ff5500;
}`}</code></pre>
    </>
  );
}
