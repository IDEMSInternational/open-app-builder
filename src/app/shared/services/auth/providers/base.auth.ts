import { Injector, signal } from "@angular/core";
import { IAuthUser } from "../types";

export class AuthProviderBase<TAuthUser = IAuthUser> {
  public authUser = signal<TAuthUser | null>(null);

  public async initialise(injector: Injector) {}

  public async signInWithGoogle() {
    throw new Error("Google sign in not enabled");
    return this.authUser();
  }

  public async getGoogleUserInfo(accessToken: string) {
    if (!accessToken) return;
    try {
      const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userInfo = await response.json();
      const { given_name, family_name } = userInfo;
      this.authUser.update((v) => ({ ...v, given_name, family_name }));
    } catch (error) {
      console.error("[Auth] Error fetching Google user info:", error);
    }
  }

  public async signOut() {
    this.authUser.set(undefined);
    return this.authUser();
  }
}
