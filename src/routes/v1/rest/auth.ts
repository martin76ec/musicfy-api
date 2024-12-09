import { UseCases } from "@src/application/auth";
import { LoginSchema } from "@src/domain/auth/schemas";
import Elysia from "elysia";

export const auth = new Elysia({ prefix: "/auth" });

// LOGIN
const login = { body: LoginSchema };
auth.post(
  "/login",
  async ({ body, set }) => {
    const response = await UseCases.Login?.run(body);
    set.status = response?.status;
    return response;
  },
  login,
);
