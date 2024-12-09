import { t } from "elysia";

export const LoginSchema = t.Object({
  email: t.String({ format: "email" }),
  password: t.String({
    minLength: 1,
    readOnly: true,
  }),
});
