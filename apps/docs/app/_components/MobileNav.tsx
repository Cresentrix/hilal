'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerClose } from '@hilal-ds/react';
import { Sidebar } from './Sidebar';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer whenever the route changes.
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-trigger"
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      >
        <span aria-hidden>☰</span>
      </button>
      <Drawer open={open} onClose={() => setOpen(false)} side="start" size="sm" className="mobile-nav-drawer">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerClose onClick={() => setOpen(false)} />
        </DrawerHeader>
        <DrawerBody style={{ paddingInline: 0 }}>
          <Sidebar />
        </DrawerBody>
      </Drawer>
    </>
  );
}
