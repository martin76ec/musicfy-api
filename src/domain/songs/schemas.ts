import { songs } from "@providers/database/drizzle/schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-typebox";

export const CreateSongSchema = createInsertSchema(songs);
export const UpdateSongSchema = createUpdateSchema(songs);
