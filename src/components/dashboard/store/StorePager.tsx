"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/constants/icons"
import { ChevronsUpDown } from "lucide-react"

import { useGetUSerStores } from "@/hooks/useQuery"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface StorePagerProps {
  storeId: number
  userId: string
}

const StorePager = ({ storeId, userId }: StorePagerProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const { data: userStores, isFetching } = useGetUSerStores(userId, {
    refetchOnWindowFocus: false,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[200px] justify-between"
          disabled={isFetching || isPending}
        >
          {isFetching ? (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            userStores && userStores.find((store) => store.id === storeId)?.name
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {userStores
              ?.filter((store) => store.id !== storeId)
              .map((store) => (
                <CommandItem
                  value={store.name}
                  key={store.id}
                  onSelect={() => {
                    startTransition(() => {
                      setOpen(false)
                      router.push(`/dashboard/stores/${store.id}`)
                    })
                  }}
                  className="cursor-pointer px-3"
                >
                  {store.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StorePager
