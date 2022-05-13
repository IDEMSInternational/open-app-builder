import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";
// import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  async signOut() {
    return this.afAuth.signOut();
  }

  async getCurrentUser() {
    return firebase.auth().currentUser;
  }

  // async signInWithGoogle() {
  //   const result = await FirebaseAuthentication.signInWithGoogle();
  //   return result.user;
  // }

  // async signOut() {
  //   await FirebaseAuthentication.signOut();
  // }

  // async getCurrentUser() {
  //   const result = await FirebaseAuthentication.getCurrentUser();
  //   return result.user;
  // }
}
