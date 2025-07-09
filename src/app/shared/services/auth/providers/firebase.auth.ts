import { Injectable, Injector } from "@angular/core";
import {
  AdditionalUserInfo,
  FirebaseAuthentication,
  User,
} from "@capacitor-firebase/authentication";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";
import { IAuthUser } from "../types";
import { BehaviorSubject, filter, firstValueFrom, map } from "rxjs";

/** LocalStorage field used to store temporary auth profile data */
const AUTH_METADATA_FIELD = "firebase_auth_openid_profile";

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase {
  /** Track init events from authStateChange event to know when auth settled */
  private initialising$ = new BehaviorSubject(false);

  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    // TODO - is service required here?
    if (!firebaseService.app) {
      throw new Error("[Firebase Auth] app not configured");
    }

    await this.handleAutomatedLogin();
  }

  public async signInWithApple() {
    const { user, additionalUserInfo } = await FirebaseAuthentication.signInWithApple();
    if (user) {
      // Note: Apple allows for anonymous sign-in so profile info may be minimal
      const { profile = {} } = additionalUserInfo;
      this.setAuthUser(user, profile);
      this.saveUserInfo(user, profile);
    }
    return this.authUser();
  }

  public async signInWithGoogle() {
    const { user, additionalUserInfo } = await FirebaseAuthentication.signInWithGoogle();
    if (user) {
      const { profile = {} } = additionalUserInfo;
      this.setAuthUser(user, profile);
      this.saveUserInfo(user, profile);
    }
    return this.authUser();
  }

  public async signOut() {
    await FirebaseAuthentication.signOut();
    this.authUser.set(undefined);
    localStorage.removeItem(AUTH_METADATA_FIELD);
    return this.authUser();
  }

  public async deleteAccount() {
    await FirebaseAuthentication.deleteUser();
    this.authUser.set(undefined);
    localStorage.removeItem(AUTH_METADATA_FIELD);
    return this.authUser();
  }

  private setAuthUser(user: User, profile: Partial<IAuthUser>) {
    const authUser: IAuthUser = {
      ...profile,
      uid: user.uid,
      name: user.displayName,
    };
    this.authUser.set(authUser);
  }

  private saveUserInfo(user: User, profile: AdditionalUserInfo["profile"]) {
    // NOTE - additionalUserInfo is only returned on first signIn so persist to localStorage
    // for access on automated sign-in following restart. Use fallback empty object if null
    localStorage.setItem(AUTH_METADATA_FIELD, JSON.stringify(profile));
  }

  /**
   * When a user signs in for the first time a full profile is retrieved which includes openID profile data.
   * However, when automated sign-in happens on app reload, only firebase-specific profile information is available.
   * As such use localStorage to persist and retrieve openID profile information
   */
  private async handleAutomatedLogin() {
    const { user } = await FirebaseAuthentication.getCurrentUser();
    if (user) {
      const storedProfile = localStorage.getItem(AUTH_METADATA_FIELD);
      if (storedProfile) {
        this.setAuthUser(user, JSON.parse(storedProfile));
      } else {
        // trigger automated login depending on provider
        const providerId = user.providerData?.[0]?.providerId;
        switch (providerId) {
          case "apple.com":
            this.signInWithApple();
            break;
          case "google.com":
            this.signInWithGoogle();
            break;
          default:
            const msg = `[FIREBASE AUTH] handleAutomatedLogin failed for provider ${providerId}, signing out`;
            console.warn(msg);
            this.signOut();
            break;
        }
      }
    }
  }
}
