import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { excludedPaths } from "../../../providers/constants/routes";
import { contentManager } from "./content-manager";

export const v1 = new Elysia({ prefix: "/v1" }).use(swagger({ path: "/docs", exclude: excludedPaths })).use(contentManager);
