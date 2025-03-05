import { Injectable, Injector } from "@angular/core";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";
import { getAuth } from "firebase/auth";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";
import { IAuthUser } from "../types";

/** LocalStorage field used to store temporary auth profile data */
const AUTH_METADATA_FIELD = "firebase_auth_openid_profile";

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase {
  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    // TODO - is service required here?
    if (!firebaseService.app) {
      throw new Error("[Firebase Auth] app not configured");
    }
    await this.handleAutomatedLogin();
  }

  public async signInWithGoogle() {
    const { user, additionalUserInfo } = await FirebaseAuthentication.signInWithGoogle();
    if (user) {
      // NOTE - additionalUserInfo is only returned on first signIn so persist to localStorage
      // for access on automated sign-in following restart. Use fallback empty object if null
      const { profile = {} } = additionalUserInfo;
      localStorage.setItem(AUTH_METADATA_FIELD, JSON.stringify(profile));

      this.setAuthUser(user, profile);
    }
    return this.authUser();
  }

  public async signOut() {
    await FirebaseAuthentication.signOut();
    this.authUser.set(undefined);
    localStorage.removeItem(AUTH_METADATA_FIELD);
    return this.authUser();
  }

  private setAuthUser(user: User, profile: Partial<IAuthUser>) {
    const authUser: IAuthUser = {
      ...profile,
      uid: user.uid,
    };
    this.authUser.set(authUser);
  }

  /**
   * When a user signs in for the first time a full profile is retrieved which includes openID profile data.
   * However, when automated sign-in happens on app reload, only firebase-specific profile information is available.
   * As such use localStorage to persist and retrieve openID profile information
   */
  private async handleAutomatedLogin() {
    // use firebase authStateReady to ensure any previously logged in user is available
    // and update the auth user with loaded profile
    await getAuth().authStateReady();
    const { user } = await FirebaseAuthentication.getCurrentUser();
    if (user) {
      const storedProfile = localStorage.getItem(AUTH_METADATA_FIELD);
      if (storedProfile) {
        this.setAuthUser(user, JSON.parse(storedProfile));
      } else {
        this.signInWithGoogle();
      }
    }
  }
}
