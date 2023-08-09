import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env.mjs"
import { currentUser } from "@clerk/nextjs"

import { Container } from "@/components/custom"
import { SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Purchases",
  description: "Manage your purchases",
}

export default async function PurchasesPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/signin")
  }

  return (
    <Container variant="sidebar">
      <SectionHeader
        title="Purchases"
        description="Manage your purchases."
        size="sm"
      />
      <div>Purchases Table</div>
    </Container>
  )
}
