import type { Metadata } from 'next';
import { EmptyState, Button } from '@hilal-ds/react';
import { H2 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Showcase' };

export default function ShowcasePage() {
  return (
    <>
      <h1>Showcase</h1>
      <p className="lede">
        Real products built with Hilal. Nothing here yet — once a few apps go live, we&rsquo;ll
        feature them with a short write-up + a screenshot.
      </p>

      <div style={{ marginBlock: 'var(--hilal-spacing-6)' }}>
        <EmptyState
          title="No projects listed yet"
          description="Built something with Hilal? Open a PR adding it to this page — we'd love to feature it."
          actions={
            <a href="https://github.com/Cresentrix/hilal/issues/new" target="_blank" rel="noreferrer">
              <Button variant="secondary">Submit a project</Button>
            </a>
          }
        />
      </div>

      <H2>What we&rsquo;d feature</H2>
      <p>Anything ships to production with users. Internal tools, marketing sites, dashboards, mobile-web apps.</p>
      <p>What we&rsquo;d highlight:</p>
      <ul>
        <li>Which frameworks you mixed (React + Blade is the dream).</li>
        <li>One or two things you customized — brand tokens, a derived theme, a Pattern you wrote on top.</li>
        <li>One screenshot, optimized.</li>
      </ul>
    </>
  );
}
