# @hilal/react

React 19 components for the Hilal design system. Thin wrappers over `@hilal/core` CSS — same DOM as the Angular and Blade packages.

## Install

```bash
pnpm add @hilal/react @hilal/core @hilal/tokens
```

## Use

```tsx
import '@hilal/tokens/css';
import '@hilal/core';
import { Button } from '@hilal/react';

export function App() {
  return <Button variant="primary" size="md">Click me</Button>;
}
```

## RTL

Wrap any subtree in `dir="rtl"` and `lang="ar"`. The components use logical CSS properties so they mirror automatically.

```tsx
<div dir="rtl" lang="ar">
  <Button variant="primary">انقر هنا</Button>
</div>
```

## Available components

- `Button` ✅
- More to come — see the [roadmap](https://github.com/Cresentrix/hilal#roadmap).
