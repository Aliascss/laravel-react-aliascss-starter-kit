import * as SeparatorPrimitive from "@radix-ui/react-separator"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        acss("@components[flex-shrink-0,bgc-grayTheme6,[data-orientation=horizontal][h-1px,w-100%],[data-orientation=vertical][h-100%,w-1px]]"),
        className
      )}
      {...props}
    />
  )
}

export { Separator }
