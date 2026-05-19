'use client';

import { Badge } from '@hilal-ds/react';
import { Playground } from '../Playground';

export function BadgePlayground() {
  return (
    <Playground
      controls={[
        { name: 'tone',     type: 'select',  options: ['neutral', 'info', 'success', 'warning', 'danger', 'brand'], default: 'success' },
        { name: 'size',     type: 'select',  options: ['sm', 'md'], default: 'sm' },
        { name: 'children', type: 'text',    default: 'Live' },
        { name: 'dot',      type: 'boolean', default: false },
      ]}
      render={(s) => (
        <Badge
          tone={s.tone as 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand'}
          size={s.size as 'sm' | 'md'}
          dot={!!s.dot}
        >
          {!s.dot ? String(s.children) || 'Live' : null}
        </Badge>
      )}
      snippet={(s) => {
        const attrs = [`tone="${s.tone}"`];
        if (s.size !== 'sm') attrs.push(`size="${s.size}"`);
        if (s.dot) attrs.push('dot');
        return s.dot
          ? `<Badge ${attrs.join(' ')} />`
          : `<Badge ${attrs.join(' ')}>${String(s.children) || 'Live'}</Badge>`;
      }}
    />
  );
}
