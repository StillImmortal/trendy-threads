import { CartLineItem } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { addToCart, deleteCartItem, updateCartItem } from "@/app/_actions/cart"

export const useAddToCart = (productId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["product", productId],
    mutationFn: async ({ quantity }: { quantity: number }) => {
      await addToCart({
        productId: productId,
        quantity: quantity,
      })
      await queryClient.refetchQueries({
        queryKey: ["cartLineItems"],
        type: "active",
      })
    },
  })
}

export const useUpdateCart = (cartLineItem: CartLineItem) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["product", cartLineItem.id],
    mutationFn: async ({
      actionType,
      quantity,
    }: {
      actionType?: "remove" | "add" | "delete"
      quantity?: number
    }) => {
      switch (actionType) {
        case "remove":
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(cartLineItem.quantity) - 1,
          })
          break
        case "add":
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(cartLineItem.quantity) + 1,
          })
          break
        case "delete":
          await deleteCartItem({
            productId: cartLineItem.id,
          })
          break
        default:
          await updateCartItem({
            productId: cartLineItem.id,
            quantity: Number(quantity),
          })
          break
      }
      await queryClient.refetchQueries({
        queryKey: ["cartLineItems"],
        type: "active",
      })
    },
  })
}
