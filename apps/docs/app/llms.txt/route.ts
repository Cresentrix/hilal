/**
 * /llms.txt — emerging convention for letting AI agents quickly discover
 * what a library is, how to use it, and where to find the deeper docs.
 *
 * Spec: https://llmstxt.org/
 */
export const dynamic = 'force-static';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hilal-ds.dev';

const BODY = `# Hilal

> Hilal is a multi-framework design system: pixel-identical components for React, Angular, and Laravel Blade, built from one set of Figma-synced design tokens and one CSS stylesheet. Latin + Arabic / RTL are first-class. Published on npm under the @hilal-ds scope.

## Install

\`\`\`
npm install @hilal-ds/core @hilal-ds/react   # React
npm install @hilal-ds/core @hilal-ds/angular # Angular
composer require hilal/blade                 # Laravel Blade
\`\`\`

## Minimal example (React)

\`\`\`tsx
import '@hilal-ds/core';
import { Button } from '@hilal-ds/react';

export default function App() {
  return <Button>Click me</Button>;
}
\`\`\`

## Theming

The entire UI retunes from semantic CSS variables in a \`[data-theme]\` scope:

\`\`\`css
[data-theme="acme"] { --hilal-bg-brand: #ff5500; }
\`\`\`

## Sections

- [Getting started](${SITE}/docs/getting-started): install + setup for React, Angular, and Blade
- [Why Hilal](${SITE}/docs/about/why): positioning and when not to use it
- [Compared](${SITE}/docs/about/compare): vs shadcn / Radix / Mantine
- [Foundations](${SITE}/docs/foundations): tokens — Colors, Typography, Spacing, Radius, Elevation, Motion, Theming
- [Components](${SITE}/docs/components): 24 primitives with variants / sizes / states / a11y / playgrounds
- [Patterns](${SITE}/docs/patterns): 12 composed patterns (AuthForm, CommandPalette, DashboardShell, etc.)
- [Recipes](${SITE}/docs/recipes): full-page examples (Login, Dashboard, Pricing, Settings, Inbox, 404, Landing, Onboarding)
- [Iconography](${SITE}/docs/iconography): icons re-exported from Lucide
- [Changelog](${SITE}/docs/changelog)
- [Roadmap](${SITE}/docs/about/roadmap)

## Optional

- [GitHub](https://github.com/Cresentrix/hilal)
- [Sitemap](${SITE}/sitemap.xml)
- [npm org](https://www.npmjs.com/org/hilal-ds)
`;

export function GET() {
  return new Response(BODY, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
