"use server"

import { storeSubscriptionPlans } from "@/config"
import { db } from "@/db"
import { payments, stores } from "@/db/schema"
import { type SubscriptionPlan } from "@/types"
import { clerkClient } from "@clerk/nextjs"
import dayjs from "dayjs"
import { eq } from "drizzle-orm"
import { type z } from "zod"

import { stripe } from "@/lib/stripe"
import { absoluteUrl } from "@/lib/utils"
import { userPrivateMetadataSchema } from "@/lib/validations/auth"
import type {
  createAccountLinkSchema,
  manageSubscriptionSchema,
} from "@/lib/validations/stripe"

export async function getUserSubscriptionPlan(userId: string) {
  const user = await clerkClient.users.getUser(userId)

  if (!user) {
    throw new Error("User not found.")
  }

  const userPrivateMetadata = userPrivateMetadataSchema.parse(
    user.privateMetadata
  )

  // Check if user is subscribed
  const isSubscribed =
    !!userPrivateMetadata.stripePriceId &&
    dayjs(userPrivateMetadata.stripeCurrentPeriodEnd).valueOf() + 86_400_000 >
      Date.now()

  const plan = isSubscribed
    ? storeSubscriptionPlans.find(
        (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId
      )
    : storeSubscriptionPlans[0]

  // Check if user has canceled subscription
  let isCanceled = false
  if (isSubscribed && userPrivateMetadata.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      userPrivateMetadata.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    ...plan,
    stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
    stripeCurrentPeriodEnd: userPrivateMetadata.stripeCurrentPeriodEnd,
    stripeCustomerId: userPrivateMetadata.stripeCustomerId,
    isSubscribed,
    isCanceled,
  }
}

export const getFeaturedStoreAndProductCounts = (
  planId?: SubscriptionPlan["id"]
) => {
  const plan = storeSubscriptionPlans.find((plan) => plan.id === planId)
  const features = plan?.features

  const featuredStoreCount =
    features?.find((feature) => feature.match(/store/i))?.match(/\d+/) ?? 0

  const featuredProductCount =
    features?.find((feature) => feature.match(/product/i))?.match(/\d+/) ?? 0

  return {
    featuredStoreCount,
    featuredProductCount,
  }
}

export async function manageSubscription(
  input: z.infer<typeof manageSubscriptionSchema>
) {
  const billingUrl = absoluteUrl("/dashboard/billing")

  const user = await clerkClient.users.getUser(input.userId)

  if (!user) {
    throw new Error("User not found.")
  }

  // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
  if (input.isSubscribed && input.stripeCustomerId && input.isCurrentPlan) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,
      return_url: billingUrl,
    })

    return {
      url: stripeSession.url,
    }
  }

  // If the user is not subscribed to a plan, we create a Stripe Checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: input.email,
    line_items: [
      {
        price: input.stripePriceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: input.userId,
    },
  })

  return {
    url: stripeSession.url,
  }
}

export async function checkStripeConnection(
  input: z.infer<typeof createAccountLinkSchema>
) {
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, input.storeId),
  })

  if (!store) return false

  const payment = await db.query.payments.findFirst({
    where: eq(payments.storeId, input.storeId),
  })

  if (!payment) return false

  if (!payment.stripeAccountId) return false

  const account = await stripe.accounts.retrieve(payment.stripeAccountId)

  if (!account) return false

  return account.details_submitted && payment.detailsSubmitted ? true : false
}

// For connecting a Stripe account to a store
export async function createAccountLink(
  input: z.infer<typeof createAccountLinkSchema>
) {
  //  Check if the store is already connected to Stripe
  const store = await db.query.stores.findFirst({
    where: eq(stores.id, input.storeId),
  })

  if (!store) {
    throw new Error("Store not found.")
  }

  // TODO: Check if stripeAccountId is available on the store

  const payment = await db.query.payments.findFirst({
    where: eq(payments.storeId, input.storeId),
  })

  if (payment?.detailsSubmitted) {
    throw new Error("Store already connected to Stripe.")
  }

  let stripeAccountId = ""
  if (payment?.stripeAccountId) {
    stripeAccountId = payment.stripeAccountId
  } else {
    const account = await stripe.accounts.create({
      type: "standard",
    })

    if (!account) {
      throw new Error("Error creating Stripe account.")
    }

    stripeAccountId = account.id

    await db.update(payments).set({
      storeId: input.storeId,
      stripeAccountId,
    })
  }

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: absoluteUrl("/dashboard/stripe"),
    return_url: absoluteUrl("/dashboard/stripe"),
    type: "account_onboarding",
  })

  if (!accountLink || !accountLink.url) {
    throw new Error("Error creating Stripe account link, please try again.")
  }

  return {
    url: accountLink.url,
  }
}
