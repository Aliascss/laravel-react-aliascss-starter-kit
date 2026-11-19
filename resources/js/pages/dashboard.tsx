import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="d-flex h-100% flex-1 flex-direction-column g-16px overflow-x-auto br-14px p-16px">
                <div className="d-grid grid-auto-rows-min-content g-16px @md-gtc(repeat(3,minmax(0,1fr)))">
                    <div className="position-relative aspect-ratio(16/9) overflow-hidden br-14px border-width-1px border-color-grayTheme6">
                        <PlaceholderPattern className="position-absolute inset-0 w-100% h-100% stroke-grayTheme12/0.2" />
                    </div>
                    <div className="position-relative aspect-ratio(16/9) overflow-hidden br-14px border-width-1px border-color-grayTheme6">
                        <PlaceholderPattern className="position-absolute inset-0 w-100% h-100% stroke-grayTheme12/0.2" />
                    </div>
                    <div className="position-relative aspect-ratio(16/9) overflow-hidden br-14px border-width-1px border-color-grayTheme6">
                        <PlaceholderPattern className="position-absolute inset-0 w-100% h-100% stroke-grayTheme12/0.2" />
                    </div>
                </div>
                <div className="position-relative flex-1 overflow-hidden br-14px border-width-1px border-color-grayTheme6 @xs-mh-100vh @sm-mh-100vh @md-mh-min-content">
                    <PlaceholderPattern className="position-absolute inset-0 w-100% h-100% stroke-grayTheme12/0.2" />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
