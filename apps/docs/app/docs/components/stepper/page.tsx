import type { Metadata } from 'next';
import { Stepper } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export const metadata: Metadata = { title: 'Stepper' };

export default function StepperPage() {
  return (
    <>
      <h1>Stepper</h1>
      <p className="lede">
        Progress indicator for multi-step flows. Horizontal or vertical, with three statuses
        (complete, current, upcoming). Used internally by the MultiStepForm pattern.
      </p>

      <h2>Statuses</h2>
      <p>Each step accepts a <code>status</code> — <code>complete</code> shows a check, <code>current</code> gets the primary fill, <code>upcoming</code> is muted.</p>
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

      <h2>Vertical orientation</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '20rem' }}>
            <Stepper
              orientation="vertical"
              steps={[
                { label: 'Plan',          status: 'complete' },
                { label: 'Design review', status: 'complete' },
                { label: 'Build',         status: 'current' },
                { label: 'QA',            status: 'upcoming' },
                { label: 'Ship',          status: 'upcoming' },
              ]}
            />
          </div>
        }
        react={`<Stepper orientation="vertical" steps={[…]} />`}
        angular={`<hilal-stepper orientation="vertical" [steps]="steps"></hilal-stepper>`}
        blade={`<x-hilal-stepper orientation="vertical" :steps="$steps" />`}
      />

      <h2>Custom indicators</h2>
      <p>Override the numeric / check indicator per step.</p>
      <FrameworkTabs
        preview={
          <Stepper
            steps={[
              { label: 'Cart',     status: 'complete', indicator: '★' },
              { label: 'Shipping', status: 'current',  indicator: '⛟' },
              { label: 'Payment',  status: 'upcoming', indicator: '$' },
            ]}
          />
        }
        react={`<Stepper steps={[
  { label: 'Cart',     status: 'complete', indicator: '★' },
  { label: 'Shipping', status: 'current',  indicator: '⛟' },
  { label: 'Payment',  status: 'upcoming', indicator: '$' },
]} />`}
        angular={`steps = [
  { label: 'Cart',     status: 'complete', indicator: '★' },
  { label: 'Shipping', status: 'current',  indicator: '⛟' },
];`}
        blade={`$steps = [
  ['label' => 'Cart',     'status' => 'complete', 'indicator' => '★'],
  ['label' => 'Shipping', 'status' => 'current',  'indicator' => '⛟'],
];`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`steps         StepItem[]                             required
orientation   'horizontal' | 'vertical'              default: 'horizontal'

StepItem {
  label       ReactNode                              required
  status      'complete' | 'current' | 'upcoming'    default: 'upcoming'
  indicator   ReactNode                              overrides numeric/check
}`}</code></pre>
      <Accessibility
        summary={<>Rendered as an <code>{"<ol>"}</code> with each step in <code>{"<li>"}</code>. The current step carries <code>{"aria-current=\"step\""}</code>.</>}
      />
    </>
  );
}
