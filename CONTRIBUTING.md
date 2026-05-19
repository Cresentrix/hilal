# Contributing to Hilal

Thanks for considering a contribution. The goal of this guide is to get you productive in under ten minutes.

## Ground rules

- Be kind. See the [Code of Conduct](CODE_OF_CONDUCT.md).
- Discuss large changes in an issue before opening a PR.
- One logical change per PR; small PRs land faster.
- Keep RTL / bilingual support in mind for any visual change — Hilal uses CSS logical properties (`padding-inline`, `margin-block`, `inset-inline-start`) instead of left/right anywhere it matters.

## Setup

```bash
git clone https://github.com/Cresentrix/hilal.git
cd hilal
pnpm install
pnpm build
```

Requires Node 22+ and pnpm 10+ (see `.nvmrc`).

## Repository layout

```
packages/
  tokens/      design tokens (single source of truth, synced from Figma)
  core/        framework-agnostic CSS
  icons/       Lucide re-exports
  react/       React 19 components
  angular/     Angular 19 standalone components
  blade/       Laravel Blade components (Composer / Packagist)
  patterns/    composed React building blocks
apps/
  docs/        Next.js 16 documentation site
tools/
  figma-sync/  pulls token values from the design Figma file
```

Read the per-package READMEs for package-specific guides.

## Common commands

```bash
# Run the docs site locally (http://localhost:3030)
pnpm --filter @hilal-ds/docs dev

# Watch-build a single package (rebuilds on save)
pnpm --filter @hilal-ds/react dev

# Typecheck everything
pnpm -r typecheck

# Build everything (in dependency order via turbo)
pnpm build

# Run a single package's typecheck
pnpm --filter @hilal-ds/react typecheck
```

## Working on a component

A typical component change touches four places — they all need to stay in sync so the cross-framework parity story holds:

1. `packages/core/src/components/<name>.css` — the actual styles
2. `packages/react/src/components/<name>.tsx` — React wrapper
3. `packages/angular/src/components/<name>.component.ts` — Angular wrapper
4. `packages/blade/src/Components/<Name>.php` + `packages/blade/resources/views/components/<name>.blade.php` — Blade component

Plus a docs page at `apps/docs/app/docs/components/<name>/page.tsx` and an export in each package's `index.ts`.

Patterns follow the same shape but live in `packages/patterns/src/<name>.tsx` plus a CSS block appended to `packages/core/src/components/patterns.css`.

If a change is CSS-only (e.g. a hover state tweak), you can submit just (1) and a maintainer will roll the rest.

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(react): add Avatar component
fix(core): correct RTL tooltip arrow placement
docs(tokens): document the spacing scale
chore(deps): bump turbo to 2.5.1
```

Allowed scopes: `tokens`, `core`, `icons`, `react`, `angular`, `blade`, `patterns`, `docs`, `tools`, `deps`, `release`.

No need to add an AI / "co-authored-by" trailer.

## Pull request checklist

- [ ] `pnpm -r typecheck` passes locally.
- [ ] `pnpm -r build` succeeds.
- [ ] If you touched a component, the matching docs page renders without console errors (`pnpm --filter @hilal-ds/docs dev`).
- [ ] If you changed a public API, you updated the relevant docs page and the changelog.
- [ ] If you renamed a public export, you flagged it in the PR description.

## Releasing (maintainers)

Versions are bumped manually for now. To cut a release:

```bash
# 1. Bump versions in the packages you're shipping.
# 2. Commit and tag.
git commit -am "chore(release): 0.1.x"
git tag -a v0.1.x -m "v0.1.x"
git push --follow-tags

# 3. Publish (npm).
pnpm -r --filter "@hilal-ds/*" --filter "!@hilal-ds/docs" publish --no-git-checks

# 4. Cut the GitHub release.
gh release create v0.1.x --title "v0.1.x" --notes "<release notes>"
```

The Blade package on Packagist updates automatically from the git tag.

A Changesets-based flow is on the roadmap — once it lands, this section will get a lot shorter.

## License

By contributing you agree your work will be licensed under [Apache-2.0](LICENSE).
