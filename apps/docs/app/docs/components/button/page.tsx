import type { Metadata } from 'next';
import { Button } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';

export const metadata: Metadata = { title: 'Button' };

export default function ButtonPage() {
  return (
    <>
      <h1>Button</h1>
      <p className="lede">
        Standard button with three variants, three sizes, and built-in loading and disabled
        states. Renders a native <code>&lt;button&gt;</code> with full ARIA + keyboard support.
      </p>

      <h2>Variants</h2>
      <p>Three visual weights: <code>primary</code> for the main action, <code>secondary</code> for an alternate action, <code>tertiary</code> for a quiet inline action.</p>
      <FrameworkTabs
        preview={
          <>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </>
        }
        react={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>`}
        angular={`<hilal-button variant="primary">Primary</hilal-button>
<hilal-button variant="secondary">Secondary</hilal-button>
<hilal-button variant="tertiary">Tertiary</hilal-button>`}
        blade={`<x-hilal-button variant="primary">Primary</x-hilal-button>
<x-hilal-button variant="secondary">Secondary</x-hilal-button>
<x-hilal-button variant="tertiary">Tertiary</x-hilal-button>`}
      />

      <h2>Sizes</h2>
      <p>Three sizes scale padding and font size proportionally. Default is <code>md</code>.</p>
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

      <h2>States</h2>
      <p>
        <code>loading</code> swaps the label for a spinner and locks the button. <code>disabled</code>{' '}
        greys it out and removes pointer events.
      </p>
      <FrameworkTabs
        preview={
          <>
            <Button>Default</Button>
            <Button loading>Saving…</Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" loading>Loading</Button>
            <Button variant="tertiary" disabled>Disabled</Button>
          </>
        }
        react={`<Button>Default</Button>
<Button loading>Saving…</Button>
<Button disabled>Disabled</Button>
<Button variant="secondary" loading>Loading</Button>
<Button variant="tertiary" disabled>Disabled</Button>`}
        angular={`<hilal-button>Default</hilal-button>
<hilal-button [loading]="true">Saving…</hilal-button>
<hilal-button [disabled]="true">Disabled</hilal-button>`}
        blade={`<x-hilal-button>Default</x-hilal-button>
<x-hilal-button :loading="true">Saving…</x-hilal-button>
<x-hilal-button :disabled="true">Disabled</x-hilal-button>`}
      />

      <h2>With icons</h2>
      <p>Pass any inline element alongside text — Button doesn&rsquo;t care about icon libraries.</p>
      <FrameworkTabs
        preview={
          <>
            <Button>
              <span aria-hidden>＋</span> New project
            </Button>
            <Button variant="secondary">
              Continue <span aria-hidden>→</span>
            </Button>
            <Button variant="tertiary" aria-label="Download">
              <span aria-hidden>⤓</span>
            </Button>
          </>
        }
        react={`<Button>
  <Icon name="plus" /> New project
</Button>
<Button variant="secondary">
  Continue <Icon name="arrow-right" />
</Button>
{/* Icon-only — provide an aria-label */}
<Button variant="tertiary" aria-label="Download">
  <Icon name="download" />
</Button>`}
        angular={`<hilal-button>
  <span aria-hidden>＋</span> New project
</hilal-button>
<hilal-button variant="tertiary" aria-label="Download">
  <span aria-hidden>⤓</span>
</hilal-button>`}
        blade={`<x-hilal-button>
  <span aria-hidden>＋</span> New project
</x-hilal-button>
<x-hilal-button variant="tertiary" aria-label="Download">
  <span aria-hidden>⤓</span>
</x-hilal-button>`}
      />

      <h2>Composition: button group</h2>
      <p>Group related actions side-by-side; the rightmost is usually the primary commit.</p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="tertiary">Cancel</Button>
            <Button variant="secondary">Save draft</Button>
            <Button>Publish</Button>
          </div>
        }
        react={`<div style={{ display: 'flex', gap: '0.5rem' }}>
  <Button variant="tertiary">Cancel</Button>
  <Button variant="secondary">Save draft</Button>
  <Button>Publish</Button>
</div>`}
        angular={`<div class="hilal-btn-group">
  <hilal-button variant="tertiary">Cancel</hilal-button>
  <hilal-button variant="secondary">Save draft</hilal-button>
  <hilal-button>Publish</hilal-button>
</div>`}
        blade={`<div class="hilal-btn-group">
  <x-hilal-button variant="tertiary">Cancel</x-hilal-button>
  <x-hilal-button variant="secondary">Save draft</x-hilal-button>
  <x-hilal-button>Publish</x-hilal-button>
</div>`}
      />

      <h2>API</h2>
      <p>
        Inherits all native <code>&lt;button&gt;</code> attributes. Hilal-specific props:
      </p>
      <pre className="preview__code"><code>{`variant     'primary' | 'secondary' | 'tertiary'   default: 'primary'
size        'sm' | 'md' | 'lg'                     default: 'md'
loading     boolean                                shows spinner; disables click
disabled    boolean                                native disabled state`}</code></pre>
      <Accessibility
        summary={<>Native <code>{"<button>"}</code> — full keyboard, screen reader, and form-submit semantics.</>}
        keys={[
                {
                        "keys": "Space / Enter",
                        "action": "Activate the button"
                }
        ]}
        notes={[<>Icon-only buttons must provide an <code>{"aria-label"}</code>. Loading buttons set <code>{"aria-busy"}</code> while the spinner is visible.</>]}
      />
    </>
  );
}
