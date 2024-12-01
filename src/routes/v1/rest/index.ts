import { excludedPaths } from "@constants/routes";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { contentManager } from "./content-manager";

export const v1 = new Elysia({ prefix: "/v1" }).use(swagger({ path: "/docs", exclude: excludedPaths })).use(contentManager);
