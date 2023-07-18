"use server"

import { db } from "@/db"
import { Store, products, stores } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm"

type FeaturedStore = {
  id: number
  name: string
  description: string | null
  productCount: number
}

export const getFeaturedStores = async (): Promise<FeaturedStore[]> => {
  const featuredStores = 
    await db
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