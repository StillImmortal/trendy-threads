import { type Metadata } from 'next'

import { Container } from '@/components/custom'
import { SectionHeader } from '@/components/layout'
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert'
import { Icons } from '@/constants/icons'

import React from 'react'

export const metadata: Metadata = {
  //metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Stores",
  description: "Manage your stores",
}

const StoresPage = () => {
  const subscriptionPlan = {
    name: "Ollie",
    isSubscribed: true,
    isCanceled: false,
  }

  return (
    <Container variant="sidebar">
      <SectionHeader 
        title="Stores"
        description="Manage your stores"
        size="sm"
      />
      <Alert>
        <Icons.terminal className="w-4 h-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{" "}
          <span className="font-semibold">{subscriptionPlan.name}</span> plan.{" "}
          {!subscriptionPlan.isSubscribed
            ? "Upgrade to create more stores and products."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {/* {subscriptionPlan?.stripeCurrentPeriodEnd
            ? `${formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.`
            : null}{" "}
          You can create up to{" "}
          <span className="font-semibold">{featuredStoreCount}</span> stores and{" "}
          <span className="font-semibold">{featuredProductCount}</span> products
          on this plan. */}
        </AlertDescription>
      </Alert>
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
        
      </div>
    </Container>
  )
}

export default StoresPage