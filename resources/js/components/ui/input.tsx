import * as React from "react"

import { acss, cn } from "@/lib/utils"

const INPUT = acss("@components[d-flex,h-36px,w-100%,mw-0,br-8px,b-1px-solid-grayTheme6,bgc-transparent,padding(4px_12px),c-grayTheme12,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),outline-none,transition(color_0.15s,box-shadow_0.15s),--placeholder-c-grayTheme10,--selection[bgc-grayTheme12,c-grayTheme1],--file-selector-button[d-inline-flex,h-28px,b-0,bgc-transparent,fs-14px,fw-500,c-grayTheme12],--disabled[pointer-events-none,cursor-not-allowed,o-0.5],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))],[aria-invalid=true][border-color-redTheme9,box-shadow(0_0_0_3px_var(--x-ring-danger-color))]]")

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      // 16px on phones stops iOS zooming into the field
      className={cn(INPUT, acss("@xs-fs-16px @sm-fs-16px @md-fs-14px"), className)}
      {...props}
    />
  )
}

export { Input }
