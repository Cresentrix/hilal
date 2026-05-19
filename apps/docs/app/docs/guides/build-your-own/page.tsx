import type { Metadata } from 'next';
import { H2, H3 } from '../../../_components/Heading';

export const metadata: Metadata = { title: 'Build your own component' };

export default function BuildYourOwnPage() {
  return (
    <>
      <h1>Build your own component</h1>
      <p className="lede">
        Hilal is opinionated about a few things and silent about everything else. This guide
        covers the four conventions that keep your custom components feeling part of the
        system: tokens, class naming, composition, and RTL safety.
      </p>

      <H2>1. Reach for tokens, not literals</H2>
      <p>
        Every color, spacing step, radius, font size, and motion value in Hilal goes through a
        CSS variable. Reach for those instead of typing literals; that&rsquo;s what lets the dark
        theme, density preset, and brand customization work for free.
      </p>
      <pre className="preview__code"><code>{`/* No */
.my-thing { padding: 12px; background: #f5f5f5; }

/* Yes */
.my-thing {
  padding-inline: var(--hilal-spacing-3);
  padding-block:  var(--hilal-spacing-3);
  background:     var(--hilal-bg-subtle);
  color:          var(--hilal-fg-primary);
  border-radius:  var(--hilal-radius-md);
}`}</code></pre>
      <p>
        Aliases (<code>--hilal-bg-page</code>, <code>--hilal-fg-tertiary</code>, etc.) are the
        first stop. Reach for raw palette ramps (<code>--hilal-color-brand-blue-500</code>) only
        when the semantic layer doesn&rsquo;t have what you need — then consider adding a new alias.
      </p>

      <H2>2. Name classes BEM-style under <code>hilal-</code></H2>
      <p>
        Every Hilal class is prefixed <code>hilal-</code> followed by the component name and a
        BEM-style modifier or element suffix. Custom components that follow the same pattern
        look like they belong and won&rsquo;t collide with the system.
      </p>
      <pre className="preview__code"><code>{`.hilal-pricing-card           /* the block */
.hilal-pricing-card__header   /* an element inside */
.hilal-pricing-card--featured /* a modifier */`}</code></pre>
      <p>
        If you&rsquo;re building an in-house component for a single app and don&rsquo;t need parity
        across three frameworks, you can still benefit from the tokens without adopting the
        class naming — but if you ever want to upstream the component, names matter.
      </p>

      <H2>3. Compose primitives over reinventing them</H2>
      <p>
        Most &ldquo;new&rdquo; components are arrangements of existing ones. A pricing card is a Card
        with a header, a body, and a footer Button. A comment thread is a DataList. An invoice
        modal is a Modal containing a FormSection. Compose first; drop down to raw markup only
        when you&rsquo;ve checked that no existing primitive fits.
      </p>
      <pre className="preview__code"><code>{`import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from '@hilal-ds/react';

export function PricingCard({ plan, featured }) {
  return (
    <Card variant={featured ? 'elevated' : 'outlined'}>
      <CardHeader>
        <strong>{plan.name}</strong>
        {featured && <Badge tone="brand">Most popular</Badge>}
      </CardHeader>
      <CardBody>
        <PriceLine price={plan.price} cadence={plan.cadence} />
        <FeatureList features={plan.features} />
      </CardBody>
      <CardFooter>
        <Button variant={featured ? 'primary' : 'secondary'}>{plan.cta}</Button>
      </CardFooter>
    </Card>
  );
}`}</code></pre>

      <H2>4. Use logical properties for layout</H2>
      <p>
        Everything visible in Hilal uses CSS logical properties (<code>padding-inline</code>,{' '}
        <code>margin-block</code>, <code>inset-inline-start</code>) so a single{' '}
        <code>dir=&quot;rtl&quot;</code> toggle reflows the whole UI without conditional code.
      </p>
      <pre className="preview__code"><code>{`/* No — locks layout to LTR */
.thing { padding-left: 1rem; margin-right: 0.5rem; }

/* Yes — flips correctly in RTL */
.thing {
  padding-inline-start: 1rem;
  margin-inline-end:    0.5rem;
}`}</code></pre>

      <H2>5. Mirror the API shape of nearby primitives</H2>
      <p>
        If you&rsquo;re adding something form-shaped, copy the prop names from Input / Select:{' '}
        <code>label</code>, <code>hint</code>, <code>error</code>, <code>success</code>,{' '}
        <code>disabled</code>, <code>size</code>. Consistency across props is what makes the
        whole set feel like one library instead of 36 individual components.
      </p>
      <p>
        The same applies to slot composition. Anything dialog-shaped should expose Header /
        Body / Footer / Close. Anything list-shaped should accept an <code>items</code> array
        of objects with <code>id</code>, <code>label</code>, optional <code>meta</code> and
        <code>trailing</code>.
      </p>

      <H2>6. Test the dark theme + RTL toggle</H2>
      <p>
        Before you ship: flip the theme toggle in the docs header (or set{' '}
        <code>data-theme=&quot;dark&quot;</code> on <code>&lt;html&gt;</code>), then flip{' '}
        <code>dir=&quot;rtl&quot;</code>. If something looks wrong, it&rsquo;s usually a hard-coded
        color, a literal <code>padding-left</code>, or a directional icon you forgot to
        mirror. Catching this once at component-build time saves debugging it later.
      </p>

      <H2>When to upstream</H2>
      <p>Ship in-house first. Once it&rsquo;s settled, consider opening a PR if:</p>
      <ul>
        <li>The component solves a generic problem (auth, navigation, data display, form composition).</li>
        <li>It works without depending on app-specific data shapes.</li>
        <li>You&rsquo;re willing to maintain framework parity (or happy with React-only landing in <code>@hilal-ds/patterns</code>).</li>
      </ul>
      <p>
        Open an issue first — easier to align on the API surface before code lands.
      </p>
    </>
  );
}
