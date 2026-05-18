# @hilal-ds/angular

Angular 19 standalone components for the Hilal design system.

## Install

```bash
pnpm add @hilal-ds/angular @hilal-ds/core @hilal-ds/tokens
```

In your global stylesheet:

```css
@import '@hilal-ds/tokens/css';
@import '@hilal-ds/core';
```

## Use

```ts
import { Component } from '@angular/core';
import { HilalButton } from '@hilal-ds/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HilalButton],
  template: `<hilal-button variant="primary" size="md">Click me</hilal-button>`,
})
export class AppComponent {}
```

## RTL

Set `dir="rtl"` on any ancestor element. Layout mirrors automatically (uses logical CSS).
