import { trpc } from "@elysiajs/trpc";
import Elysia from "elysia";
import { playground } from "../routes/v1/rpc/playground";

export const rpc = new Elysia().use(trpc(playground));
