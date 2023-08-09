"use client"

import * as React from "react"

import { catchError } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/constants/icons"
import { createAccountLink } from "@/app/_actions/subscription"

interface ConnectToStripeButtonProps {
  storeId: number
}

const ConnectStoreToStripeButton = ({
  storeId,
}: ConnectToStripeButtonProps) => {
  const [isPending, startTransaction] = React.useTransition()

  return (
    <Button
      onClick={() => {
        startTransaction(async () => {
          try {
            const connection = await createAccountLink({ storeId })
            window.location.href = connection.url
          } catch (err) {
            catchError(err)
          }
        })
      }}
      disabled={isPending}
    >
      {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      Connect to Stripe
    </Button>
  )
}

export default ConnectStoreToStripeButton
