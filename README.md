# Laravel + React Starter Kit, styled with AliasCSS

This is Laravel's official [React starter kit](https://github.com/laravel/react-starter-kit) with one change: **[AliasCSS](https://aliascss.com) replaces Tailwind CSS**. Everything else is the same: Laravel 13, Inertia 3, React 19, TypeScript, Fortify authentication (login, registration, password reset, email verification, two-factor, passkeys), Wayfinder routes, and the same pages and layouts.

The UI components in `resources/js/components/ui` are the kit's Radix components (button, dialog, dropdown menu, sidebar, select …) restyled with AliasCSS classes. There is no Tailwind, `tailwind-merge`, `clsx` or `class-variance-authority`.

Based on [laravel/react-starter-kit@012f424](https://github.com/laravel/react-starter-kit/commit/012f4248f70e255e32ad93f540aca5fb7e8c96fe) (10 November 2026). The current base commit is always in `.upstream`.

## Why AliasCSS instead of Tailwind

- **Class names are CSS.** `d-flex`, `padding(8px_16px)`, `border-radius(8px_0_0_8px)`: a class is a CSS property and a value, so any CSS you know can be written as a class, including new properties, without a plugin or a config entry.
- **Overrides without a merge library.** Component styles sit in a cascade layer below utilities, so `<Button className="br-999px">` wins by the rules of CSS. The kit has no `tailwind-merge`, `clsx` or `class-variance-authority`.
- **Light and dark from one class.** `bgc-grayTheme3` is the right colour in both modes; there are no `dark:` twins to keep in sync.
- **State from attributes.** `[data-state=open]-bgc-grayTheme4` and `[data-collapsible=icon]&d-none` read the attributes Radix already sets.

What you give up: Tailwind's much larger ecosystem, editor tooling and community, and support for older browsers. AliasCSS theme colours need Chrome or Edge 123, Firefox 128 or Safari 18 and later. Responsive classes are also stricter: you write a prefix for every size (see "Writing styles").

## Getting started

With the Laravel installer (once this package is on Packagist):

```bash
laravel new my-app --using=aliascss/laravel-react-aliascss-starter-kit
```

Or clone it and set it up by hand:

```bash
git clone https://github.com/Aliascss/laravel-react-aliascss-starter-kit my-app
cd my-app
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
composer dev
```

`composer setup` runs the same steps in one go. `composer dev` starts Laravel and Vite together; Vite compiles the AliasCSS classes for you (see below), so there is no extra command to run.

To build for production: `npm run build`.

## How AliasCSS is wired in

| File | What it does |
|---|---|
| `aliascss.config.js` | Which files the compiler scans, and where it writes the CSS |
| `vite.config.ts` | A small `aliascss()` Vite plugin: compiles when Vite starts, and again when a file in `resources/js` or `resources/views` changes |
| `resources/css/aliascss.css` | The generated CSS (git-ignored; never edit it) |
| `resources/css/app.css` | Imports the generated CSS, then adds a small base reset and the `@keyframes` the components use |
| `resources/views/app.blade.php` | Puts `x-theme` on `<html>` and sets `color-scheme` before the page paints |

Production builds minify the generated CSS automatically.

## Writing styles

In AliasCSS a class name is one CSS declaration: `property-value`, with short aliases for common properties.

```tsx
<div className="d-flex aic g-8px p-16px br-10px bgc-grayTheme3">…</div>
```

Three rules matter in this kit:

**1. The compiler only sees complete class names.** It reads your files as text and finds classes in `className="…"` literals and in `acss('…')` calls. `acss` is a tiny helper in `resources/js/lib/utils.ts` that returns its argument unchanged. Wrap any class list that lives in a variable, an object or a ternary, and never build class names from pieces:

```tsx
import { acss, cn } from '@/lib/utils';

<p className={cn(acss('fs-14px'), active ? acss('c-grayTheme12') : acss('c-grayTheme11'))} />

// never: 'c-grayTheme' + step
```

**2. Responsive classes need a prefix at every size.** A plain class always beats a breakpoint class, so write `@xs-p-16px @sm-p-16px @md-p-24px`, not `p-16px @md-p-24px`. `@xs` is max-width (below 576px); `@sm`, `@md` (768px), `@lg` (992px) and `@xl` (1200px) are min-width.

**3. Component styles can always be overridden.** The `ui` components keep their own styles in AliasCSS's `@components` cascade layer, so any class you pass through `className` wins, with no merge helper:

```tsx
<Button className="w-100% br-999px bgc-blueTheme9 --hover-bgc-blueTheme10">Continue</Button>
```

State is styled from data attributes, for example `[data-state=open]-bgc-grayTheme4` (the element's own attribute) or `[data-collapsible=icon]&d-none` (an attribute on an ancestor).

The full language reference is at [aliascss.com](https://aliascss.com).

## Colours and dark mode

Colours are AliasCSS theme tokens (`grayTheme1`–`grayTheme12`, `redTheme9`, `greenTheme11` …). Each one compiles to a CSS `light-dark()` value, so it follows the page's `color-scheme`. The Appearance settings page (light, dark, system) sets `color-scheme` on `<html>` and stores the choice in a cookie, as in the original kit.

How the kit uses the gray scale:

| Token | Used for |
|---|---|
| `grayTheme1` | Page, card and popover backgrounds |
| `grayTheme2` | Sidebar background |
| `grayTheme3`, `grayTheme4` | Hover and selected backgrounds |
| `grayTheme6` | Borders |
| `grayTheme8` | Focus rings |
| `grayTheme11` | Secondary text |
| `grayTheme12` | Text, and primary buttons |

To rebrand, swap `gray` for another scale (`slate`, `sand`, `mauve` …) or change the primary button colours in `resources/js/components/ui/button.tsx`.

Because the colours rely on `light-dark()` and relative colour syntax, the kit targets current browsers (Chrome and Edge 123, Firefox 128, Safari 18 or later). `build.cssTarget` in `vite.config.ts` is set to match.

## Layouts

As in the official kit, you can switch layouts by changing one import:

- App: `resources/js/layouts/app-layout.tsx` uses the sidebar layout; change it to `app/app-header-layout` for a top navigation bar.
- Auth: `resources/js/layouts/auth-layout.tsx` uses `auth-simple-layout`; `auth-card-layout` and `auth-split-layout` are also included.

## Checks

```bash
npm run types:check   # TypeScript
npm run check         # lint and format
composer test         # PHP lint, static analysis and tests
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: styling changes come here, and PHP or page-structure changes go to the official kit.

## License

MIT, the same as the Laravel starter kit this is based on.
