import type { Metadata } from 'next';
import { Avatar, AvatarGroup } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';

export const metadata: Metadata = { title: 'Avatar' };

export default function AvatarPage() {
  return (
    <>
      <h1>Avatar</h1>
      <p className="lede">
        User avatar with image, initials fallback, status dot, and group stacking.
      </p>

      <h2>Sizes &amp; fallback</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Avatar size="sm" initials="SA" />
            <Avatar size="md" initials="MM" />
            <Avatar size="lg" initials="JL" />
            <Avatar size="xl" initials="KP" />
          </div>
        }
        react={`<Avatar size="sm" initials="SA" />
<Avatar size="md" initials="MM" />
<Avatar size="lg" initials="JL" />
<Avatar size="xl" initials="KP" />`}
        angular={`<hilal-avatar size="sm" initials="SA"></hilal-avatar>
<hilal-avatar size="md" initials="MM"></hilal-avatar>
<hilal-avatar size="lg" initials="JL"></hilal-avatar>
<hilal-avatar size="xl" initials="KP"></hilal-avatar>`}
        blade={`<x-hilal-avatar size="sm" initials="SA" />
<x-hilal-avatar size="md" initials="MM" />
<x-hilal-avatar size="lg" initials="JL" />
<x-hilal-avatar size="xl" initials="KP" />`}
      />

      <h2>Status</h2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Avatar initials="ON" status="online" />
            <Avatar initials="BU" status="busy" />
            <Avatar initials="AW" status="away" />
            <Avatar initials="OF" status="offline" />
          </div>
        }
        react={`<Avatar initials="ON" status="online" />
<Avatar initials="BU" status="busy" />
<Avatar initials="AW" status="away" />
<Avatar initials="OF" status="offline" />`}
        angular={`<hilal-avatar initials="ON" status="online"></hilal-avatar>
<hilal-avatar initials="BU" status="busy"></hilal-avatar>`}
        blade={`<x-hilal-avatar initials="ON" status="online" />
<x-hilal-avatar initials="BU" status="busy" />`}
      />

      <h2>Group</h2>
      <FrameworkTabs
        preview={
          <AvatarGroup>
            <Avatar initials="SA" />
            <Avatar initials="MM" />
            <Avatar initials="JL" />
            <Avatar initials="KP" />
            <Avatar initials="RT" />
          </AvatarGroup>
        }
        react={`<AvatarGroup>
  <Avatar initials="SA" />
  <Avatar initials="MM" />
  <Avatar initials="JL" />
  <Avatar initials="KP" />
  <Avatar initials="RT" />
</AvatarGroup>`}
        angular={`<hilal-avatar-group>
  <hilal-avatar initials="SA"></hilal-avatar>
  <hilal-avatar initials="MM"></hilal-avatar>
  <hilal-avatar initials="JL"></hilal-avatar>
</hilal-avatar-group>`}
        blade={`<x-hilal-avatar-group>
  <x-hilal-avatar initials="SA" />
  <x-hilal-avatar initials="MM" />
  <x-hilal-avatar initials="JL" />
</x-hilal-avatar-group>`}
      />
    </>
  );
}
