import Elysia from "elysia";

export const playground = new Elysia({ prefix: "/playground" }).get("/", () => "playground");
