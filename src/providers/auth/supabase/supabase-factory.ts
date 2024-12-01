import { AuthProviderFactory } from "@providers/auth/common/auth-provider-factory";
import { SupabaseAuthProvider } from "./supabase";

export class SupabaseFactory extends AuthProviderFactory {
  public createProvider() {
    return new SupabaseAuthProvider();
  }
}
