import type { HandleOAuthCallbackParams } from "@clerk/types"

import React from 'react'
import SSOCallback from "@/components/auth/SSOCallback"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

const SSOCallbackPage = ({
  searchParams  
}: SSOCallbackPageProps) => {
  return (
    <SSOCallback searchParams={searchParams} />
  )
}

export default SSOCallbackPage