import { DB_URL } from "@constants/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: DB_URL,
});

export const db = drizzle({ client: pool });
