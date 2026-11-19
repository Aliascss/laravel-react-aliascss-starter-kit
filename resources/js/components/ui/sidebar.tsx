import { Slot } from "@radix-ui/react-slot"
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { acss, cn } from "@/lib/utils"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // Children read it with AliasCSS ancestor classes: [data-collapsible=icon]&d-none
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          acss("@components[d-flex,mh-100svh,w-100%] --has([data-variant=inset])-bgc-grayTheme2"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          acss("@components[bgc-grayTheme2,c-grayTheme12,d-flex,h-100%,w(var(--sidebar-width)),flex-direction-column]"),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bgc-grayTheme2 c-grayTheme12 w(var(--sidebar-width)) p-0 g-0 __button-d-none"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="d-flex h-100% w-100% flex-direction-column">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="c-grayTheme12 @xs-d-none @sm-d-none @md-d-block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          acss("@components[position-relative,h-100svh,w(var(--sidebar-width)),bgc-transparent,transition(width_0.2s_linear)] [data-collapsible=offcanvas]&w-0 [data-side=right]&rotate-180deg @motion-reduce-transition-duration-0s"),
          variant === "floating" || variant === "inset"
            ? acss("[data-collapsible=icon]&w(calc(var(--sidebar-width-icon)_+_16px))")
            : acss("[data-collapsible=icon]&w(var(--sidebar-width-icon))")
        )}
      />
      <div
        className={cn(
          acss("@components[position-fixed,t-0,btm-0,zi-10,h-100svh,w(var(--sidebar-width)),transition(left_0.2s_linear,right_0.2s_linear,width_0.2s_linear)] @xs-d-none @sm-d-none @md-d-flex @motion-reduce-transition-duration-0s"),
          side === "left"
            ? acss("@components[l-0] [data-collapsible=offcanvas]&l(calc(var(--sidebar-width)_*_-1))")
            : acss("@components[r-0] [data-collapsible=offcanvas]&r(calc(var(--sidebar-width)_*_-1))"),
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? acss("@components[p-8px] [data-collapsible=icon]&w(calc(var(--sidebar-width-icon)_+_16px_+_2px))")
            : acss("[data-collapsible=icon]&w(var(--sidebar-width-icon)) [data-side=left]&border-right-width-1px [data-side=right]&border-left-width-1px"),
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="bgc-grayTheme2 d-flex h-100% w-100% flex-direction-column [data-variant=floating]&[br-10px,border-width-1px,box-shadow(0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1))]"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, isMobile, state } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn(acss("@components[h-28px,w-28px]"), className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {isMobile || state === "collapsed" ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle sidebar"
      className={cn(
        acss("@components[position-absolute,t-0,btm-0,zi-20,w-16px,p-0,bgc-transparent,translate(-50%_0),transition(all_0.15s_linear),--after[cont,position-absolute,t-0,btm-0,l-50%,w-2px],--hover--after-bgc-grayTheme6] @xs-d-none @sm-d-flex"),
        acss("[data-side=left]&[r--16px,cursor-w-resize] [data-side=right]&[l-0,cursor-e-resize]"),
        acss("[data-side=left][data-state=collapsed]&cursor-e-resize [data-side=right][data-state=collapsed]&cursor-w-resize"),
        acss("[data-collapsible=offcanvas]&[translate-0,--hover-bgc-grayTheme2] [data-collapsible=offcanvas]&--after-l-100%"),
        acss("[data-side=left][data-collapsible=offcanvas]&r--8px"),
        acss("[data-side=right][data-collapsible=offcanvas]&l--8px"),
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        acss("@components[bgc-grayTheme1,position-relative,d-flex,xw-100%,mh-100svh,flex-1,flex-direction-column]"),
        // When the sidebar before it uses variant="inset", the page becomes a rounded card
        acss("____[data-variant=inset]&mh(calc(100svh_-_16px)) @md____[data-variant=inset]&[margin(8px_8px_8px_0),br-14px,box-shadow(0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1))]"),
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn(acss("@components[bgc-grayTheme1,h-32px,w-100%,box-shadow-none]"), className)}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn(acss("@components[d-flex,flex-direction-column,g-8px,p-8px]"), className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn(acss("@components[d-flex,flex-direction-column,g-8px,p-8px]"), className)}
      {...props}
    />
  )
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(acss("@components[bgc-grayTheme6,margin-inline-8px] [data-orientation=horizontal]-w-auto"), className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        acss("@components[d-flex,mh-0,flex-1,flex-direction-column,g-8px,overflow-auto] [data-collapsible=icon]&overflow-hidden"),
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(acss("@components[position-relative,d-flex,w-100%,mw-0,flex-direction-column,p-8px]"), className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        acss("@components[c-grayTheme12/0.7,d-flex,h-32px,flex-shrink-0,aic,br-8px,padding-inline-8px,fs-12px,lh-16px,fw-500,outline-none,transition(margin_0.2s_linear,opacity_0.2s_linear),--focus-visible-box-shadow(0_0_0_2px_var(--x-ring-strong-color)),__svg[w-16px,h-16px,flex-shrink-0]]"),
        acss("[data-collapsible=icon]&[margin-top--32px,o-0,user-select-none,pointer-events-none]"),
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        acss("@components[c-grayTheme12,position-absolute,t-14px,r-12px,d-flex,aspect-ratio-1,w-20px,aic,jcc,br-8px,p-0,bgc-transparent,outline-none,transition(transform_0.15s),--hover-bgc-grayTheme4,--focus-visible-box-shadow(0_0_0_2px_var(--x-ring-strong-color)),__svg[w-16px,h-16px,flex-shrink-0]]"),
        // Increases the hit area of the button on mobile.
        acss("--after[cont,position-absolute,inset--8px] @md--after-d-none"),
        acss("[data-collapsible=icon]&d-none"),
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn(acss("@components[w-100%,fs-14px,lh-20px]"), className)}
      {...props}
    />
  )
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn(acss("@components[d-flex,w-100%,mw-0,flex-direction-column,g-4px]"), className)}
      {...props}
    />
  )
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn(acss("@components[position-relative]"), className)}
      {...props}
    />
  )
}

const MENU_BUTTON = acss("@components[d-flex,w-100%,aic,g-8px,overflow-hidden,br-8px,text-align-left,c-grayTheme12,outline-none,transition(width_0.2s,height_0.2s,padding_0.2s),--hover-bgc-grayTheme4,--active-bgc-grayTheme4,--focus-visible-box-shadow(0_0_0_2px_var(--x-ring-strong-color)),--disabled[pointer-events-none,o-0.5],[aria-disabled=true][pointer-events-none,o-0.5],[data-active=true][bgc-grayTheme4,fw-500],__span--last-child[overflow-hidden,text-overflow-ellipsis,white-space-nowrap],__svg[w-16px,h-16px,flex-shrink-0]] [data-sidebar=menu-item]--has([data-sidebar=menu-action])&padding-right-32px [data-collapsible=icon]&[w-32px,h-32px]")

const MENU_BUTTON_VARIANTS = {
  default: acss("@components[bgc-transparent]"),
  outline: acss("@components[bgc-grayTheme1,box-shadow(0_0_0_1px_var(--x-sidebar-border-color)),--hover-box-shadow(0_0_0_1px_var(--x-sidebar-accent-color))] --x-sidebar-border-color:grayTheme6 --x-sidebar-accent-color:grayTheme4"),
} as const

const MENU_BUTTON_SIZES = {
  default: acss("@components[h-32px,p-8px,fs-14px,lh-20px] [data-collapsible=icon]&p-8px"),
  sm: acss("@components[h-28px,p-8px,fs-12px,lh-16px] [data-collapsible=icon]&p-8px"),
  lg: acss("@components[h-48px,p-8px,fs-14px,lh-20px] [data-collapsible=icon]&p-0"),
} as const

