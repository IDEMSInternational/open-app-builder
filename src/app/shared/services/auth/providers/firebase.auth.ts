import { Injectable, Injector } from "@angular/core";
import {
  AdditionalUserInfo,
  FirebaseAuthentication,
  User,
  SignInResult,
} from "@capacitor-firebase/authentication";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";
import { IAuthUser, ISignInProvider } from "../types";
import { firstValueFrom, ReplaySubject, timeout } from "rxjs";

/** LocalStorage field used to store temporary auth profile data */
const AUTH_METADATA_FIELD = "firebase_auth_openid_profile";

/** Amount of time to wait for auth init before resolving as unauthenticated */
const AUTH_INIT_TIMEOUT = 2000;

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase {
  private isAuthenticating = false;

  // Emit the most recent auth state for tracking native api init
  private authState$ = new ReplaySubject<User | null>(1);

  /** Sign in methods to call depending on provider */
  private providerMapping: Record<ISignInProvider, () => Promise<SignInResult>> = {
    "apple.com": async () => FirebaseAuthentication.signInWithApple(),
    "google.com": async () => FirebaseAuthentication.signInWithGoogle(),
  };

  public override async initialise(injector: Injector) {
    const firebaseService = injector.get(FirebaseService);
    // TODO - is service required here?
    if (!firebaseService.app) {
      throw new Error("[Firebase Auth] app not configured");
    }
    this.subscribeToAuthStateChanges();

    // Attempt to immediately load any previously signed in user
    // (web and native app following web-layer force_reload action)
    await this.handleAutomatedLogin();
  }

  private subscribeToAuthStateChanges() {
    FirebaseAuthentication.addListener("authStateChange", async (e) => {
      this.authState$.next(e.user);
    });
  }

  private async waitForAuthStateReady(): Promise<void> {
    try {
      await firstValueFrom(this.authState$.pipe(timeout(AUTH_INIT_TIMEOUT)));
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.warn(
          "[Firebase Auth] Timeout waiting for authStateChange event, proceeding anyway.",
          "This may indicate a slow network or Firebase initialization issue."
        );
      }
    }
  }

  public override async signIn(providerId: ISignInProvider) {
    // HACK - Avoid duplicate requests sometimes seen on web when popup fails to communicate correctly
    // See https://github.com/IDEMSInternational/open-app-builder/pull/3052
    if (this.isAuthenticating) {
      console.warn("[Firebase Auth] Auth already in progress, ignore duplicate request");
      return this.authUser();
    }

    const signInFn = this.providerMapping[providerId];
    if (signInFn) {
      try {
        this.isAuthenticating = true;
        const { user, additionalUserInfo } = await signInFn();
        if (user) {
          // Note: Apple allows for anonymous sign-in so profile info may be minimal
          const { profile = {} } = additionalUserInfo;
          this.setAuthUser(user, profile);
          this.saveUserInfo(user, profile);
        } else {
          console.warn("[Firebase Auth] sign-in returned no user");
        }
      } catch (error) {
        console.error("[Firebase Auth] sign-in error", error);
      } finally {
        this.isAuthenticating = false;
      }
    } else {
      console.warn(`[Firebase Auth] no support for provider ${providerId}, signing out`);
      await this.signOut();
    }

    return this.authUser();
  }

  public override async signOut() {
    await FirebaseAuthentication.signOut();
    this.authUser.set(undefined);
    localStorage.removeItem(AUTH_METADATA_FIELD);
    return this.authUser();
  }

  public override async deleteAccount() {
    const currentUser = this.authUser();
    if (!currentUser) {
      console.error("[Firebase Auth] Delete account failed, no user logged in");
      return this.authUser();
    }

    try {
      await this.deleteUser();
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN
      ) {
        try {
          console.log("[Firebase Auth] re-authenticating user to delete account");
          await this.reauthenticate();
          await this.deleteUser();
        } catch (reauthError) {
          console.error("[Firebase Auth] re-authentication failed:", reauthError);
        }
      } else {
        console.error("[Firebase Auth] error deleting user account:", error);
      }
    }

    return this.authUser();
  }

  private async deleteUser() {
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
   * As such use localStorage to persist and retrieve openID profile information.
   * @returns The authenticated user if login was successful, null otherwise
   */
  private async handleAutomatedLogin(): Promise<IAuthUser | null> {
    let { user } = await FirebaseAuthentication.getCurrentUser();
    const hasStoredProfile = !!localStorage.getItem(AUTH_METADATA_FIELD);
    const currentAuthUser = this.authUser();

    // If we have a stored profile but no user yet, wait for authStateChange event to fire.
    // This handles race condition where getCurrentUser() returns null initially but authStateChange fires shortly after
    if (!user && hasStoredProfile && !currentAuthUser) {
      console.log("[Firebase Auth] Stored profile found, waiting for auth state to initialize...");
      await this.waitForAuthStateReady();
      // If auth user is now set (by listener), return early
      const authUserAfterWait = this.authUser();
      if (authUserAfterWait) return authUserAfterWait;
      // Re-fetch user after auth state is ready
      ({ user } = await FirebaseAuthentication.getCurrentUser());
    }

    // Avoid setting the same user if already loaded
    if (user?.uid === currentAuthUser?.uid) return currentAuthUser;

    if (!user) return null;

    console.log("[Firebase Auth] user", user);
    const storedProfile = localStorage.getItem(AUTH_METADATA_FIELD);
    if (storedProfile) {
      this.setAuthUser(user, JSON.parse(storedProfile));
      console.log("[Firebase Auth] Automated login successful with stored profile");
    } else {
      // Trigger automated login depending on provider
      const providerId = user.providerData?.[0]?.providerId;
      await this.signIn(providerId as any);
    }
    return this.authUser();
  }

  /**
   * Re-authenticate the currently logged in user.
   * Recent sign in is required before some sensitive actions (e.g. deleting account)
   */
  private async reauthenticate() {
    const { user } = await FirebaseAuthentication.getCurrentUser();
    if (user) {
      const providerId = user.providerData?.[0]?.providerId;
      await this.signIn(providerId as any);
    }
  }
}
