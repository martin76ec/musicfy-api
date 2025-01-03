import { Transaction } from "@constants/types";
import { db } from "@providers/database/drizzle/drizzle";
import { songs } from "@providers/database/drizzle/schema";
import { CreateSongSchema, UpdateSongSchema } from "@src/domain/songs/schemas";
import { eq } from "drizzle-orm";
import { Static } from "elysia";

export abstract class SongsDS {
  public static async getByID(id: number) {
    const response = await db.select().from(songs).where(eq(songs.id, id)).execute();
    return response[0];
  }

  public static insert(song: Static<typeof CreateSongSchema>, tx?: Transaction) {
    return (tx ?? db).insert(songs).values(song).execute();
  }

  public static update(id: number, song: Static<typeof UpdateSongSchema>, tx?: Transaction) {
    return (tx ?? db).update(songs).set(song).where(eq(songs.id, id)).execute();
  }
}
