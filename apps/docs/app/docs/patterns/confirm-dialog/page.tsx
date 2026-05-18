'use client';

import { useState } from 'react';
import { ConfirmDialog } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function ConfirmDialogPage() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>ConfirmDialog</h1>
      <p className="lede">
        Modal preset for &ldquo;confirm then act&rdquo; flows. Shows a loading state on the confirm
        button while <code>onConfirm</code> resolves; pass <code>destructive</code> to surface
        the danger styling.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Button variant="tertiary" onClick={() => setOpen(true)}>Delete project</Button>
            <span style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>
              Confirmed: <strong style={{ color: 'var(--hilal-fg-primary)' }}>{count}</strong>
            </span>
            <ConfirmDialog
              open={open}
              onClose={() => setOpen(false)}
              title="Delete this project?"
              description="This can't be undone. The project, its members, and all data will be removed."
              destructive
              confirmLabel="Delete project"
              onConfirm={async () => { await new Promise((r) => setTimeout(r, 600)); setCount((c) => c + 1); }}
            />
          </div>
        }
        react={`<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete this project?"
  description="This can't be undone."
  destructive
  confirmLabel="Delete project"
  onConfirm={async () => {
    await deleteProject(id);
  }}
/>`}
        angular={`<hilal-confirm-dialog
  [open]="open"
  (openChange)="open = $event"
  title="Delete this project?"
  description="This can't be undone."
  [destructive]="true"
  confirmLabel="Delete project"
  (confirmed)="deleteProject()"
></hilal-confirm-dialog>`}
        blade={`<x-hilal-confirm-dialog
  name="delete-project"
  title="Delete this project?"
  description="This can't be undone."
  :destructive="true"
  confirm-label="Delete project"
  x-on:confirmed="deleteProject()"
/>`}
      />
    </>
  );
}
