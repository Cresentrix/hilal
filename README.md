# Hilal — multi-framework design system

> **هلال** _(hilal)_ — Arabic for "crescent". One DOM. One CSS. Three frameworks.

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![npm](https://img.shields.io/badge/npm-%40hilal--ds-cb3837.svg)](https://www.npmjs.com/org/hilal-ds)
[![Made with pnpm](https://img.shields.io/badge/built%20with-pnpm-f69220.svg)](https://pnpm.io)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Hilal ships pixel-identical components for **React, Angular, and Laravel Blade** from a single token system and one stylesheet. The same DOM, the same class names, the same Figma-synced tokens — across all three.

Built with **Latin + Arabic / RTL** as primary requirements, not afterthoughts. Logical CSS properties (`padding-inline`, `margin-block`) everywhere; toggle `dir="rtl"` and components flip without any conditional code.

## Packages

All published to npm under the `@hilal-ds` scope:

| Package | Purpose |
|---|---|
| [`@hilal-ds/tokens`](packages/tokens)     | Tokens (W3C DTCG) → CSS / SCSS / JS / JSON / Tailwind preset |
| [`@hilal-ds/core`](packages/core)         | Framework-agnostic CSS — every component's styles |
| [`@hilal-ds/icons`](packages/icons)       | Curated Lucide icon re-exports |
| [`@hilal-ds/react`](packages/react)       | React 19 components |
| [`@hilal-ds/angular`](packages/angular)   | Angular 19 standalone components |
| [`hilal/blade`](packages/blade)           | Laravel Blade components (via Packagist) |
| [`@hilal-ds/patterns`](packages/patterns) | Composed React building blocks |

## Quick start

```sh
npm install @hilal-ds/core @hilal-ds/react
```

```tsx
import '@hilal-ds/core';                  // component styles
import '@hilal-ds/tokens/themes/dark';    // (optional) dark theme

import { Button } from '@hilal-ds/react';

export default function App() {
  return <Button>Click me</Button>;
}
```

Angular and Blade quick starts live in the [docs](#docs).

## What's shipped (0.1)

- **24 primitives**: Accordion, Alert, Avatar, Badge, BottomNav, Button, Calendar, Card, Checkbox, Combobox, Datepicker, Drawer, EmptyState, Input, Modal, Pagination, Select, Sidebar, Skeleton, Stepper, Tabs, Toast, Toggle, Tooltip.
- **12 patterns**: AuthForm, CommandPalette, ConfirmDialog, DashboardShell, DataList, FilterBar, FormSection, MultiStepForm, NotificationCenter, PageHeader, SearchHeader, StatsGrid.
- **Themes**: dark theme; density and motion presets, all swap-an-attribute.
- **Calendar**: single, range, multi-month, presets, year picker, locale + week-starts-on, min/max.

## Docs

The docs site lives in [`apps/docs/`](apps/docs) — a Next.js 16 app that dogfoods the React + patterns packages.

```sh
pnpm --filter @hilal-ds/docs dev
```

Sections:
- **Foundations** — Colors, Typography, Spacing, Radius, Elevation, Motion, Theming, Iconography
- **Components** — every primitive with variants, sizes, states, accessibility, and a playground for the rich ones
- **Patterns** — every composed pattern with usage scenarios
- **Recipes** — Login, Dashboard, Pricing, Settings, Marketing landing, Onboarding wizard, Inbox, 404
- **About** — Why Hilal, FAQ, Compared (vs shadcn / Radix / Mantine), Roadmap, Showcase
- **Changelog**

## Theming

The whole color system goes through semantic aliases. Override them in a `[data-theme="…"]` scope:

```css
[data-theme="acme"] {
  --hilal-bg-brand: #ff5500;
  --hilal-fg-link:  #ff5500;
}
```

```html
<html data-theme="acme">…</html>
```

The Theming foundation page has a live color picker that retunes the entire docs site in real time.

## Contributing

PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). All contributors follow the [Code of Conduct](CODE_OF_CONDUCT.md). Security issues go to [SECURITY.md](SECURITY.md).

## License

[Apache-2.0](LICENSE) © Cresentrix and the Hilal contributors.
