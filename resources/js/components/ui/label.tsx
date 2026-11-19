import * as LabelPrimitive from "@radix-ui/react-label"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        acss("@components[fs-14px,lh-1,fw-500,user-select-none,--has(--disabled)[cursor-not-allowed,o-0.5]] [data-disabled=true]&[pointer-events-none,o-0.5]"),
        className
      )}
      {...props}
    />
  )
}

export { Label }
