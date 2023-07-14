"use client"

import React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config'
import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types'
import { Icons } from '@/constants/icons'
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

interface MainNavProps {
  items?: MainNavItem[] 
}

const MainNav = ({ items }: MainNavProps) => {
  return (
    <div className='hidden gap-6 lg:flex'>
      <Link
        aria-label="Home"
        href="/"
        className='items-center hidden space-x-2 lg:flex'
      >
        <Icons.logo className='w-6 h-6' aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className='h-auto'>
                {items[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className='w-8 h-8' aria-hidden="true" />
                        <div className="mt-4 mb-2 text-lg font-medium">
                          {siteConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {siteConfig.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {items[0].items.map((item) => (
                    <ListItem 
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null }
          {items
            ?.filter((item) => item.title !== items[0]?.title)
            .map((item) => item?.items ? (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className='h-auto capitalize'>
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                    {item.items.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              item.href && (
                <NavigationMenuItem key={item.title}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), "h-auto")}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              )
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default MainNav