import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

const BASE = acss("@components[d-inline-flex,aic,jcc,g-4px,w-fit-content,flex-shrink-0,overflow-hidden,white-space-nowrap,br-8px,border-width-1px,border-style-solid,padding(2px_8px),fs-12px,lh-16px,fw-500,transition(color_0.15s,box-shadow_0.15s),__svg[w-12px,h-12px,pointer-events-none],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))],[aria-invalid=true][border-color-redTheme9,box-shadow(0_0_0_3px_var(--x-ring-danger-color))]]")

const VARIANTS = {
  default: acss("@components[border-color-transparent,bgc-grayTheme12,c-grayTheme1]"),
  secondary: acss("@components[border-color-transparent,bgc-grayTheme3,c-grayTheme12]"),
  destructive: acss("@components[border-color-transparent,bgc-redTheme9,c-white]"),
  outline: acss("@components[border-color-grayTheme6,c-grayTheme12]"),
} as const

type BadgeVariant = keyof typeof VARIANTS

function badgeVariants({ variant }: { variant?: BadgeVariant | null } = {}) {
  return cn(BASE, VARIANTS[variant ?? "default"])
}

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & {
  variant?: BadgeVariant | null
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
