import type { Metadata } from "next"
import { env } from "@/env.mjs"

import { Container } from "@/components/custom"
import UserProfile from "@/components/dashboard/account/UserProfile"
import { SectionHeader } from "@/components/layout"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Account",
  description: "Manage your account settings",
}

export default function AccountPage() {
  return (
    <Container variant="sidebar">
      <SectionHeader
        title="Account"
        description="Manage your account settings."
        size="sm"
      />

      <div className="w-full overflow-hidden">
        <UserProfile />
      </div>
    </Container>
  )
}
