"use client"

import React, { useEffect, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getSubcategories } from "@/config"
import { Product, Store } from "@/db/schema"
import { useCreateQueryString, useDebounce } from "@/hooks"
import { Option } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { sortOptions } from "@/config/products"
import { cn, toTitleCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { MultiSelect, PaginationBar } from "@/components/lobby/products"
import { ProductCard } from "@/components/product"
import { Icons } from "@/constants/icons"
import { getProducts } from "@/app/_actions/product"

interface ProductsProps {
  products: Product[]
  pageCount: number
  category?: Product["category"]
  categories?: Product["category"][]
  stores?: Pick<Store, "id" | "name">[]
  storePageCount?: number
}

const Products = ({
  products,
  pageCount,
  category,
  categories,
  stores,
  storePageCount,
}: ProductsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const per_page = searchParams?.get("per_page") ?? "8"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const store_ids = searchParams?.get("store_ids")
  const store_page = searchParams?.get("store_page") ?? "1"

  // Create query string
  const createQueryString = useCreateQueryString(searchParams)

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 500])
  const debouncedPrice = useDebounce(priceRange, 500)

  const limit = parseInt(per_page)
  const offset = (parseInt(page) - 1) * limit

  const { data } = useQuery({
    queryKey: ["products", page],
    queryFn: async () =>
      await getProducts({
        limit,
        offset,
      }),
  })

  useEffect(() => {
    const [min, max] = debouncedPrice
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice])

  // Category filter
  const [selectedCategories, setSelectedCategories] = useState<Option[] | null>(
    null
  )

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories: selectedCategories?.length
            ? // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories])

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Option[] | null
  >(null)
  const subcategories = getSubcategories(category)

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories: selectedSubcategories?.length
            ? selectedSubcategories.map((s) => s.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubcategories])

  // Store filter
  const [storeIds, setStoreIds] = useState<number[] | null>(
    store_ids?.split(".").map(Number) ?? null
  )

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          store_ids: storeIds?.length ? storeIds.join(".") : null,
        })}`,
        {
          scroll: false,
        }
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeIds])

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range ($)
                </h3>
                <Slider
                  variant="range"
                  thickness="thin"
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  value={priceRange}
                  onValueChange={(value: typeof priceRange) => {
                    setPriceRange(value)
                  }}
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRange[1]}
                    className="h-9"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([value, priceRange[1]])
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRange[0]}
                    max={500}
                    className="h-9"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      setPriceRange([priceRange[0], value])
                    }}
                  />
                </div>
              </div>
              {categories?.length ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: toTitleCase(c),
                      value: c,
                    }))}
                  />
                </div>
              ) : null}
              {category ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </div>
              ) : null}
              {stores?.length ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <h3 className="flex-1 text-sm font-medium tracking-wide text-foreground">
                      Stores
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) - 1,
                              })}`
                            )
                          })
                        }}
                        disabled={Number(store_page) === 1 || isPending}
                      >
                        <Icons.chevronLeft
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous store page</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) + 1,
                              })}`
                            )
                          })
                        }}
                        disabled={
                          Number(store_page) === storePageCount || isPending
                        }
                      >
                        <Icons.chevronRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next store page</span>
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {stores.map((store) => (
                        <div
                          key={store.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`store-${store.id}`}
                            checked={storeIds?.includes(store.id) ?? false}
                            onCheckedChange={(value) => {
                              if (value) {
                                setStoreIds([...(storeIds ?? []), store.id])
                              } else {
                                setStoreIds(
                                  storeIds?.filter((id) => id !== store.id) ??
                                    null
                                )
                              }
                            }}
                          />
                          <Label
                            htmlFor={`store-${store.id}`}
                            className="line-clamp-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {store.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : null}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                        })}`
                      )

                      setPriceRange([0, 100])
                      setSelectedCategories(null)
                      setSelectedSubcategories(null)
                      setStoreIds(null)
                    })
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "font-bold")}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                      {
                        scroll: false,
                      }
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!isPending && !products.length ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length ? (
        <PaginationBar
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={createQueryString}
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
