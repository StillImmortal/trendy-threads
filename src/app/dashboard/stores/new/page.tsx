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
import { Container } from "@/components/custom"
import { CreateNewStoreForm } from "@/components/dashboard/store"
import { SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "New Store",
  description: "Add a new store",
}

const CreateNewStorePage = async () => {
  const user = await currentUser()

  if (!user) redirect("/sign-in")

  return (
    <Container variant="sidebar">
      <SectionHeader
        title="New Store"
        description="New store for your account."
        size="sm"
      />
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add store</CardTitle>
          <CardDescription>Add a new store to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewStoreForm userId={user.id} />
        </CardContent>
      </Card>
    </Container>
  )
}

export default CreateNewStorePage
