'use client';

import { Button } from '@hilal-ds/react';
import { Playground } from '../Playground';

export function ButtonPlayground() {
  return (
    <Playground
      controls={[
        { name: 'variant',  type: 'select',  options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
        { name: 'size',     type: 'select',  options: ['sm', 'md', 'lg'],                   default: 'md' },
        { name: 'children', type: 'text',    default: 'Click me' },
        { name: 'loading',  type: 'boolean', default: false },
        { name: 'disabled', type: 'boolean', default: false },
      ]}
      render={(s) => (
        <Button
          variant={s.variant as 'primary' | 'secondary' | 'tertiary'}
          size={s.size as 'sm' | 'md' | 'lg'}
          loading={!!s.loading}
          disabled={!!s.disabled}
        >
          {String(s.children) || 'Click me'}
        </Button>
      )}
      snippet={(s) => {
        const attrs: string[] = [];
        if (s.variant !== 'primary') attrs.push(`variant="${s.variant}"`);
        if (s.size !== 'md')         attrs.push(`size="${s.size}"`);
        if (s.loading)               attrs.push('loading');
        if (s.disabled)              attrs.push('disabled');
        return `<Button${attrs.length ? ' ' + attrs.join(' ') : ''}>${String(s.children) || 'Click me'}</Button>`;
      }}
    />
  );
}
