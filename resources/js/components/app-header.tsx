import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { acss, cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles =
    acss('c-grayTheme12 bgc(light-dark(transparent,#262626))');

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div className="border-bottom-width-1px border-color-grayTheme6/0.8">
                <div className="margin-inline-auto d-flex h-64px aic padding-inline-16px @md-xw-1280px">
                    {/* Mobile Menu */}
                    <div className="@lg-d-none">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="margin-right-8px h-34px w-34px"
                                >
                                    <Menu className="h-20px w-20px" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="d-flex h-100% w-256px flex-direction-column ai-stretch jcsb bgc-grayTheme2"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="d-flex justify-content-flex-start text-align-left">
                                    <AppLogoIcon className="h-24px w-24px fill-currentColor c-grayTheme12" />
                                </SheetHeader>
                                <div className="d-flex h-100% flex-1 flex-direction-column g-16px p-16px">
                                    <div className="d-flex h-100% flex-direction-column jcsb fs-14px lh-20px">
                                        <div className="d-flex flex-direction-column g-16px">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="d-flex aic g-8px fw-500"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-20px w-20px" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="d-flex flex-direction-column g-16px">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={toUrl(item.href)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="d-flex aic g-8px fw-500"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-20px w-20px" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={dashboard()}
                        prefetch
                        className="d-flex aic g-8px"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="margin-left-24px h-100% aic g-24px @xs-d-none @sm-d-none @lg-d-flex">
                        <NavigationMenu className="d-flex h-100% ai-stretch">
                            <NavigationMenuList className="d-flex h-100% ai-stretch g-8px">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="position-relative d-flex h-100% aic"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                whenCurrentUrl(
                                                    item.href,
                                                    activeItemStyles,
                                                ),
                                                acss('h-36px cursor-pointer padding-inline-12px'),
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="margin-right-8px h-16px w-16px" />
                                            )}
                                            {item.title}
                                        </Link>
                                        {isCurrentUrl(item.href) && (
                                            <div className="position-absolute btm-0 l-0 h-2px w-100% translate(0_1px) bgc-grayTheme12"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="margin-left-auto d-flex aic g-8px">
                        <div className="position-relative d-flex aic g-4px">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-36px w-36px cursor-pointer _svg[o-0.8,w-20px,h-20px] --hover_svg-o-1"
                            >
                                <Search />
                            </Button>
                            <div className="margin-left-4px g-4px @xs-d-none @sm-d-none @lg-d-flex">
                                {rightNavItems.map((item) => (
                                    <Tooltip key={item.title}>
                                        <TooltipTrigger>
                                            <a
                                                href={toUrl(item.href)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="d-inline-flex h-36px w-36px aic jcc br-8px bgc-transparent p-0 fs-14px fw-500 c-grayTheme12 transition(color_0.15s,background-color_0.15s) --hover-bgc-grayTheme3 --focus-visible[outline-2px-solid-grayTheme8,outline-offset-2px] --disabled[pointer-events-none,o-0.5] _svg-o-0.8 --hover_svg-o-1"
                                            >
                                                <span className="sr-only">
                                                    {item.title}
                                                </span>
                                                {item.icon && (
                                                    <item.icon className="w-20px h-20px" />
                                                )}
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="w-40px h-40px br-999px p-4px"
                                >
                                    <Avatar className="w-32px h-32px overflow-hidden br-999px">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="br-10px bgc-grayTheme5 c-grayTheme12">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-224px" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="d-flex w-100% border-bottom-width-1px border-color-grayTheme6/0.7">
                    <div className="margin-inline-auto d-flex h-48px w-100% aic justify-content-flex-start padding-inline-16px c-grayTheme11 @md-xw-1280px">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
