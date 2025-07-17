import { Injector, signal } from "@angular/core";
import { IAuthUser } from "../types";

export class AuthProviderBase {
  public authUser = signal<IAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signIn(providerId: "apple.com" | "google.com") {
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
