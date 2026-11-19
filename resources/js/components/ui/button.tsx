import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

// Every class list is wrapped in acss() so the AliasCSS compiler can see it, and in
// the @components layer so a className passed by the caller always wins.
const BASE = acss("@components[d-inline-flex,aic,jcc,g-8px,white-space-nowrap,fs-14px,lh-20px,fw-500,outline-none,transition(color_0.15s,background-color_0.15s,box-shadow_0.15s),--disabled[pointer-events-none,o-0.5],_svg[pointer-events-none,flex-shrink-0,w-16px,h-16px],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))],[aria-invalid=true][border-color-redTheme9,box-shadow(0_0_0_3px_var(--x-ring-danger-color))]]")

const VARIANTS = {
  default: acss("@components[bgc-grayTheme12,c-grayTheme1,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),--hover-bgc-grayTheme12/0.9]"),
  destructive: acss("@components[bgc-redTheme9,c-white,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),--hover-bgc-redTheme10]"),
  outline: acss("@components[b-1px-solid-grayTheme6,bgc-grayTheme1,c-grayTheme12,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),--hover-bgc-grayTheme3]"),
  secondary: acss("@components[bgc-grayTheme3,c-grayTheme12,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),--hover-bgc-grayTheme4]"),
  ghost: acss("@components[bgc-transparent,c-grayTheme12,--hover-bgc-grayTheme3]"),
  link: acss("@components[bgc-transparent,c-grayTheme12,text-underline-offset-4px,--hover-text-decoration-line-underline]"),
} as const

const SIZES = {
  default: acss("@components[h-36px,padding(8px_16px),br-8px,--has(__svg)-padding-inline-12px]"),
  sm: acss("@components[h-32px,padding(0_12px),br-8px,--has(__svg)-padding-inline-10px]"),
  lg: acss("@components[h-40px,padding(0_24px),br-8px,--has(__svg)-padding-inline-16px]"),
  icon: acss("@components[w-36px,h-36px,p-0,br-8px]"),
} as const

type ButtonVariant = keyof typeof VARIANTS
type ButtonSize = keyof typeof SIZES

type ButtonVariantProps = {
  variant?: ButtonVariant | null
  size?: ButtonSize | null
}

function buttonVariants({
  variant,
  size,
  className,
}: ButtonVariantProps & { className?: string } = {}) {
  return cn(BASE, VARIANTS[variant ?? "default"], SIZES[size ?? "default"], className)
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  ButtonVariantProps & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonVariant, ButtonSize, ButtonVariantProps }
