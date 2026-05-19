'use client';

import { Card, CardBody } from '@hilal-ds/react';
import { Playground } from '../Playground';

export function CardPlayground() {
  return (
    <Playground
      controls={[
        { name: 'variant',     type: 'select',  options: ['default', 'elevated', 'outlined', 'ghost'], default: 'outlined' },
        { name: 'padding',     type: 'select',  options: ['none', 'sm', 'md', 'lg'], default: 'md' },
        { name: 'interactive', type: 'boolean', default: false },
        { name: 'body',        type: 'text',    default: 'A flexible surface for grouping content.' },
      ]}
      render={(s) => (
        <Card
          variant={s.variant as 'default' | 'elevated' | 'outlined' | 'ghost'}
          padding={s.padding as 'none' | 'sm' | 'md' | 'lg'}
          interactive={!!s.interactive}
          style={{ inlineSize: '20rem' }}
        >
          <CardBody>{String(s.body) || 'A flexible surface for grouping content.'}</CardBody>
        </Card>
      )}
      snippet={(s) => {
        const attrs: string[] = [];
        if (s.variant !== 'default') attrs.push(`variant="${s.variant}"`);
        if (s.padding !== 'md')      attrs.push(`padding="${s.padding}"`);
        if (s.interactive)           attrs.push('interactive');
        return `<Card${attrs.length ? ' ' + attrs.join(' ') : ''}>\n  <CardBody>${String(s.body) || 'Body'}</CardBody>\n</Card>`;
      }}
    />
  );
}
