import type { ReactNode } from 'react';

export interface AnatomyPart {
  label: string;
  description: ReactNode;
}

export function Anatomy({
  diagram, parts,
}: {
  /** ASCII-art-like slot diagram (rendered in a monospace block). */
  diagram: string;
  parts: AnatomyPart[];
}) {
  return (
    <section className="anatomy">
      <pre className="anatomy__diagram"><code>{diagram}</code></pre>
      <ul className="anatomy__parts">
        {parts.map((p) => (
          <li key={p.label}>
            <code className="anatomy__name">{p.label}</code>
            <span>{p.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
