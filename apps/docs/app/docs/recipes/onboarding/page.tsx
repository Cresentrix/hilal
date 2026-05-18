'use client';

import { useState } from 'react';
import { Input, Select, Checkbox, Alert } from '@hilal-ds/react';
import { MultiStepForm } from '@hilal-ds/patterns';

export default function OnboardingRecipe() {
  const [done, setDone] = useState(false);

  return (
    <>
      <h1>Onboarding wizard</h1>
      <p className="lede">
        Four-step account setup using <code>MultiStepForm</code> + native form fields. Each step
        owns its own validation; the last step submits and reveals a success state.
      </p>

      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          padding: 'var(--hilal-spacing-6)',
          background: 'var(--hilal-bg-page)',
        }}
      >
        <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
          {done ? (
            <Alert
              tone="success"
              title="You're in"
              description="Your Acme workspace is ready. Redirecting to the dashboard…"
            />
          ) : (
            <MultiStepForm
              onSubmit={async () => { await new Promise((r) => setTimeout(r, 700)); setDone(true); }}
              steps={[
                {
                  label: 'Workspace',
                  content: (
                    <>
                      <Input label="Workspace name" placeholder="Acme" />
                      <Input label="Workspace URL" leadingIcon={<span aria-hidden>acme.app/</span>} placeholder="acme" />
                    </>
                  ),
                },
                {
                  label: 'You',
                  content: (
                    <>
                      <Input label="Full name" placeholder="Sara A." />
                      <Select label="Role" defaultValue="founder">
                        <option value="founder">Founder</option>
                        <option value="engineer">Engineer</option>
                        <option value="designer">Designer</option>
                        <option value="other">Other</option>
                      </Select>
                    </>
                  ),
                },
                {
                  label: 'Team',
                  content: (
                    <>
                      <Input label="Invite teammates" placeholder="email1@example.com, email2@example.com" hint="Comma-separated, we'll email them an invite." />
                      <Checkbox defaultChecked>Allow anyone with an @acme.app email to join</Checkbox>
                    </>
                  ),
                },
                {
                  label: 'Review',
                  content: (
                    <p style={{ color: 'var(--hilal-fg-secondary)' }}>
                      Everything look good? You can change all of this later under Settings.
                    </p>
                  ),
                },
              ]}
            />
          )}
        </div>
      </div>

      <h2>Source</h2>
      <pre className="preview__code"><code>{`<MultiStepForm
  onSubmit={async () => createWorkspace(state)}
  steps={[
    { label: 'Workspace', content: <WorkspaceFields /> },
    { label: 'You',       content: <ProfileFields /> },
    { label: 'Team',      content: <InviteFields /> },
    { label: 'Review',    content: <ReviewSummary /> },
  ]}
/>`}</code></pre>
    </>
  );
}
