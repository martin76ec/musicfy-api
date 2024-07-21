import Elysia from "elysia";
import { playground } from "./playground";

export const contentManager = new Elysia({ prefix: "/content-manager" }).use(playground);
