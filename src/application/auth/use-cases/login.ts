import { singleton } from "@constants/singleton";
import { AuthProviderFactory } from "@providers/auth/common/auth-provider-factory";
import { LoginSchema } from "@src/domain/auth/schemas";
import { HTTP_CODE, SafeResponse, safeResponse } from "@src/domain/http/response";
import { BaseUseCase } from "@src/domain/use-cases/use-case";
import { Session } from "@supabase/supabase-js";

type P = typeof LoginSchema.static;
type R = { session: Session }; // todo: replace supabase session with generic session

@singleton
export class LoginUC extends BaseUseCase<P, R> {
  protected resError: SafeResponse = {
    message: "Invalid login credentials",
    status: HTTP_CODE.UNAUTHORIZED,
  };

  protected async process(p: P) {
    const auth = AuthProviderFactory.createProvider();
    const session = await auth.login(p.email, p.password);
    return safeResponse(HTTP_CODE.OK, { session });
  }
}
