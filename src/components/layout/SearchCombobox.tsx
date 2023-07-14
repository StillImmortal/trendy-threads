"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { type Product } from "@/db/schema"

import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks'
import { Button } from '../ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from '@/constants/icons'

const SearchCombobox = () => {

  return (
    <>
      <Button
        variant="outline"
        className='relative p-0 h-9 w-9 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2'
      >
        <Icons.search className="w-4 h-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
        <kbd className='pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex'>
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>
    </>
  )
}

export default SearchCombobox