import type { HandleOAuthCallbackParams } from "@clerk/types"

import React from 'react'
import { SSOCallback } from "@/components/auth"
import { Container } from "@/components/custom"

export interface SSOCallbackPageProps {
  searchParams: HandleOAuthCallbackParams
}

const SSOCallbackPage = ({
  searchParams  
}: SSOCallbackPageProps) => {
  return (
    <Container className="max-w-lg">
      <SSOCallback searchParams={searchParams} />
    </Container>
  )
}

export default SSOCallbackPage