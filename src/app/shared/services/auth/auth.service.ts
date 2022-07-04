import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";
import { BehaviorSubject } from "rxjs";
import { first, filter } from "rxjs/operators";
import { APP_CONSTANTS } from "src/app/data";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private authUser$ = new BehaviorSubject<User | null>(null);

  // include auth import to ensure app registered
  constructor(auth: Auth) {
    this.addAuthListeners();
  }

  /** Return a promise that resolves after a signed in user defined */
  public async waitForSignInComplete() {
    return this.authUser$
      .pipe(
        filter((value?: User | null) => !!value),
        first()
      )
      .toPromise();
  }

  public async signInWithGoogle() {
    return FirebaseAuthentication.signInWithGoogle();
  }

  public async signOut() {
    return FirebaseAuthentication.signOut();
  }

  public async getCurrentUser() {
    const { user } = await FirebaseAuthentication.getCurrentUser();
    return user;
  }

  /** Listen to auth state changes and update local subject accordingly */
  private addAuthListeners() {
    FirebaseAuthentication.addListener("authStateChange", ({ user }) => {
      console.log("[User] updated", user);
      this.addStorageEntry(user);
      this.authUser$.next(user);
    });
  }

  /** Keep a subset of auth user info in contact fields for db lookup*/
  private addStorageEntry(user?: User) {
    const { APP_AUTH_USER } = APP_CONSTANTS.APP_FIELDS;
    if (user) {
      const { uid } = user;
      localStorage.setItem(APP_AUTH_USER, JSON.stringify({ uid }));
    } else {
      localStorage.removeItem(APP_AUTH_USER);
    }
  }
}
