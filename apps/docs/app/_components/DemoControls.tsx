'use client';

import { useEffect, useState } from 'react';

type Theme    = 'light' | 'dark';
type Density  = 'compact' | 'cozy' | 'spacious';
type Motion   = 'subtle' | 'cozy' | 'expressive' | 'off';
type Dir      = 'ltr' | 'rtl';

const KEY = {
  theme: 'hilal-theme',
  density: 'hilal-density',
  motion: 'hilal-motion',
  dir: 'hilal-dir',
} as const;

function applyAttr(name: string, value: string | null) {
  if (value && value !== 'cozy') {
    document.documentElement.setAttribute(`data-${name}`, value);
  } else {
    document.documentElement.removeAttribute(`data-${name}`);
  }
}

export function DemoControls() {
  const [theme, setTheme] = useState<Theme>('light');
  const [density, setDensity] = useState<Density>('cozy');
  const [motion, setMotion] = useState<Motion>('cozy');
  const [dir, setDir] = useState<Dir>('ltr');

  // Hydrate from <html> (set by the inline script in layout to avoid FOUC).
  useEffect(() => {
    const html = document.documentElement;
    setTheme((html.dataset.theme as Theme) || 'light');
    setDensity((html.dataset.density as Density) || 'cozy');
    setMotion((html.dataset.motion as Motion) || 'cozy');
    setDir((html.dir as Dir) || 'ltr');
  }, []);

  const change = <T extends string>(
    storageKey: string,
    setter: (v: T) => void,
    apply: (v: T) => void,
  ) => (v: T) => {
    setter(v);
    apply(v);
    try { localStorage.setItem(storageKey, v); } catch {}
  };

  const onTheme = change<Theme>(KEY.theme, setTheme, (v) => {
    document.documentElement.dataset.theme = v;
  });
  const onDensity = change<Density>(KEY.density, setDensity, (v) => applyAttr('density', v));
  const onMotion = change<Motion>(KEY.motion, setMotion, (v) => applyAttr('motion', v));
  const onDir = change<Dir>(KEY.dir, setDir, (v) => {
    document.documentElement.dir = v;
  });

  return (
    <details className="demo-controls">
      <summary aria-label="Open theme controls" title="Theme controls">⚙</summary>
      <div className="demo-controls__panel">
        <Row label="Theme">
          <Segmented value={theme} onChange={onTheme} options={[['light', 'Light'], ['dark', 'Dark']]} />
        </Row>
        <Row label="Density">
          <Segmented value={density} onChange={onDensity} options={[['compact', 'Compact'], ['cozy', 'Cozy'], ['spacious', 'Spacious']]} />
        </Row>
        <Row label="Motion">
          <Segmented value={motion} onChange={onMotion} options={[['subtle', 'Subtle'], ['cozy', 'Cozy'], ['expressive', 'Bold'], ['off', 'Off']]} />
        </Row>
        <Row label="Direction">
          <Segmented value={dir} onChange={onDir} options={[['ltr', 'LTR'], ['rtl', 'RTL']]} />
        </Row>
        <p className="demo-controls__hint">
          These toggle <code>data-theme</code>, <code>data-density</code>, <code>data-motion</code>,
          and <code>dir</code> on <code>&lt;html&gt;</code>. Same mechanism your app would use.
        </p>
      </div>
    </details>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="demo-controls__row">
      <span className="demo-controls__label">{label}</span>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  value, onChange, options,
}: { value: T; onChange: (v: T) => void; options: Array<[T, string]> }) {
  return (
    <div className="demo-controls__seg" role="group">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          className="demo-controls__seg-btn"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
