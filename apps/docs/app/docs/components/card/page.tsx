import type { Metadata } from 'next';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Card' };

export default function CardPage() {
  return (
    <>
      <h1>Card</h1>
      <p className="lede">
        Surface for grouping related content. Compose header, body, and footer slots.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ minWidth: '20rem', maxWidth: '24rem' }}>
            <Card>
              <CardHeader>
                <div style={{ fontWeight: 600 }}>Project starlight</div>
                <div style={{ color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>
                  Updated yesterday
                </div>
              </CardHeader>
              <CardBody>
                Migrating the auth service to the new identity provider. Owner: Sara. Target: end of sprint.
              </CardBody>
              <CardFooter>
                <Button size="sm">Open</Button>
                <Button size="sm" variant="tertiary">Snooze</Button>
              </CardFooter>
            </Card>
          </div>
        }
        react={`<Card>
  <CardHeader>
    <div>Project starlight</div>
    <div>Updated yesterday</div>
  </CardHeader>
  <CardBody>
    Migrating the auth service to the new identity provider.
  </CardBody>
  <CardFooter>
    <Button size="sm">Open</Button>
    <Button size="sm" variant="tertiary">Snooze</Button>
  </CardFooter>
</Card>`}
        angular={`<hilal-card>
  <hilal-card-header>
    <div>Project starlight</div>
    <div>Updated yesterday</div>
  </hilal-card-header>
  <hilal-card-body>
    Migrating the auth service to the new identity provider.
  </hilal-card-body>
  <hilal-card-footer>
    <hilal-button size="sm">Open</hilal-button>
    <hilal-button size="sm" variant="tertiary">Snooze</hilal-button>
  </hilal-card-footer>
</hilal-card>`}
        blade={`<x-hilal-card>
  <x-hilal-card-header>
    <div>Project starlight</div>
    <div>Updated yesterday</div>
  </x-hilal-card-header>
  <x-hilal-card-body>
    Migrating the auth service to the new identity provider.
  </x-hilal-card-body>
  <x-hilal-card-footer>
    <x-hilal-button size="sm">Open</x-hilal-button>
    <x-hilal-button size="sm" variant="tertiary">Snooze</x-hilal-button>
  </x-hilal-card-footer>
</x-hilal-card>`}
      />
    </>
  );
}
