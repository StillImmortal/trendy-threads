import { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddProductForm } from "@/components/dashboard/store/product"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Product",
  description: "Add a new product",
}

interface NewProductPageProps {
  params: {
    storeId: string
  }
}

const NewProductPage = async ({ params }: NewProductPageProps) => {
  const storeId = Number(params.storeId)

  const user = await currentUser()

  if (!user) redirect("/sign-in")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add product</CardTitle>
        <CardDescription>Add a new product to your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm storeId={storeId} />
      </CardContent>
    </Card>
  )
}

export default NewProductPage
