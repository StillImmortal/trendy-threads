"use client"

import { FC, useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from 'next-themes/dist/types'

const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )
  return (
    <ThemeProvider {...props}>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers