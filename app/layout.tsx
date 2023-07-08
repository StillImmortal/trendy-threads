import './globals.css'
import Providers from '@/lib/Providers'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Trendy Threads',
  description: 'Marketplace with clothing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
  
        </head>
        <body className={""}>
          <Providers attribute='class' defaultTheme='dark' enableSystem>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
