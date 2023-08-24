import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { FirebaseAuthentication, User } from "@capacitor-firebase/authentication";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { filter } from "rxjs/operators";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class AuthService extends SyncServiceBase {
  private authUser$ = new BehaviorSubject<User | null>(null);
  appFields: IAppConfig["APP_FIELDS"];

  // include auth import to ensure app registered
  constructor(auth: Auth, private appConfigService: AppConfigService) {
    super("Auth");
    this.initialise();
  }
  private initialise() {
    this.subscribeToAppConfigChanges();
    this.addAuthListeners();
  }

  /** Return a promise that resolves after a signed in user defined */
  public async waitForSignInComplete() {
    return firstValueFrom(this.authUser$.pipe(filter((value?: User | null) => !!value)));
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
      // console.log("[User] updated", user);
      this.addStorageEntry(user);
      this.authUser$.next(user);
    });
  }

  /** Keep a subset of auth user info in contact fields for db lookup*/
  private addStorageEntry(user?: User) {
    if (user) {
      const { uid } = user;
      localStorage.setItem(this.appFields.APP_AUTH_USER, JSON.stringify({ uid }));
    } else {
      localStorage.removeItem(this.appFields.APP_AUTH_USER);
    }
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.appFields = appConfig.APP_FIELDS;
    });
  }
}
