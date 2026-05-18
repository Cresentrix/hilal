'use client';

import { useState } from 'react';
import { Button } from '@hilal-ds/react';
import { CommandPalette, type CommandItem } from '@hilal-ds/patterns';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export default function CommandPalettePage() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const items: CommandItem[] = [
    { id: 'new',     group: 'Workspace', label: 'New project',  shortcut: '⌘N', onSelect: () => setLast('New project') },
    { id: 'invite',  group: 'Workspace', label: 'Invite teammate', onSelect: () => setLast('Invite teammate') },
    { id: 'theme',   group: 'Preferences', label: 'Toggle theme', shortcut: '⌘⇧L', onSelect: () => setLast('Toggle theme') },
    { id: 'help',    group: 'Help', label: 'Read the docs', onSelect: () => setLast('Read the docs') },
    { id: 'support', group: 'Help', label: 'Contact support', onSelect: () => setLast('Contact support') },
  ];

  return (
    <>
      <h1>CommandPalette</h1>
      <p className="lede">
        ⌘K-style search modal. Filters by label + keywords, groups results, supports keyboard
        navigation (↑/↓, Enter, Esc).
      </p>

      <FrameworkTabs
        preview={
          <div>
            <Button onClick={() => setOpen(true)}>Open command palette</Button>
            {last ? (
              <div style={{ marginTop: '0.75rem', color: 'var(--hilal-fg-tertiary)', fontSize: 'var(--hilal-font-size-13)' }}>
                Last action: <strong style={{ color: 'var(--hilal-fg-primary)' }}>{last}</strong>
              </div>
            ) : null}
            <CommandPalette open={open} onClose={() => setOpen(false)} items={items} groupOrder={['Workspace', 'Preferences', 'Help']} />
          </div>
        }
        react={`import { CommandPalette } from '@hilal-ds/patterns';

const items = [
  { id: 'new', group: 'Workspace', label: 'New project',  shortcut: '⌘N', onSelect: () => createProject() },
  { id: 'invite', group: 'Workspace', label: 'Invite teammate', onSelect: () => openInvite() },
  // …
];

<CommandPalette open={open} onClose={() => setOpen(false)} items={items} />`}
        angular={`<hilal-command-palette
  [open]="open"
  (openChange)="open = $event"
  [items]="commands"
  (selected)="runCommand($event)"
></hilal-command-palette>`}
        blade={`<x-hilal-command-palette
  name="cmdk"
  :items="$commands"
  :group-order="['Workspace', 'Preferences', 'Help']"
/>`}
      />
    </>
  );
}
