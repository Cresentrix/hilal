import type { Metadata } from 'next';
import { EmptyState, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export const metadata: Metadata = { title: 'EmptyState' };

export default function EmptyStatePage() {
  return (
    <>
      <h1>EmptyState</h1>
      <p className="lede">
        Placeholder for empty screens, lists, or search results. Two sizes; optional icon,
        description, and action slots.
      </p>

      <h2>Default</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <EmptyState
              title="No projects yet"
              description="Create your first project to start tracking work and inviting teammates."
              actions={<Button>Create project</Button>}
            />
          </div>
        }
        react={`<EmptyState
  title="No projects yet"
  description="Create your first project."
  actions={<Button>Create project</Button>}
/>`}
        angular={`<hilal-empty-state title="No projects yet" description="Create your first project.">
  <hilal-button hilalEmptyStateAction>Create project</hilal-button>
</hilal-empty-state>`}
        blade={`<x-hilal-empty-state title="No projects yet" description="Create your first project.">
  <x-slot:actions><x-hilal-button>Create project</x-hilal-button></x-slot:actions>
</x-hilal-empty-state>`}
      />

      <h2>Compact</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <EmptyState
              size="compact"
              title="No results"
              description="Try a different search term."
            />
          </div>
        }
        react={`<EmptyState
  size="compact"
  title="No results"
  description="Try a different search term."
/>`}
        angular={`<hilal-empty-state size="compact" title="No results" description="…"></hilal-empty-state>`}
        blade={`<x-hilal-empty-state size="compact" title="No results" description="…" />`}
      />

      <h2>With custom icon</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <EmptyState
              icon={<div style={{ fontSize: '2.5rem' }} aria-hidden>📭</div>}
              title="Inbox zero"
              description="You're all caught up."
            />
          </div>
        }
        react={`<EmptyState
  icon={<InboxIcon size={40} />}
  title="Inbox zero"
  description="You're all caught up."
/>`}
        angular={`<hilal-empty-state title="Inbox zero" description="…">
  <span hilalEmptyStateIcon>📭</span>
</hilal-empty-state>`}
        blade={`<x-hilal-empty-state title="Inbox zero" description="…">
  <x-slot:icon>📭</x-slot:icon>
</x-hilal-empty-state>`}
      />

      <h2>Multiple actions</h2>
      <FrameworkTabs
        preview={
          <div style={{ width: '100%' }}>
            <EmptyState
              title="No team members yet"
              description="Invite someone via email, or import from CSV."
              actions={
                <>
                  <Button>Invite by email</Button>
                  <Button variant="secondary">Import CSV</Button>
                </>
              }
            />
          </div>
        }
        react={`<EmptyState
  title="No team members yet"
  description="Invite someone via email, or import from CSV."
  actions={
    <>
      <Button>Invite by email</Button>
      <Button variant="secondary">Import CSV</Button>
    </>
  }
/>`}
        angular={`<hilal-empty-state title="…" description="…">
  <div hilalEmptyStateAction>
    <hilal-button>Invite</hilal-button>
    <hilal-button variant="secondary">Import</hilal-button>
  </div>
</hilal-empty-state>`}
        blade={`<x-hilal-empty-state title="…" description="…">
  <x-slot:actions>
    <x-hilal-button>Invite</x-hilal-button>
    <x-hilal-button variant="secondary">Import</x-hilal-button>
  </x-slot:actions>
</x-hilal-empty-state>`}
      />

      <h2>API</h2>
      <pre className="preview__code"><code>{`size          'default' | 'compact'   default: 'default'
icon          ReactNode               replaces the default illustration
title         ReactNode               primary line
description   ReactNode               secondary line
actions       ReactNode               buttons / links below the description`}</code></pre>
      <Accessibility
        summary={<>Decorative wrapper; the heading inside uses an <code>{"h3"}</code> so it sits below any page-level <code>{"h1/h2"}</code>.</>}
      />
    </>
  );
}
