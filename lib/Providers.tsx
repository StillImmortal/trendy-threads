"use client"

import { FC, PropsWithChildren, useState } from 'react'
import { Provider } from 'react-redux'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from 'next-themes/dist/types'

import { store } from '../redux/store'

const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )
  return (
    <ThemeProvider {...props}>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default Providers