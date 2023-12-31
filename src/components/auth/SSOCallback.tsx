"use client"

import { useEffect } from "react"
import { Icons } from "@/constants/icons"
import { useClerk } from "@clerk/nextjs"

import type { SSOCallbackPageProps } from "@/app/(auth)/sso-callback/page"

const SSOCallback = ({ searchParams }: SSOCallbackPageProps) => {
  const { handleRedirectCallback } = useClerk()

  useEffect(() => {
    handleRedirectCallback(searchParams)
  }, [searchParams, handleRedirectCallback])

  return (
    <div
      role="status"
      aria-label="Loading"
      aria-describedby="loading-description"
      className="flex items-center justify-center"
    >
      <Icons.spinner className="h-16 w-16 animate-spin" aria-hidden="true" />
    </div>
  )
}

export default SSOCallback
