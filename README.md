# Hilal — bilingual, multi-stack design system

> **هلال** _(hilal)_ — Arabic for "crescent". A design system designed Arabic-first, built once, used everywhere.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![Made with pnpm](https://img.shields.io/badge/built%20with-pnpm-f69220.svg)](https://pnpm.io)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Hilal is a production-ready design system with first-class **Latin + Arabic / RTL** support, designed in Figma and shipped across **React, Angular, and Laravel Blade** from a single source of tokens.

## Why Hilal

Most open-source design systems treat RTL as an afterthought — Hilal was designed with Arabic typography (Noto Kufi Arabic) and right-to-left layouts as primary requirements, alongside Latin (Inter). Components handle bidirectional text, mirrored layout, and locale-aware spacing out of the box.

It's also unusual in being genuinely multi-stack: the same tokens, the same CSS, the same DOM contracts power React, Angular, and Blade components. Build it once in Figma, get it everywhere in code.

## What's inside

| Package | Purpose | Install |
|---|---|---|
| [`@hilal/tokens`](packages/tokens) | Design tokens (W3C DTCG) → CSS vars, SCSS, JS, Tailwind preset | `npm i @hilal/tokens` |
| [`@hilal/core`](packages/core) | Framework-agnostic CSS — every component's styles | `npm i @hilal/core` |
| [`@hilal/icons`](packages/icons) | Curated Lucide icon re-exports | `npm i @hilal/icons` |
| [`@hilal/react`](packages/react) | React 19 components | `npm i @hilal/react` |
| [`@hilal/angular`](packages/angular) | Angular 19 standalone components | `npm i @hilal/angular` |
| [`hilal/blade`](packages/blade) | Laravel Blade components + Alpine.js | `composer require hilal/blade` |

## Quick start (React)

```bash
pnpm add @hilal/react @hilal/core @hilal/tokens
```

```tsx
import '@hilal/tokens/dist/tokens.css';   // CSS variables
import '@hilal/core/dist/hilal.css';      // component styles
import { Button } from '@hilal/react';

export default function App() {
  return (
    <div dir="ltr">
      <Button variant="primary" size="md">Click me</Button>
    </div>
  );
}
```

For Arabic / RTL:

```tsx
<div dir="rtl" lang="ar">
  <Button variant="primary" size="md">انقر هنا</Button>
</div>
```

## Quick start (Blade)

```bash
composer require hilal/blade
```

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!doctype html>
<html dir="ltr">
  <head>
    <link rel="stylesheet" href="{{ asset('vendor/hilal/tokens.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/hilal/hilal.css') }}">
    @hilalScripts
  </head>
  <body>
    <x-hilal-button variant="primary" size="md">Click me</x-hilal-button>
  </body>
</html>
```

## Theming

The default `base` theme is brand-neutral. Override CSS variables in your own stylesheet to apply your brand:

```css
:root {
  --hilal-color-accent: #6c47ff;
  --hilal-radius-md: 0.5rem;
  --hilal-font-sans: 'Inter', system-ui, sans-serif;
  --hilal-font-arabic: 'Noto Kufi Arabic', sans-serif;
}
```

Or load a complete theme:

```ts
import '@hilal/tokens/dist/themes/base.css';
```

## Roadmap

- [x] Foundations: colors, typography, spacing, radius, elevation, motion
- [x] Core CSS layer
- [x] React package — primitives
- [ ] React package — composites (Modal, Dropdown, Tabs, Datepicker)
- [ ] Angular package
- [ ] Blade package
- [ ] Patterns (form layouts, list patterns, empty/loading/error states)
- [ ] Templates (auth, dashboard, settings)
- [ ] Dark mode
- [ ] React Native package

## Contributing

PRs are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). All contributors agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Found a vulnerability? See [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE) © Cresentrix and the Hilal contributors
