# Contributing to Hilal

Thanks for considering a contribution. The goal of this guide is to get you productive in under ten minutes.

## Ground rules

- Be kind. See the [Code of Conduct](CODE_OF_CONDUCT.md).
- Discuss large changes in an issue before opening a PR.
- One logical change per PR; small PRs land faster.
- Keep RTL/bilingual support in mind for any visual change.

## Setup

```bash
git clone https://github.com/Cresentrix/hilal.git
cd hilal
pnpm install
pnpm build
pnpm test
```

Requires Node 22+ and pnpm 10+.

## Repository layout

```
packages/
  tokens/      design tokens (single source of truth)
  core/        framework-agnostic CSS
  icons/       Lucide re-exports
  react/       React 19 components
  angular/     Angular 19 standalone components
  blade/       Laravel Blade components (Composer package)
apps/
  docs/        documentation site
tools/
  figma-sync/  pulls token values from the design Figma file
```

Read the per-package READMEs for package-specific guides.

## Working on a component

A typical component change touches:

1. `packages/core/src/components/<name>.css` — the actual styles
2. `packages/react/src/components/<name>.tsx` — React wrapper
3. `packages/angular/projects/hilal/src/lib/<name>/` — Angular wrapper
4. `packages/blade/resources/views/components/<name>.blade.php` — Blade view
5. `apps/docs/stories/<name>.stories.tsx` — visual stories

If a change is web-first (CSS only), submit just (1) and we'll backport the wrappers.

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(react): add Avatar component
fix(core): correct RTL tooltip arrow placement
docs(tokens): document the spacing scale
chore(deps): bump turbo to 2.5.1
```

Allowed scopes: `tokens`, `core`, `icons`, `react`, `angular`, `blade`, `docs`, `tools`, `deps`.

## Testing

- `pnpm test` runs unit tests across the workspace.
- Visual changes require an updated Storybook story.
- Accessibility regressions are blocked in CI (`@storybook/addon-a11y`).

## Releasing

Maintainers ship via [Changesets](https://github.com/changesets/changesets):

```bash
pnpm changeset    # describe your change
git commit -am "chore: changeset"
```

The release workflow opens a "Version Packages" PR; merging it publishes to npm + Packagist.

## License

By contributing you agree your work will be licensed under [Apache-2.0](LICENSE).
