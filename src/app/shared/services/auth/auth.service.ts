import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {}

  signInGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithRedirect(provider);
  }

  signOut() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }
}
