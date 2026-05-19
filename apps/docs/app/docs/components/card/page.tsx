import type { Metadata } from 'next';
import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';
import { CardPlayground } from '../../../_components/playgrounds/CardPlayground';
import { Anatomy } from '../../../_components/Anatomy';

export const metadata: Metadata = { title: 'Card' };

export default function CardPage() {
  return (
    <>
      <h1>Card</h1>
      <p className="lede">
        Surface for grouping related content. Four variants, four paddings, and an optional
        interactive state. Compose with the matching Header / Body / Footer slot components.
      </p>

      <H2>Playground</H2>
      <CardPlayground />

      <H2>Variants</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', width: '100%' }}>
            <Card variant="default"><CardBody>Default — soft fill.</CardBody></Card>
            <Card variant="elevated"><CardBody>Elevated — shadow.</CardBody></Card>
            <Card variant="outlined"><CardBody>Outlined — border only.</CardBody></Card>
            <Card variant="ghost"><CardBody>Ghost — transparent.</CardBody></Card>
          </div>
        }
        react={`<Card variant="default"><CardBody>Default</CardBody></Card>
<Card variant="elevated"><CardBody>Elevated</CardBody></Card>
<Card variant="outlined"><CardBody>Outlined</CardBody></Card>
<Card variant="ghost"><CardBody>Ghost</CardBody></Card>`}
        angular={`<hilal-card variant="default">…</hilal-card>
<hilal-card variant="elevated">…</hilal-card>
<hilal-card variant="outlined">…</hilal-card>
<hilal-card variant="ghost">…</hilal-card>`}
        blade={`<x-hilal-card variant="default">…</x-hilal-card>
<x-hilal-card variant="elevated">…</x-hilal-card>
<x-hilal-card variant="outlined">…</x-hilal-card>
<x-hilal-card variant="ghost">…</x-hilal-card>`}
      />

      <H2>Padding</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', width: '100%' }}>
            <Card padding="none" variant="outlined"><CardBody style={{ padding: 0 }}>none</CardBody></Card>
            <Card padding="sm"   variant="outlined"><CardBody>sm</CardBody></Card>
            <Card padding="md"   variant="outlined"><CardBody>md</CardBody></Card>
            <Card padding="lg"   variant="outlined"><CardBody>lg</CardBody></Card>
          </div>
        }
        react={`<Card padding="none">…</Card>
<Card padding="sm">…</Card>
<Card padding="md">…</Card>
<Card padding="lg">…</Card>`}
        angular={`<hilal-card padding="lg">…</hilal-card>`}
        blade={`<x-hilal-card padding="lg">…</x-hilal-card>`}
      />

      <H2>Interactive</H2>
      <p>Pass <code>interactive</code> when the whole card is clickable — surfaces hover + focus styles.</p>
      <FrameworkTabs
        preview={
          <Card variant="outlined" interactive style={{ maxWidth: '24rem' }}>
            <CardHeader>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <strong>Project starlight</strong>
                <Badge tone="success" size="sm">Live</Badge>
              </div>
            </CardHeader>
            <CardBody>Click anywhere on this card to open the project.</CardBody>
          </Card>
        }
        react={`<Card variant="outlined" interactive onClick={openProject}>
  <CardHeader>
    <strong>Project starlight</strong>
    <Badge tone="success">Live</Badge>
  </CardHeader>
  <CardBody>Click anywhere…</CardBody>
</Card>`}
        angular={`<hilal-card variant="outlined" [interactive]="true" (click)="open()">…</hilal-card>`}
        blade={`<x-hilal-card variant="outlined" :interactive="true" x-on:click="open()">…</x-hilal-card>`}
      />

      <H2>Full anatomy</H2>
      <FrameworkTabs
        preview={
          <Card variant="elevated" style={{ maxWidth: '26rem' }}>
            <CardHeader>
              <div>
                <div style={{ fontWeight: 600 }}>Q2 retrospective</div>
                <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>Posted 3 days ago</div>
              </div>
              <Badge tone="info" size="sm">Draft</Badge>
            </CardHeader>
            <CardBody>
              Three highlights and two regressions. Owners assigned for each follow-up. Ship-stop
              criteria for Q3 are still under discussion.
            </CardBody>
            <CardFooter>
              <Button size="sm" variant="tertiary">Discard</Button>
              <Button size="sm">Publish</Button>
            </CardFooter>
          </Card>
        }
        react={`<Card variant="elevated">
  <CardHeader>
    <div>
      <div>Q2 retrospective</div>
      <div>Posted 3 days ago</div>
    </div>
    <Badge tone="info">Draft</Badge>
  </CardHeader>
  <CardBody>…</CardBody>
  <CardFooter>
    <Button size="sm" variant="tertiary">Discard</Button>
    <Button size="sm">Publish</Button>
  </CardFooter>
</Card>`}
        angular={`<hilal-card variant="elevated">
  <hilal-card-header>…</hilal-card-header>
  <hilal-card-body>…</hilal-card-body>
  <hilal-card-footer>…</hilal-card-footer>
</hilal-card>`}
        blade={`<x-hilal-card variant="elevated">
  <x-hilal-card-header>…</x-hilal-card-header>
  <x-hilal-card-body>…</x-hilal-card-body>
  <x-hilal-card-footer>…</x-hilal-card-footer>
</x-hilal-card>`}
      />

      <H2>Parts</H2>
      <Anatomy
        diagram={`Card
├─ CardHeader   (optional)
├─ CardBody
└─ CardFooter   (optional)`}
        parts={[
          { label: 'Card',       description: 'The surface. Variants control fill / shadow; interactive adds hover state.' },
          { label: 'CardHeader', description: 'Title row. Convention: name on the left, status / actions on the right.' },
          { label: 'CardBody',   description: 'Main content. Inherits the card padding.' },
          { label: 'CardFooter', description: 'Actions row. Typically right-aligned buttons.' },
        ]}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`variant       'default' | 'elevated' | 'outlined' | 'ghost'   default: 'default'
padding       'none' | 'sm' | 'md' | 'lg'                     default: 'md'
interactive   boolean   adds hover/focus styles for clickable cards`}</code></pre>
      <Accessibility
        summary={<>Non-interactive by default. Pass <code>{"interactive"}</code> and the card surfaces hover + focus styles; in that mode you should wrap it in an <code>{"<a>"}</code> or attach <code>{"onClick"}</code> + <code>{"role=\"button\""}</code>.</>}
      />
    </>
  );
}
