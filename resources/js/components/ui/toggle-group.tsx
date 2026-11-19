import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import * as React from "react"

import { toggleVariants, type ToggleVariantProps } from "@/components/ui/toggle"
import { acss, cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<ToggleVariantProps>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        acss("@components[d-flex,aic,br-8px,[data-variant=outline]-box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05))]"),
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantProps) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        // Joined items: square inner corners, one shared border between neighbours
        acss("mw-0 flex-shrink-0 br-0 box-shadow-none --first-child-border-radius(8px_0_0_8px) --last-child-border-radius(0_8px_8px_0) --focus-visible-zi-10 [data-variant=outline]-border-left-width-0 [data-variant=outline]--first-child-border-left-width-1px"),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
