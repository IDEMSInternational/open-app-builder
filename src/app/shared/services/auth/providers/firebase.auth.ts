import { Injectable, Injector } from "@angular/core";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";
import { getAuth } from "firebase/auth";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase<User> {
  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    // TODO - is service required here?
    if (!firebaseService.app) {
      throw new Error("[Firebase Auth] app not configured");
    }
    this.addAuthListeners();
    // use firebase authStateReady to ensure any previously logged in user is available
    await getAuth().authStateReady();
  }

  public async signInWithGoogle() {
    const result = await FirebaseAuthentication.signInWithGoogle();
    const accessToken = result?.credential?.accessToken;
    await this.getGoogleUserInfo(accessToken);
    return this.authUser();
  }

  public async signOut() {
    await FirebaseAuthentication.signOut();
    return this.authUser();
  }

  public async getCurrentUser() {
    const { user } = await FirebaseAuthentication.getCurrentUser();
    return user;
  }

  /**
   * Listen to auth state changes and update authUser signal
   * This helps to ensure the signal is kept in sync with automated user sign-in/out
   * */
  private addAuthListeners() {
    FirebaseAuthentication.addListener("authStateChange", ({ user }) => {
      this.authUser.set(user);
    });
  }
}
