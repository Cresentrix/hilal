'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthForm, type AuthMode } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function AuthFormPage() {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  return (
    <>
      <h1>AuthForm</h1>
      <p className="lede">
        Sign-in, sign-up, and reset-password forms with built-in submit handling, error display,
        and configurable slots for social buttons and footer links.
      </p>

      <h2>Modes</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
              {(['sign-in', 'sign-up', 'forgot-password'] as AuthMode[]).map((m) => (
                <Button
                  key={m}
                  size="sm"
                  variant={mode === m ? 'primary' : 'tertiary'}
                  onClick={() => setMode(m)}
                >
                  {m}
                </Button>
              ))}
            </div>
            <AuthForm
              mode={mode}
              title={mode === 'sign-in' ? 'Welcome back' : mode === 'sign-up' ? 'Create an account' : 'Reset your password'}
              description={
                mode === 'sign-in' ? 'Sign in to continue to Acme.'
                : mode === 'sign-up' ? 'Free forever for personal projects.'
                : 'We’ll email you a reset link.'
              }
              onSubmit={async ({ email }) => (email.includes('@') ? null : 'Invalid email.')}
            />
          </div>
        }
        react={`<AuthForm mode="sign-in"          title="Welcome back"   onSubmit={signIn} />
<AuthForm mode="sign-up"          title="Create account" onSubmit={signUp} />
<AuthForm mode="forgot-password"  title="Reset password" onSubmit={reset}  />`}
        angular={`<hilal-auth-form mode="sign-in"          title="Welcome back" (submitted)="signIn($event)"></hilal-auth-form>
<hilal-auth-form mode="sign-up"          title="Create account" (submitted)="signUp($event)"></hilal-auth-form>
<hilal-auth-form mode="forgot-password"  title="Reset password" (submitted)="reset($event)"></hilal-auth-form>`}
        blade={`<x-hilal-auth-form mode="sign-in"          title="Welcome back" action="/login" />
<x-hilal-auth-form mode="sign-up"          title="Create account" action="/register" />
<x-hilal-auth-form mode="forgot-password"  title="Reset password" action="/forgot" />`}
      />

      <h2>With footer links</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%', maxWidth: '28rem' }}>
            <AuthForm
              mode="sign-in"
              title="Welcome back"
              description="Sign in to continue."
              onSubmit={async () => null}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--hilal-font-size-13)' }}>
                  <Link href="#" style={{ color: 'var(--hilal-bg-brand)' }}>Forgot password?</Link>
                  <Link href="#" style={{ color: 'var(--hilal-bg-brand)' }}>Create account</Link>
                </div>
              }
            />
          </div>
        }
        react={`<AuthForm
  mode="sign-in"
  onSubmit={signIn}
  footer={
    <>
      <a href="/forgot">Forgot password?</a>
      <a href="/signup">Create account</a>
    </>
  }
/>`}
        angular={`<hilal-auth-form mode="sign-in" (submitted)="signIn($event)">
  <div hilalAuthFooter>
    <a href="/forgot">Forgot password?</a>
    <a href="/signup">Create account</a>
  </div>
</hilal-auth-form>`}
        blade={`<x-hilal-auth-form mode="sign-in" action="/login">
  <x-slot:footer>
    <a href="/forgot">Forgot password?</a>
    <a href="/signup">Create account</a>
  </x-slot:footer>
</x-hilal-auth-form>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`mode             'sign-in' | 'sign-up' | 'forgot-password'   default: 'sign-in'
title            ReactNode
description      ReactNode
onSubmit         (values) => string | null | Promise<string | null>
                 Return a string to render an Alert error; null on success.
footer           ReactNode   links / mode switch
socialSection    ReactNode   rendered above the form
submitLabel      string
collectName      boolean     default: true when mode='sign-up'`}</code></pre>
    </>
  );
}
