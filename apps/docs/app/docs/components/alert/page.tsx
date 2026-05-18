'use client';

import { useState } from 'react';
import { Alert, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export default function AlertPage() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <h1>Alert</h1>
      <p className="lede">
        Inline message with title, description, optional icon, four tones, and an optional
        dismiss action.
      </p>

      <h2>Tones</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <Alert tone="info"    title="Heads up"           description="We updated the billing schedule for next month." />
            <Alert tone="success" title="Saved"              description="Your changes have been published." />
            <Alert tone="warning" title="Approaching limit"  description="You've used 90% of your monthly quota." />
            <Alert tone="danger"  title="Couldn't save"      description="Check your connection and try again." />
          </div>
        }
        react={`<Alert tone="info"    title="Heads up"  description="…" />
<Alert tone="success" title="Saved"     description="…" />
<Alert tone="warning" title="Approaching limit" description="…" />
<Alert tone="danger"  title="Couldn't save"     description="…" />`}
        angular={`<hilal-alert tone="info" title="Heads up" description="…"></hilal-alert>
<hilal-alert tone="success" title="Saved" description="…"></hilal-alert>`}
        blade={`<x-hilal-alert tone="info" title="Heads up" description="…" />
<x-hilal-alert tone="success" title="Saved" description="…" />`}
      />

      <h2>Title only / description only</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <Alert tone="info" title="Sync resumed." />
            <Alert tone="warning" description="This action can't be undone." />
          </div>
        }
        react={`<Alert tone="info" title="Sync resumed." />
<Alert tone="warning" description="This action can't be undone." />`}
        angular={`<hilal-alert tone="info" title="Sync resumed."></hilal-alert>
<hilal-alert tone="warning" description="This action can't be undone."></hilal-alert>`}
        blade={`<x-hilal-alert tone="info" title="Sync resumed." />
<x-hilal-alert tone="warning" description="This action can't be undone." />`}
      />

      <h2>Custom icon</h2>
      <FrameworkTabs
        preview={
          <Alert
            tone="success"
            icon={<span aria-hidden style={{ fontSize: '1.25rem' }}>✦</span>}
            title="New feature"
            description="Dark theme is now available on every plan."
          />
        }
        react={`<Alert
  tone="success"
  icon={<SparkIcon />}
  title="New feature"
  description="Dark theme is now available."
/>`}
        angular={`<hilal-alert tone="success" title="New feature" description="…">
  <span hilalAlertIcon>✦</span>
</hilal-alert>`}
        blade={`<x-hilal-alert tone="success" title="New feature" description="…">
  <x-slot:icon>✦</x-slot:icon>
</x-hilal-alert>`}
      />

      <h2>Dismissible</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {open ? (
              <Alert
                tone="info"
                title="You're on the beta"
                description="Some features may be unstable. Thanks for trying it out."
                onDismiss={() => setOpen(false)}
                dismissLabel="Close"
              />
            ) : (
              <Button size="sm" variant="tertiary" onClick={() => setOpen(true)}>Reset</Button>
            )}
          </div>
        }
        react={`<Alert
  tone="info"
  title="You're on the beta"
  description="Some features may be unstable."
  onDismiss={() => setOpen(false)}
  dismissLabel="Close"
/>`}
        angular={`<hilal-alert tone="info" title="…" description="…" (dismiss)="close()"></hilal-alert>`}
        blade={`<x-hilal-alert tone="info" title="…" description="…" :dismissible="true" />`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`tone           'info' | 'success' | 'warning' | 'danger'    default: 'info'
title          ReactNode
description    ReactNode
icon           ReactNode      override the default icon for the tone
onDismiss      () => void     when provided, renders a dismiss button
dismissLabel   string         aria-label for the dismiss button (default: 'Dismiss')`}</code></pre>
      <Accessibility
        summary={<>Renders with <code>{"role=\"status\""}</code> for info/success and <code>{"role=\"alert\""}</code> for danger so screen readers announce immediately.</>}
        notes={[<>The dismiss button is keyboard-focusable and labelled by <code>{"dismissLabel"}</code>.</>]}
      />
    </>
  );
}
