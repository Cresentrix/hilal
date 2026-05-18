import Link from 'next/link';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from './_components/FrameworkTabs';

const reactCode = `import { Button } from '@hilal-ds/react';

export function Demo() {
  return (
    <>
      <Button>Get started</Button>
      <Button variant="tertiary">Learn more</Button>
    </>
  );
}`;

const angularCode = `import { Component } from '@angular/core';
import { HilalButtonComponent } from '@hilal-ds/angular';

@Component({
  selector: 'demo',
  standalone: true,
  imports: [HilalButtonComponent],
  template: \`
    <hilal-button>Get started</hilal-button>
    <hilal-button variant="tertiary">Learn more</hilal-button>
  \`,
})
export class DemoComponent {}`;

const bladeCode = `<x-hilal-button>Get started</x-hilal-button>
<x-hilal-button variant="tertiary">Learn more</x-hilal-button>`;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <span className="hero__eyebrow">v0.1.1 · now on npm</span>
        <h1 className="hero__title">One DOM.<br/>Three frameworks.</h1>
        <p className="hero__lede">
          Hilal is a design system that ships pixel-identical components for React,
          Angular, and Blade — built from a single token system synced from Figma.
        </p>
        <div className="hero__cta">
          <Link href="/docs/getting-started">
            <Button size="lg">Get started</Button>
          </Link>
          <Link href="/docs/components">
            <Button size="lg" variant="tertiary">Browse components</Button>
          </Link>
        </div>
        <div className="snippet">
          <span className="snippet__prompt">$</span>
          <code>npm install @hilal-ds/core @hilal-ds/react</code>
        </div>
      </section>

      <section style={{ maxWidth: '56rem', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>
          The same component, three frameworks.
        </h2>
        <p style={{ color: 'var(--hilal-fg-secondary)', marginBottom: '1.5rem' }}>
          Click the tabs below — the markup is different, the rendered DOM and CSS classes are not.
        </p>
        <FrameworkTabs
          preview={
            <>
              <Button>Get started</Button>
              <Button variant="tertiary">Learn more</Button>
            </>
          }
          react={reactCode}
          angular={angularCode}
          blade={bladeCode}
        />
      </section>

      <section className="feature-grid">
        <div className="feature">
          <div className="feature__title">Real Figma tokens</div>
          <p className="feature__body">
            Tokens are synced from a Figma source of truth and built to CSS variables, SCSS,
            JS, JSON (W3C DTCG), and a Tailwind preset — so design and code never drift.
          </p>
        </div>
        <div className="feature">
          <div className="feature__title">Identical DOM across frameworks</div>
          <p className="feature__body">
            React, Angular, and Blade emit the same markup with the same class names. One
            stylesheet covers all three — and one screenshot test catches regressions everywhere.
          </p>
        </div>
        <div className="feature">
          <div className="feature__title">Composed patterns, not just primitives</div>
          <p className="feature__body">
            Beyond Button and Input, ship with composed building blocks — AuthForm,
            DashboardShell, CommandPalette, NotificationCenter — that you’d otherwise rebuild
            per project.
          </p>
        </div>
        <div className="feature">
          <div className="feature__title">Dark theme + density + motion presets</div>
          <p className="feature__body">
            Toggle a single <code>data-theme</code> attribute. Adjust density and motion through
            preset CSS layers without touching component code.
          </p>
        </div>
      </section>
    </>
  );
}
