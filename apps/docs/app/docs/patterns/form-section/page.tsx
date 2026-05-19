import type { Metadata } from 'next';
import { FormSection } from '@hilal-ds/patterns';
import { Input, Toggle } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'FormSection' };

export default function FormSectionPage() {
  return (
    <>
      <h1>FormSection</h1>
      <p className="lede">
        Settings-style section with title, description, and a stacked field group. Supports an
        optional two-column layout for label-on-left, fields-on-right pages.
      </p>

      <H2>Stacked</H2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <FormSection
              title="Profile"
              description="This information is shown on your public profile."
            >
              <Input label="Display name" defaultValue="Sara A." />
              <Input label="Headline" placeholder="What do you do?" />
            </FormSection>
          </div>
        }
        react={`<FormSection
  title="Profile"
  description="This information is shown on your public profile."
>
  <Input label="Display name" />
  <Input label="Headline" />
</FormSection>`}
        angular={`<hilal-form-section title="Profile" description="…">
  <hilal-input label="Display name"></hilal-input>
  <hilal-input label="Headline"></hilal-input>
</hilal-form-section>`}
        blade={`<x-hilal-form-section title="Profile" description="…">
  <x-hilal-input label="Display name" />
  <x-hilal-input label="Headline" />
</x-hilal-form-section>`}
      />

      <H2>Two-column</H2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <FormSection
              twoColumn
              title="Notifications"
              description="Choose how Acme reaches you about activity in your account."
            >
              <Toggle defaultChecked>Email updates</Toggle>
              <Toggle>SMS for billing alerts</Toggle>
            </FormSection>
          </div>
        }
        react={`<FormSection twoColumn title="Notifications" description="…">
  <Toggle defaultChecked>Email updates</Toggle>
  <Toggle>SMS for billing alerts</Toggle>
</FormSection>`}
        angular={`<hilal-form-section [twoColumn]="true" title="Notifications" description="…">
  …
</hilal-form-section>`}
        blade={`<x-hilal-form-section :two-column="true" title="Notifications" description="…">
  …
</x-hilal-form-section>`}
      />
    </>
  );
}
