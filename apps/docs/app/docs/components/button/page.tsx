import type { Metadata } from 'next';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Button' };

const react = `import { Button } from '@hilal-ds/react';

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`;

const angular = `import { HilalButtonComponent } from '@hilal-ds/angular';

@Component({
  standalone: true,
  imports: [HilalButtonComponent],
  template: \`
    <hilal-button>Primary</hilal-button>
    <hilal-button variant="secondary">Secondary</hilal-button>
    <hilal-button variant="tertiary">Tertiary</hilal-button>
    <hilal-button size="sm">Small</hilal-button>
    <hilal-button size="lg">Large</hilal-button>
    <hilal-button [loading]="true">Loading</hilal-button>
    <hilal-button [disabled]="true">Disabled</hilal-button>
  \`,
})
export class ButtonsDemo {}`;

const blade = `<x-hilal-button>Primary</x-hilal-button>
<x-hilal-button variant="secondary">Secondary</x-hilal-button>
<x-hilal-button variant="tertiary">Tertiary</x-hilal-button>
<x-hilal-button size="sm">Small</x-hilal-button>
<x-hilal-button size="lg">Large</x-hilal-button>
<x-hilal-button :loading="true">Loading</x-hilal-button>
<x-hilal-button :disabled="true">Disabled</x-hilal-button>`;

export default function ButtonPage() {
  return (
    <>
      <h1>Button</h1>
      <p className="lede">
        Standard button with three variants, three sizes, and a loading state. Renders a
        native <code>&lt;button&gt;</code> with all expected ARIA and keyboard behavior.
      </p>

      <h2>Variants</h2>
      <FrameworkTabs
        preview={
          <>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </>
        }
        react={react}
        angular={angular}
        blade={blade}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </>
        }
        react={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        angular={`<hilal-button size="sm">Small</hilal-button>
<hilal-button size="md">Medium</hilal-button>
<hilal-button size="lg">Large</hilal-button>`}
        blade={`<x-hilal-button size="sm">Small</x-hilal-button>
<x-hilal-button size="md">Medium</x-hilal-button>
<x-hilal-button size="lg">Large</x-hilal-button>`}
      />

      <h2>Loading &amp; disabled</h2>
      <FrameworkTabs
        preview={
          <>
            <Button loading>Saving…</Button>
            <Button disabled>Disabled</Button>
          </>
        }
        react={`<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>`}
        angular={`<hilal-button [loading]="true">Saving…</hilal-button>
<hilal-button [disabled]="true">Disabled</hilal-button>`}
        blade={`<x-hilal-button :loading="true">Saving…</x-hilal-button>
<x-hilal-button :disabled="true">Disabled</x-hilal-button>`}
      />
    </>
  );
}
