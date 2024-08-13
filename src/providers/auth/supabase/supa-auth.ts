import { SUPA_KEY, SUPA_URL } from "@constants/env";
import { AuthProvider, AuthUser } from "@providers/auth/common/auth-interface";
import { logger } from "@providers/logs/logger";
import { createClient } from "@supabase/supabase-js";

export class SupaAuth extends AuthProvider {
  private auth;
  private user: AuthUser | undefined;

  constructor() {
    super();
    this.auth = createClient(SUPA_URL, SUPA_KEY).auth;
  }

  public async signUp(email: string, password: string) {
    const user = await this.auth.signUp({ email, password });
    if (user.error || user.data.user === null) {
      logger.error(user.error);
      throw new Error("failed to signup");
    }
  }

  public async signInOAuth(service: string) {
    const attempt = await this.auth.signInWithOAuth({
      provider: "google",
    });
  }

  public async signIn(email: string, password: string) {
    const attempt = await this.auth.signInWithIdToken;
  }

  public async refresh(token: string) {
    // await this.auth.recover(token);
  }

  public getUser() {
    if (!this.user) throw Error("user is not defined");
    return this.user;
  }
}
