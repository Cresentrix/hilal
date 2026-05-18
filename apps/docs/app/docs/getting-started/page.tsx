import type { Metadata } from 'next';
import { FrameworkTabs } from '../../_components/FrameworkTabs';
import { Button } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'Getting started' };

const installReact = `# 1. Install
npm install @hilal-ds/core @hilal-ds/react

# 2. In your app's entry, import the CSS once:
# main.tsx
import '@hilal-ds/core/dist/hilal.css';
// Optional: dark theme + density/motion presets
import '@hilal-ds/tokens/dist/themes/dark.css';

# 3. Use components:
import { Button } from '@hilal-ds/react';
export default () => <Button>Hello</Button>;`;

const installAngular = `# 1. Install
npm install @hilal-ds/core @hilal-ds/angular

# 2. In angular.json, add the CSS to your styles:
# "styles": [
#   "node_modules/@hilal-ds/core/dist/hilal.css"
# ]

# 3. Use the standalone component:
import { HilalButtonComponent } from '@hilal-ds/angular';

@Component({
  standalone: true,
  imports: [HilalButtonComponent],
  template: \`<hilal-button>Hello</hilal-button>\`,
})
export class AppComponent {}`;

const installBlade = `# 1. Require the package
composer require hilal/blade

# 2. In your layout's <head>, import the CSS:
<link rel="stylesheet" href="https://unpkg.com/@hilal-ds/core/dist/hilal.css">

# 3. Use the component:
<x-hilal-button>Hello</x-hilal-button>`;

export default function GettingStartedPage() {
  return (
    <>
      <h1>Getting started</h1>
      <p className="lede">
        Hilal ships three framework packages — <code>@hilal-ds/react</code>,{' '}
        <code>@hilal-ds/angular</code>, and <code>hilal/blade</code> — that all render the same
        DOM and pull from one stylesheet. Pick your framework below.
      </p>

      <FrameworkTabs
        preview={<Button>Hello</Button>}
        react={installReact}
        angular={installAngular}
        blade={installBlade}
      />

      <h2>Theming</h2>
      <p>
        Hilal&rsquo;s tokens are vanilla CSS variables, so you switch themes by toggling a{' '}
        <code>data-theme</code> attribute on any ancestor (usually <code>&lt;html&gt;</code>):
      </p>
      <pre className="preview__code"><code>{`document.documentElement.dataset.theme = 'dark';`}</code></pre>

      <h2>Density &amp; motion presets</h2>
      <p>
        Layer either of the preset CSS files on top of the base tokens to compress spacing,
        slow / disable motion, etc.
      </p>
      <pre className="preview__code"><code>{`@import '@hilal-ds/tokens/dist/themes/density.css';
@import '@hilal-ds/tokens/dist/themes/motion.css';`}</code></pre>

      <h2>Next steps</h2>
      <p>
        Head over to <a href="/docs/components" style={{ textDecoration: 'underline' }}>Components</a>{' '}
        for the primitive catalog or <a href="/docs/patterns" style={{ textDecoration: 'underline' }}>Patterns</a>{' '}
        for composed building blocks.
      </p>
    </>
  );
}
