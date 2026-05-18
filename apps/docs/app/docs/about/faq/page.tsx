import type { Metadata } from 'next';
import { Accordion, AccordionItem } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'FAQ' };

const QAS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: 'Is Hilal free?',
    a: <>Yes — Apache 2.0 license. No usage limits, no telemetry, no rug-pulls. Use it commercially without asking.</>,
  },
  {
    q: 'Does it support RTL?',
    a: <>Yes. Every layout in Hilal uses CSS logical properties (<code>padding-inline</code>, <code>margin-block</code>, <code>inset-inline-start</code>) so RTL works without conditional code. Toggle <code>dir=&quot;rtl&quot;</code> on <code>&lt;html&gt;</code> (or use the demo controls in the header) to see it.</>,
  },
  {
    q: 'Can I use it without React?',
    a: <>Yes — <code>@hilal-ds/angular</code> ships Angular 19 standalone components, and <code>hilal/blade</code> ships Laravel Blade components via Composer. All three emit the same DOM as the React package.</>,
  },
  {
    q: 'How big is the bundle?',
    a: <>The CSS is around 60 KB minified. Each framework package is fully tree-shakeable — only the components you import are bundled. Importing all of <code>@hilal-ds/react</code> is about 50 KB minified before gzip.</>,
  },
  {
    q: 'Can I theme it for my brand?',
    a: <>Yes. The whole color system goes through semantic aliases — override <code>--hilal-bg-brand</code>, <code>--hilal-fg-primary</code>, etc. in a <code>[data-theme=&quot;acme&quot;]</code> block and everything retunes. Components don&rsquo;t reference raw palette values.</>,
  },
  {
    q: 'How does the Figma sync work?',
    a: <>A tools/figma-sync script pulls token JSON from Figma&rsquo;s Variables API and writes <code>@hilal-ds/tokens</code>&rsquo; source files. The build then emits the same tokens in five formats: CSS variables, SCSS, JS object, JSON DTCG, and a Tailwind preset.</>,
  },
  {
    q: 'Is there a CLI like shadcn?',
    a: <>Not yet. Hilal is npm-installable instead of copy-paste, so the components stay in sync via standard package updates. A CLI for scaffolding pages from Recipes is on the roadmap.</>,
  },
  {
    q: 'How do I report a bug or request a component?',
    a: <>Open an issue at <a href="https://github.com/Cresentrix/hilal/issues" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>github.com/Cresentrix/hilal</a>.</>,
  },
];

export default function FaqPage() {
  return (
    <>
      <h1>FAQ</h1>
      <p className="lede">Short answers to the questions we get most.</p>
      <Accordion variant="bordered">
        {QAS.map((qa) => (
          <AccordionItem key={qa.q} title={qa.q}>{qa.a}</AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
