import { CreateSongSchema } from "@src/domain/songs/schemas";
import { BaseUseCase } from "@src/domain/use-cases/use-case";
import { SongsDS } from "@src/infrastructure/database/SongsDS";

type P = typeof CreateSongSchema.static;

export class CreateUC extends BaseUseCase<P> {
  protected async process(p: P) {
    await SongsDS.insert(p);
  }
}
