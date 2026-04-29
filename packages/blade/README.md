# hilal/blade

Laravel Blade components for the Hilal design system. Same DOM and CSS as `@hilal/react` and `@hilal/angular`. Interactive bits use [Alpine.js](https://alpinejs.dev) (loaded automatically via `@hilalScripts`).

## Install

```bash
composer require hilal/blade
```

Publish the views (optional, only if you want to override them):

```bash
php artisan vendor:publish --tag=hilal-views
```

## Use

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://unpkg.com/@hilal/tokens/dist/css/tokens.css">
    <link rel="stylesheet" href="https://unpkg.com/@hilal/core/dist/hilal.css">
    @hilalScripts
  </head>
  <body>
    <x-hilal-button variant="primary" size="md">Click me</x-hilal-button>

    {{-- Or for Arabic / RTL --}}
    <div dir="rtl" lang="ar">
      <x-hilal-button variant="primary">انقر هنا</x-hilal-button>
    </div>
  </body>
</html>
```

## Available components

- `<x-hilal-button>` ✅
- More to come — see the [roadmap](https://github.com/Cresentrix/hilal#roadmap).

## Custom asset hosting

If you'd rather bundle the CSS into your own pipeline, just import `@hilal/tokens/css` and `@hilal/core` from your `package.json` and skip the unpkg URLs.
