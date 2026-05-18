'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function ConfirmDialogPage() {
  const [open, setOpen] = useState<'safe' | 'destructive' | null>(null);
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>ConfirmDialog</h1>
      <p className="lede">
        Modal preset for &ldquo;confirm then act&rdquo; flows. Shows a loading state on the
        confirm button while <code>onConfirm</code> resolves; pass <code>destructive</code> for
        irreversible actions.
      </p>

      <h2>Default</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button onClick={() => setOpen('safe')}>Archive project</Button>
            <span style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>
              Confirmed: <strong style={{ color: 'var(--hilal-fg-primary)' }}>{count}</strong>
            </span>
            <ConfirmDialog
              open={open === 'safe'}
              onClose={() => setOpen(null)}
              title="Archive this project?"
              description="You can restore it from the archive at any time."
              confirmLabel="Archive"
              onConfirm={async () => { await new Promise((r) => setTimeout(r, 500)); setCount((c) => c + 1); }}
            />
          </div>
        }
        react={`<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Archive this project?"
  description="You can restore it from the archive at any time."
  confirmLabel="Archive"
  onConfirm={async () => archiveProject(id)}
/>`}
        angular={`<hilal-confirm-dialog
  [open]="open"
  (openChange)="open = $event"
  title="Archive this project?"
  description="…"
  confirmLabel="Archive"
  (confirmed)="archive()"
></hilal-confirm-dialog>`}
        blade={`<x-hilal-confirm-dialog
  name="archive"
  title="Archive this project?"
  description="…"
  confirm-label="Archive"
/>`}
      />

      <h2>Destructive</h2>
      <FrameworkTabs
        preview={
          <>
            <Button variant="tertiary" onClick={() => setOpen('destructive')}>Delete project</Button>
            <ConfirmDialog
              open={open === 'destructive'}
              onClose={() => setOpen(null)}
              title="Delete this project?"
              description="This can't be undone. The project, its members, and all data will be removed."
              destructive
              confirmLabel="Delete project"
              onConfirm={async () => { await new Promise((r) => setTimeout(r, 600)); setCount((c) => c + 1); }}
            />
          </>
        }
        react={`<ConfirmDialog
  open={open}
  onClose={close}
  title="Delete this project?"
  description="This can't be undone."
  destructive
  confirmLabel="Delete project"
  onConfirm={async () => deleteProject(id)}
/>`}
        angular={`<hilal-confirm-dialog
  [open]="open" (openChange)="open = $event"
  title="Delete this project?"
  description="…"
  [destructive]="true"
  confirmLabel="Delete project"
  (confirmed)="deleteProject()"
></hilal-confirm-dialog>`}
        blade={`<x-hilal-confirm-dialog
  name="delete-project"
  title="Delete this project?"
  description="…"
  :destructive="true"
  confirm-label="Delete project"
/>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`open            boolean
onClose         () => void
title           ReactNode
description     ReactNode
onConfirm       () => void | Promise<void>   if it returns a promise, button shows loading
confirmLabel    string                        default: 'Confirm'
cancelLabel     string                        default: 'Cancel'
destructive     boolean                       danger-styled confirm button
size            'sm' | 'md'                   default: 'sm'`}</code></pre>
    </>
  );
}
