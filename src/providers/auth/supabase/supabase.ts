import { SUPA_KEY, SUPA_URL } from "@constants/env";
import { AuthProvider, AuthToken } from "@providers/auth/common/auth-interface";
import { Database } from "@providers/supabase/types";
import { Provider, Session } from "@supabase/gotrue-js";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuthProvider implements AuthProvider {
  private authClient: SupabaseClient;

  constructor() {
    this.authClient = createClient<Database>(SUPA_URL, SUPA_KEY);
  }

  public async login(email: string, password: string): Promise<void> {
    const response = await this.authClient.signInWithPassword({ email, password });
    if (response.error) {
      throw new Error(response.error.message);
    }
  }

  public async logout(provider: "google" | "github") {
    await this.authClient.signOut({ provider });
  }

  public async oauth(service: Provider) {
    const response = await this.authClient.signInWithOAuth({ provider: service });
    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data.url;
  }

  public async register(email: string, password: string) {
    const response = await this.authClient.signUp({ email, password });
    if (response.error) {
      throw new Error(response.error.message);
    }
  }

  public async refresh(token: string) {
    const response = await this.authClient.refreshSession({ refresh_token: token });
    if (response.error) throw new Error(response.error.message);
  }

  public async getToken() {
    const session = await this.authClient.getSession();
    if (session.error) throw new Error(session.error.message);
    if (!session.data.session) throw new Error("No session found");

    return this.tokenParse(session.data.session);
  }

  private tokenParse(session: Session): AuthToken {
    if (!session.expires_in || !session.expires_at || !session.token_type) throw new Error("No session found");

    return {
      expires_at: session.expires_at,
      expires_in: session.expires_in,
      token_type: session.token_type,
      refresh_token: session.refresh_token,
      access_token: session.access_token,
    };
  }
}
