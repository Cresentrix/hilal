import { useState, type FormEvent, type ReactNode } from 'react';
import { Button, Input, Card, CardHeader, CardBody, CardFooter, Alert } from '@hilal-ds/react';

export type AuthMode = 'sign-in' | 'sign-up';

export interface AuthFormValues {
  email: string;
  password: string;
  /** Only present in sign-up mode. */
  name?: string;
}

export interface AuthFormProps {
  mode?: AuthMode;
  title?: ReactNode;
  description?: ReactNode;
  /** Called with form values on submit. Return a string error message to render an Alert, or null on success. */
  onSubmit?: (values: AuthFormValues) => Promise<string | null> | string | null | void;
  /** Optional links rendered below the form (forgot password, switch mode, etc.). */
  footer?: ReactNode;
  /** Optional content rendered above the form (social buttons, divider). */
  socialSection?: ReactNode;
  submitLabel?: string;
  /** Show a name field in sign-up mode. Default true when mode='sign-up'. */
  collectName?: boolean;
}

/**
 * AuthForm — minimal, batteries-included sign-in / sign-up form.
 * Renders inside a Card. Handles loading state and surfacing errors.
 */
export function AuthForm({
  mode = 'sign-in',
  title,
  description,
  onSubmit,
  footer,
  socialSection,
  submitLabel,
  collectName = mode === 'sign-up',
}: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await onSubmit?.({ email, password, name: collectName ? name : undefined });
      if (typeof result === 'string') setError(result);
    } finally {
      setLoading(false);
    }
  };

  const heading = title ?? (mode === 'sign-in' ? 'Sign in' : 'Create account');
  const submit = submitLabel ?? (mode === 'sign-in' ? 'Sign in' : 'Create account');

  return (
    <Card variant="elevated" padding="md" style={{ inlineSize: 'min(28rem, 100%)' }}>
      <CardHeader>
        <div>
          <h1 style={{ margin: 0, fontSize: 'var(--hilal-font-size-24)' }}>{heading}</h1>
          {description ? (
            <p style={{ margin: 0, color: 'var(--hilal-fg-secondary)', fontSize: 'var(--hilal-font-size-14)' }}>
              {description}
            </p>
          ) : null}
        </div>
      </CardHeader>
      <CardBody>
        {socialSection}
        {error ? <Alert tone="danger" description={error} /> : null}
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--hilal-spacing-3)' }}>
          {collectName ? (
            <Input label="Name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          ) : null}
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="primary" size="md" loading={loading}>
            {submit}
          </Button>
        </form>
      </CardBody>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
}
