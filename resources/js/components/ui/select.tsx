import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        acss("@components[d-flex,w-fit-content,aic,jcsb,g-8px,br-8px,b-1px-solid-grayTheme6,bgc-transparent,c-grayTheme12,padding(8px_12px),fs-14px,lh-20px,white-space-nowrap,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),outline-none,transition(color_0.15s,box-shadow_0.15s),[data-size=default]-h-36px,[data-size=sm]-h-32px,[data-placeholder]-c-grayTheme11,--disabled[cursor-not-allowed,o-0.5],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))],[aria-invalid=true][border-color-redTheme9,box-shadow(0_0_0_3px_var(--x-ring-danger-color))],_svg[pointer-events-none,flex-shrink-0,w-16px,h-16px,c-grayTheme11],__span[d-flex,aic,g-8px,overflow-hidden,text-overflow-ellipsis]]"),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="w-16px h-16px o-0.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  side = "bottom",
  sideOffset = 4,
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          acss("@components[position-relative,zi-50,xh(var(--radix-select-content-available-height)),mw-128px,transform-origin(var(--radix-select-content-transform-origin)),overflow-x-hidden,overflow-y-auto,br-8px,b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,box-shadow(0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)),animation(pop-in_0.15s_ease-out)] @motion-reduce-animation-none"),
          className
        )}
        position={position}
        side={side}
        sideOffset={sideOffset}
        avoidCollisions={false}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-4px",
            position === "popper" &&
              acss("w-100% mw(var(--radix-select-trigger-width)) scroll-margin-block-4px")
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(acss("@components[c-grayTheme11,padding(6px_8px),fs-12px,lh-16px]"), className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        acss("@components[position-relative,d-flex,w-100%,cursor-default,aic,g-8px,br-6px,padding(6px_32px_6px_8px),fs-14px,lh-20px,outline-none,user-select-none,--focus[bgc-grayTheme3,c-grayTheme12],[data-disabled][pointer-events-none,o-0.5],_svg[pointer-events-none,flex-shrink-0,w-16px,h-16px,c-grayTheme11]]"),
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="position-absolute r-8px d-flex w-14px h-14px aic jcc"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="w-16px h-16px" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(acss("@components[bgc-grayTheme6,pointer-events-none,margin(4px_-4px),h-1px]"), className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(acss("@components[d-flex,cursor-default,aic,jcc,padding-block-4px]"), className)}
      {...props}
    >
      <ChevronUpIcon className="w-16px h-16px" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(acss("@components[d-flex,cursor-default,aic,jcc,padding-block-4px]"), className)}
      {...props}
    >
      <ChevronDownIcon className="w-16px h-16px" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
