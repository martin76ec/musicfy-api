import Elysia from "elysia";
import { playground } from "../routes/rest/playground";

export const rest = new Elysia().use(playground);
