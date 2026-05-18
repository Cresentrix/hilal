import type { Metadata } from 'next';
import { PageHeader } from '@hilal-ds/patterns';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'PageHeader' };

export default function PageHeaderPage() {
  return (
    <>
      <h1>PageHeader</h1>
      <p className="lede">
        Standard page top bar — breadcrumbs, title, description, and trailing actions. Use at
        the top of every screen for consistent spacing and hierarchy.
      </p>

      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <PageHeader
              breadcrumbs={[
                { label: 'Projects', href: '#' },
                { label: 'Starlight', current: true },
              ]}
              title="Starlight"
              description="Migrating auth to the new identity provider."
              actions={
                <>
                  <Button variant="tertiary">Snooze</Button>
                  <Button>Edit project</Button>
                </>
              }
            />
          </div>
        }
        react={`<PageHeader
  breadcrumbs={[
    { label: 'Projects', href: '/projects' },
    { label: 'Starlight', current: true },
  ]}
  title="Starlight"
  description="Migrating auth to the new IDP."
  actions={
    <>
      <Button variant="tertiary">Snooze</Button>
      <Button>Edit project</Button>
    </>
  }
/>`}
        angular={`<hilal-page-header
  [breadcrumbs]="crumbs"
  title="Starlight"
  description="Migrating auth to the new IDP."
>
  <hilal-button hilalPageHeaderAction variant="tertiary">Snooze</hilal-button>
  <hilal-button hilalPageHeaderAction>Edit project</hilal-button>
</hilal-page-header>`}
        blade={`<x-hilal-page-header
  :breadcrumbs="[['label' => 'Projects', 'href' => '/projects'], ['label' => 'Starlight', 'current' => true]]"
  title="Starlight"
  description="Migrating auth to the new IDP."
>
  <x-slot:actions>
    <x-hilal-button variant="tertiary">Snooze</x-hilal-button>
    <x-hilal-button>Edit project</x-hilal-button>
  </x-slot:actions>
</x-hilal-page-header>`}
      />
    </>
  );
}
