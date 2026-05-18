import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Button, Badge, Card, CardHeader, CardBody, CardFooter } from '@hilal-ds/react';

export const metadata: Metadata = { title: 'Pricing' };

interface Plan {
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'For solo builders and side projects.',
    price: '$0',
    cadence: 'forever',
    features: ['Unlimited components', 'Community support', 'Up to 1 published site', 'Light + dark themes'],
    cta: 'Start free',
  },
  {
    name: 'Team',
    tagline: 'Small teams shipping production apps.',
    price: '$24',
    cadence: 'per user / month',
    features: ['Everything in Starter', 'Up to 10 published sites', 'Email support', 'Custom token themes', 'Figma sync'],
    cta: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Org-wide standards and security review.',
    price: 'Custom',
    cadence: 'contact sales',
    features: ['Everything in Team', 'Unlimited sites', 'SSO + SCIM', 'Dedicated support', 'On-prem option'],
    cta: 'Contact sales',
  },
];

function Check({ children }: { children: ReactNode }) {
  return (
    <li style={{ display: 'flex', gap: 'var(--hilal-spacing-2)', alignItems: 'flex-start', paddingBlock: '0.2rem' }}>
      <span aria-hidden style={{ color: 'var(--hilal-status-success)', fontWeight: 700 }}>✓</span>
      <span>{children}</span>
    </li>
  );
}

export default function PricingRecipe() {
  return (
    <>
      <h1>Pricing</h1>
      <p className="lede">
        Three-column plan grid with a featured tier. Built entirely from Card, Button, and Badge —
        no custom CSS beyond layout glue.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
          gap: 'var(--hilal-spacing-4)',
          marginBlock: 'var(--hilal-spacing-6)',
        }}
      >
        {PLANS.map((p) => (
          <Card key={p.name} variant={p.featured ? 'elevated' : 'outlined'} style={p.featured ? { borderColor: 'var(--hilal-bg-brand)' } : undefined}>
            <CardHeader>
              <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: 'var(--hilal-font-size-15)' }}>{p.name}</strong>
                  {p.featured ? <Badge tone="brand" size="sm">Most popular</Badge> : null}
                </div>
                <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)', marginBlockStart: '0.2rem' }}>{p.tagline}</div>
              </div>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                <span style={{ fontSize: 'var(--hilal-font-size-32)', fontWeight: 'var(--hilal-font-weight-semibold)' }}>{p.price}</span>
                <span style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>/ {p.cadence}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 'var(--hilal-spacing-4) 0 0', display: 'flex', flexDirection: 'column' }}>
                {p.features.map((f) => <Check key={f}>{f}</Check>)}
              </ul>
            </CardBody>
            <CardFooter>
              <Button variant={p.featured ? 'primary' : 'secondary'} style={{ inlineSize: '100%', justifyContent: 'center' }}>
                {p.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2>Source</h2>
      <pre className="preview__code"><code>{`<div className="plans">
  {plans.map((p) => (
    <Card variant={p.featured ? 'elevated' : 'outlined'}>
      <CardHeader>
        {p.name} {p.featured && <Badge tone="brand">Most popular</Badge>}
      </CardHeader>
      <CardBody>
        <PriceLine price={p.price} cadence={p.cadence} />
        <FeatureList features={p.features} />
      </CardBody>
      <CardFooter>
        <Button variant={p.featured ? 'primary' : 'secondary'}>{p.cta}</Button>
      </CardFooter>
    </Card>
  ))}
</div>`}</code></pre>
    </>
  );
}
