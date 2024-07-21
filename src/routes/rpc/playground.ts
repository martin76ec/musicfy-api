import { initTRPC } from "@trpc/server";
import { z } from "zod";
const t = initTRPC.create();
const p = t.procedure;

export const playground = t.router({
  greet: p.input(z.string()).query(({ input }) => `playground ${input}`),
});
