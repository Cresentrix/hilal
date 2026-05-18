'use client';

import { useState } from 'react';
import { Input } from '@hilal-ds/react';
import { MultiStepForm } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function MultiStepFormPage() {
  const [done, setDone] = useState(false);

  return (
    <>
      <h1>MultiStepForm</h1>
      <p className="lede">
        Wizard pattern with Stepper + content + back/next/submit. Each step can supply an
        async <code>validate</code> hook that blocks advancement.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%', maxWidth: '36rem' }}>
            {done ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--hilal-fg-secondary)' }}>
                Submitted — <button onClick={() => setDone(false)} style={{ background: 'none', border: 'none', color: 'var(--hilal-bg-brand)', cursor: 'pointer', textDecoration: 'underline' }}>reset</button>
              </div>
            ) : (
              <MultiStepForm
                onSubmit={async () => { await new Promise((r) => setTimeout(r, 700)); setDone(true); }}
                steps={[
                  {
                    label: 'Account',
                    content: <>
                      <Input label="Email" placeholder="you@example.com" />
                      <Input label="Password" type="password" />
                    </>,
                  },
                  {
                    label: 'Profile',
                    content: <>
                      <Input label="Display name" placeholder="Sara A." />
                      <Input label="Company" placeholder="Cresentrix" />
                    </>,
                  },
                  {
                    label: 'Review',
                    content: <p style={{ color: 'var(--hilal-fg-secondary)' }}>Everything look good?</p>,
                  },
                ]}
              />
            )}
          </div>
        }
        react={`<MultiStepForm
  onSubmit={async () => save()}
  steps={[
    { label: 'Account', content: <AccountFields />, validate: () => emailIsValid() },
    { label: 'Profile', content: <ProfileFields /> },
    { label: 'Review',  content: <ReviewSummary /> },
  ]}
/>`}
        angular={`<hilal-multi-step-form (submitted)="save()">
  <ng-template hilalMultiStepStep="Account" [validate]="validateAccount">
    <hilal-input label="Email" name="email"></hilal-input>
  </ng-template>
  <ng-template hilalMultiStepStep="Profile">…</ng-template>
  <ng-template hilalMultiStepStep="Review">…</ng-template>
</hilal-multi-step-form>`}
        blade={`<x-hilal-multi-step-form :steps="[['label' => 'Account'], ['label' => 'Profile'], ['label' => 'Review']]" action="/save">
  <x-slot:step0>
    <x-hilal-input label="Email" name="email" />
  </x-slot:step0>
  <x-slot:step1>…</x-slot:step1>
  <x-slot:step2>…</x-slot:step2>
</x-hilal-multi-step-form>`}
      />
    </>
  );
}
