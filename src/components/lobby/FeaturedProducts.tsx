"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from "@/components/product"
import { Icons } from "@/constants/icons"
import { geFeaturedProducts } from "@/app/_actions/product"

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => await geFeaturedProducts(),
  })

  return (
    <section
      id="featured-products"
      aria-label="featured-products-heading"
      className="space-y-6"
    >
      <h2 className="text-2xl font-medium sm:text-3xl">Featured products</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="rounded-sm">
                <CardHeader className="border-b p-0">
                  <AspectRatio ratio={4 / 3}>
                    <div className="flex h-full items-center justify-center bg-secondary">
                      <Icons.imagePlaceholder
                        className="h-9 w-9 text-muted-foreground"
                        aria-hidden="true"
                      />
                    </div>
                  </AspectRatio>
                </CardHeader>
                <CardContent className="grid gap-2.5 p-4">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
                <CardFooter className="p-4">
                  <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
                    <Skeleton className="h-8 w-full rounded-sm" />
                    <Skeleton className="h-8 w-full rounded-sm" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </>
        ) : (
          featuredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <div className="flex-center">
        <Link href="/products" className="mx-auto">
          <div
            className={cn(
              buttonVariants({
                variant: "default",
                size: "lg",
              })
            )}
          >
            View All
            <span className="sr-only">View all products</span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
