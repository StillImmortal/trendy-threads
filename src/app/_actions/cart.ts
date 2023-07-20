"use server"

import { cookies } from "next/headers"
import { db } from "@/db"
import { carts, products } from "@/db/schema"
import { CartLineItem } from "@/types"
import { eq, inArray } from "drizzle-orm"
import { type z } from "zod"

import {
  cartItemSchema,
  deleteCartItemSchema,
  deleteCartItemsSchema,
} from "@/lib/validations/cart"

export const getCart = async (): Promise<CartLineItem[]> => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId || isNaN(Number(cartId))) return []
  // if (!cartId || isNaN(Number(cartId))) return [{
  //   id: 2,
  //   images: null,
  //   brand: "Nike Air Jordan",
  //   name: "Sneakers",
  //   category: "shoes",
  //   subCategory: "boots",
  //   price: "299",
  //   quantity: 1,
  // }]

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId))
  })

  const productIds = cart?.items?.map((item) => item.productId) ?? []

  if (productIds.length === 0) return []

  const uniqueProductIds = [...new Set(productIds)]

  const cartLineItems = await db
    .select({
      id: products.id,
      brand: products.brand,
      name: products.name,
      images: products.images,
      category: products.category,
      subCategory: products.subCategory,
      price: products.price,
    })
    .from(products)
    .where(inArray(products.id, uniqueProductIds))

    const allCartLineItems = cartLineItems.map((item) => {
      const quantity = cart?.items?.find(
        (cartItem) => cartItem.productId === item.id
      )?.quantity

      return {
        ...item,
        quantity,
      }
    })

    return allCartLineItems
}

export const getCartItems = async (input: {cartId?: bigint }) => {
  if (!input.cartId || isNaN(Number(input.cartId))) return []

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(input.cartId)),
  })

  return cart?.items
}

export const addToCart = async (input: z.infer<typeof cartItemSchema>) => {
  const cookieStore = cookies()
  const cartId = cookieStore.get("cartId")?.value
  console.log(cartId)
  console.log(input)
  if (!cartId) {
    const cart = await db.insert(carts).values({
      items: [input]
    })

    // Note: .set() is only available in a Server Action or Route Handler
    cookieStore.set("cartId", String(cart.insertId))

    return
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId))
  })

  if (!cart) {
    cookieStore.set({
      name: "cartId",
      value: "",
      expires: new Date(0),
    })
    throw new Error("Cart not found, please try again.")
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId
  )

  if (cartItem) {
    cartItem.quantity += input.quantity
  } else {
    cart.items?.push(input)
  }

  await db
    .update(carts)
    .set({
      items: cart.items
    })
    .where(eq(carts.id, Number(cartId)))
}

export const updateCartItem = async (input: z.infer<typeof cartItemSchema>) => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart ID not found, please try again.")
  }

  if (isNaN(Number(cartId))) {
    throw new Error("Invalid Cart ID, please try again.")
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId))
  })

  if (!cart) {
    throw new Error("Cart not found, please try again.")
  }

  const cartItem = cart.items?.find(
    (item) => item.productId === input.productId
  )

  if (!cartItem) {
    throw new Error("Cart item not found, please try again.")
  }

  if (input.quantity === 0) {
    cart.items = cart.items?.filter((item) => item.productId !== input.productId) ?? []
  } else {
    cartItem.quantity = input.quantity
  }

  await db
    .update(carts)
    .set({
      items: cart.items
    })
    .where(eq(carts.id, Number(cartId)))
}

export const deleteCart = async () => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart ID not found, please try again.")
  }

  if (isNaN(Number(cartId))) {
    throw new Error("Invalid Cart ID, please try again.")
  }

  await db.delete(carts).where(eq(carts.id, Number(cartId)))
}

export const deleteCartItem = async (input: z.infer<typeof deleteCartItemSchema>) => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart ID not found, please try again.")
  }

  if (isNaN(Number(cartId))) {
    throw new Error("Invalid Cart ID, please try again.")
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId))
  })

  if (!cart) return

  cart.items = cart.items?.filter((item) => item.productId !== input.productId) ?? []

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)))
}

export const deleteCartItems = async (input: z.infer<typeof deleteCartItemsSchema>) => {
  const cartId = cookies().get("cartId")?.value

  if (!cartId) {
    throw new Error("Cart ID not found, please try again.")
  }

  if (isNaN(Number(cartId))) {
    throw new Error("Invalid Cart ID, please try again.")
  }

  const cart = await db.query.carts.findFirst({
    where: eq(carts.id, Number(cartId))
  })

  if (!cart) return

  cart.items = cart.items?.filter((item) => !input.productIds.includes(item.productId)) ?? []

  await db
    .update(carts)
    .set({
      items: cart.items,
    })
    .where(eq(carts.id, Number(cartId)))
}