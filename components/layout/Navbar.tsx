import  { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ListItem } from '../custom'
import { lobby, clothing, shoes, accessories } from '@/constants'
import logoDark from "@/public/images/logo-small-dark.svg"


interface NavbarSectionProps {
  title: string
  data: {
    title: string
    description: string
  }[]
}

const NavbarSection: FC<NavbarSectionProps> = ({
  title,
  data
}) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='text-base font-medium'>
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
          {data.map((item, index) => (
            <ListItem 
              key={`${title}-item-${index}`}
              title={item.title}
              href='/'
            >
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

const Navbar = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-base font-medium'>Lobby</NavigationMenuTrigger>
          <NavigationMenuContent>
          <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className='row-span-3'>
              <NavigationMenuLink asChild>
                <Link
                  className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                  href="/"
                >
                  <Image 
                    className="object-contain"
                    src={logoDark}
                    alt='logo'
                    height={28}
                  />
                  <div className="mt-4 mb-2 text-lg font-medium">
                    Trendy Threads
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    An open source e-commerce skateshop build with everything new in Next.js 13.
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
            {lobby.map((item: {title: string; description: string}, index) => (
              <ListItem 
                key={`Lobby-item-${index}`}
                title={item.title}
                href='/'
              >
                {item.description}
              </ListItem>
            ))}
          </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavbarSection title='Clothing' data={clothing} />
        <NavbarSection title='Shoes' data={shoes} />
        <NavbarSection title='Accessories' data={accessories} />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default Navbar