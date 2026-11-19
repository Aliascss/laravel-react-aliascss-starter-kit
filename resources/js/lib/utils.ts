import type { InertiaLinkProps } from '@inertiajs/react';

type ClassValue = string | false | null | undefined;

/**
 * Join class names, skipping falsy values.
 *
 * There is no merge step: component styles live in AliasCSS's `@components`
 * cascade layer, so any class passed later through `className` already wins.
 */
export function cn(...inputs: ClassValue[]): string {
    return inputs.filter(Boolean).join(' ');
}

/**
 * Marks class names for the AliasCSS compiler.
 *
 * The compiler reads source files as text and only sees className="d-flex"
 * style literals and acss() calls, so wrap any class list that lives in a
 * variable, an object or a ternary:
 *
 *     const tone = active ? acss('bgc-grayTheme3') : acss('c-grayTheme11');
 *
 * At runtime it returns the string unchanged.
 */
export function acss(classes: string): string {
    return classes;
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}
