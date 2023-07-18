"use server"

import { db } from "@/db"
import { Product, products } from "@/db/schema"
import { desc } from "drizzle-orm"

export const geFeaturedProducts = async (): Promise<Product[]> => {
  const featuredProducts = await db.select().from(products).limit(8).orderBy(desc(products.createdAt))
  return featuredProducts
}