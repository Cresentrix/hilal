import type { Metadata } from 'next';
import {
  Tabs, TabList, Tab, TabPanel, Input, Select, Toggle, Avatar, Button,
} from '@hilal-ds/react';
import { FormSection, PageHeader } from '@hilal-ds/patterns';

export const metadata: Metadata = { title: 'Settings page' };

export default function SettingsRecipe() {
  return (
    <>
      <h1>Settings page</h1>
      <p className="lede">
        Account settings layout — vertical Tabs on the left, FormSection blocks on the right.
        Common SaaS pattern, built from primitives + patterns.
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
        <PageHeader title="Settings" description="Manage your account and team." />

        <div style={{ marginBlockStart: 'var(--hilal-spacing-6)' }}>
          <Tabs defaultValue="profile" orientation="vertical">
            <TabList>
              <Tab value="profile">Profile</Tab>
              <Tab value="account">Account</Tab>
              <Tab value="notifications">Notifications</Tab>
              <Tab value="api">API keys</Tab>
              <Tab value="billing">Billing</Tab>
            </TabList>

            <TabPanel value="profile" style={{ paddingInline: 'var(--hilal-spacing-6)' }}>
              <FormSection
                twoColumn
                title="Profile"
                description="This information is shown to other Acme members."
                aside={<Avatar initials="SA" size="lg" />}
              >
                <Input label="Display name" defaultValue="Sara A." />
                <Input label="Headline" placeholder="Eg. Designer · Builder" />
                <Input label="Email" type="email" defaultValue="sara@acme.com" hint="Used for sign-in and account recovery." />
              </FormSection>
              <FormSection
                twoColumn
                title="Localization"
                description="Pick the language and region used across the app."
              >
                <Select label="Language" defaultValue="en">
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </Select>
                <Select label="Region" defaultValue="kw">
                  <option value="kw">Kuwait</option>
                  <option value="ae">UAE</option>
                  <option value="sa">Saudi Arabia</option>
                </Select>
              </FormSection>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--hilal-spacing-2)', marginBlockStart: 'var(--hilal-spacing-4)' }}>
                <Button variant="tertiary">Cancel</Button>
                <Button>Save changes</Button>
              </div>
            </TabPanel>

            <TabPanel value="account" style={{ paddingInline: 'var(--hilal-spacing-6)' }}>
              <FormSection twoColumn title="Password" description="Change your sign-in password.">
                <Input label="Current password" type="password" />
                <Input label="New password" type="password" />
              </FormSection>
              <FormSection twoColumn title="Two-factor auth" description="An extra layer of security on sign-in.">
                <Toggle defaultChecked>Require 2FA</Toggle>
              </FormSection>
            </TabPanel>

            <TabPanel value="notifications" style={{ paddingInline: 'var(--hilal-spacing-6)' }}>
              <FormSection twoColumn title="Email" description="Where to reach you about activity.">
                <Toggle defaultChecked>Weekly digest</Toggle>
                <Toggle defaultChecked>Mentions and replies</Toggle>
                <Toggle>Marketing</Toggle>
              </FormSection>
            </TabPanel>

            <TabPanel value="api" style={{ paddingInline: 'var(--hilal-spacing-6)' }}>
              <p style={{ color: 'var(--hilal-fg-secondary)' }}>API key management goes here.</p>
            </TabPanel>

            <TabPanel value="billing" style={{ paddingInline: 'var(--hilal-spacing-6)' }}>
              <p style={{ color: 'var(--hilal-fg-secondary)' }}>Subscription and invoices.</p>
            </TabPanel>
          </Tabs>
        </div>
      </div>

      <h2>Source</h2>
      <pre className="preview__code"><code>{`<PageHeader title="Settings" description="Manage your account." />

<Tabs orientation="vertical" defaultValue="profile">
  <TabList>
    <Tab value="profile">Profile</Tab>
    <Tab value="account">Account</Tab>
    <Tab value="notifications">Notifications</Tab>
  </TabList>

  <TabPanel value="profile">
    <FormSection twoColumn title="Profile" description="…" aside={<Avatar />}>
      <Input label="Display name" />
      <Input label="Email" type="email" />
    </FormSection>
  </TabPanel>
  …
</Tabs>`}</code></pre>
    </>
  );
}
