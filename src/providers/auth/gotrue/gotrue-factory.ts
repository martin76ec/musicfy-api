import { AuthProviderFactory } from "@providers/auth/common/auth-provider-factory";
import { GoTrue } from "./gotrue";

export class GoTrueFactory extends AuthProviderFactory {
  public createProvider() {
    return new GoTrue();
  }
}
