import { AuthProvider } from "./auth-interface";

export abstract class AuthProviderFactory {
  public abstract createProvider(): AuthProvider;
}
