import "./globals.css"

import { ReactNode } from "react"
import { siteConfig } from "@/config"
import { env } from "@/env.mjs"
import { ClerkProvider } from "@clerk/nextjs"

import Providers from "@/lib/Providers"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/custom/Toaster"

export const metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    "Clothing Shop",
  ],
  authors: [
    {
      name: "StillImmortal",
      url: "https://github.com/StillImmortal",
    },
  ],
  creator: "StillImmortal",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
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
          <Providers attribute="class" defaultTheme="system" enableSystem>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
