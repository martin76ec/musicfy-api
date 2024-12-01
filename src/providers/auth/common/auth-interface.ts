export interface AuthToken {
  expires_at: number;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  access_token: string;
}

export abstract class AuthProvider {
  public abstract getToken(): Promise<AuthToken>;
  public abstract login(email: string, password: string): Promise<void>;
  public abstract logout(provider: "github" | "google"): Promise<void>;
  public abstract oauth(service: string): Promise<string>;
  public abstract refresh(token: string): Promise<void>;
  public abstract register(email: string, password: string): Promise<void>;
}
