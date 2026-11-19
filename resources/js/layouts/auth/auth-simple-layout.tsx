import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="d-flex mh-100svh flex-direction-column aic jcc g-24px bgc-grayTheme1 @xs-p-24px @sm-p-24px @md-p-40px">
            <div className="w-100% xw-384px">
                <div className="d-flex flex-direction-column g-32px">
                    <div className="d-flex flex-direction-column aic g-16px">
                        <Link
                            href={home()}
                            className="d-flex flex-direction-column aic g-8px fw-500"
                        >
                            <div className="margin-bottom-4px d-flex h-36px w-36px aic jcc br-8px">
                                <AppLogoIcon className="w-36px h-36px fill-currentColor c-grayTheme12" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="d-grid g-8px text-align-center">
                            <h1 className="fs-20px lh-28px fw-500">{title}</h1>
                            <p className="text-align-center fs-14px lh-20px c-grayTheme11">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
