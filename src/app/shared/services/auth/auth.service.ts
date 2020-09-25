import { Injectable } from "@angular/core";
import { cfaSignIn, cfaSignOut } from "capacitor-firebase-auth";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
/**
 * The auth service handles login and user document sync
 * Native code requirements for auth:
 * https://www.npmjs.com/package/capacitor-firebase-auth
 * Also if signing via google play, ensure correct sha:1
 * added from google play store to firebase
 */
export class AuthService {
  authUser;
  constructor(private afAuth: AngularFireAuth) {}
  init() {
    this._subscribeToAuthUpdates();
  }

  /**
   * Use native capacitor firebase auth sign in with google provider
   * auth state changes still handled by generic listener, but can
   * be subscribed to for receiving update of completion
   */
  signIn() {
    return cfaSignIn("google.com");
    // .subscribe((user) =>
    //   console.log("user", user)
    // );
  }

  /**
   * Sign user out, but retain locally stored data
   */
  signOutUser() {
    cfaSignOut().subscribe((e) => console.log("signed out", e));
  }

  private _subscribeToAuthUpdates() {
    this.afAuth.authState.subscribe(async (user) => {
      this.authUser = user;
    });
  }
}
