import { Loader2Icon } from "lucide-react"

import { acss, cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(acss("@components[w-16px,h-16px,animation(spin_1s_linear_infinite)]"), className)}
      {...props}
    />
  )
}

export { Spinner }
