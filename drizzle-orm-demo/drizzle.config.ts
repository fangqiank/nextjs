import type {Config} from 'drizzle-kit'
import dotnev from 'dotenv'
dotnev.config({
	path: '.env.local'
})

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  }
} satisfies Config