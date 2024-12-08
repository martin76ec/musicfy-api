import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./src/providers/constants/env"; // eslint-disable-line

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default defineConfig({
  out: "./drizzle",
  schema: "./src/providers/database/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
