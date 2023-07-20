import Link from "next/link"
import { type User } from "@clerk/nextjs/dist/types/server"

import { siteConfig, dashboardConfig } from "@/config"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartSheet, MainNav, MobileNav, SearchCombobox } from "@/components/layout"


interface SiteHeaderProps {
  user: User | null
}

const Header = ({ user }: SiteHeaderProps) => {
  const initials = `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`
  const email = user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? ""
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-2">
            <SearchCombobox />
            <CartSheet />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative w-8 h-8 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.username ?? ""}
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">
                <div
                  className={buttonVariants({
                    size: "sm"
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