import * as z from "zod"

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(0),
  productSubcategory: z.string().optional().nullable(),
})

export const deleteCartItemSchema = z.object({
  productId: z.number(),
})

export const deleteCartItemsSchema = z.object({
  productIds: z.array(z.number()),
})
