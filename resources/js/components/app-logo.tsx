import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="d-flex aspect-ratio-1 w-32px h-32px aic jcc br-8px bgc-grayTheme12 c-grayTheme1">
                <AppLogoIcon className="w-20px h-20px fill-currentColor c-grayTheme1" />
            </div>
            <div className="margin-left-4px d-grid flex-1 text-align-left fs-14px lh-20px">
                <span className="margin-bottom-2px overflow-hidden text-overflow-ellipsis white-space-nowrap lh-1.25 fw-600">
                    {name}
                </span>
            </div>
        </>
    );
}
