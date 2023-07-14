"use client"

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Icons } from '@/constants/icons'
import { Input, type InputProps } from '../ui/input'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((
  { className, ...props }, 
  ref
) => {
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
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setIsShown((prev) => !prev)}
        disabled={props.value === "" || props.disabled}
      >
        {isShown ? (
            <Icons.hide className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Icons.view className="w-4 h-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {isShown ? "Hide password" : "Show password"}
          </span>
      </Button>
    </div>
  )
})
PasswordInput.displayName = "PasswordInput"

export default PasswordInput