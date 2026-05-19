'use client';

import { Avatar } from '@hilal-ds/react';
import { Playground } from '../Playground';

export function AvatarPlayground() {
  return (
    <Playground
      controls={[
        { name: 'size',     type: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
        { name: 'initials', type: 'text',   default: 'SA' },
        { name: 'src',      type: 'text',   default: '', placeholder: 'optional image URL' },
        { name: 'status',   type: 'select', options: ['none', 'online', 'busy', 'away', 'offline'], default: 'online' },
      ]}
      render={(s) => (
        <Avatar
          size={s.size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
          initials={String(s.initials) || undefined}
          src={String(s.src) || undefined}
          status={s.status === 'none' ? undefined : (s.status as 'online' | 'busy' | 'away' | 'offline')}
        />
      )}
      snippet={(s) => {
        const attrs: string[] = [];
        if (s.size !== 'md') attrs.push(`size="${s.size}"`);
        if (s.src)           attrs.push(`src="${s.src}"`);
        if (s.initials)      attrs.push(`initials="${s.initials}"`);
        if (s.status !== 'none') attrs.push(`status="${s.status}"`);
        return `<Avatar${attrs.length ? ' ' + attrs.join(' ') : ''} />`;
      }}
    />
  );
}
