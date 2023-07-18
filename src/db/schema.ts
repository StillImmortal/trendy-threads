import { CartItem, StoredFile } from "@/types"
import { InferModel, relations } from "drizzle-orm"
import { 
  boolean,
  mysqlTable,  
  int, 
  varchar, 
  index, 
  mysqlEnum, 
  text, 
  decimal,
  json,
  timestamp
} from "drizzle-orm/mysql-core"

export const stores = mysqlTable("stores", {
    id: int("id").autoincrement().primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    slug: text("slug"),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("createdAt").defaultNow(),
}, (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
    nameIdx: index("name_idx").on(table.name),
}))

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
}))

export const products = mysqlTable("products", {
    id: int("id").autoincrement().primaryKey(),
    storeId: int("store_id").notNull(),
    brand: varchar("brand", { length: 127 }).notNull().default("custom"),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    images: json("images").$type<StoredFile[] | null>().default(null),
    category: mysqlEnum("category", [
        "clothing",
        "shoes",
        "accessories",
    ]).notNull().default("clothing"),
    subCategory: varchar("sub_category", { length: 255 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    tags: json("tags").$type<string[] | null>().default(null),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow()
}, (table) => ({
    storeIdx: index("store_id_idx").on(table.storeId),
    brandIdx: index("brand_idx").on(table.brand),
    nameIdx: index("name_idx").on(table.name),
    priceIdx: index("price_idx").on(table.price),
    createdAtIdx: index("create_at_idx").on(table.createdAt)
}))

export type Product = InferModel<typeof products>

export const productsRelations = relations(products, ({ one }) => ({
    store: one(stores, { fields: [products.storeId], references: [stores.id] }),
  }))

export const carts = mysqlTable("carts", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id"),
    items: json("items").$type<CartItem[] | null>().default(null),
    createdAt: timestamp("created_at").defaultNow(),
})

export type Cart = InferModel<typeof carts>
