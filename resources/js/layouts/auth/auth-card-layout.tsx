import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="d-flex mh-100svh flex-direction-column aic jcc g-24px bgc-grayTheme3 @xs-p-24px @sm-p-24px @md-p-40px">
            <div className="d-flex w-100% xw-448px flex-direction-column g-24px">
                <Link
                    href={home()}
                    className="d-flex aic g-8px align-self-center fw-500"
                >
                    <div className="d-flex h-36px w-36px aic jcc">
                        <AppLogoIcon className="w-36px h-36px fill-currentColor c-grayTheme12" />
                    </div>
                </Link>

                <div className="d-flex flex-direction-column g-24px">
                    <Card className="br-14px">
                        <CardHeader className="padding(32px_40px_0) text-align-center">
                            <CardTitle className="fs-20px lh-28px">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="padding(32px_40px)">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
