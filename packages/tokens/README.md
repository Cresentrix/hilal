# @hilal-ds/tokens

Single source of truth for Hilal's design tokens. The W3C DTCG-format JSON in `src/` is built into multiple consumable formats:

| Output | Path | For |
|---|---|---|
| CSS variables | `dist/css/tokens.css` | Browsers (used by `@hilal-ds/core`) |
| SCSS variables | `dist/scss/tokens.scss` | SCSS projects |
| JS / TS object | `dist/js/tokens.{cjs,mjs,d.ts}` | Node / bundlers |
| JSON (W3C DTCG) | `dist/json/tokens.json` | Tooling, designers |
| Tailwind preset | `dist/tailwind/preset.cjs` | `tailwind.config.{js,ts}` consumers |

## Usage

```ts
// JS
import { color, spacing, radius } from '@hilal-ds/tokens';
console.log(color.brand[500]);  // "#0090c6"
```

```css
/* CSS */
@import '@hilal-ds/tokens/css';

.my-thing {
  color: var(--hilal-color-brand-500);
  padding: var(--hilal-spacing-md);
  border-radius: var(--hilal-radius-md);
}
```

```js
// Tailwind
const hilalPreset = require('@hilal-ds/tokens/tailwind');
module.exports = {
  presets: [hilalPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

## Token categories

- **color** — base palette + semantic aliases (`fg`, `bg`, `border`, `accent`)
- **spacing** — 4px-based scale, responsive per breakpoint
- **radius** — semantic only (`sm`, `md`, `lg`, `xl`, `full`)
- **font** — family, size, weight, line-height, letter-spacing (Latin + Arabic)
- **elevation** — shadow tokens (0–5 + inner + focus)
- **motion** — duration + easing
- **breakpoint** — `sm`, `md`, `lg`, `xl`, `2xl`

## Themes

The default `base` theme ships brand-neutral. Layer your own theme by re-defining CSS variables, or import a different theme file:

```css
@import '@hilal-ds/tokens/css';
/* override anything */
:root { --hilal-color-accent: #6c47ff; }
```

## Contributing tokens

Edit the JSON in `src/` and run `pnpm build`. The build is deterministic and auto-runs in CI.

To re-sync from Figma, run from the repo root:

```bash
pnpm sync:figma
```

This pulls the latest values from the Hilal Figma file and updates `src/`.
