"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/constants/icons"
import { useMounted } from "@/hooks"
import { SignOutButton as LogOutButton } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const SignOutButton = () => {
  const router = useRouter()
  const mounted = useMounted()
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex w-full items-center space-x-2">
      {mounted ? (
        <LogOutButton
          signOutCallback={() => {
            startTransition(() => {
              router.push(`${window.location.origin}/?redirect=false`)
            })
          }}
        >
          <Button
            aria-label="Log out"
            size="sm"
            className="w-full"
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Log out
          </Button>
        </LogOutButton>
      ) : (
        <Skeleton
          className={cn(
            buttonVariants({ size: "sm" }),
            "w-full bg-muted text-muted-foreground"
          )}
        >
          Sign out
        </Skeleton>
      )}
      <Button
        aria-label="Go back to the previous page"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => router.back()}
        disabled={isPending}
      >
        Go back
      </Button>
    </div>
  )
}

export default SignOutButton
