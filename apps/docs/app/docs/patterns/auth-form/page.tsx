'use client';

import Link from 'next/link';
import { AuthForm } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function AuthFormPage() {
  return (
    <>
      <h1>AuthForm</h1>
      <p className="lede">
        Sign-in, sign-up, and reset-password forms with built-in submit handling and error
        display. Slots for social buttons and footer links.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <AuthForm
              mode="sign-in"
              title="Welcome back"
              description="Sign in to continue to Acme."
              onSubmit={async ({ email }) => (email.includes('@') ? null : 'Invalid email.')}
              footer={<Link href="#" style={{ color: 'var(--hilal-bg-brand)' }}>Forgot password?</Link>}
            />
          </div>
        }
        react={`<AuthForm
  mode="sign-in"
  title="Welcome back"
  description="Sign in to continue."
  onSubmit={async (values) => {
    const err = await signIn(values);
    return err ?? null;
  }}
  footer={<a href="/forgot">Forgot password?</a>}
/>`}
        angular={`<hilal-auth-form
  mode="sign-in"
  title="Welcome back"
  description="Sign in to continue."
  (submitted)="signIn($event)"
></hilal-auth-form>`}
        blade={`<x-hilal-auth-form
  mode="sign-in"
  title="Welcome back"
  description="Sign in to continue."
  action="/login"
/>`}
      />
    </>
  );
}
