import { ReactNode } from 'react'
import { Footer, Header } from '@/components/layout'
import { currentUser } from '@clerk/nextjs'

interface LobbyLayoutProps {
  children: ReactNode
}

const LobbyLayout = async ({ children }: LobbyLayoutProps) => {
  const user = await currentUser()

  return (
    <div>
      <Header user={user} />
      <main className='flex-1'>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default LobbyLayout