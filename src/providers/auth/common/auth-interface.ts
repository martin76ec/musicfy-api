export interface AuthToken {
  expires_at: number;
  expires_in: number;
  token_type: "bearer";
  refresh_token: string;
  access_token: string;
}

export interface AuthUser {
  token: AuthToken;
  logout: () => Promise<void>;
  refresh: () => Promise<string>;
}

export abstract class AuthProvider {
  public abstract signIn(email: string, password: string): Promise<void>;
  public abstract signInOAuth(service: string): Promise<void>;
  public abstract signUp(email: string, password: string): Promise<void>;
  public abstract refresh(token: string): Promise<void>;
  public abstract getUser(): AuthUser;
}
