import { AuthProvider } from "./auth-interface";

export abstract class AuthProviderFactory {
  abstract createProvider(): AuthProvider;
}
