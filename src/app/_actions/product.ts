"use server"

import { db } from "@/db"
import { Product, products } from "@/db/schema"
import { and, asc, desc, gte, inArray, lte, sql } from "drizzle-orm"
import * as z from "zod"

import { getProductSchema, getProductsSchema } from "@/lib/validations/product"

export const geFeaturedProducts = async (): Promise<Product[]> => {
  const featuredProducts = await db
    .select()
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))
  return featuredProducts
}

export const getProducts = async (input: z.infer<typeof getProductsSchema>) => {
  const [column, order] =
    (input.sort?.split(".") as [
      keyof Product | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []
  const [minPrice, maxPrice] = input.price_range?.split("-") ?? []
  const categories =
    (input.categories?.split(".") as Product["category"][]) ?? []
  const subCategories = input.subCategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(input.limit)
      .offset(input.offset)
    // .where(
    //   and(
    //     categories.length ? inArray(products.category, categories) : undefined,
    //     subCategories.length ? inArray(products.subCategory, subCategories) : undefined,
    //     minPrice ? gte(products.price, minPrice) : undefined,
    //     minPrice ? lte(products.price, maxPrice) : undefined,
    //     storeIds ? inArray(products.storeId, storeIds) : undefined
    //   )
    // )
    // .orderBy(
    //   column && column in products
    //     ? order === "asc"
    //       ? asc(products[column])
    //       : desc(products[column])
    //     : desc(products.createdAt)
    // )

    const total = await tx
      .select({
        count: sql<number>`count(${products.id})`,
      })
      .from(products)
    // .where(
    //   and(
    //     categories.length ? inArray(products.category, categories) : undefined,
    //     subCategories.length ? inArray(products.subCategory, subCategories) : undefined,
    //     minPrice ? gte(products.price, minPrice) : undefined,
    //     maxPrice ? lte(products.price, maxPrice) : undefined,
    //     storeIds.length ? inArray(products.storeId, storeIds) : undefined
    //   )
    // )

    return {
      items,
      total: Number(total[0]?.count) ?? 0,
    }
  })

  return {
    items,
    total,
  }
}
