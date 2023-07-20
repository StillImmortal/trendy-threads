"use client"

import React, { useTransition } from 'react'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { getProducts } from '@/app/_actions/product'
import { Product, Store } from '@/db/schema'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product'
import PaginationBar from './PaginationBar'

interface ProductsProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Products = ({
}: ProductsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  // const {
  //   _page,
  //   _limit,
  //   _sort,
  //   _categories,
  //   _sub_categories,
  //   _price_range,
  //   _store_ids
  // } = searchParams

  const searchParams = useSearchParams()

  const page = searchParams?.get("page") ?? "1"
  const per_page = searchParams?.get("per_page") ?? "8"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const store_ids = searchParams?.get("store_ids")
  const store_page = searchParams?.get("store_page") ?? "1"

  const limit = parseInt(per_page)
  const offset = (parseInt(page) - 1) * limit

  const { data } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => await getProducts({
      limit,
      offset,
    })
  })

  const pageCount = Math.ceil(Number(data?.total) / limit)

  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex items-center space-x-2'>
        {/* Filters */}
      </div>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {data?.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {data?.items.length ? (
        <PaginationBar 
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={() => ""}
          router={router}
          pathname={pathname}
          isPending={isPending}
          startTransition={startTransition}
        />
      ) : null}
    </div>
  )
}

export default Products