import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        acss("@components[position-relative,d-flex,w-32px,h-32px,flex-shrink-0,overflow-hidden,br-999px]"),
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(acss("@components[aspect-ratio-1,w-100%,h-100%]"), className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        acss("@components[d-flex,w-100%,h-100%,aic,jcc,br-999px,bgc-grayTheme3]"),
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
