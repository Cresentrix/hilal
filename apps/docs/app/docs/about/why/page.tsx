import type { Metadata } from 'next';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Why Hilal' };

export default function WhyPage() {
  return (
    <>
      <h1>Why Hilal</h1>
      <p className="lede">
        Most design systems pick one framework and tell you to use it. Hilal renders identical
        DOM in three — so the same stylesheet covers everywhere your product ships.
      </p>

      <H2>The problem</H2>
      <p>
        Component libraries are bought into a single framework. Teams that ship a React app and a
        Laravel marketing site end up rebuilding the same buttons twice — and discovering that
        the &ldquo;same&rdquo; design drifts subtly between codebases. Tokens live in three places.
        Dark mode behaves differently. A change in Figma takes a sprint to land in production.
      </p>

      <H2>The Hilal approach</H2>
      <p>
        Hilal flips the order of operations. CSS is the source of truth. The framework packages
        (<code>@hilal-ds/react</code>, <code>@hilal-ds/angular</code>, <code>hilal/blade</code>)
        are thin wrappers that emit the same class names against the same DOM. One stylesheet,
        one set of tokens, three rendering paths.
      </p>
      <ul>
        <li><strong>Identical DOM</strong> across React, Angular, and Blade — same elements, same classes, same data attributes.</li>
        <li><strong>Real Figma sync</strong> — tokens come straight from a Figma source of truth, not hand-typed values that go stale.</li>
        <li><strong>Swap-an-attribute theming</strong> — dark mode, density, motion, and direction are all{' '}
          <code>data-*</code> toggles on <code>&lt;html&gt;</code>.</li>
        <li><strong>Composed patterns, not just primitives</strong> — AuthForm, CommandPalette, DashboardShell, and friends ship with the same parity.</li>
      </ul>

      <H2>When Hilal isn&rsquo;t a fit</H2>
      <p>If you only ship React and want a copy-paste catalog you can fork wholesale, shadcn/ui is excellent and you should use it.</p>
      <p>If you need a fully accessible primitives library with serious focus management research behind it and don&rsquo;t care about cross-framework, Radix UI is the gold standard.</p>
      <p>Hilal is for teams that ship in more than one stack, or expect to.</p>
    </>
  );
}
