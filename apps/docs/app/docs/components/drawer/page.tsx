'use client';

import { useState } from 'react';
import {
  Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter, DrawerClose,
  Button, type DrawerSide,
} from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function DrawerPage() {
  const [openSide, setOpenSide] = useState<DrawerSide | null>(null);
  const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <>
      <h1>Drawer</h1>
      <p className="lede">
        Slide-in panel built on the native <code>&lt;dialog&gt;</code>. Four sides, three sizes,
        focus trap, and Escape close — all without external dependencies.
      </p>

      <h2>Sides</h2>
      <FrameworkTabs
        preview={
          <>
            {(['start', 'end', 'top', 'bottom'] as DrawerSide[]).map((side) => (
              <Button key={side} size="sm" variant="secondary" onClick={() => setOpenSide(side)}>
                {side}
              </Button>
            ))}
            {(['start', 'end', 'top', 'bottom'] as DrawerSide[]).map((side) => (
              <Drawer key={side} open={openSide === side} onClose={() => setOpenSide(null)} side={side} size="md">
                <DrawerHeader>
                  <DrawerTitle>{`side = "${side}"`}</DrawerTitle>
                  <DrawerClose onClick={() => setOpenSide(null)} />
                </DrawerHeader>
                <DrawerBody>The drawer slides in from the {side}.</DrawerBody>
              </Drawer>
            ))}
          </>
        }
        react={`<Drawer open={open} onClose={close} side="start">…</Drawer>
<Drawer open={open} onClose={close} side="end">…</Drawer>
<Drawer open={open} onClose={close} side="top">…</Drawer>
<Drawer open={open} onClose={close} side="bottom">…</Drawer>`}
        angular={`<hilal-drawer [open]="open" (openChange)="open = $event" side="end">…</hilal-drawer>`}
        blade={`<x-hilal-drawer name="filters" side="end">…</x-hilal-drawer>`}
      />

      <h2>Sizes</h2>
      <FrameworkTabs
        preview={
          <>
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Button key={s} size="sm" variant="secondary" onClick={() => setOpenSize(s)}>{s}</Button>
            ))}
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Drawer key={s} open={openSize === s} onClose={() => setOpenSize(null)} side="end" size={s}>
                <DrawerHeader>
                  <DrawerTitle>{`size = "${s}"`}</DrawerTitle>
                  <DrawerClose onClick={() => setOpenSize(null)} />
                </DrawerHeader>
                <DrawerBody>Width steps proportionally.</DrawerBody>
              </Drawer>
            ))}
          </>
        }
        react={`<Drawer open={open} onClose={close} side="end" size="sm">…</Drawer>
<Drawer open={open} onClose={close} side="end" size="md">…</Drawer>
<Drawer open={open} onClose={close} side="end" size="lg">…</Drawer>`}
        angular={`<hilal-drawer [open]="open" side="end" size="lg">…</hilal-drawer>`}
        blade={`<x-hilal-drawer name="x" side="end" size="lg">…</x-hilal-drawer>`}
      />

      <h2>Full anatomy</h2>
      <FullDrawerDemo />

      <h2>API</h2>
      <pre className="preview__code"><code>{`open              boolean
onClose           () => void
side              'start' | 'end' | 'top' | 'bottom'   default: 'end'
size              'sm' | 'md' | 'lg'                   default: 'md'
closeOnBackdrop   boolean                              default: true`}</code></pre>
    </>
  );
}

function FullDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <FrameworkTabs
      preview={
        <>
          <Button onClick={() => setOpen(true)}>Open settings drawer</Button>
          <Drawer open={open} onClose={() => setOpen(false)} side="end" size="md">
            <DrawerHeader>
              <DrawerTitle>Notification settings</DrawerTitle>
              <DrawerClose onClick={() => setOpen(false)} />
            </DrawerHeader>
            <DrawerBody>
              <p>Choose which alerts reach you and where they show up.</p>
              <p style={{ color: 'var(--hilal-fg-tertiary)' }}>(Form fields would go here.)</p>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </DrawerFooter>
          </Drawer>
        </>
      }
      react={`<Drawer open={open} onClose={close} side="end" size="md">
  <DrawerHeader>
    <DrawerTitle>Notification settings</DrawerTitle>
    <DrawerClose onClick={close} />
  </DrawerHeader>
  <DrawerBody>…</DrawerBody>
  <DrawerFooter>
    <Button variant="tertiary" onClick={close}>Cancel</Button>
    <Button>Save changes</Button>
  </DrawerFooter>
</Drawer>`}
      angular={`<hilal-drawer [open]="open" (openChange)="open = $event" side="end" size="md" title="Notification settings">
  …
  <div hilalDrawerFooter>
    <hilal-button variant="tertiary" (click)="close()">Cancel</hilal-button>
    <hilal-button (click)="save()">Save changes</hilal-button>
  </div>
</hilal-drawer>`}
      blade={`<x-hilal-drawer name="notif" side="end" size="md" title="Notification settings">
  …
  <x-slot:footer>
    <x-hilal-button variant="tertiary">Cancel</x-hilal-button>
    <x-hilal-button>Save</x-hilal-button>
  </x-slot:footer>
</x-hilal-drawer>`}
    />
  );
}
