'use client';

import { useState } from 'react';
import { Button } from '@hilal-ds/react';
import { NotificationCenter, type NotificationItem } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function NotificationCenterPage() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([
    { id: '1', group: 'Today', title: 'Sara approved your PR', body: '#1284 — "Add multi-step wizard"', time: '2h ago', initials: 'SA', unread: true },
    { id: '2', group: 'Today', title: 'Deployment succeeded', body: 'main → production at 14:02', time: '3h ago', unread: true },
    { id: '3', group: 'Earlier', title: 'New billing invoice', body: 'May 2026 — $128.00', time: 'Yesterday' },
  ]);

  return (
    <>
      <h1>NotificationCenter</h1>
      <p className="lede">
        Drawer-based notification feed grouped by bucket (Today / Earlier / etc). Tracks unread
        state with a count pill and a mark-all-read action.
      </p>

      <FrameworkTabs
        preview={
          <div>
            <Button onClick={() => setOpen(true)}>Open notifications</Button>
            <NotificationCenter
              open={open}
              onClose={() => setOpen(false)}
              items={items}
              groupOrder={['Today', 'Earlier']}
              onMarkAllRead={() => setItems((xs) => xs.map((x) => ({ ...x, unread: false })))}
            />
          </div>
        }
        react={`<NotificationCenter
  open={open}
  onClose={() => setOpen(false)}
  items={items}
  onMarkAllRead={() => markAll()}
/>`}
        angular={`<hilal-notification-center
  [open]="open"
  (openChange)="open = $event"
  [items]="items"
  (markAllRead)="markAll()"
></hilal-notification-center>`}
        blade={`<x-hilal-notification-center
  name="inbox"
  :items="$items"
  :group-order="['Today', 'Earlier']"
/>`}
      />
    </>
  );
}
