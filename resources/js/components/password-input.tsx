import { Eye, EyeOff } from 'lucide-react';
import type { ComponentProps, Ref } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { acss, cn } from '@/lib/utils';

export default function PasswordInput({
    className,
    ref,
    ...props
}: Omit<ComponentProps<'input'>, 'type'> & { ref?: Ref<HTMLInputElement> }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="position-relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn(acss('padding-right-40px'), className)}
                ref={ref}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="position-absolute t-0 btm-0 r-0 d-flex aic border-radius(0_8px_8px_0) padding-inline-12px c-grayTheme11 --hover-c-grayTheme12 --focus-visible[outline-none,box-shadow(0_0_0_3px_var(--x-ring-strong-color))]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex={-1}
            >
                {showPassword ? (
                    <EyeOff className="w-16px h-16px" />
                ) : (
                    <Eye className="w-16px h-16px" />
                )}
            </button>
        </div>
    );
}
