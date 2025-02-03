import { Injector, signal } from "@angular/core";
import { IAuthUser } from "../types";

export class AuthProviderBase {
  public authUser = signal<IAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signInWithGoogle() {
    throw new Error("Google sign in not enabled");
    return this.authUser();
  }

  public async signOut() {
    throw new Error("Sign in not enabled");
    return this.authUser();
  }
}
