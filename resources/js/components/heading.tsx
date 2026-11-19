import { acss } from '@/lib/utils';

export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <header className={variant === 'small' ? '' : acss('margin-bottom-32px d-grid g-2px')}>
            <h2
                className={
                    variant === 'small'
                        ? acss('margin-bottom-2px fs-16px lh-24px fw-500')
                        : acss('fs-20px lh-28px fw-600 les--0.025em')
                }
            >
                {title}
            </h2>
            {description && (
                <p className="fs-14px lh-20px c-grayTheme11">{description}</p>
            )}
        </header>
    );
}
