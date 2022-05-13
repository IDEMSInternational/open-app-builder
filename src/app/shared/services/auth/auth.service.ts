import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  googleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }
}
