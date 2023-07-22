import "./globals.css"

import { ReactNode } from "react"
import { ClerkProvider } from "@clerk/nextjs"

import Providers from "@/lib/Providers"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/custom/Toaster"

export const metadata = {
  title: "Trendy Threads",
  description: "Marketplace with clothing",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head></head>
        <body className={cn("min-h-screen bg-background antialiased")}>
          <Toaster />
          <Providers attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
