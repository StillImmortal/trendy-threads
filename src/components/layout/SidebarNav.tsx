"use client"

import Link from 'next/link'
import { usePathname } from "next/navigation"
import { type SidebarNavItem } from '@/types'

import { cn } from '@/lib/utils'
import { Icons } from '@/constants/icons'

export interface SidebarNavProps {
  items: SidebarNavItem[]
}

const SidebarNav = ({ items }: SidebarNavProps) => {
  const pathname = usePathname()

  if (!items?.length) return null

  return (
    <div className='flex flex-col w-full gap-2'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon ?? "chevronLeft"]

        return (
          item.href ? (
            <Link
              key={index}
              href={item.href}
              target={item.external ? "_blank" : ""}
              rel={item.external ? "noreferrer" : ""}
            >
              <span
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground",
                  pathname === item.href ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                  item.disabled && "pointer-events-none opacity-60"
                )}
              >
                <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>{item.title}</span>
              </span>
            </Link>
          ) : (
            <span
              key={index}
              className='flex items-center w-full p-2 rounded-md cursor-not-allowed text-muted-foreground hover:underline'
            >
              {item.title}
            </span>
          )
        )
      })}

    </div>
  )
}

export default SidebarNav