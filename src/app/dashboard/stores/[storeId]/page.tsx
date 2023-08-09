import React from "react"
import { Metadata } from "next"
import { revalidatePath } from "next/cache"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { products, stores } from "@/db/schema"
import { env } from "@/env.mjs"
import { and, eq, not } from "drizzle-orm"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { ConnectStoreToStripeButton } from "@/components/dashboard/store"
import { checkStripeConnection } from "@/app/_actions/subscription"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Manage Store",
  description: "Manage your store",
}

interface UpdateStorePageProps {
  params: {
    storeId: string
  }
}

const UpdateStorePage = async ({ params }: UpdateStorePageProps) => {
  const storeId = Number(params.storeId)

  const updateStore = async (data: FormData) => {
    "use server"

    const name = data.get("name") as string
    const description = data.get("description") as string

    const storeWithSameName = await db.query.stores.findFirst({
      where: and(eq(stores.name, name), not(eq(stores.id, storeId))),
      columns: {
        id: true,
      },
    })

    if (storeWithSameName) throw new Error("Store name already taken")

    await db
      .update(stores)
      .set({ name, description })
      .where(eq(stores.id, storeId))

    revalidatePath(`/dashboard/stores/${storeId}`)
  }

  const deleteStore = async () => {
    "use server"

    const storeToDelete = await db.query.stores.findFirst({
      where: eq(stores.id, storeId),
      columns: {
        id: true,
      },
    })

    if (!storeToDelete) {
      throw new Error("Store not found")
    }

    await db.delete(stores).where(eq(stores.id, storeId))

    // Delete all products of this store
    await db.delete(products).where(eq(products.storeId, storeId))

    const path = "/dashboard/stores"
    revalidatePath(path)
    redirect(path)
  }

  const currentStore = await db.query.stores.findFirst({
    where: eq(stores.id, storeId),
    columns: {
      id: true,
      name: true,
      description: true,
    },
  })

  if (!currentStore) {
    notFound()
  }

  const isConnectedToStripe = await checkStripeConnection({ storeId })

  return (
    <div className="space-y-6">
      <Card
        as="section"
        id="connect-store-to-stripe"
        aria-labelledby="connect-store-to-stripe-heading"
        className="green-gradient"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="green-title line-clamp-1 text-2xl">
            Connect to Stripe
          </CardTitle>
          <CardDescription>
            Connect your store to Stripe to start accepting payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isConnectedToStripe ? (
            <Link href="https://dashboard.stripe.com/">
              <div className={cn(buttonVariants())}>Manage Stripe account</div>
            </Link>
          ) : (
            <ConnectStoreToStripeButton storeId={storeId} />
          )}
        </CardContent>
      </Card>
      <Card
        as="section"
        id="update-store"
        aria-labelledby="update-store-heading"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your store</CardTitle>
          <CardDescription>
            Update your store name and description, or delete it.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateStore} className="grid w-full max-w-xl gap-5">
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-name">Name</Label>
              <Input
                id="update-store-name"
                aria-describedby="update-store-name-description"
                name="name"
                required
                minLength={3}
                maxLength={50}
                placeholder="Type store name here."
                defaultValue={currentStore.name}
              />
            </fieldset>
            <fieldset className="grid gap-2.5">
              <Label htmlFor="update-store-description">Description</Label>
              <Textarea
                id="update-store-description"
                aria-describedby="update-store-description-description"
                name="description"
                minLength={3}
                maxLength={255}
                placeholder="Type store description here."
                defaultValue={currentStore.description ?? ""}
              />
            </fieldset>
            <div className="flex gap-2">
              <LoadingButton>
                Update Store
                <span className="sr-only">Update store</span>
              </LoadingButton>
              <LoadingButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                formAction={deleteStore}
                variant="destructive"
              >
                Delete Store
                <span className="sr-only">Delete store</span>
              </LoadingButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default UpdateStorePage
