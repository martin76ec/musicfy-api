import { AuthProviderFactory } from "@providers/auth/common/auth-provider-factory";
import { LoginSchema } from "@src/domain/auth/schemas";
import { HTTPCode, SafeResponse, safeResponse } from "@src/domain/http/response";
import { BaseUseCase } from "@src/domain/use-cases/use-case";
import { Session } from "@supabase/supabase-js";

type P = typeof LoginSchema.static;
type R = { session: Session }; // todo: replace supabase session with generic session

export class LoginUC extends BaseUseCase<P, R> {
  protected resError: SafeResponse = {
    message: "Invalid login credentials",
    status: HTTPCode.UNAUTHORIZED,
  };

  protected async process(p: P) {
    const auth = AuthProviderFactory.createProvider();
    const session = await auth.login(p.email, p.password);
    return safeResponse(HTTPCode.OK, { session });
  }
}
