"use client"

import Image from "next/image"
import { Icons } from "@/constants/icons"
import { useQuery } from "@tanstack/react-query"

import { formatPrice } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UpdateCartLineItem } from "@/components/layout"
import { getCart } from "@/app/_actions/cart"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"

const CartSheet = () => {
  const {
    data: cartLineItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cartLineItems"],
    queryFn: async () => await getCart(),
  })

  const itemCount = cartLineItems
    ? cartLineItems.reduce(
        (quantity, cartLineItem) => quantity + Number(cartLineItem.quantity),
        0
      )
    : 0

  const cartTotalPrice = cartLineItems
    ? cartLineItems.reduce(
        (totalPrice, item) =>
          totalPrice + Number(item.quantity) * Number(item.price),
        0
      )
    : 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        <Separator />
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-5 pr-6">
                  {cartLineItems?.map((item) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded">
                          {item?.images?.length ? (
                            <Image
                              src={item.images[0].url}
                              alt={item.images[0]?.name ?? item.name}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              fill
                              className="absolute object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-secondary">
                              <Icons.imagePlaceholder
                                className="h-8 w-8 text-muted-foreground"
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col gap-1 self-start text-sm">
                          <span className="line-clamp-1">
                            {item.brand} {item.name}
                          </span>
                          <span className="line-clamp-1 text-muted-foreground">
                            {formatPrice(item.price)} x {item.quantity} ={" "}
                            {formatPrice(
                              (
                                Number(item.price) * Number(item.quantity)
                              ).toFixed(2)
                            )}
                          </span>
                          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
                            {`${item.category} ${
                              item.subCategory ? `/ ${item.subCategory}` : ""
                            }`}
                          </span>
                        </div>
                        <UpdateCartLineItem cartLineItem={item} />
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <CartBottomLine
                title="Subtotal"
                value={formatPrice(cartTotalPrice.toFixed(2))}
              />
              <CartBottomLine title="Shipping" value="Free" />
              <CartBottomLine title="Taxes" value="Calculated at checkout" />
              <Separator className="mt-2" />
              <CartBottomLine
                title="Total"
                value={formatPrice(cartTotalPrice.toFixed(2))}
              />
            </div>
            <SheetFooter className="mt-1.5">
              <Button
                aria-label="Proceed to checkout"
                size="sm"
                className="w-full"
              >
                Proceed to Checkout
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <Icons.cart
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Your cart is empty
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

const CartBottomLine = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex">
      <span className="flex-1 text-muted-foreground">{title}</span>
      <span>{value}</span>
    </div>
  )
}

export default CartSheet
