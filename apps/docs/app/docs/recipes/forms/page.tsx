'use client';

import { useState } from 'react';
import { Input, Select, Checkbox, Toggle, Button, Alert } from '@hilal-ds/react';
import { FormSection } from '@hilal-ds/patterns';
import { H2, H3 } from '../../../_components/Heading';

interface FormState {
  name: string;
  email: string;
  role: string;
  notifications: boolean;
  marketing: boolean;
  terms: boolean;
}

interface Errors { [k: string]: string }

function validate(s: FormState): Errors {
  const e: Errors = {};
  if (!s.name.trim()) e.name = 'Name is required.';
  if (!s.email.trim()) e.email = 'Email is required.';
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) e.email = 'Use a valid email address.';
  if (!s.role) e.role = 'Pick a role.';
  if (!s.terms) e.terms = 'You must accept the terms.';
  return e;
}

export default function FormsRecipe() {
  const [state, setState] = useState<FormState>({
    name: '', email: '', role: '', notifications: true, marketing: false, terms: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setState((s) => ({ ...s, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <h1>Forms with validation</h1>
      <p className="lede">
        How to wire Hilal&rsquo;s form primitives — Input, Select, Checkbox, Toggle — into a
        controlled form with field-level errors. Works the same with react-hook-form,
        Formik, or plain <code>useState</code>; the example below is plain React for clarity.
      </p>

      <H2>Live demo</H2>
      <div
        style={{
          marginBlock: 'var(--hilal-spacing-6)',
          border: '1px solid var(--hilal-border-subtle)',
          borderRadius: 'var(--hilal-radius-lg)',
          padding: 'var(--hilal-spacing-6)',
          background: 'var(--hilal-bg-page)',
          maxWidth: '32rem',
        }}
      >
        {submitted ? (
          <Alert
            tone="success"
            title="Submitted"
            description={`Welcome, ${state.name}. We sent a confirmation to ${state.email}.`}
            onDismiss={() => { setSubmitted(false); setState({ name: '', email: '', role: '', notifications: true, marketing: false, terms: false }); }}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <FormSection title="Your details" description="We&rsquo;ll use this to set up your account.">
              <Input
                label="Full name"
                value={state.name}
                onChange={(e) => update('name', e.currentTarget.value)}
                error={errors.name}
                placeholder="Sara A."
              />
              <Input
                label="Email"
                type="email"
                value={state.email}
                onChange={(e) => update('email', e.currentTarget.value)}
                error={errors.email}
                placeholder="you@example.com"
              />
              <Select
                label="Role"
                value={state.role}
                onChange={(e) => update('role', e.currentTarget.value)}
                error={errors.role}
              >
                <option value="">Pick one…</option>
                <option value="founder">Founder</option>
                <option value="engineer">Engineer</option>
                <option value="designer">Designer</option>
                <option value="other">Other</option>
              </Select>
            </FormSection>
            <FormSection title="Preferences" description="Change these anytime under Settings.">
              <Toggle
                checked={state.notifications}
                onChange={(e) => update('notifications', e.currentTarget.checked)}
              >
                Product update emails
              </Toggle>
              <Toggle
                checked={state.marketing}
                onChange={(e) => update('marketing', e.currentTarget.checked)}
              >
                Marketing emails
              </Toggle>
              <Checkbox
                checked={state.terms}
                onChange={(e) => update('terms', e.currentTarget.checked)}
              >
                I agree to the terms and privacy policy
              </Checkbox>
              {errors.terms ? (
                <div style={{ color: 'var(--hilal-status-error)', fontSize: 'var(--hilal-font-size-13)' }}>
                  {errors.terms}
                </div>
              ) : null}
            </FormSection>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--hilal-spacing-2)', marginBlockStart: 'var(--hilal-spacing-4)' }}>
              <Button type="submit">Create account</Button>
            </div>
          </form>
        )}
      </div>

      <H2>With react-hook-form</H2>
      <p>
        Hilal&rsquo;s form components are uncontrolled-friendly — they spread native input
        attributes — so <code>register()</code> works out of the box. Errors come back from RHF
        and feed straight into the <code>error</code> prop.
      </p>
      <pre className="preview__code"><code>{`import { useForm } from 'react-hook-form';
import { Input, Select, Checkbox, Button } from '@hilal-ds/react';

type Values = { name: string; email: string; terms: boolean };

export function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<Values>();
  const onSubmit = (values: Values) => createAccount(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full name"
        {...register('name', { required: 'Name is required.' })}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', {
          required: 'Email is required.',
          pattern: { value: /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/, message: 'Use a valid email.' },
        })}
        error={errors.email?.message}
      />
      <Checkbox {...register('terms', { required: 'You must accept the terms.' })}>
        I agree to the terms
      </Checkbox>
      <Button type="submit">Create account</Button>
    </form>
  );
}`}</code></pre>

      <H2>Server-side error mapping</H2>
      <p>
        When a Laravel / Rails / API endpoint comes back with field errors, set them via{' '}
        <code>setError</code> in RHF (or your state setter for plain forms). The shape stays
        the same — <code>error</code> prop on each field — so server and client errors render
        identically.
      </p>
      <pre className="preview__code"><code>{`const onSubmit = async (values: Values) => {
  const res = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(values) });
  if (res.status === 422) {
    const { errors } = await res.json();
    for (const [field, [message]] of Object.entries(errors)) {
      setError(field as keyof Values, { message });
    }
    return;
  }
  router.push('/welcome');
};`}</code></pre>

      <H2>Native form submission (Blade, server-side)</H2>
      <p>
        Hilal&rsquo;s Angular and Blade components are also native forms under the hood, so a
        plain HTML form submission to a server endpoint works without any JS at all. Field
        errors come back via <code>old()</code> + flash session in Blade.
      </p>
      <pre className="preview__code"><code>{`{{-- resources/views/signup.blade.php --}}
<form method="POST" action="/signup">
  @csrf
  <x-hilal-input
    name="name"
    label="Full name"
    :value="old('name')"
    :error="$errors->first('name')"
  />
  <x-hilal-input
    name="email"
    type="email"
    label="Email"
    :value="old('email')"
    :error="$errors->first('email')"
  />
  <x-hilal-checkbox name="terms" :checked="old('terms')" :error="$errors->first('terms')">
    I agree to the terms
  </x-hilal-checkbox>
  <x-hilal-button type="submit">Create account</x-hilal-button>
</form>`}</code></pre>
    </>
  );
}
