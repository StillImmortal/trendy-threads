"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { geFeaturedProducts } from "@/app/_actions/product"

import { ProductCard } from "../product"
import { buttonVariants } from "../ui/button"

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
        {featuredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex-center">
        <Link href="/products" className="mx-auto">
          <div className={cn(buttonVariants())}>
            View All
            <span className="sr-only">View all products</span>
          </div>
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
