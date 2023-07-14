"use client"

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { SignOutButton as LogOutButton } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks'
import { Button, buttonVariants } from '../ui/button'
import { Icons } from '@/constants/icons'
import { Skeleton } from '../ui/skeleton'


const SignOutButton = () => {
  const router = useRouter()
  const mounted = useMounted()
  const [isPending, startTransition] = useTransition()

  return (
    <div className='flex items-center w-full space-x-2'>
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
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            Log out
          </Button>
        </LogOutButton>
      ) : (
        <Skeleton className={cn(
          buttonVariants({ size: "sm" }),
          "w-full bg-muted text-muted-foreground"
        )}>
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