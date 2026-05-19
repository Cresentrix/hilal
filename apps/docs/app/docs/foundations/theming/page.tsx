'use client';

import { useEffect, useState } from 'react';
import {
  Button, Badge, Card, CardHeader, CardBody, CardFooter, Avatar, Input,
} from '@hilal-ds/react';
import { H2, H3 } from '../../../_components/Heading';

const PRESETS: Array<{ name: string; color: string; hint: string }> = [
  { name: 'Default',  color: '#006399', hint: 'The default Hilal brand.' },
  { name: 'Crimson',  color: '#c0392b', hint: 'Editorial / publishing.' },
  { name: 'Emerald',  color: '#10b981', hint: 'Finance / health.' },
  { name: 'Indigo',   color: '#5b21b6', hint: 'Productivity / dev tools.' },
  { name: 'Sunset',   color: '#f97316', hint: 'Marketing / consumer.' },
  { name: 'Slate',    color: '#475569', hint: 'B2B / enterprise.' },
];

export default function ThemingPage() {
  const [color, setColor] = useState('#006399');

  useEffect(() => {
    document.documentElement.style.setProperty('--hilal-bg-brand', color);
    return () => {
      document.documentElement.style.removeProperty('--hilal-bg-brand');
    };
  }, [color]);

  return (
    <>
      <h1>Theming</h1>
      <p className="lede">
        Pick a brand color below. Hilal&rsquo;s entire UI — buttons, badges, focus rings, links —
        retunes from one CSS variable. The whole site, including this page, updates as you
        change it.
      </p>

      <H2>Pick a brand color</H2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--hilal-spacing-3)', alignItems: 'center', marginBlock: 'var(--hilal-spacing-4)' }}>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ inlineSize: '4rem', blockSize: '2.5rem', border: '1px solid var(--hilal-border-subtle)', borderRadius: 'var(--hilal-radius-md)', cursor: 'pointer', padding: 0, background: 'var(--hilal-bg-page)' }}
          aria-label="Brand color"
        />
        <Input value={color} onChange={(e) => setColor(e.currentTarget.value)} placeholder="#006399" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--hilal-spacing-2)' }}>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setColor(p.color)}
              title={p.hint}
              aria-label={`Preset: ${p.name}`}
              style={{
                inlineSize: '2rem',
                blockSize: '2rem',
                borderRadius: 999,
                border: color.toLowerCase() === p.color.toLowerCase()
                  ? '2px solid var(--hilal-fg-primary)'
                  : '1px solid var(--hilal-border-subtle)',
                background: p.color,
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <H2>Live preview</H2>
      <p>Everything below reads from <code>--hilal-bg-brand</code>. Try a preset to see it propagate.</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
          gap: 'var(--hilal-spacing-4)',
          marginBlock: 'var(--hilal-spacing-4)',
        }}
      >
        <Card variant="outlined">
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <strong>Project starlight</strong>
              <Badge tone="brand" size="sm">New</Badge>
            </div>
          </CardHeader>
          <CardBody>
            Mixing brand color and neutral surfaces — the hero card on most dashboards.
          </CardBody>
          <CardFooter>
            <Button size="sm">Open</Button>
            <Button size="sm" variant="tertiary">Snooze</Button>
          </CardFooter>
        </Card>
        <Card variant="outlined">
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--hilal-spacing-3)' }}>
              <Avatar initials="SA" status="online" />
              <div>
                <div style={{ fontWeight: 600 }}>Sara A.</div>
                <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>Online · Acme</div>
              </div>
            </div>
            <p style={{ color: 'var(--hilal-fg-secondary)', marginBlock: 'var(--hilal-spacing-3) 0' }}>
              The brand color drives the status dot, primary button, and focus ring on inputs.
            </p>
            <Input label="Email" placeholder="sara@acme.com" />
          </CardBody>
        </Card>
        <Card variant="elevated">
          <CardBody>
            <div style={{ fontSize: 'var(--hilal-font-size-13)', color: 'var(--hilal-fg-tertiary)' }}>Plan</div>
            <div style={{ fontSize: 'var(--hilal-font-size-24)', fontWeight: 600 }}>Team</div>
            <div style={{ marginBlockStart: 'var(--hilal-spacing-3)' }}>
              <span style={{ fontSize: 'var(--hilal-font-size-32)', fontWeight: 600 }}>$24</span>
              <span style={{ color: 'var(--hilal-fg-tertiary)' }}> / user / month</span>
            </div>
          </CardBody>
          <CardFooter>
            <Button style={{ inlineSize: '100%', justifyContent: 'center' }}>Start free trial</Button>
          </CardFooter>
        </Card>
      </div>

      <H2>How to apply it permanently</H2>
      <p>Add a theme block in your stylesheet. Activated via <code>data-theme</code> on any ancestor (typically <code>&lt;html&gt;</code>).</p>
      <pre className="preview__code"><code>{`/* your-app.css */
[data-theme="acme"] {
  --hilal-bg-brand: ${color};
  /* Override anything else you like: */
  --hilal-fg-link:  ${color};
  --hilal-border-focus: ${color};
}`}</code></pre>

      <pre className="preview__code"><code>{`<html data-theme="acme">…</html>`}</code></pre>

      <H2>Token surface you can override</H2>
      <p>Any semantic alias in <code>tokens.css</code> can be overridden inside a theme block. The brand-leaning ones:</p>
      <pre className="preview__code"><code>{`--hilal-bg-brand          fills primary buttons, badges, focus rings
--hilal-fg-on-brand       text color on brand-fill backgrounds
--hilal-fg-link           link text
--hilal-border-focus      :focus-visible outline color
--hilal-fg-primary        body text (rarely overridden)
--hilal-bg-page           page background (rarely overridden)`}</code></pre>
    </>
  );
}
