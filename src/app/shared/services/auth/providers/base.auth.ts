import { Injector, signal } from "@angular/core";
import { IAuthUser } from "../types";

export class AuthProviderBase {
  public authUser = signal<IAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signInWithGoogle() {
    return this.authUser();
  }

  public async signOut() {
    return this.authUser();
  }
}
