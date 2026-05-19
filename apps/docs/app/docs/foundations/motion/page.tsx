'use client';

import { useState } from 'react';
import { Button } from '@hilal-ds/react';
import { H2, H3 } from '../../../_components/Heading';

const DURATIONS = [
  { name: 'instant', value: '0ms',   hint: 'Reduced-motion fallback.' },
  { name: 'fast',    value: '120ms', hint: 'Hover state, focus ring fade, color tweens.' },
  { name: 'base',    value: '200ms', hint: 'Default transition for most components.' },
  { name: 'slow',    value: '320ms', hint: 'Modals, drawers, large layout shifts.' },
];

const EASINGS = [
  { name: 'standard',    value: 'cubic-bezier(0.2, 0, 0, 1)',    hint: 'Default — most state changes.' },
  { name: 'emphasized',  value: 'cubic-bezier(0.3, 0, 0.1, 1)',  hint: 'Hero motion, large enter/exit.' },
  { name: 'decelerate',  value: 'cubic-bezier(0, 0, 0, 1)',      hint: 'Entering the screen.' },
  { name: 'accelerate',  value: 'cubic-bezier(0.3, 0, 1, 1)',    hint: 'Leaving the screen.' },
];

const row = {
  display: 'grid',
  gridTemplateColumns: '10rem 9rem 1fr',
  gap: 'var(--hilal-spacing-3)',
  alignItems: 'center',
  paddingBlock: 'var(--hilal-spacing-3)',
  borderBlockEnd: '1px solid var(--hilal-border-subtle)',
} as const;

const codeStyle = {
  fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)',
  color: 'var(--hilal-fg-tertiary)',
  fontSize: 'var(--hilal-font-size-12)',
} as const;

export default function MotionPage() {
  const [ping, setPing] = useState(0);
  return (
    <>
      <h1>Motion</h1>
      <p className="lede">
        Four duration steps and four easing curves. Components reference these instead of literal
        values, so the motion preset can globally calm or accelerate the whole UI.
      </p>

      <H2>Duration</H2>
      <p>Click the button to replay each duration on the same property.</p>
      <Button onClick={() => setPing((p) => p + 1)} variant="secondary">Replay animations</Button>
      <div style={{ marginBlockStart: 'var(--hilal-spacing-4)' }}>
        {DURATIONS.map((d) => (
          <div key={d.name} style={row}>
            <span style={codeStyle}>{`--hilal-motion-duration-${d.name}`}</span>
            <span style={codeStyle}>{d.value}</span>
            <div
              key={`${d.name}-${ping}`}
              style={{
                inlineSize: '1.5rem',
                blockSize: '1.5rem',
                borderRadius: 'var(--hilal-radius-sm)',
                background: 'var(--hilal-bg-brand)',
                animation: `slide ${d.value} var(--hilal-motion-easing-standard) 1`,
              }}
            />
          </div>
        ))}
      </div>

      <H2>Easing</H2>
      <div style={{ marginBlockStart: 'var(--hilal-spacing-4)' }}>
        {EASINGS.map((e) => (
          <div key={e.name} style={row}>
            <span style={codeStyle}>{`--hilal-motion-easing-${e.name}`}</span>
            <span style={codeStyle}>{e.value}</span>
            <div
              key={`${e.name}-${ping}`}
              style={{
                inlineSize: '1.5rem',
                blockSize: '1.5rem',
                borderRadius: 'var(--hilal-radius-sm)',
                background: 'var(--hilal-bg-brand)',
                animation: `slide var(--hilal-motion-duration-slow) ${e.value} 1`,
              }}
            />
          </div>
        ))}
      </div>

      <H2>Motion preset</H2>
      <p>Layer the motion preset to globally slow / disable animations — respects the user&rsquo;s reduced-motion preference.</p>
      <pre className="preview__code"><code>{`@import '@hilal-ds/tokens/themes/motion';

[data-motion="reduced"] {
  --hilal-motion-duration-fast: 0ms;
  --hilal-motion-duration-base: 0ms;
  --hilal-motion-duration-slow: 0ms;
}`}</code></pre>

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to   { transform: translateX(12rem); }
        }
      `}</style>
    </>
  );
}
