import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="d-flex h-64px flex-shrink-0 aic g-8px border-bottom-width-1px border-color-grayTheme6/0.5 transition(width_0.2s_linear,height_0.2s_linear) [data-slot=sidebar-wrapper]--has([data-collapsible=icon])&h-48px @xs-padding-inline-24px @sm-padding-inline-24px @md-padding-inline-16px">
            <div className="d-flex aic g-8px">
                <SidebarTrigger className="margin-left--4px" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
