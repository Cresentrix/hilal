'use client';

import { useState } from 'react';
import {
  Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose, Button,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function ModalPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1>Modal</h1>
      <p className="lede">
        Centered dialog built on the native <code>&lt;dialog&gt;</code> element. Backdrop click and
        Escape close by default.
      </p>

      <FrameworkTabs
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalHeader>
                <ModalTitle>Confirm action</ModalTitle>
                <ModalClose onClick={() => setOpen(false)} />
              </ModalHeader>
              <ModalBody>
                This modal is rendered live from <code>@hilal-ds/react</code> on this page.
              </ModalBody>
              <ModalFooter>
                <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Continue</Button>
              </ModalFooter>
            </Modal>
          </>
        }
        react={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)}>
  <ModalHeader>
    <ModalTitle>Confirm action</ModalTitle>
    <ModalClose onClick={() => setOpen(false)} />
  </ModalHeader>
  <ModalBody>…</ModalBody>
  <ModalFooter>
    <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={() => setOpen(false)}>Continue</Button>
  </ModalFooter>
</Modal>`}
        angular={`@Component({
  imports: [HilalModalComponent, HilalButtonComponent],
  template: \`
    <hilal-button (click)="open = true">Open</hilal-button>
    <hilal-modal [open]="open" (openChange)="open = $event" title="Confirm action">
      <p>…</p>
      <div hilalModalFooter>
        <hilal-button variant="tertiary" (click)="open = false">Cancel</hilal-button>
        <hilal-button (click)="open = false">Continue</hilal-button>
      </div>
    </hilal-modal>
  \`,
})
export class Demo { open = false; }`}
        blade={`<x-hilal-button x-on:click="$dispatch('open-modal-confirm')">Open</x-hilal-button>

<x-hilal-modal name="confirm" title="Confirm action">
  <p>…</p>
  <x-slot:footer>
    <x-hilal-button variant="tertiary" x-on:click="$el.closest('dialog').close()">Cancel</x-hilal-button>
    <x-hilal-button x-on:click="$el.closest('dialog').close()">Continue</x-hilal-button>
  </x-slot:footer>
</x-hilal-modal>`}
      />
    </>
  );
}
