import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { name } = usePage().props;

    return (
        <div className="position-relative d-grid h-100dvh aic jcc @xs-padding-inline-32px @sm-padding-inline-0 @lg[xw-none,gtc(repeat(2,minmax(0,1fr)))]">
            <div className="position-relative h-100% flex-direction-column bgc-grayTheme3 p-40px c-white border-right(1px_solid_light-dark(transparent,#3a3a3a)) @xs-d-none @sm-d-none @lg-d-flex">
                <div className="position-absolute inset-0 bgc-18181b" />
                <Link
                    href={home()}
                    className="position-relative zi-20 d-flex aic fs-18px lh-28px fw-500"
                >
                    <AppLogoIcon className="margin-right-8px w-32px h-32px fill-currentColor c-white" />
                    {name}
                </Link>
            </div>
            <div className="w-100% @lg-p-32px">
                <div className="margin-inline-auto d-flex flex-direction-column jcc g-24px @xs-w-100% @sm-w-350px">
                    <Link
                        href={home()}
                        className="position-relative zi-20 aic jcc @xs-d-flex @sm-d-flex @lg-d-none"
                    >
                        <AppLogoIcon className="fill-currentColor c-grayTheme12 @xs-h-40px @sm-h-48px" />
                    </Link>
                    <div className="d-flex flex-direction-column g-8px @xs[ai-flex-start,text-align-left] @sm[aic,text-align-center]">
                        <h1 className="fs-20px lh-28px fw-500">{title}</h1>
                        <p className="fs-14px lh-20px text-wrap-balance c-grayTheme11">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
