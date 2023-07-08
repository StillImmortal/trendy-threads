import { mysqlTable, uniqueIndex, bigint, varchar, index } from "drizzle-orm/mysql-core"

export const users = mysqlTable("users", {
    id: bigint("id", { mode: "bigint" } ).autoincrement().primaryKey(),
    name: varchar("name", { length: 127 }).notNull(),
    
},
    (table) => {
        return {
            author: uniqueIndex("name").on(table.name),
        }
    });

export const products = mysqlTable("products", {
  id: bigint("id", { mode: "bigint" } ).autoincrement().primaryKey(),
  title: varchar("title", { length: 127 }).notNull(),
  userId: bigint("user_id", { mode: "bigint" }).notNull(),
}, (table) => {
      return {
          title: uniqueIndex("title").on(table.title),
          userIdIdx: index("user_id_idx").on(table.userId),
      }
});