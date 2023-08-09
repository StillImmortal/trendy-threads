"use client"

import { forwardRef, useState } from "react"
import { Icons } from "@/constants/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input, type InputProps } from "@/components/ui/input"

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [isShown, setIsShown] = useState(false)

    return (
      <div className="relative">
        <Input
          type={isShown ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setIsShown((prev) => !prev)}
          disabled={props.value === "" || props.disabled}
        >
          {isShown ? (
            <Icons.hide className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.view className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isShown ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export default PasswordInput
