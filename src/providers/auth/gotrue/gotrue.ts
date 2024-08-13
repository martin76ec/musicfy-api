import { AuthProvider, AuthUser } from "@providers/auth/common/auth-interface";
import GoTrueLib from "gotrue-js";
import { GO_TRUE_URL } from "@constants/env";

export class GoTrue extends AuthProvider {
  private auth;
  private user: AuthUser | undefined;

  constructor() {
    super();
    this.auth = new GoTrueLib({ APIUrl: GO_TRUE_URL });
  }

  public async signUp(email: string, password: string) {
    const user = await this.auth.signup(email, password);

    this.user = {
      token: user.token,
      logout: () => user.logout(),
      refresh: () => user.jwt(),
    };
  }

  public async signIn(email: string, password: string) {
    await this.auth.login(email, password);
  }

  public async refresh(token: string) {
    await this.auth.recover(token);
  }

  public getUser() {
    if (!this.user) throw Error("user is not defined");
    return this.user;
  }
}
