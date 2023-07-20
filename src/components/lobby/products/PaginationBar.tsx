import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { DetailedHTMLProps, HTMLAttributes, TransitionStartFunction, startTransition, useMemo } from 'react'

import { cn } from '@/lib/utils'
import { Button, ButtonProps } from '@/components/ui/button'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons"

interface PaginationBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  pageCount: number
  page: string
  per_page?: string
  sort: string
  createQueryString: (params: Record<string, string | number | null>) => string
  router: AppRouterInstance
  pathname: string
  isPending: boolean
  startTransition: TransitionStartFunction
  siblingCount?: number
}

const PaginationBar = ({
  pageCount,
  page,
  per_page,
  sort,
  createQueryString,
  router,
  pathname,
  isPending,
  startTransition,
  siblingCount = 1,
  className,
  ...props
}: PaginationBarProps) => {
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 1

    const range = []

    for (let i = Math.max(2, Number(page) - delta); i <= Math.min(pageCount - 1, Number(page) + delta); i++) {
      range.push(i)
    }

    if (Number(page) - delta > 2) {
      range.unshift("...")
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push("...")
    }

    range.unshift(1)
    if (pageCount !== 1) range.push(pageCount)

    return range
  }, [pageCount, page, siblingCount])

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      <Button
        aria-label='Go to first page'
        variant="outline"
        size="icon"
        className='hidden w-8 h-8 lg:flex'
        onClick={() => {
          startTransition(async () => {
            router.push(
              `${pathname}/?${createQueryString({
                page: 1,
                per_page: per_page ?? null,
                sort,
              })}`
            )
          })
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <DoubleArrowLeftIcon className="w-4 h-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label='Go to previous page'
        variant="outline"
        size="icon"
        className='w-8 h-8'
        onClick={() => {
          startTransition(async () => {
            router.push(
              `${pathname}/?${createQueryString({
                page: Number(page) - 1,
                per_page: per_page ?? null,
                sort,
              })}`
            )
          })
        }}
        disabled={Number(page) === 1 || isPending}
      >
        <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
      </Button>
      {paginationRange.map((pageNumber, i) => pageNumber === "..." ? (
        <Button
          aria-label="Page separator"
          key={i}
          variant="outline"
          size="icon"
          className="w-8 h-8"
          disabled
        >
          ...
        </Button>
      ) : (
        <Button
          aria-label={`Page ${pageNumber}`}
          key={i}
          variant={Number(page) === pageNumber ? "default" : "outline"}
          size="icon"
          className="w-8 h-8"
          onClick={() => {
            startTransition(() => {
              router.push(
                `${pathname}?${createQueryString({
                  page: pageNumber,
                  per_page: per_page ?? null,
                  sort,
                })}`
              )
            })
          }}
          disabled={isPending}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        aria-label='Go to next page'
        variant="outline"
        size="icon"
        className='w-8 h-8'
        onClick={() => {
          startTransition(async () => {
            router.push(
              `${pathname}/?${createQueryString({
                page: Number(page) + 1,
                per_page: per_page ?? null,
                sort,
              })}`
            )
          })
        }}
        disabled={Number(page) === pageCount || isPending}
      >
        <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
      </Button>
      <Button
        aria-label='Go to last page'
        variant="outline"
        size="icon"
        className='hidden w-8 h-8 lg:flex'
        onClick={() => {
          startTransition(async () => {
            router.push(
              `${pathname}/?${createQueryString({
                page: pageCount,
                per_page: per_page ?? null,
                sort,
              })}`
            )
          })
        }}
        disabled={Number(page) === pageCount || isPending}
      >
        <DoubleArrowRightIcon className="w-4 h-4" aria-hidden="true" />
      </Button>
    </div>
  )
}

export default PaginationBar