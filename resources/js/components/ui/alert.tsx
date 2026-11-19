import * as React from "react"

import { acss, cn } from "@/lib/utils"

const BASE = acss("@components[position-relative,d-grid,ai-start,w-100%,br-10px,b-1px-solid-grayTheme6,padding(12px_16px),fs-14px,lh-20px,gtc(0_1fr),row-gap-2px,--has(__svg)[gtc(16px_1fr),column-gap-12px],__svg[w-16px,h-16px,tf-translateY-2px,c-currentColor]]")

const VARIANTS = {
  default: acss("@components[bgc-grayTheme1,c-grayTheme12]"),
  destructive: acss("@components[bgc-grayTheme1,c-redTheme11,_.(alert-description)-c-redTheme11]"),
} as const

type AlertVariant = keyof typeof VARIANTS

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & { variant?: AlertVariant | null }) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(BASE, VARIANTS[variant ?? "default"], className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        acss("@components[grid-column-start-2,mh-16px,fw-500,les--0.025em,overflow-hidden,text-overflow-ellipsis,white-space-nowrap]"),
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        // "alert-description" is a plain hook: the destructive variant recolours it
        "alert-description",
        acss("@components[grid-column-start-2,d-grid,justify-items-start,g-4px,fs-14px,c-grayTheme11,_p-lh-1.625]"),
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
