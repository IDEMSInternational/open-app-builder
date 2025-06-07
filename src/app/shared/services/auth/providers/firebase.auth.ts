import { Injectable, Injector } from "@angular/core";
import {
  AdditionalUserInfo,
  FirebaseAuthentication,
  User,
} from "@capacitor-firebase/authentication";
import { getAuth, initializeAuth, indexedDBLocalPersistence, Auth } from "firebase/auth";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";
import { IAuthUser } from "../types";
import { FirebaseApp } from "firebase/app";
import { Capacitor } from "@capacitor/core";

/** LocalStorage field used to store temporary auth profile data */
const AUTH_METADATA_FIELD = "firebase_auth_openid_profile";

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase {
  private auth: Auth;

  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    // TODO - is service required here?
    if (!firebaseService.app) {
      throw new Error("[Firebase Auth] app not configured");
    }
    this.initialiseAuth(firebaseService.app);
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

  /**
   * Configure Firebase Auth to use indexedDB for persistence on native platforms.
   * See https://github.com/IDEMSInternational/open-app-builder/pull/2835#pullrequestreview-2672295259
   * and https://firebase.google.com/docs/auth/web/custom-dependencies#platform-specific_considerations
   *
   * NOTE - only required if using Firebase JS SDK directly on native (not capacitor-firebase native)
   * https://github.com/capawesome-team/capacitor-firebase/blob/main/packages/authentication/docs/firebase-js-sdk.md
   * This isn't advisable as any requests that require auth will fail as the auth will only be
   * signed in on native layer, but should still maintain compatibility if using native sdks
   */
  private initialiseAuth(app: FirebaseApp) {
    if (Capacitor.isNativePlatform()) {
      this.auth = initializeAuth(app, {
        persistence: indexedDBLocalPersistence,
      });
    } else {
      this.auth = getAuth();
    }
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
    // use firebase authStateReady to ensure any previously logged in user is available
    // and update the auth user with loaded profile
    await this.auth.authStateReady();
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
          case "google.com":
            this.signInWithGoogle();
          default:
            const msg = `[FIREBASE AUTH] handleAutomatedLogin failed for provider ${providerId}, signing out`;
            console.warn(msg);
            this.signOut();
        }
      }
    }
  }
}
