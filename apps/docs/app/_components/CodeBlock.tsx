import type { ReactNode } from 'react';

export function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="preview__code"><code>{children}</code></pre>
  );
}
