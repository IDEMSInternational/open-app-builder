import { Injector, signal } from "@angular/core";
import { IAuthUser, ISignInProvider } from "../types";

export class AuthProviderBase {
  public authUser = signal<IAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signIn(providerId: ISignInProvider) {
    return this.authUser();
  }

  public async signOut() {
    this.authUser.set(undefined);
    return this.authUser();
  }

  public async deleteAccount() {
    throw new Error("Delete account not enabled");
    return this.authUser();
  }
}
