import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        acss("@components[position-fixed,inset-0,zi-50,bgc-black/0.8,[data-state=open]-animation(fade-in_0.3s_ease-out),[data-state=closed]-animation(fade-out_0.3s_ease-in_forwards)] @motion-reduce-animation-none"),
        className
      )}
      {...props}
    />
  )
}

const CONTENT = acss("@components[position-fixed,zi-50,d-flex,flex-direction-column,g-16px,bgc-grayTheme1,c-grayTheme12,border-style-solid,border-color-grayTheme6,border-width-0,box-shadow(0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1))] @motion-reduce-animation-none")

const SIDES = {
  right: acss("@components[t-0,btm-0,r-0,h-100%,w-75%,border-left-width-1px,[data-state=open]-animation(slide-in-right_0.5s_cubic-bezier(0.32,0.72,0,1)),[data-state=closed]-animation(slide-out-right_0.3s_ease-in_forwards)] @sm-xw-384px"),
  left: acss("@components[t-0,btm-0,l-0,h-100%,w-75%,border-right-width-1px,[data-state=open]-animation(slide-in-left_0.5s_cubic-bezier(0.32,0.72,0,1)),[data-state=closed]-animation(slide-out-left_0.3s_ease-in_forwards)] @sm-xw-384px"),
  top: acss("@components[l-0,r-0,t-0,h-auto,border-bottom-width-1px,[data-state=open]-animation(slide-in-top_0.5s_cubic-bezier(0.32,0.72,0,1)),[data-state=closed]-animation(slide-out-top_0.3s_ease-in_forwards)]"),
  bottom: acss("@components[l-0,r-0,btm-0,h-auto,border-top-width-1px,[data-state=open]-animation(slide-in-bottom_0.5s_cubic-bezier(0.32,0.72,0,1)),[data-state=closed]-animation(slide-out-bottom_0.3s_ease-in_forwards)]"),
} as const

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(CONTENT, SIDES[side], className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="position-absolute t-16px r-16px d-flex br-4px c-grayTheme12 o-0.7 transition(opacity_0.15s) --hover-o-1 --focus-visible[outline-2px-solid-grayTheme8,outline-offset-2px] --disabled-pointer-events-none [data-state=open]-bgc-grayTheme3">
          <XIcon className="w-16px h-16px" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(acss("@components[d-flex,flex-direction-column,g-6px,p-16px]"), className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(acss("@components[margin-top-auto,d-flex,flex-direction-column,g-8px,p-16px]"), className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(acss("@components[c-grayTheme12,fw-600]"), className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(acss("@components[c-grayTheme11,fs-14px,lh-20px]"), className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
