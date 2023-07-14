import Image from "next/image"

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Icons } from "@/constants/icons"

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          <Icons.cart className="w-4 h-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
    </Sheet>
  )
}

export default CartSheet