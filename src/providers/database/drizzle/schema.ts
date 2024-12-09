import { bigint, boolean, pgTable, timestamp, unique, varchar } from "drizzle-orm/pg-core";

export const songs = pgTable(
  "songs",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "songs_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    name: varchar(),
    description: varchar(),
    source: varchar(),
    softDeleted: boolean("soft-deleted").default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => {
    return {
      songsSourceKey: unique("songs_source_key").on(table.source),
    };
  },
);
