import { Injectable, Injector } from "@angular/core";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";
import { getAuth } from "firebase/auth";
import { FirebaseService } from "../../firebase/firebase.service";
import { AuthProviderBase } from "./base.auth";
import { IAuthUser } from "../types";

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
    // use firebase authStateReady to ensure any previously logged in user is available
    await getAuth().authStateReady();
  }

  public async signInWithGoogle() {
    const { user, additionalUserInfo } = await FirebaseAuthentication.signInWithGoogle();
    if (user) {
      const authUser: IAuthUser = {
        uid: user.uid,
        // use properties from openid profile instead of firebase profile where possible
        name: additionalUserInfo.profile?.name as string,
        picture: additionalUserInfo.profile?.picture as string,
        given_name: additionalUserInfo.profile?.given_name as string,
        family_name: additionalUserInfo.profile?.family_name as string,
      };
      this.authUser.set(authUser);
    }
    return this.authUser();
  }

  public async signOut() {
    await FirebaseAuthentication.signOut();
    this.authUser.set(undefined);
    return this.authUser();
  }
}
