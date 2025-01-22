import { UseCases } from "@src/application/auth";
import { LoginSchema } from "@src/domain/auth/schemas";
import Elysia from "elysia";

const login = { body: LoginSchema };

export const auth = new Elysia({ prefix: "/auth" }).post(
  "/login",
  async ({ body, set }) => {
    const response = await UseCases.Login.run(body);
    set.status = Number(response.status);
    return response;
  },
  login,
);
