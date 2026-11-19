import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        acss("@components[d-inline-flex,aic,jcc,w-16px,h-16px,flex-shrink-0,br-4px,b-1px-solid-grayTheme7,bgc-transparent,p-0,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),outline-none,transition(box-shadow_0.15s),[data-state=checked][bgc-grayTheme12,c-grayTheme1,border-color-grayTheme12],--disabled[cursor-not-allowed,o-0.5],--focus-visible[border-color-grayTheme8,box-shadow(0_0_0_3px_var(--x-ring-color))],[aria-invalid=true][border-color-redTheme9,box-shadow(0_0_0_3px_var(--x-ring-danger-color))]]"),
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="d-flex aic jcc c-currentColor"
      >
        <CheckIcon className="w-14px h-14px" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
