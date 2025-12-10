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

/** LocalStorage field used to store temporary auth profile data */
const AUTH_METADATA_FIELD = "firebase_auth_openid_profile";

export type FirebaseAuthUser = User;

@Injectable({
  providedIn: "root",
})
export class FirebaseAuthProvider extends AuthProviderBase {
  private isAuthenticating = false;
  private authStateReadyPromise: Promise<void> | null = null;

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

    // Create a promise that resolves when the first authStateChange event fires
    // This indicates Firebase has finished initializing and we have the definitive auth state
    let resolveAuthReady: (() => void) | null = null;
    this.authStateReadyPromise = new Promise<void>((resolve) => {
      resolveAuthReady = resolve;
    });

    // Add listener to ensure previously signed in user is updated when auth layer settles (native)
    FirebaseAuthentication.addListener("authStateChange", async (e) => {
      // Resolve the promise on first event (auth state is now ready)
      if (resolveAuthReady) {
        resolveAuthReady();
        resolveAuthReady = null;
      }
      await this.handleAutomatedLogin();
    });

    // Attempt to immediately load any previously signed in user
    // (web and native app following web-layer force_reload action)
    await this.handleAutomatedLogin();
  }

  private async waitForAuthStateReady(timeoutMs = 2000): Promise<void> {
    if (!this.authStateReadyPromise) return;

    // Race between the auth state event and a timeout to prevent hanging forever
    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn(
          "[Firebase Auth] Timeout waiting for authStateChange event, proceeding anyway"
        );
        resolve();
      }, timeoutMs);
    });

    await Promise.race([this.authStateReadyPromise, timeoutPromise]);
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
   * As such use localStorage to persist and retrieve openID profile information
   */
  private async handleAutomatedLogin() {
    let { user } = await FirebaseAuthentication.getCurrentUser();
    const hasStoredProfile = !!localStorage.getItem(AUTH_METADATA_FIELD);
    const currentAuthUser = this.authUser();

    // If we have a stored profile but no user yet, wait for authStateChange event to fire.
    // This handles race condition where getCurrentUser() returns null initially but authStateChange fires shortly after
    if (!user && hasStoredProfile && !currentAuthUser) {
      console.log("[Firebase Auth] Stored profile found, waiting for auth state to initialize...");
      await this.waitForAuthStateReady();
      // If auth user is now set (by listener), we can return early
      if (this.authUser()) return;
      // Re-fetch user after auth state is ready
      ({ user } = await FirebaseAuthentication.getCurrentUser());
    }

    // Avoid setting the same user if already loaded
    if (user?.uid === currentAuthUser?.uid) return;

    if (!user) return;

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
