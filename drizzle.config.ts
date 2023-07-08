import type { Config } from "drizzle-kit"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const config: Config = {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  }
}

export default config