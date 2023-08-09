"use server"

import { db } from "@/db"
import { products, Store, stores } from "@/db/schema"
import { clerkClient } from "@clerk/nextjs"
import { asc, desc, eq, sql } from "drizzle-orm"
import * as z from "zod"

import { slugify } from "@/lib/utils"
import { storeSchema } from "@/lib/validations/store"

type FeaturedStore = {
  id: number
  name: string
  description: string | null
  productCount: number
}

export const getFeaturedStores = async (): Promise<FeaturedStore[]> => {
  const featuredStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(${products.id})`,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(${products.id})`))
  return featuredStores
}

export const getStoresWithProductCount = async (
  userId: string
): Promise<
  {
    id: number
    name: string
    description: string | null
    productCount: number
  }[]
> => {
  return await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      productCount: sql<number>`count(*)`,
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(sql<number>`count(*)`))
    .where(eq(stores.userId, userId))
}

export const getStores = async (input: {
  description?: string
  limit?: number
  offset?: number
  sort?: `${keyof Store | "productCount"}.${"asc" | "desc"}`
  userId?: string
}) => {
  const limit = input.limit ?? 10
  const offset = input.offset ?? 0
  const [column, order] =
    (input.sort?.split("-") as [
      keyof Store | undefined,
      "asc" | "desc" | undefined,
    ]) ?? []

  const { items, total } = await db.transaction(async (tx) => {
    const items = await tx
      .select({
        id: stores.id,
        name: stores.name,
        description: stores.description,
        productCount: sql<number>`count(*)`,
      })
      .from(stores)
      .limit(limit)
      .offset(offset)
      .leftJoin(products, eq(stores.id, products.storeId))
      .where(input.userId ? eq(stores.userId, input.userId) : undefined)
      .groupBy(stores.id)
      .orderBy(
        input.sort === "productCount.asc"
          ? asc(sql<number>`count(*)`)
          : input.sort === "productCount.desc"
          ? desc(sql<number>`count(*)`)
          : column && column in stores
          ? order === "asc"
            ? asc(stores[column])
            : desc(stores[column])
          : desc(stores.createdAt)
      )

    const total = await tx
      .select({
        count: sql<number>`count(*)`,
      })
      .from(stores)

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

export const getUserStores = async (userId: string): Promise<Store[]> => {
  const user = await clerkClient.users.getUser(userId)

  if (!user) {
    throw new Error("User not found.")
  }

  const userStores = await db.query.stores.findMany({
    where: eq(stores.userId, user.id),
    with: {
      products: {
        columns: {
          id: true,
        },
      },
    },
  })

  return userStores
}

export const addStore = async ({
  name,
  description,
  userId,
}: z.infer<typeof storeSchema> & { userId: string }) => {
  const storeWithSameName = await db.query.stores.findFirst({
    where: eq(stores.name, name),
  })

  if (storeWithSameName) {
    throw new Error("Store name already taken.")
  }

  await db.insert(stores).values({
    name,
    description,
    userId,
    slug: slugify(name),
  })
}
