import { CartItem } from "@/types"
import { InferModel } from "drizzle-orm"
import { 
  mysqlTable,  
  bigint, 
  varchar, 
  index, 
  mysqlEnum, 
  text, 
  decimal,
  json,
  timestamp
} from "drizzle-orm/mysql-core"

export const products = mysqlTable("products", {
    id: bigint("id", { mode: "bigint" } ).autoincrement().primaryKey(),
    brand: varchar("brand", { length: 127 }).notNull().default("Custom"),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    category: mysqlEnum("category", [
        "clothing",
        "shoes",
        "accessories",
    ]).notNull().default("clothing"),
    subCategory: varchar("sub_category", { length: 255 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    tags: json("tags").$type<string[] | null>().default(null),
    //userId: bigint("user_id", { mode: "bigint" }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
}, (table) => ({
    brandIdx: index("brand_idx").on(table.brand),
    nameIdx: index("name_idx").on(table.name),
    priceIdx: index("price_idx").on(table.price),
    createdAtIdx: index("create_at_idx").on(table.createdAt)
}))

export type Product = InferModel<typeof products>

export const carts = mysqlTable("carts", {
    id: bigint("id", { mode: "bigint" } ).autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userId: bigint("user_id", { mode: "bigint" }).notNull(),
    items: json("items").$type<CartItem[] | null>().default(null),
    createdAt: timestamp("created_at").defaultNow(),
})

export type Cart = InferModel<typeof carts>
