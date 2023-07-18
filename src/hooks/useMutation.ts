import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { addToCart, updateCartItem, deleteCartItem } from "@/app/_actions/cart"
import { Product } from "@/db/schema"
import { CartLineItem } from "@/types"

export const useAddToCart = (product: Product) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["product", product.id],
    mutationFn: async () => {
      await addToCart({
        productId: product.id,
        quantity: 1
      })
      await queryClient.refetchQueries({queryKey: ["cartLineItems"], type: "active"})
      toast.success("Added to cart.")
    }
  })
}

export const useUpdateCart = (cartLineItem: CartLineItem) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["product", cartLineItem.id],
    mutationFn: async ({
      actionType,
      quantity
    }: { actionType?: "remove" | "add" | "delete", quantity?: number }) => {
      switch (actionType) {
        case 'remove': 
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(cartLineItem.quantity) - 1
          })
          break
        case 'add':
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(cartLineItem.quantity) + 1
          })
          break
        case 'delete':
          await deleteCartItem({
            productId: cartLineItem.id
          }) 
          break
        default:
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(quantity)
          })
          break
      }
      await queryClient.refetchQueries({queryKey: ["cartLineItems"], type: "active"})
    }
  })
}