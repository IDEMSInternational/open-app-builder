import { Injectable, NgZone } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { AuthStateChange, FirebaseAuthentication } from "@capacitor-firebase/authentication";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly authStateSubj = new Subject<AuthStateChange>();

  constructor(public afAuth: AngularFireAuth, private readonly ngZone: NgZone) {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener("authStateChange", (change) => {
        this.ngZone.run(() => {
          this.authStateSubj.next(change);
        });
      });
    });
  }

  public get authState$(): Observable<AuthStateChange> {
    return this.authStateSubj.asObservable();
  }

  // with native SDK:
  async signInWithGoogle() {
    // 1. Create credentials on the native layer
    const result = await FirebaseAuthentication.signInWithGoogle();
    // 2. Sign in on the web layer using the id token
    const credential = GoogleAuthProvider.credential(result.credential?.idToken);
    const auth = getAuth();
    await signInWithCredential(auth, credential);
  }
  // without native SDK:
  // async signInWithGoogle() {
  //   const result = await FirebaseAuthentication.signInWithGoogle();
  //   await result.user
  // }

  async signOut() {
    await FirebaseAuthentication.signOut();
  }

  async getCurrentUser() {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  }
}
