"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { productCategories } from "@/config"

import { cn } from "@/lib/utils"
import { badgeVariants } from "@/components/ui/badge"

const RandomSubcategories = () => {
  const [randomSubcategories, setRandomSubcategories] = useState<
    | {
        title: string
        description?: string
        image?: string
        slug: string
      }[]
    | undefined
  >([])

  useEffect(() => {
    const randomProductCategory =
      productCategories[Math.floor(Math.random() * productCategories.length)]
    setRandomSubcategories(randomProductCategory?.subcategories)
  }, [])

  return (
    <section
      id="random-subcategories"
      aria-label="random-subcategories-heading"
      className="flex flex-wrap items-center justify-center gap-4 pb-4"
      suppressHydrationWarning
    >
      {randomSubcategories?.map((subcategory) => (
        <Link
          key={subcategory.slug}
          href={`/categories/${String(productCategories[0]?.title)}/${
            subcategory.slug
          }`}
          className={cn(
            badgeVariants({
              variant: "secondary",
              className: "rounded px-3 py-1",
            })
          )}
        >
          {subcategory.title}
          <span className="sr-only">{subcategory.title}</span>
        </Link>
      ))}
    </section>
  )
}

export default RandomSubcategories
