import { SupabaseAuthProvider } from "@providers/auth/supabase/supabase";
import { AuthProvider } from "./auth-interface";

export abstract class AuthProviderFactory {
  public static createProvider(): AuthProvider {
    return new SupabaseAuthProvider();
  }
}
