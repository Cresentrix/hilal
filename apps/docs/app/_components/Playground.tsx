'use client';

import { type ReactNode, useState, useCallback } from 'react';
import { CopyButton } from './CopyButton';

interface BaseControl { name: string; label?: string; }
type Control =
  | (BaseControl & { type: 'select'; options: readonly string[]; default: string })
  | (BaseControl & { type: 'boolean'; default: boolean })
  | (BaseControl & { type: 'text'; default: string; placeholder?: string });

export type PlaygroundState = Record<string, string | boolean>;

export interface PlaygroundProps {
  /** The controls bound to props of the rendered component. */
  controls: readonly Control[];
  /** Renders the live preview from the current control state. */
  render: (state: PlaygroundState) => ReactNode;
  /** Renders the code snippet from the current control state. */
  snippet: (state: PlaygroundState) => string;
}

function initialState(controls: readonly Control[]): PlaygroundState {
  const s: PlaygroundState = {};
  for (const c of controls) s[c.name] = c.default;
  return s;
}

export function Playground({ controls, render, snippet }: PlaygroundProps) {
  const [state, setState] = useState<PlaygroundState>(() => initialState(controls));
  const set = useCallback((name: string, value: string | boolean) => {
    setState((s) => ({ ...s, [name]: value }));
  }, []);
  const code = snippet(state);

  return (
    <div className="playground">
      <div className="playground__stage">{render(state)}</div>
      <div className="playground__split">
        <div className="playground__controls" role="group" aria-label="Component props">
          {controls.map((c) => (
            <div key={c.name} className="playground__row">
              <label className="playground__label" htmlFor={`pg-${c.name}`}>
                {c.label ?? c.name}
              </label>
              {c.type === 'select' ? (
                <select
                  id={`pg-${c.name}`}
                  className="playground__select"
                  value={state[c.name] as string}
                  onChange={(e) => set(c.name, e.target.value)}
                >
                  {c.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : c.type === 'boolean' ? (
                <label className="playground__switch">
                  <input
                    id={`pg-${c.name}`}
                    type="checkbox"
                    checked={!!state[c.name]}
                    onChange={(e) => set(c.name, e.currentTarget.checked)}
                  />
                  <span>{state[c.name] ? 'on' : 'off'}</span>
                </label>
              ) : (
                <input
                  id={`pg-${c.name}`}
                  className="playground__input"
                  type="text"
                  value={state[c.name] as string}
                  placeholder={c.placeholder}
                  onChange={(e) => set(c.name, e.currentTarget.value)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="playground__code">
          <div className="playground__code-bar">
            <span className="playground__code-label">React</span>
            <CopyButton value={code} />
          </div>
          <pre><code>{code}</code></pre>
        </div>
      </div>
    </div>
  );
}
