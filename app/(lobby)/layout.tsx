import React from 'react'
import { Footer, Header } from '@/components/layout'

const LobbyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default LobbyLayout