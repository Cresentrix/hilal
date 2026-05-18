import type { Metadata } from 'next';
import { Stepper } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Stepper' };

export default function StepperPage() {
  return (
    <>
      <h1>Stepper</h1>
      <p className="lede">
        Progress indicator for multi-step flows. Horizontal or vertical, with complete / current /
        upcoming states. Used internally by the MultiStepForm pattern.
      </p>

      <h2>Horizontal</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <Stepper
              steps={[
                { label: 'Account',  status: 'complete' },
                { label: 'Profile',  status: 'current' },
                { label: 'Review',   status: 'upcoming' },
                { label: 'Done',     status: 'upcoming' },
              ]}
            />
          </div>
        }
        react={`<Stepper
  steps={[
    { label: 'Account', status: 'complete' },
    { label: 'Profile', status: 'current' },
    { label: 'Review',  status: 'upcoming' },
    { label: 'Done',    status: 'upcoming' },
  ]}
/>`}
        angular={`<hilal-stepper [steps]="steps"></hilal-stepper>`}
        blade={`<x-hilal-stepper :steps="$steps" />`}
      />

      <h2>Vertical</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%', maxWidth: '20rem' }}>
            <Stepper
              orientation="vertical"
              steps={[
                { label: 'Plan',   status: 'complete' },
                { label: 'Build',  status: 'current' },
                { label: 'Ship',   status: 'upcoming' },
              ]}
            />
          </div>
        }
        react={`<Stepper orientation="vertical" steps={[…]} />`}
        angular={`<hilal-stepper orientation="vertical" [steps]="steps"></hilal-stepper>`}
        blade={`<x-hilal-stepper orientation="vertical" :steps="$steps" />`}
      />
    </>
  );
}
