import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        acss("@components[position-fixed,inset-0,zi-50,bgc-black/0.8,[data-state=open]-animation(fade-in_0.2s_ease-out),[data-state=closed]-animation(fade-out_0.2s_ease-in_forwards)] @motion-reduce-animation-none"),
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          acss("@components[position-fixed,t-50%,l-50%,zi-50,d-grid,w-100%,xw(calc(100%_-_32px)),translate(-50%_-50%),g-16px,br-10px,b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,p-24px,box-shadow(0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)),[data-state=open]-animation(dialog-in_0.2s_ease-out),[data-state=closed]-animation(dialog-out_0.2s_ease-in_forwards)] @sm-xw-512px @motion-reduce-animation-none"),
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="position-absolute t-16px r-16px d-flex br-4px c-grayTheme12 o-0.7 transition(opacity_0.15s) --hover-o-1 --focus-visible[outline-2px-solid-grayTheme8,outline-offset-2px] --disabled-pointer-events-none [data-state=open][bgc-grayTheme3,c-grayTheme11] _svg[pointer-events-none,flex-shrink-0,w-16px,h-16px]">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        acss("@components[d-flex,flex-direction-column,g-8px] @xs-text-align-center @sm-text-align-left"),
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        acss("@components[d-flex,g-8px] @xs-flex-direction-column-reverse @sm[flex-direction-row,justify-content-flex-end]"),
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(acss("@components[fs-18px,lh-1,fw-600]"), className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(acss("@components[c-grayTheme11,fs-14px,lh-20px]"), className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
