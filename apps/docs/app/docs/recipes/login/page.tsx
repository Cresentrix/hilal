import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthForm } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'Login page' };

export default function LoginRecipe() {
  return (
    <>
      <h1>Login page</h1>
      <p className="lede">
        Centered, single-column auth flow. Social buttons up top, an{' '}
        <code>AuthForm</code> in the middle, footer links below.
      </p>

      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          padding: 'var(--hilal-spacing-8)',
          background: 'var(--hilal-bg-subtle)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <AuthForm
            mode="sign-in"
            title="Welcome back"
            description="Sign in to continue to Acme."
            socialSection={
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-2)' }}>
                <Button variant="secondary"><span aria-hidden>🇬</span>&nbsp;&nbsp;Continue with Google</Button>
                <Button variant="secondary"><span aria-hidden></span>&nbsp;&nbsp;Continue with GitHub</Button>
                <div style={{ textAlign: 'center', color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-12)', marginBlock: 'var(--hilal-spacing-2)' }}>
                  or with email
                </div>
              </div>
            }
            onSubmit={async ({ email }) => (email.includes('@') ? null : 'Invalid email.')}
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--hilal-font-size-13)' }}>
                <Link href="#" style={{ color: 'var(--hilal-bg-brand)' }}>Forgot password?</Link>
                <Link href="#" style={{ color: 'var(--hilal-bg-brand)' }}>Create account</Link>
              </div>
            }
          />
        </div>
      </div>

      <h2>Source</h2>
      <pre className="preview__code"><code>{`import { AuthForm } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';

export default function LoginPage() {
  return (
    <main className="page">
      <AuthForm
        mode="sign-in"
        title="Welcome back"
        description="Sign in to continue to Acme."
        socialSection={
          <>
            <Button variant="secondary"><GoogleIcon /> Continue with Google</Button>
            <Button variant="secondary"><GitHubIcon /> Continue with GitHub</Button>
          </>
        }
        onSubmit={signIn}
        footer={
          <>
            <a href="/forgot">Forgot password?</a>
            <a href="/signup">Create account</a>
          </>
        }
      />
    </main>
  );
}`}</code></pre>
    </>
  );
}
