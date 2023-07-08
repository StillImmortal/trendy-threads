"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import logoDark from "@/public/images/logo-dark.svg"
import logoLight from "@/public/images/logo-light.svg"
import Navbar from './Navbar'

const Header = () => {
  const { theme } = useTheme()
  console.log(theme)
  return (
    <div className='w-screen h-16'>
      <div className='flex items-center h-full gap-4 mx-auto max-width padding-x'>
        <Link
          className='translate-y-0.5'
          href={"/"}
        >
          <Image 
            src={theme === "light" ? logoLight : logoDark}
            alt='logo'
            height={32}
          />
        </Link>
        <Navbar />
      </div>
    </div>
  )
}

export default Header