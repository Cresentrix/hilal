# @hilal-ds/core

Framework-agnostic CSS for every Hilal component. Used by `@hilal-ds/react`, `@hilal-ds/angular`, and `hilal/blade` — they emit the same DOM and inherit all styles from here.

## Use directly (no framework)

```html
<link rel="stylesheet" href="https://unpkg.com/@hilal-ds/tokens/dist/css/tokens.css">
<link rel="stylesheet" href="https://unpkg.com/@hilal-ds/core/dist/hilal.css">

<button class="hilal-btn hilal-btn--primary hilal-btn--md">Click me</button>
```

## Class naming

`hilal-{component}--{variant}` — e.g. `hilal-btn--primary`, `hilal-input--lg`. Modifiers are BEM-style (`--`). State is expressed via `data-state="…"` attributes (`idle`, `hover`, `loading`, `disabled`, `error`) so behaviour-only logic in the framework wrappers can drive visuals.

## RTL

All physical CSS properties (`margin-left`, `padding-right`, `text-align: left`) are rewritten to logical equivalents (`margin-inline-start`, `padding-inline-end`, `text-align: start`) at build time via `postcss-logical`. Setting `dir="rtl"` on any ancestor automatically mirrors the layout. No separate RTL stylesheet needed.

## Component checklist

- [x] Button (`button.css`)
- [ ] Input
- [ ] Checkbox
- [ ] Toggle
- [ ] Card
- [ ] Tabs
- [ ] Tooltip
- [ ] Modal
- [ ] Dropdown
- [ ] Avatar (new)
- [ ] Badge (new)
- [ ] Alert / Banner (new)
- [ ] Toast (new)
- [ ] Skeleton (new)
- [ ] Pagination (new)
