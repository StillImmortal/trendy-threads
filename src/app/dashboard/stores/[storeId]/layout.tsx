import { ReactNode } from "react"
import { notFound, redirect } from "next/navigation"
import { db } from "@/db"
import { stores } from "@/db/schema"
import { currentUser } from "@clerk/nextjs"
import { eq } from "drizzle-orm"

import { Container } from "@/components/custom"
import { StorePager, StoreTabs } from "@/components/dashboard/store"
import { SectionHeader } from "@/components/layout"

interface StoreLayoutProps {
  children: ReactNode
  params: {
    storeId: string
  }
}

const StoreLayout = async ({ children, params }: StoreLayoutProps) => {
  const storeId = Number(params.storeId)

  const user = await currentUser()

  if (!user) redirect("/sign-in")

  const userStores = await db
    .select({
      id: stores.id,
      name: stores.name,
    })
    .from(stores)
    .where(eq(stores.userId, user.id))

  const currentStore = userStores.find((store) => store.id === storeId)

  if (!currentStore) return notFound()

  return (
    <Container variant="sidebar" className="gap-4">
      <div className="flex items-center justify-between gap-6">
        <SectionHeader title={currentStore.name} size="sm" className="w-full" />
        {userStores.length > 1 ? (
          <StorePager storeId={storeId} userId={user.id} />
        ) : null}
      </div>
      <div className="space-y-4 overflow-hidden">
        <StoreTabs storeId={storeId} />
        {children}
      </div>
    </Container>
  )
}

export default StoreLayout
