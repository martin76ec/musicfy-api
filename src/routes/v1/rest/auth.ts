import Elysia, { t } from "elysia";

export const auth = new Elysia({ prefix: "/auth" }).post("/", ({ body: { email, token } }) => {}, {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
});
