import type { Metadata } from 'next';
import { Button, EmptyState } from '@hilal-ds/react';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: '404 page' };

export default function NotFoundRecipe() {
  return (
    <>
      <h1>404 page</h1>
      <p className="lede">
        Friendly not-found screen built on <code>EmptyState</code> + a couple of Buttons. Drop it
        in as <code>app/not-found.tsx</code> (or your framework&rsquo;s equivalent).
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
        <EmptyState
          icon={<div style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--hilal-fg-tertiary)' }}>404</div>}
          title="We couldn't find that page"
          description="The link might be broken, or the page may have moved. Try going home, or use search."
          actions={
            <>
              <Button>Go home</Button>
              <Button variant="secondary">Open search</Button>
            </>
          }
        />
      </div>

      <H2>Source</H2>
      <pre className="preview__code"><code>{`// app/not-found.tsx (Next.js)
import { EmptyState, Button } from '@hilal-ds/react';

export default function NotFound() {
  return (
    <main>
      <EmptyState
        icon={<BigNumber>404</BigNumber>}
        title="We couldn't find that page"
        description="The link might be broken or the page may have moved."
        actions={
          <>
            <Button onClick={() => router.push('/')}>Go home</Button>
            <Button variant="secondary" onClick={openSearch}>Open search</Button>
          </>
        }
      />
    </main>
  );
}`}</code></pre>
    </>
  );
}
