"use client"

import { TransitionStartFunction, useTransition } from 'react'
import { type CartLineItem } from '@/types'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Icons } from '@/constants/icons'
import { actionError } from '@/lib/validations/actionError'
import { useUpdateCart } from '@/hooks'

interface UpdateCartLineItemProps {
  cartLineItem: CartLineItem
}

const UpdateCartLineItem = ({ cartLineItem }: UpdateCartLineItemProps) => {
  const [isPending, startTransition] = useTransition()
  const { mutate } = useUpdateCart(cartLineItem)

  return (
    <div className='flex items-center space-x-1'>
      <div className='flex items-center space-x-1'>
        <ActionButton 
          cartLineItem={cartLineItem}
          isPending={isPending}
          startTransition={startTransition}
          actionType="remove"
          icon="remove"
          description="Remove one item"
        />
        <Input 
          type="number"
          min={0}
          className='h-8 w-14'
          value={cartLineItem.quantity}
          onChange={(e) => {
            startTransition(async () => {
              try {
                mutate({ quantity: Number(e.target.value) })
              } catch (error) {
                actionError(error)
              }
            })
          }}
          disabled={isPending}
        />
        <ActionButton 
          cartLineItem={cartLineItem}
          isPending={isPending}
          startTransition={startTransition}
          actionType="add"
          icon="add"
          description="Add one item"
        />
        <ActionButton 
          cartLineItem={cartLineItem}
          isPending={isPending}
          startTransition={startTransition}
          actionType="delete"
          icon="trash"
          description="Delete item"
        />
      </div>
    </div>
  )
}

interface ActionButtonProps {
  cartLineItem: CartLineItem
  isPending: boolean
  startTransition: TransitionStartFunction
  actionType: "remove" | "add" | "delete"
  icon: keyof typeof Icons
  description: string
}

const ActionButton = ({
  cartLineItem,
  isPending,
  startTransition,
  actionType,
  icon,
  description
}: ActionButtonProps) => {
  const { mutate } = useUpdateCart(cartLineItem)
  const Icon = Icons[icon]

  return (
    <Button
      variant="outline"
      size={"icon"}
      className='w-8 h-8'
      onClick={() => {
        startTransition(async () => {
          try {
            mutate({ actionType })
          } catch (error) {
            actionError(error)
          }
        })
      }}
      disabled={isPending}
    >
      <Icon className='w-3 h-3' aria-hidden="true" />
      <span className="sr-only">{description}</span>
    </Button>
  )
}

export default UpdateCartLineItem