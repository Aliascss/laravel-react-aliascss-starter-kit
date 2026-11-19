import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { ChevronDownIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        acss("@components[position-relative,d-flex,xw-max-content,flex-1,aic,jcc]"),
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        acss("@components[d-flex,flex-1,list-style-none,aic,jcc,g-4px]"),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn(acss("@components[position-relative]"), className)}
      {...props}
    />
  )
}

const TRIGGER = acss("@components[d-inline-flex,h-36px,w-max-content,aic,jcc,br-8px,bgc-grayTheme1,c-grayTheme12,padding(8px_16px),fs-14px,lh-20px,fw-500,outline-none,transition(color_0.15s,background-color_0.15s,box-shadow_0.15s),--hover-bgc-grayTheme3,--focus-bgc-grayTheme3,--disabled[pointer-events-none,o-0.5],[data-active=true]-bgc-grayTheme3,[data-state=open]-bgc-grayTheme3,--focus-visible-box-shadow(0_0_0_3px_var(--x-ring-color))]")

function navigationMenuTriggerStyle() {
  return TRIGGER
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(TRIGGER, className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="position-relative t-1px margin-left-4px w-12px h-12px transition(rotate_0.3s) [data-state=open]&rotate-180deg"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        acss("@components[t-0,l-0,w-100%,padding(8px_10px_8px_8px),animation(fade-in_0.2s_ease-out)] @md[position-absolute,w-auto] @motion-reduce-animation-none"),
        // Without a shared viewport, each panel is its own floating card
        acss("[data-viewport=false]&[position-absolute,t-100%,margin-top-6px,overflow-hidden,br-8px,b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,box-shadow(0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1))]"),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className="position-absolute t-100% l-0 isolation-isolate zi-50 d-flex jcc">
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          acss("@components[position-relative,margin-top-6px,h(var(--radix-navigation-menu-viewport-height)),w-100%,overflow-hidden,br-8px,b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,box-shadow(0_1px_3px_0_rgb(0_0_0_/_0.1),0_1px_2px_-1px_rgb(0_0_0_/_0.1)),transform-origin(top_center),animation(pop-in_0.2s_ease-out)] @md-w(var(--radix-navigation-menu-viewport-width)) @motion-reduce-animation-none"),
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        acss("@components[d-flex,flex-direction-column,g-4px,br-6px,p-8px,fs-14px,lh-20px,outline-none,transition(color_0.15s,background-color_0.15s,box-shadow_0.15s),--hover-bgc-grayTheme3,--focus-bgc-grayTheme3,[data-active=true]-bgc-grayTheme3,--focus-visible-box-shadow(0_0_0_3px_var(--x-ring-color)),_svg[w-16px,h-16px,c-grayTheme11]]"),
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        acss("@components[t-100%,zi-1,d-flex,h-6px,ai-flex-end,jcc,overflow-hidden,[data-state=visible]-animation(fade-in_0.2s_ease-out),[data-state=hidden]-animation(fade-out_0.2s_ease-in_forwards)]"),
        className
      )}
      {...props}
    >
      <div className="position-relative t-60% h-8px w-8px rotate-45deg border-top-left-radius-2px bgc-grayTheme6 box-shadow(0_4px_6px_-1px_rgb(0_0_0_/_0.1))" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
