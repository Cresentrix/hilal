'use client';

import { useState } from 'react';
import {
  Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose, Button,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function DrawerPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1>Drawer</h1>
      <p className="lede">
        Side panel built on the native <code>&lt;dialog&gt;</code> element. Four sides (start, end, top, bottom)
        and three sizes.
      </p>

      <FrameworkTabs
        preview={
          <>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer open={open} onClose={() => setOpen(false)} side="end" size="md">
              <DrawerHeader>
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerClose onClick={() => setOpen(false)} />
              </DrawerHeader>
              <DrawerBody>
                Form fields go here — this drawer renders live from <code>@hilal-ds/react</code>.
              </DrawerBody>
              <DrawerFooter>
                <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => setOpen(false)}>Save</Button>
              </DrawerFooter>
            </Drawer>
          </>
        }
        react={`<Drawer open={open} onClose={close} side="end" size="md">
  <DrawerHeader>
    <DrawerTitle>Edit profile</DrawerTitle>
    <DrawerClose onClick={close} />
  </DrawerHeader>
  <DrawerBody>…</DrawerBody>
  <DrawerFooter>
    <Button variant="tertiary" onClick={close}>Cancel</Button>
    <Button onClick={close}>Save</Button>
  </DrawerFooter>
</Drawer>`}
        angular={`<hilal-drawer [open]="open" (openChange)="open = $event" side="end" size="md" title="Edit profile">
  …
  <div hilalDrawerFooter>
    <hilal-button variant="tertiary" (click)="open = false">Cancel</hilal-button>
    <hilal-button (click)="save()">Save</hilal-button>
  </div>
</hilal-drawer>`}
        blade={`<x-hilal-drawer name="edit-profile" side="end" size="md" title="Edit profile">
  …
  <x-slot:footer>
    <x-hilal-button variant="tertiary">Cancel</x-hilal-button>
    <x-hilal-button>Save</x-hilal-button>
  </x-slot:footer>
</x-hilal-drawer>`}
      />
    </>
  );
}
