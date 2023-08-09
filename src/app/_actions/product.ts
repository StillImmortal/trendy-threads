"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { Product, products } from "@/db/schema"
import { StoredFile } from "@/types"
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  not,
  sql,
} from "drizzle-orm"
import * as z from "zod"

import {
  getProductSchema,
  getProductsSchema,
  productSchema,
} from "@/lib/validations/product"

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
  const subcategories = input.subcategories?.split(".") ?? []
  const storeIds = input.store_ids?.split(".").map(Number) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select()
      .from(products)
      .limit(input.limit)
      .offset(input.offset)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          subcategories.length
            ? inArray(products.subcategory, subcategories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          storeIds.length ? inArray(products.storeId, storeIds) : undefined
        )
      )
      .orderBy(
        column && column in products
          ? order === "asc"
            ? asc(products[column])
            : desc(products[column])
          : desc(products.createdAt)
      )

    const total = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(products)
      .where(
        and(
          categories.length
            ? inArray(products.category, categories)
            : undefined,
          subcategories.length
            ? inArray(products.subcategory, subcategories)
            : undefined,
          minPrice ? gte(products.price, minPrice) : undefined,
          maxPrice ? lte(products.price, maxPrice) : undefined,
          storeIds.length ? inArray(products.storeId, storeIds) : undefined
        )
      )

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

export const checkProduct = async (input: { name: string; id?: number }) => {
  const productWithSameName = await db.query.products.findFirst({
    where: input.id
      ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
      : eq(products.name, input.name),
  })

  if (productWithSameName)
    throw new Error("Product with the same name is already on sale")
}

export const addProduct = async (
  input: z.infer<typeof productSchema> & {
    storeId: number
    images: StoredFile[] | null
  }
) => {
  await checkProduct({
    name: input.name,
  })

  await db.insert(products).values({
    ...input,
  })

  revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}

export async function filterProducts(query: string) {
  if (query.length === 0) return null

  const filteredProducts = await db
    .select({
      id: products.id,
      name: products.name,
      category: products.category,
    })
    .from(products)
    .where(like(products.name, `%${query}%`))
    .orderBy(desc(products.createdAt))
    .limit(10)

  const productsByCategory = Object.values(products.category.enumValues).map(
    (category) => ({
      category,
      products: filteredProducts.filter(
        (product) => product.category === category
      ),
    })
  )

  return productsByCategory
}

export const updateProduct = async (
  input: z.infer<typeof productSchema> & {
    storeId: number
    id: number
    images: StoredFile[] | null
  }
) => {
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  await db.update(products).set(input).where(eq(products.id, input.id))

  revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`)
}

export const deleteProduct = async (
  input: z.infer<typeof getProductSchema>
) => {
  and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
    await db
      .delete(products)
      .where(
        and(eq(products.id, input.id), eq(products.storeId, input.storeId))
      )

  revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}

export const getNextProductId = async (
  input: z.infer<typeof getProductSchema>
) => {
  const product = await db.query.products.findFirst({
    where: and(eq(products.storeId, input.storeId), gt(products.id, input.id)),
    orderBy: asc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}

export const getPreviousProductId = async (
  input: z.infer<typeof getProductSchema>
) => {
  const product = await db.query.products.findFirst({
    where: and(eq(products.storeId, input.storeId), lt(products.id, input.id)),
    orderBy: desc(products.id),
  })

  if (!product) {
    throw new Error("Product not found.")
  }

  return product.id
}
