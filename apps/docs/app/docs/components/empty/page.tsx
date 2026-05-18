import type { Metadata } from 'next';
import { EmptyState, Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'EmptyState' };

export default function EmptyStatePage() {
  return (
    <>
      <h1>EmptyState</h1>
      <p className="lede">
        Placeholder for empty lists, screens, or sections. Optional icon, description, and action slots.
      </p>

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
  description="Create your first project to start tracking work."
  actions={<Button>Create project</Button>}
/>`}
        angular={`<hilal-empty-state title="No projects yet" description="Create your first project.">
  <hilal-button hilalEmptyStateAction>Create project</hilal-button>
</hilal-empty-state>`}
        blade={`<x-hilal-empty-state title="No projects yet" description="Create your first project.">
  <x-slot:actions><x-hilal-button>Create project</x-hilal-button></x-slot:actions>
</x-hilal-empty-state>`}
      />
    </>
  );
}
