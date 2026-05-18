import type { ReactNode } from 'react';

export interface KeyRow { keys: string; action: string; }

export interface AccessibilityProps {
  /** Short paragraph describing the role / ARIA model. */
  summary: ReactNode;
  /** Keyboard interactions. Omit if there are none beyond browser defaults. */
  keys?: KeyRow[];
  /** Optional bullet-list of ARIA notes / extras (focus traps, live regions, etc.). */
  notes?: ReactNode[];
}

export function Accessibility({ summary, keys, notes }: AccessibilityProps) {
  return (
    <section className="a11y" aria-labelledby="a11y-heading">
      <h2 id="a11y-heading">Accessibility</h2>
      <p>{summary}</p>
      {keys && keys.length > 0 ? (
        <table className="a11y__keys">
          <thead>
            <tr><th>Key</th><th>Action</th></tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.keys}>
                <td><kbd>{k.keys}</kbd></td>
                <td>{k.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {notes && notes.length > 0 ? (
        <ul className="a11y__notes">
          {notes.map((n, i) => <li key={i}>{n}</li>)}
        </ul>
      ) : null}
    </section>
  );
}
