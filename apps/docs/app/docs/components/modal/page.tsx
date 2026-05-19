'use client';

import { useState } from 'react';
import {
  Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose,
  Button, Input,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';
import { Anatomy } from '../../../_components/Anatomy';

type Size = 'sm' | 'md' | 'lg' | 'xl';

export default function ModalPage() {
  const [open, setOpen] = useState<Size | null>(null);

  return (
    <>
      <h1>Modal</h1>
      <p className="lede">
        Centered dialog built on the native <code>&lt;dialog&gt;</code> element. Four sizes, backdrop
        click + Escape close by default, and full focus trapping for free.
      </p>

      <H2>Sizes</H2>
      <FrameworkTabs
        preview={
          <>
            <Button size="sm" onClick={() => setOpen('sm')}>sm</Button>
            <Button size="sm" onClick={() => setOpen('md')}>md</Button>
            <Button size="sm" onClick={() => setOpen('lg')}>lg</Button>
            <Button size="sm" onClick={() => setOpen('xl')}>xl</Button>
            {(['sm', 'md', 'lg', 'xl'] as Size[]).map((s) => (
              <Modal key={s} open={open === s} onClose={() => setOpen(null)} size={s}>
                <ModalHeader>
                  <ModalTitle>{`size = "${s}"`}</ModalTitle>
                  <ModalClose onClick={() => setOpen(null)} />
                </ModalHeader>
                <ModalBody>
                  Each modal step scales the max-width while keeping padding and radii consistent.
                </ModalBody>
                <ModalFooter>
                  <Button variant="tertiary" onClick={() => setOpen(null)}>Close</Button>
                </ModalFooter>
              </Modal>
            ))}
          </>
        }
        react={`<Modal open={open} onClose={close} size="sm">…</Modal>
<Modal open={open} onClose={close} size="md">…</Modal>
<Modal open={open} onClose={close} size="lg">…</Modal>
<Modal open={open} onClose={close} size="xl">…</Modal>`}
        angular={`<hilal-modal [open]="open" (openChange)="open = $event" size="md" title="…">…</hilal-modal>`}
        blade={`<x-hilal-modal name="confirm" size="md" title="…">…</x-hilal-modal>`}
      />

      <H2>With form body</H2>
      <FrameworkTabs
        preview={
          <FormModalDemo />
        }
        react={`<Modal open={open} onClose={close} size="md">
  <ModalHeader>
    <ModalTitle>Invite teammate</ModalTitle>
    <ModalClose onClick={close} />
  </ModalHeader>
  <ModalBody>
    <Input label="Email" />
    <Select label="Role">…</Select>
  </ModalBody>
  <ModalFooter>
    <Button variant="tertiary" onClick={close}>Cancel</Button>
    <Button>Send invite</Button>
  </ModalFooter>
</Modal>`}
        angular={`<hilal-modal [open]="open" (openChange)="open = $event" size="md" title="Invite teammate">
  <hilal-input label="Email"></hilal-input>
  <hilal-select label="Role">…</hilal-select>
  <div hilalModalFooter>
    <hilal-button variant="tertiary" (click)="close()">Cancel</hilal-button>
    <hilal-button (click)="invite()">Send invite</hilal-button>
  </div>
</hilal-modal>`}
        blade={`<x-hilal-modal name="invite" size="md" title="Invite teammate">
  <x-hilal-input label="Email" />
  <x-hilal-select label="Role">…</x-hilal-select>
  <x-slot:footer>
    <x-hilal-button variant="tertiary">Cancel</x-hilal-button>
    <x-hilal-button>Send invite</x-hilal-button>
  </x-slot:footer>
</x-hilal-modal>`}
      />

      <H2>Disable backdrop close</H2>
      <p>Pass <code>closeOnBackdrop=&#123;false&#125;</code> when the modal contains irreversible work that shouldn&rsquo;t close on a stray click.</p>
      <pre className="preview__code"><code>{`<Modal open={open} onClose={close} closeOnBackdrop={false}>…</Modal>`}</code></pre>

      <H2>Anatomy</H2>
      <Anatomy
        diagram={`Modal
├─ ModalHeader
│  ├─ ModalTitle
│  └─ ModalClose
├─ ModalBody
└─ ModalFooter`}
        parts={[
          { label: 'Modal',       description: 'The <dialog> wrapper. Owns the open state and the backdrop.' },
          { label: 'ModalHeader', description: 'Top row — title + close button.' },
          { label: 'ModalTitle',  description: 'h2-styled title. Wired as aria-labelledby on the dialog.' },
          { label: 'ModalClose',  description: 'Icon-only close button. Defaults to aria-label="Close".' },
          { label: 'ModalBody',   description: 'Scrollable content area.' },
          { label: 'ModalFooter', description: 'Right-aligned action row. Convention: Cancel · Primary.' },
        ]}
      />

      <H2>API</H2>
      <pre className="preview__code"><code>{`open              boolean    controlled open state
onClose           () => void
size              'sm' | 'md' | 'lg' | 'xl'   default: 'md'
closeOnBackdrop   boolean                     default: true`}</code></pre>

      <H3>Subcomponents</H3>
      <pre className="preview__code"><code>{`<ModalHeader>    header row, typically Title + Close
<ModalTitle>     h2 styled title
<ModalBody>      scrollable body content
<ModalFooter>    right-aligned action row
<ModalClose>     icon-only close button`}</code></pre>
      <Accessibility
        summary={<>Built on the native <code>{"<dialog>"}</code> element with <code>{"showModal()"}</code> — focus is trapped inside while open, and the rest of the page is inert.</>}
        keys={[
                {
                        "keys": "Esc",
                        "action": "Close the modal"
                },
                {
                        "keys": "Tab / Shift+Tab",
                        "action": "Cycle focus within the modal"
                }
        ]}
        notes={[<>Pair <code>{"ModalTitle"}</code> with the dialog so the modal is announced by name. <code>{"ModalClose"}</code> defaults to <code>{"aria-label=\"Close\""}</code>.</>]}
      />
    </>
  );
}
function FormModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Invite teammate</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="md">
        <ModalHeader>
          <ModalTitle>Invite teammate</ModalTitle>
          <ModalClose onClick={() => setOpen(false)} />
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Input label="Email" placeholder="someone@acme.com" />
            <Input label="Personal note" placeholder="(optional)" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Send invite</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
