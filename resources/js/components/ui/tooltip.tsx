import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 4,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          acss("@components[zi-50,xw-384px,br-8px,bgc-grayTheme12,c-grayTheme1,padding(6px_12px),fs-12px,lh-16px,transform-origin(var(--radix-tooltip-content-transform-origin)),animation(pop-in_0.15s_ease-out),[data-state=closed]-animation(pop-out_0.1s_ease-in_forwards)] @motion-reduce-animation-none"),
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-grayTheme12" width={10} height={5} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
