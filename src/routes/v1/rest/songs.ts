import { UseCases } from "@src/application/songs";
import { CreateSongSchema } from "@src/domain/songs/schemas";
import Elysia from "elysia";

export const songs = new Elysia({ prefix: "/songs" });

const create = { body: CreateSongSchema };
songs.post(
  "/",
  async ({ body, set }) => {
    const response = await UseCases.Create?.run(body);
    set.status = response?.status;
    return response;
  },
  create,
);
