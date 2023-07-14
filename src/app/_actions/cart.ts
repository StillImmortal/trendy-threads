"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { db } from "@/db"
import { carts, products } from "@/db/schema"
import { CartLineItem } from "@/types"
import { eq, inArray } from "drizzle-orm"
import { type z } from "zod"

import type {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
} from "@/lib/validations/cart"

export const getCart = async (): Promise<CartLineItem[]> => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId || isNaN(Number(cartId))) return[]

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, BigInt(cartId))
  })

  const productIds = cart?.items?.map((item) => BigInt(item.productId)) ?? []

  if (productIds.length === 0) return []

  const uniqueProductIds = [...new Set(productIds)]

  const cartLineItems = await db
    .select({
      id: products.id,
      brand: products.brand,
      name: products.name,
      category: products.category,
      subCategory: products.subCategory,
      price: products.price,
    })
    .from(products)
    .where(inArray(products.id, uniqueProductIds))

    const allCartLineItems = cartLineItems.map((item) => {
      const quantity = cart?.items?.find(
        (cartItem) => BigInt(cartItem.productId) === item.id
      )?.quantity

      return {
        ...item,
        quantity,
      }
    })

    return allCartLineItems
}