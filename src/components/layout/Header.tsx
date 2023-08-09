import Link from "next/link"
import { dashboardConfig, siteConfig } from "@/config"
import { type User } from "@clerk/nextjs/dist/types/server"

import { buttonVariants } from "@/components/ui/button"
import {
  AvatarButton,
  CartSheet,
  MainNav,
  MobileNav,
  SearchCombobox,
} from "@/components/layout"

interface SiteHeaderProps {
  user: User | null
}

const Header = ({ user }: SiteHeaderProps) => {
  const initials = `${user?.firstName?.charAt(0) ?? ""}${
    user?.lastName?.charAt(0) ?? ""
  }`

  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? ""

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <SearchCombobox />
            <CartSheet />
            {user ? (
              <AvatarButton
                user={{
                  imageUrl: user.imageUrl,
                  username: user.username,
                  firstName: user.firstName,
                  lastName: user.lastName,
                }}
                initials={initials}
                email={email}
              />
            ) : (
              <Link href="/sign-in">
                <div
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Sign in
                  <span className="sr-only">Sign In</span>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
