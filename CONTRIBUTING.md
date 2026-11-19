# Contributing

Thanks for helping. This kit is Laravel's official [React starter kit](https://github.com/laravel/react-starter-kit) with AliasCSS in place of Tailwind CSS, and it tries to stay as close to the official kit as it can.

## Where a change belongs

| Your change | Where to send it |
|---|---|
| Styling, AliasCSS classes, the `ui` components' look, dark mode, the AliasCSS Vite plugin | Here |
| Bugs that only happen in this kit | Here |
| PHP, routes, controllers, tests, authentication behaviour, page structure | [laravel/react-starter-kit](https://github.com/laravel/react-starter-kit): it arrives here with the next upstream merge |
| A class that AliasCSS compiles wrongly or not at all | [AliasCSS](https://github.com/Rodolopho/aliascss/issues): include the class name and the CSS you expected |

If you're not sure, open an issue here and ask.

## Setup

```bash
composer setup
composer dev
```

## Styling rules

The README's "Writing styles" section has the full version. The short one:

1. Write complete class names. Use `className="…"` for fixed classes, and wrap anything kept in a variable, object or ternary in `acss('…')` (from `@/lib/utils`). Never build a class name from pieces.
2. Give responsive classes a prefix at every size: `@xs-p-16px @sm-p-16px @md-p-24px`, not `p-16px @md-p-24px`.
3. In `resources/js/components/ui`, put a component's own styles in an `@components[…]` group, so a `className` passed by the caller always wins.
4. Use theme tokens (`grayTheme1`–`grayTheme12`, `redTheme9` …) for colour, so light and dark both work. Check both before you send a pull request.
5. Keep the `@chisel-…` comments in place. The installer uses them to remove features people don't select.

## Before you open a pull request

```bash
npm run check          # lint and format
npm run types:check    # TypeScript
npx aliascss --config  # should print no "can't compile" lines
composer test          # PHP lint, static analysis and tests
```

Then check the pages you touched in light and dark, and at phone width.

## Merging upstream changes (maintainers)

The commit of the official kit this repo is based on is recorded in `.upstream`. A weekly workflow opens an issue when the official kit has moved on.

```bash
git remote add upstream https://github.com/laravel/react-starter-kit   # once
git fetch upstream
git merge upstream/main
```

- PHP changes merge cleanly.
- Where a frontend file conflicts, keep upstream's structure and re-apply the AliasCSS classes.
- Files that upstream brings back and this kit doesn't use (`components.json`, Tailwind packages in `package.json`, Tailwind settings in `vite.config.ts`) are removed again.
- Run the checks above, then write the new upstream commit hash into `.upstream`.
