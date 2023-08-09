"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { catchError } from "@/lib/utils"
import { updateCartItemSchema } from "@/lib/validations/cart"
import { useAddToCart } from "@/hooks/useMutation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/constants/icons"
import { addToCart } from "@/app/_actions/cart"

interface AddToCartFromProps {
  productId: number
}

type Inputs = z.infer<typeof updateCartItemSchema>

const AddToCartForm = ({ productId }: AddToCartFromProps) => {
  const [isPending, startTransition] = React.useTransition()
  const { mutate } = useAddToCart(productId)

  // React-Hook-Form with Zod
  const form = useForm<Inputs>({
    resolver: zodResolver(updateCartItemSchema),
    defaultValues: {
      quantity: 1,
    },
  })

  function onSubmit({ quantity }: Inputs) {
    startTransition(async () => {
      try {
        mutate({ quantity })
        toast.success("Added to cart.")
      } catch (err) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4 sm:max-w-[240px]"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                    const parsedValue = parseInt(value, 10)
                    if (isNaN(parsedValue)) return
                    field.onChange(parsedValue)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Add to cart
          <span className="sr-only">Add to cart</span>
        </Button>
      </form>
    </Form>
  )
}

export default AddToCartForm
