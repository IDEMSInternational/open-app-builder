import { Injector, signal } from "@angular/core";
import { IAuthUser } from "../types";

export class AuthProviderBase<TAuthUser = IAuthUser> {
  public authUser = signal<TAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signInWithGoogle() {
    throw new Error("Google sign in not enabled");
    return this.authUser();
  }

  public async signOut() {
    this.authUser.set(undefined);
    return this.authUser();
  }
}
