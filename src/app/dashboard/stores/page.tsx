import { type Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { Container } from "@/components/custom"
import { UserStores } from "@/components/dashboard/store"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Stores",
  description: "Manage your stores",
}

const StoresPage = async () => {
  const user = await currentUser()

  if (!user) redirect("/sign-in")

  return <UserStores userId={user.id} />
}

export default StoresPage
