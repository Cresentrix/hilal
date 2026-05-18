import type { Metadata } from 'next';
import { Alert } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Alert' };

export default function AlertPage() {
  return (
    <>
      <h1>Alert</h1>
      <p className="lede">
        Inline message with title, description, icon, and four tones. Optional dismiss button.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <Alert tone="info" title="Heads up" description="We updated the billing schedule for next month." />
            <Alert tone="success" title="Saved" description="Your changes have been published." />
            <Alert tone="warning" title="Approaching limit" description="You've used 90% of your monthly quota." />
            <Alert tone="danger" title="Couldn't save" description="Check your connection and try again." />
          </div>
        }
        react={`<Alert tone="info"    title="Heads up"  description="…" />
<Alert tone="success" title="Saved"     description="…" />
<Alert tone="warning" title="Approaching limit" description="…" />
<Alert tone="danger"  title="Couldn't save"     description="…" />`}
        angular={`<hilal-alert tone="info"    title="Heads up"  description="…"></hilal-alert>
<hilal-alert tone="success" title="Saved"     description="…"></hilal-alert>`}
        blade={`<x-hilal-alert tone="info"    title="Heads up" description="…" />
<x-hilal-alert tone="success" title="Saved"    description="…" />`}
      />
    </>
  );
}
