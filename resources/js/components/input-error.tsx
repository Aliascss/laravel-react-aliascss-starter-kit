import type { HTMLAttributes } from 'react';
import { acss, cn } from '@/lib/utils';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn(acss('fs-14px lh-20px c-redTheme11'), className)}
        >
            {message}
        </p>
    ) : null;
}
