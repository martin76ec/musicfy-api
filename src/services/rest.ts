import cors from "@elysiajs/cors";
import Elysia from "elysia";
import { v1 } from "../routes/v1/rest";

export const rest = new Elysia().use(cors()).use(v1);
