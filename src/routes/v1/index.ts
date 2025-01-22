import { excludedPaths } from "@constants/routes";
import swagger from "@elysiajs/swagger";
import { trpc } from "@elysiajs/trpc";
import { validationErrorHandler } from "@routes/v1/plugins/validation-errors";
import { auth } from "@routes/v1/rest/auth";
import { playground } from "@routes/v1/rest/playground";
import { songs } from "@routes/v1/rest/songs";
import { playgroundRPC } from "@routes/v1/rpc/playground";
import Elysia from "elysia";

export const v1 = new Elysia({ prefix: "/v1" })
  .use(validationErrorHandler)
  .use(swagger({ path: "/docs", exclude: excludedPaths }))
  .use(trpc(playgroundRPC))
  .use(songs)
  .use(playground)
  .use(auth);
