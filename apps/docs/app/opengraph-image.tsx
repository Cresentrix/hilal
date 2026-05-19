import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hilal — One DOM. One CSS. Three frameworks.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          color: '#fafafa',
          background:
            'radial-gradient(circle at 20% 0%, #006399 0%, transparent 60%),' +
            'radial-gradient(circle at 100% 100%, #00a344 0%, transparent 50%),' +
            '#121212',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #00a344 0%, #80cce9 100%)',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>Hilal</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1 style={{ fontSize: 88, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
            One DOM.
            <br />
            Three frameworks.
          </h1>
          <p style={{ fontSize: 28, color: '#9e9e9e', maxWidth: 880, margin: 0, lineHeight: 1.35 }}>
            Pixel-identical components for React, Angular, and Blade — built from a single token
            system synced from Figma.
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#9e9e9e', fontSize: 22 }}>
          <span>@hilal-ds · v0.1</span>
          <span>github.com/Cresentrix/hilal</span>
        </div>
      </div>
    ),
    size,
  );
}
