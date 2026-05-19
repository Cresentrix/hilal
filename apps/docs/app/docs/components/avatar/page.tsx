import type { Metadata } from 'next';
import { Avatar, AvatarGroup } from '@hilal-ds/react';
import { FrameworkTabs } from '../../../_components/FrameworkTabs';
import { Accessibility } from '../../../_components/Accessibility';
import { H2, H3 } from '../../../_components/Heading';
import { AvatarPlayground } from '../../../_components/playgrounds/AvatarPlayground';

export const metadata: Metadata = { title: 'Avatar' };

export default function AvatarPage() {
  return (
    <>
      <h1>Avatar</h1>
      <p className="lede">
        User avatar with image, initials fallback, five sizes, four status indicators, and a
        group stacking variant.
      </p>

      <H2>Playground</H2>
      <AvatarPlayground />

      <H2>Sizes</H2>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Avatar size="xs" initials="SA" />
            <Avatar size="sm" initials="MM" />
            <Avatar size="md" initials="JL" />
            <Avatar size="lg" initials="KP" />
            <Avatar size="xl" initials="RT" />
          </div>
        }
        react={`<Avatar size="xs" initials="SA" />
<Avatar size="sm" initials="MM" />
<Avatar size="md" initials="JL" />
<Avatar size="lg" initials="KP" />
<Avatar size="xl" initials="RT" />`}
        angular={`<hilal-avatar size="xs" initials="SA"></hilal-avatar>
<hilal-avatar size="sm" initials="MM"></hilal-avatar>
<hilal-avatar size="md" initials="JL"></hilal-avatar>
<hilal-avatar size="lg" initials="KP"></hilal-avatar>
<hilal-avatar size="xl" initials="RT"></hilal-avatar>`}
        blade={`<x-hilal-avatar size="xs" initials="SA" />
<x-hilal-avatar size="sm" initials="MM" />
<x-hilal-avatar size="md" initials="JL" />
<x-hilal-avatar size="lg" initials="KP" />
<x-hilal-avatar size="xl" initials="RT" />`}
      />

      <H2>Image, initials, fallback</H2>
      <p>
        If <code>src</code> loads successfully it&rsquo;s shown. Otherwise initials render — and if
        no initials are given, a generic fallback shape is rendered.
      </p>
      <FrameworkTabs
        preview={
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Avatar src="https://i.pravatar.cc/120?img=12" alt="Sara A." />
            <Avatar initials="MM" />
            <Avatar />
          </div>
        }
        react={`<Avatar src="/sara.jpg" alt="Sara A." />
<Avatar initials="MM" />
<Avatar />  {/* generic fallback */}`}
        angular={`<hilal-avatar src="/sara.jpg" alt="Sara A."></hilal-avatar>
<hilal-avatar initials="MM"></hilal-avatar>
<hilal-avatar></hilal-avatar>`}
        blade={`<x-hilal-avatar src="/sara.jpg" alt="Sara A." />
<x-hilal-avatar initials="MM" />
<x-hilal-avatar />`}
      />

      <H2>Status</H2>
      <p>Four states map to colored dots: <code>online</code>, <code>busy</code>, <code>away</code>, <code>offline</code>.</p>
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
<hilal-avatar initials="BU" status="busy"></hilal-avatar>
<hilal-avatar initials="AW" status="away"></hilal-avatar>
<hilal-avatar initials="OF" status="offline"></hilal-avatar>`}
        blade={`<x-hilal-avatar initials="ON" status="online" />
<x-hilal-avatar initials="BU" status="busy" />
<x-hilal-avatar initials="AW" status="away" />
<x-hilal-avatar initials="OF" status="offline" />`}
      />

      <H2>Group</H2>
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

      <H2>API</H2>
      <pre className="preview__code"><code>{`size       'xs' | 'sm' | 'md' | 'lg' | 'xl'            default: 'md'
src        string                                       image URL
alt        string                                       alt text when src is set
initials   string                                       fallback when src is missing
status     'online' | 'busy' | 'away' | 'offline'       small status dot
fallback   ReactNode                                    custom fallback (replaces initials)`}</code></pre>
      <Accessibility
        summary={<>When <code>{"src"}</code> is set, pass <code>{"alt"}</code> for screen readers. Pure-decorative avatars (initials with no name to convey) should pass <code>{"alt=\"\""}</code>.</>}
      />
    </>
  );
}