type SidebarMenuButtonVariantProps = {
  variant?: keyof typeof MENU_BUTTON_VARIANTS
  size?: keyof typeof MENU_BUTTON_SIZES
}

function sidebarMenuButtonVariants({
  variant = "default",
  size = "default",
}: SidebarMenuButtonVariantProps = {}) {
  return cn(MENU_BUTTON, MENU_BUTTON_VARIANTS[variant], MENU_BUTTON_SIZES[size])
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & SidebarMenuButtonVariantProps) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        acss("@components[c-grayTheme12,position-absolute,t-6px,r-4px,d-flex,aspect-ratio-1,w-20px,aic,jcc,br-8px,p-0,bgc-transparent,outline-none,transition(transform_0.15s),--hover-bgc-grayTheme4,--focus-visible-box-shadow(0_0_0_2px_var(--x-ring-strong-color)),__svg[w-16px,h-16px,flex-shrink-0]]"),
        // Increases the hit area of the button on mobile.
        acss("--after[cont,position-absolute,inset--8px] @md--after-d-none"),
        // The menu button is the sibling before this one: follow its size
        acss("____[data-size=sm]&t-4px ____[data-size=default]&t-6px ____[data-size=lg]&t-10px"),
        acss("[data-collapsible=icon]&d-none"),
        showOnHover &&
          acss("@md-o-0 [data-sidebar=menu-item]--hover&o-1 [data-sidebar=menu-item]--focus-within&o-1 [data-state=open]-o-1"),
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        acss("@components[c-grayTheme12,pointer-events-none,position-absolute,r-4px,d-flex,h-20px,mw-20px,aic,jcc,br-8px,padding-inline-4px,fs-12px,lh-16px,fw-500,font-variant-numeric-tabular-nums,user-select-none]"),
        acss("____[data-size=sm]&t-4px ____[data-size=default]&t-6px ____[data-size=lg]&t-10px"),
        acss("[data-collapsible=icon]&d-none"),
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {

  // wrapping in useState to ensure the width is stable across renders
  // also ensures we have a stable reference to the style object
  const [skeletonStyle] = React.useState(() => (
      {
        "--skeleton-width": `${Math.floor(Math.random() * 40) + 50}%` // Random width between 50 and 90%.
    } as React.CSSProperties
  ))

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn(acss("@components[d-flex,h-32px,aic,g-8px,br-8px,padding-inline-8px]"), className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="w-16px h-16px br-8px"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-16px xw(var(--skeleton-width)) flex-1"
        data-sidebar="menu-skeleton-text"
        style={skeletonStyle}
      />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        acss("@components[margin-inline-14px,d-flex,mw-0,translate(1px_0),flex-direction-column,g-4px,border-left-width-1px,border-color-grayTheme6,padding(2px_10px)]"),
        acss("[data-collapsible=icon]&d-none"),
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn(acss("@components[position-relative]"), className)}
      {...props}
    />
  )
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        acss("@components[c-grayTheme12,d-flex,h-28px,mw-0,translate(-1px_0),aic,g-8px,overflow-hidden,br-8px,padding-inline-8px,outline-none,--hover-bgc-grayTheme4,--active-bgc-grayTheme4,--focus-visible-box-shadow(0_0_0_2px_var(--x-ring-strong-color)),--disabled[pointer-events-none,o-0.5],[aria-disabled=true][pointer-events-none,o-0.5],[data-active=true]-bgc-grayTheme4,[data-size=sm][fs-12px,lh-16px],[data-size=md][fs-14px,lh-20px],__span--last-child[overflow-hidden,text-overflow-ellipsis,white-space-nowrap],__svg[w-16px,h-16px,flex-shrink-0]]"),
        acss("[data-collapsible=icon]&d-none"),
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
