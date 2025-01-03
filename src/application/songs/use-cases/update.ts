import { db } from "@providers/database/drizzle/drizzle";
import { HTTPCode, safeGenericResponse, SafeResponse } from "@src/domain/http/response";
import { UpdateSongSchema } from "@src/domain/songs/schemas";
import { BaseUseCase } from "@src/domain/use-cases/use-case";
import { SongsDS } from "@src/infrastructure/database/SongsDS";
import { Static } from "elysia";

interface P {
  id: number;
  song: Static<typeof UpdateSongSchema>;
}

export class UpdateSongUC extends BaseUseCase<P> {
  protected async process(p: P): Promise<SafeResponse> {
    const existingSong = await SongsDS.getByID(p.id);

    if (existingSong === undefined) return safeGenericResponse({ message: "Song not found", status: HTTPCode.NOT_FOUND });

    await db.transaction(async (tx) => {
      await SongsDS.update(p.id, p.song, tx);
    });

    return safeGenericResponse(this.resSuccess);
  }
}
