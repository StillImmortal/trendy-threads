"use client"

import React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"

import { cn, formatDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container, PageHeader } from "@/components/custom"
import { Icons } from "@/constants/icons"
import { getStoresWithProductCount, getUserStores } from "@/app/_actions/store"
import {
  getFeaturedStoreAndProductCounts,
  getUserSubscriptionPlan,
} from "@/app/_actions/subscription"
import StoresLoading from "@/app/dashboard/stores/loading"

interface UserStoresProps {
  userId: string
}

const UserStores = ({ userId }: UserStoresProps) => {
  const { data: userStores, isLoading: isUserStoresLoading } = useQuery({
    queryKey: ["userStores"],
    queryFn: async () => await getUserStores(userId),
  })

  const { data: subscriptionPlan, isLoading: isSubscriptionLoading } = useQuery(
    {
      queryKey: ["userSubscriptionPlan"],
      queryFn: async () => await getUserSubscriptionPlan(userId),
    }
  )

  const {
    data: storesWithProductCount,
    isLoading: isStoresWithProductCountLoading,
  } = useQuery({
    queryKey: ["storesWithProductCount"],
    queryFn: async () => await getStoresWithProductCount(userId),
  })

  const isSubscriptionPlanActive = dayjs(
    subscriptionPlan?.stripeCurrentPeriodEnd
  ).isAfter(dayjs())

  const { featuredStoreCount, featuredProductCount } =
    getFeaturedStoreAndProductCounts(subscriptionPlan?.id)

  if (
    isUserStoresLoading ||
    isSubscriptionLoading ||
    isStoresWithProductCountLoading
  )
    return <StoresLoading />

  return (
    <Container variant="sidebar">
      <PageHeader title="Stores" description="Manage your stores." size="sm" />
      <Alert>
        <Icons.terminal className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You are currently on the{" "}
          <span className="font-semibold">{subscriptionPlan?.name}</span> plan.{" "}
          {!subscriptionPlan?.isSubscribed
            ? "Upgrade to create more stores and products."
            : subscriptionPlan.isCanceled
            ? "Your plan will be canceled on "
            : "Your plan renews on "}
          {subscriptionPlan?.stripeCurrentPeriodEnd
            ? `${formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.`
            : null}{" "}
          You can create up to{" "}
          <span className="font-semibold">{featuredStoreCount}</span> stores and{" "}
          <span className="font-semibold">{featuredProductCount}</span> products
          on this plan.
        </AlertDescription>
      </Alert>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {userStores?.map((store) => (
          <Card key={store.id} className="flex h-full flex-col">
            <CardHeader className="flex-1">
              <CardTitle className="line-clamp-1">{store.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {store.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link key={store.id} href={`/dashboard/stores/${store.id}`}>
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "h-8 w-full",
                    })
                  )}
                >
                  View store
                  <span className="sr-only">View {store.name} store</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
        {Number(userStores?.length) < 3 && (
          <Card className="border-from green-gradient flex h-full flex-col">
            <CardHeader className="flex-1">
              <CardTitle className="green-title line-clamp-1">
                Create a new store
              </CardTitle>
              <CardDescription className="line-clamp-2">
                Create a new store to start selling your products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={
                  subscriptionPlan?.id === "basic" &&
                  Number(storesWithProductCount?.length) >= 1
                    ? "/dashboard/billing"
                    : subscriptionPlan?.id === "standard" &&
                      isSubscriptionPlanActive &&
                      Number(storesWithProductCount?.length) >= 2
                    ? "/dashboard/billing"
                    : subscriptionPlan?.id === "pro" &&
                      isSubscriptionPlanActive &&
                      Number(storesWithProductCount?.length) >= 3
                    ? "/dashboard/billing"
                    : "/dashboard/stores/new"
                }
              >
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "h-8 w-full",
                    })
                  )}
                >
                  Create a store
                  <span className="sr-only">Create a new store</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  )
}

export default UserStores
