import { CartItem, StoredFile } from "@/types"
import { InferModel, relations } from "drizzle-orm"
import {
  boolean,
  decimal,
  index,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

export const stores = mysqlTable(
  "stores",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    slug: text("slug"),
    active: boolean("active").notNull().default(true),
    stripeAccountId: varchar("stripeAccountId", { length: 255 }),
    createdAt: timestamp("createdAt").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
    nameIdx: index("name_idx").on(table.name),
  })
)

export type Store = InferModel<typeof stores>

export const storesRelations = relations(stores, ({ many }) => ({
  products: many(products),
}))

export const products = mysqlTable(
  "products",
  {
    id: int("id").autoincrement().primaryKey(),
    storeId: int("store_id").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    images: json("images").$type<StoredFile[] | null>().default(null),
    category: mysqlEnum("category", ["clothing", "shoes", "accessories"])
      .notNull()
      .default("clothing"),
    subcategory: varchar("sub_category", { length: 255 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
    tags: json("tags").$type<string[] | null>().default(null),
    inventory: int("inventory").notNull().default(0),
    rating: int("rating").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => ({
    storeIdx: index("store_id_idx").on(table.storeId),
    nameIdx: index("name_idx").on(table.name),
    priceIdx: index("price_idx").on(table.price),
    createdAtIdx: index("create_at_idx").on(table.createdAt),
  })
)

export type Product = InferModel<typeof products>

export const productsRelations = relations(products, ({ one }) => ({
  store: one(stores, { fields: [products.storeId], references: [stores.id] }),
}))

export const carts = mysqlTable("carts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id"),
  paymentIntentId: varchar("paymentIntentId", { length: 255 }),
  clientSecret: varchar("clientSecret", { length: 255 }),
  items: json("items").$type<CartItem[] | null>().default(null),
  createdAt: timestamp("created_at").defaultNow(),
})

export type Cart = InferModel<typeof carts>

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: varchar("userId", { length: 255 }),
  storeId: int("storeId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 255 }).notNull(),
  stripeAccountCreatedAt: int("stripeAccountCreatedAt").notNull(),
  stripeAccountExpiresAt: int("stripeAccountExpiresAt").notNull(),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow(),
})

export type Payment = InferModel<typeof payments>
