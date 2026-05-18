'use client';

import { useState, type ReactNode } from 'react';
import { CopyButton } from './CopyButton';

export type Framework = 'react' | 'angular' | 'blade';

const LABELS: Record<Framework, string> = {
  react: 'React',
  angular: 'Angular',
  blade: 'Blade',
};

export interface FrameworkTabsProps {
  /** Live React preview, identical-DOM markup that the snippets describe. */
  preview: ReactNode;
  react: string;
  angular: string;
  blade: string;
}

export function FrameworkTabs({ preview, react, angular, blade }: FrameworkTabsProps) {
  const [active, setActive] = useState<Framework>('react');
  const code: Record<Framework, string> = { react, angular, blade };

  return (
    <div className="preview">
      <div className="preview__stage">{preview}</div>
      <div className="preview__tabs" role="tablist" aria-label="Framework">
        {(Object.keys(LABELS) as Framework[]).map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className="preview__tab"
            onClick={() => setActive(f)}
          >
            {LABELS[f]}
          </button>
        ))}
        <div style={{ marginInlineStart: 'auto', paddingInlineEnd: 'var(--hilal-spacing-2)', display: 'flex', alignItems: 'center' }}>
          <CopyButton value={code[active]} />
        </div>
      </div>
      <pre className="preview__code" role="tabpanel">
        <code>{code[active]}</code>
      </pre>
    </div>
  );
}
