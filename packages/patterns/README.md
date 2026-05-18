# @hilal-ds/patterns

Opinionated React building blocks composed from `@hilal-ds/react` primitives. Use them as starting points — they cover the common 80%, and you customize the remaining 20% by editing or wrapping.

## Install

```bash
pnpm add @hilal-ds/patterns @hilal-ds/react @hilal-ds/core @hilal-ds/tokens
```

## Available patterns

```tsx
import {
  AuthForm,        // login / signup with email + optional social
  PageHeader,      // page title + breadcrumbs + actions
  DataList,        // list of items with avatar / label / trailing
  ConfirmDialog,   // Modal preset (cancel / destructive confirm)
} from '@hilal-ds/patterns';
```

## Philosophy

Patterns sit one layer above primitives. They're not a replacement for the primitives — they're shortcuts. If a pattern is 80% right, use it. If you need more control, fork the pattern's source (it's tiny on purpose) and own it.
