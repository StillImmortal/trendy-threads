"use client"

import {  useTransition, HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { type Product } from '@/db/schema'

import { cn, formatPrice } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from '@/constants/icons'
import { useAddToCart } from '@/hooks'
import { actionError } from '@/lib/validations/actionError'

interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  product: Product
  variant?: "default" | "switchable"
  isAddedToCart?: boolean
  onSwitch?: () => Promise<void>
}

const ProductCard = ({
  product,
  variant = "default",
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) => {
  const [isPending, startTransition] = useTransition()
  const { mutate } = useAddToCart(product)

  return (
    <Card
      className={cn("h-full overflow-hidden rounded", className)}
      {...props}
    >
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className='p-0 border-b'>
          <AspectRatio ratio={4 / 3}>
            {product?.images?.length ? (
              <Image
                src={product.images[0]?.url ?? "/images/product-placeholder.webp"}
                alt={product.images[0]?.name ?? product.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
                loading="lazy"
              />
            ) : (
              <div
                aria-label="Placeholder"
                role="img"
                aria-roledescription="placeholder"
                className="flex items-center justify-center w-full h-full bg-secondary"
              >
                <Icons.imagePlaceholder
                  className="h-9 w-9 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
        <CardContent className='grid gap-2.5 p-4'>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {formatPrice(product.price)}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className='p-4'>
        {variant === "default" ? (
          <div className='flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-between'>
            <Link
              aria-label='Preview product'
              href={`/product/${product.id}`}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 w-full rounded-sm",
              })}
            >
              Preview
            </Link>
            <Button
              aria-label='Add to cart'
              size="sm"
              className='w-full h-8 rounded-sm'
              onClick={() => {
                startTransition(async () => {
                  try {
                    mutate()
                  } catch (error) {
                    actionError(error)
                  }
                })
              }}
              disabled={isPending}
            >
              {isPending && (
                <Icons.spinner
                  className="w-4 h-4 mr-2 animate-spin"
                  aria-hidden="true"
                />
              )}
              Add to cart
            </Button>
          </div>
        ) : (
          <Button
            aria-label={isAddedToCart ? "Remove from cart" : "Add to cart"}
            size="sm"
            className="w-full h-8 rounded-sm"
            onClick={() => {
              startTransition(async () => {
                try {
                  await onSwitch?.()
                  if (isAddedToCart) toast.success("Added to cart.")
                  else toast.success("Removed from cart.")
                } catch (error) {
                  actionError(error)
                }
              })
            }}
            disabled={isPending}
          >
            {isPending ? (
              <Icons.spinner
                className="w-4 h-4 mr-2 animate-spin"
                aria-hidden="true"
              />
            ) : isAddedToCart ? (
              <Icons.check className="w-4 h-4 mr-2" aria-hidden="true" />
            ) : (
              <Icons.add className="w-4 h-4 mr-2" aria-hidden="true" />
            )}
            {isAddedToCart ? "Added" : "Add to cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard