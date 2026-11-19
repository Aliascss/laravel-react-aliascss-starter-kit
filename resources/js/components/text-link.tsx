import { Link } from '@inertiajs/react';
import type { ComponentProps } from 'react';
import { acss, cn } from '@/lib/utils';

type Props = ComponentProps<typeof Link>;

export default function TextLink({
    className = '',
    children,
    ...props
}: Props) {
    return (
        <Link
            className={cn(
                acss('c-grayTheme12 text-decoration-line-underline text-decoration-color-grayTheme7 text-underline-offset-4px transition(color_0.3s_ease-out,text-decoration-color_0.3s_ease-out) --hover-text-decoration-color-currentColor'),
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
