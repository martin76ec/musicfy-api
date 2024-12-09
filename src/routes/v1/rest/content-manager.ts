import { playground } from "@routes/v1/rest/playground";
import Elysia from "elysia";

export const contentManager = new Elysia({ prefix: "/content-manager" }).use(playground);
