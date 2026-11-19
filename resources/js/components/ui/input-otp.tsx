import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"
import * as React from "react"

import { acss, cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      acss("@components[d-flex,aic,g-8px,--has(--disabled)-o-0.5]"),
      containerClassName
    )}
    className={cn(acss("@components[--disabled-cursor-not-allowed]"), className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(acss("@components[d-flex,aic]"), className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      data-active={isActive ? "" : undefined}
      className={cn(
        acss("@components[position-relative,d-flex,h-36px,w-36px,aic,jcc,border-style-solid,border-color-grayTheme6,border-width(1px_1px_1px_0),fs-14px,box-shadow(0_1px_2px_0_rgb(0_0_0_/_0.05)),transition(box-shadow_0.15s),--first-child[border-left-width-1px,border-radius(8px_0_0_8px)],--last-child-border-radius(0_8px_8px_0),[data-active][zi-10,box-shadow(0_0_0_1px_var(--x-ring-strong-color))]]"),
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none position-absolute inset-0 d-flex aic jcc">
          <div className="h-16px w-1px bgc-grayTheme12 animation(caret-blink_1.25s_ease-out_infinite)" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
