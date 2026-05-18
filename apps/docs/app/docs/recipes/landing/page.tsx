import type { Metadata } from 'next';
import { Button, Badge, Card, CardBody, Avatar } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'Marketing landing' };

export default function LandingRecipe() {
  return (
    <>
      <h1>Marketing landing</h1>
      <p className="lede">
        Hero + social proof + feature grid + CTA. Pure primitives — no custom CSS beyond layout.
      </p>

      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          padding: 'var(--hilal-spacing-8)',
          background: 'var(--hilal-bg-page)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '40rem', margin: '0 auto' }}>
          <Badge tone="brand" size="sm">v1.0 just shipped</Badge>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, letterSpacing: '-0.02em', margin: 'var(--hilal-spacing-4) 0' }}>
            Ship faster with one design system across React, Angular, and Blade.
          </h1>
          <p style={{ color: 'var(--hilal-fg-secondary)', fontSize: 'var(--hilal-font-size-16)', lineHeight: 1.55, marginBlock: 'var(--hilal-spacing-3)' }}>
            Hilal renders identical DOM in every framework. Style once, ship everywhere — with
            real Figma tokens and a dark theme out of the box.
          </p>
          <div style={{ display: 'flex', gap: 'var(--hilal-spacing-2)', justifyContent: 'center', marginBlockStart: 'var(--hilal-spacing-5)' }}>
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="secondary">View on GitHub</Button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--hilal-spacing-3)', marginBlockStart: 'var(--hilal-spacing-8)', alignItems: 'center' }}>
          <span style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>Trusted by teams at</span>
          <strong style={{ opacity: 0.8 }}>Acme</strong>
          <strong style={{ opacity: 0.8 }}>Globex</strong>
          <strong style={{ opacity: 0.8 }}>Initech</strong>
          <strong style={{ opacity: 0.8 }}>Hooli</strong>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
            gap: 'var(--hilal-spacing-3)',
            marginBlockStart: 'var(--hilal-spacing-8)',
          }}
        >
          {[
            ['One DOM',      'Components render identical markup across React, Angular, and Blade.'],
            ['Real tokens',  'Synced from Figma; emitted to CSS, SCSS, JS, JSON DTCG, Tailwind.'],
            ['Dark + dense', 'Theme, density, and motion presets are all swap-an-attribute away.'],
          ].map(([t, d]) => (
            <Card key={t} variant="outlined">
              <CardBody>
                <div style={{ fontWeight: 600, marginBlockEnd: 'var(--hilal-spacing-2)' }}>{t}</div>
                <div style={{ color: 'var(--hilal-fg-secondary)', fontSize: 'var(--hilal-font-size-14)' }}>{d}</div>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card variant="elevated" style={{ marginBlockStart: 'var(--hilal-spacing-8)' }}>
          <CardBody>
            <div style={{ display: 'flex', gap: 'var(--hilal-spacing-4)', alignItems: 'flex-start' }}>
              <Avatar initials="SA" size="lg" />
              <div>
                <p style={{ margin: 0, color: 'var(--hilal-fg-primary)', fontSize: 'var(--hilal-font-size-15)', lineHeight: 1.5 }}>
                  &ldquo;We replaced three separate component libraries with Hilal in a week. The
                  Figma-token sync alone is worth the switch — the multi-framework story is the
                  reason we stayed.&rdquo;
                </p>
                <div style={{ marginBlockStart: 'var(--hilal-spacing-3)', color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>
                  Sara A. · Head of Engineering, Acme
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
