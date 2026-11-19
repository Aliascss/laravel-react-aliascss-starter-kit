import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

// Shared by the menu and its submenus
const CONTENT = acss("@components[zi-50,mw-128px,overflow-hidden,br-8px,b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,p-4px,box-shadow(0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)),animation(pop-in_0.15s_ease-out)] @motion-reduce-animation-none")

const ITEM = acss("@components[position-relative,d-flex,cursor-default,aic,g-8px,br-6px,padding(6px_8px),fs-14px,lh-20px,outline-none,user-select-none,--focus[bgc-grayTheme3,c-grayTheme12],[data-disabled][pointer-events-none,o-0.5],[data-inset]-padding-left-32px,_svg[pointer-events-none,flex-shrink-0,w-16px,h-16px,c-grayTheme11]]")

const ITEM_DESTRUCTIVE = acss("@components[[data-variant=destructive][c-redTheme11],[data-variant=destructive]--focus[bgc-redTheme3,c-redTheme11],[data-variant=destructive]_svg-c-redTheme11]")

const INDICATOR_ITEM = acss("@components[position-relative,d-flex,cursor-default,aic,g-8px,br-6px,padding(6px_8px_6px_32px),fs-14px,lh-20px,outline-none,user-select-none,--focus[bgc-grayTheme3,c-grayTheme12],[data-disabled][pointer-events-none,o-0.5],_svg[pointer-events-none,flex-shrink-0]]")

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          CONTENT,
          acss("@components[xh(var(--radix-dropdown-menu-content-available-height)),overflow-y-auto,transform-origin(var(--radix-dropdown-menu-content-transform-origin))]"),
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(ITEM, ITEM_DESTRUCTIVE, className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(INDICATOR_ITEM, className)}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none position-absolute l-8px d-flex w-14px h-14px aic jcc">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="w-16px h-16px" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(INDICATOR_ITEM, className)}
      {...props}
    >
      <span className="pointer-events-none position-absolute l-8px d-flex w-14px h-14px aic jcc">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="w-8px h-8px fill-currentColor" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        acss("@components[padding(6px_8px),fs-14px,lh-20px,fw-500,[data-inset]-padding-left-32px]"),
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn(acss("@components[bgc-grayTheme6,margin(4px_-4px),h-1px]"), className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        acss("@components[margin-left-auto,fs-12px,lh-16px,les-0.1em,c-grayTheme11]"),
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        acss("@components[d-flex,cursor-default,aic,br-6px,padding(6px_8px),fs-14px,lh-20px,outline-none,user-select-none,--focus[bgc-grayTheme3,c-grayTheme12],[data-state=open][bgc-grayTheme3,c-grayTheme12],[data-inset]-padding-left-32px]"),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="margin-left-auto w-16px h-16px" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        CONTENT,
        acss("@components[transform-origin(var(--radix-dropdown-menu-content-transform-origin))]"),
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
