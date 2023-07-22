"use client"

import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getFeaturedStores } from "@/app/_actions/store"

import { buttonVariants } from "../ui/button"

const FeaturedStores = () => {
  const { data: featuredStores } = useQuery({
    queryKey: ["featuredStores"],
    queryFn: async () => await getFeaturedStores(),
  })

  return (
    <section
      id="featured-stores"
      aria-label="featured-stores-heading"
      className="space-y-6"
    >
      <h2 className="text-2xl font-medium sm:text-3xl">Featured stores</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredStores?.map((store) => (
          <Card key={store.id} className="flex h-full flex-col">
            <CardHeader className="flex-1">
              <CardTitle className="line-clamp-1">{store.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {store.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/products?store_id=${store.id}`}>
                <div
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      className: "h-8 w-full",
                    })
                  )}
                >
                  View products ({store.productCount})
                  <span className="sr-only">{`${store.name} store products`}</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedStores
