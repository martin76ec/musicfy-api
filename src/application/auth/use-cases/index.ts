import { LoginUC } from "@src/application/auth/use-cases/login";

// LOGIN USE CASE
let Login: LoginUC | undefined;
if (Login === undefined) Login = new LoginUC();

export { Login };
