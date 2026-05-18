import Link from 'next/link';
import { Button, EmptyState } from '@hilal-ds/react';

export default function NotFound() {
  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingInline: 'var(--hilal-spacing-6)',
      paddingBlock: 'var(--hilal-spacing-12)',
      minBlockSize: '60vh',
    }}>
      <div style={{ maxInlineSize: '32rem', inlineSize: '100%' }}>
        <EmptyState
          icon={
            <div style={{
              fontSize: '4rem',
              fontWeight: 700,
              letterSpacing: '-0.05em',
              color: 'var(--hilal-fg-tertiary)',
              lineHeight: 1,
            }}>
              404
            </div>
          }
          title="We couldn't find that page"
          description="The link might be broken, or the page may have moved. Try going home or use ⌘K to search."
          actions={
            <>
              <Link href="/"><Button>Go home</Button></Link>
              <Link href="/docs/components"><Button variant="secondary">Browse components</Button></Link>
            </>
          }
        />
      </div>
    </main>
  );
}
