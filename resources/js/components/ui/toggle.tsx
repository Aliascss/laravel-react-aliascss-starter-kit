import * as TogglePrimitive from "@radix-ui/react-toggle"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

const BASE = acss("@components[d-inline-flex,aic,jcc,g-8px,br-8px,fs-14px,lh-20px,fw-500,c-grayTheme12,outline-none,transition(color_0.15s,background-color_0.15s,box-shadow_0.15s),--hover[bgc-grayTheme3,c-grayTheme11],[data-state=on][bgc-grayTheme4,c-grayTheme12],--disabled[pointer-events-none,o-0.5],_svg[pointer-events-none,flex-shrink-0,w-16px,h-16px],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))]]")

const VARIANTS = {
  default: acss("@components[bgc-transparent]"),
  outline: acss("@components[b-1px-solid-grayTheme6,bgc-transparent,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05))]"),
} as const

const SIZES = {
  default: acss("@components[h-36px,padding-inline-8px,mw-36px]"),
  sm: acss("@components[h-32px,padding-inline-6px,mw-32px]"),
  lg: acss("@components[h-40px,padding-inline-10px,mw-40px]"),
} as const

type ToggleVariantProps = {
  variant?: keyof typeof VARIANTS | null
  size?: keyof typeof SIZES | null
}

function toggleVariants({
  variant,
  size,
  className,
}: ToggleVariantProps & { className?: string } = {}) {
  return cn(BASE, VARIANTS[variant ?? "default"], SIZES[size ?? "default"], className)
}

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & ToggleVariantProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
export type { ToggleVariantProps }
