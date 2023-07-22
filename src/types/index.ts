import { Icons } from "@/constants/icons"
import { Product } from "@/db/schema"
import * as z from "zod"

import { cartItemSchema } from "@/lib/validations/cart"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type CartItem = z.infer<typeof cartItemSchema>

export interface CartLineItem
  extends Pick<
    Product,
    "id" | "brand" | "name" | "images" | "category" | "subCategory" | "price"
  > {
  quantity?: number
}

export interface StoredFile {
  id: string
  name: string
  url: string
}
