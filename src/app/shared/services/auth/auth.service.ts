import { effect, Injectable, Injector, signal } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DeploymentService } from "../deployment/deployment.service";
import { AuthProviderBase } from "./providers/base.auth";
import { AsyncServiceBase } from "../asyncService.base";
import { getAuthProvider } from "./providers";
import { IAuthUser, ISignInProvider } from "./types";
import { filter, firstValueFrom, map } from "rxjs";
import { TemplateService } from "../../components/template/services/template.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { ServerService } from "../server/server.service";
import { HttpClient } from "@angular/common/http";
import type { IServerUser } from "../server/server.types";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends AsyncServiceBase {
  private provider: AuthProviderBase;

  /** Current auth user (mirrors provider’s signal so callers don’t need the provider). */
  public authUser: AuthProviderBase["authUser"];

  /** List of profiles with same auth id for restore (first device login only) */
  public restoreProfiles = signal<IServerUser[]>([]);

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private localStorageService: LocalStorageService,
    private deploymentService: DeploymentService,
    private injector: Injector,
    private templateService: TemplateService,
    private serverService: ServerService,
    private http: HttpClient,
    private dynamicDataService: DynamicDataService
  ) {
    super("Auth");
    this.provider = getAuthProvider(this.config.provider);
    this.authUser = this.provider.authUser;
    this.registerInitFunction(this.initialise);
    effect(async () => {
      const authUser = this.provider.authUser();
      this.syncStorageToAuthState();
      if (authUser) {
        // perform immediate sync if user signed in to ensure data backed up
        await this.serverService.syncUserData();
        await this.checkForUserRestore(authUser);
      } else {
        this.restoreProfiles.set([]);
      }
    });
    // expose restore profile data to authoring via `app_auth_profiles` internal collection
    effect(async () => {
      const profiles = this.restoreProfiles();
      if (profiles.length > 0) {
        const collectionData = profiles.map((p) => ({ ...p, id: p.app_user_id }));
        await this.dynamicDataService.ready();
        await this.dynamicDataService.setInternalCollection("auth_profiles", collectionData);
        console.log("[Auth] Restore Profiles", profiles);
      }
    });
  }

  /**
   * Sign in with the given sign in provider (e.g. "google.com" or "apple.com").
   * Wraps the auth provider's (e.g. Firebase) signIn method and syncs auth state to storage
   * */
  public async signIn(providerId: ISignInProvider) {
    const result = await this.provider.signIn(providerId);
    this.syncStorageToAuthState();
    return result;
  }

  /** Sign out. Wraps the provider's signOut and syncs auth state to storage */
  public async signOut() {
    const result = await this.provider.signOut();
    this.syncStorageToAuthState();
    return result;
  }

  /** Delete the current account. Wraps the provider's deleteAccount and syncs auth state to storage */
  public async deleteAccount() {
    const result = await this.provider.deleteAccount();
    this.syncStorageToAuthState();
    return result;
  }

  private get config() {
    return this.deploymentService.config.auth || {};
  }

  private async initialise() {
    try {
      await this.provider.initialise(this.injector);
    } catch (error) {
      console.error("[Auth] Provider initialisation failed:", error);
    }
    this.registerTemplateActionHandlers();

    this.syncStorageToAuthState();

    if (this.config.enforceLoginTemplate) {
      // NOTE - Do not await the enforce login to allow other services to initialise in background
      this.enforceLogin(this.config.enforceLoginTemplate);
    }
  }

  private async checkForUserRestore(authUser: IAuthUser) {
    // List all server entries with the same auth_id (multiple devices)
    // TODO - get type-safe return types using openapi http client
    const authEntries = await firstValueFrom(
      this.http
        .get(`/auth_users/${authUser.uid}`, { responseType: "json" })
        .pipe(map((v) => (v as IServerUser[]) || []))
    );

    const currentUserId = this.localStorageService.getProtected("APP_USER_ID");
    const restoreProfiles = authEntries
      .filter((v) => v.app_user_id !== currentUserId)
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
    this.restoreProfiles.set(restoreProfiles);
  }

  private async enforceLogin(templateName: string) {
    // If user already logged in simply return. If providers auto-login during then waiting to verify
    // should be included during the provide init method
    if (this.provider.authUser()) {
      return;
    }
    const { modal } = await this.templateService.runStandaloneTemplate(templateName, {
      showCloseButton: false,
      waitForDismiss: false,
    });
    // wait for user signal to update with a signed in user before dismissing modal
    const authUser$ = toObservable(this.provider.authUser, { injector: this.injector });
    await firstValueFrom(authUser$.pipe(filter((value: IAuthUser | null) => !!value)));
    await modal.dismiss();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      auth: async ({ args }) => {
        const [actionId] = args;
        const childActions = {
          sign_in_google: () => this.signIn("google.com"),
          sign_in_apple: () => this.signIn("apple.com"),
          sign_out: () => this.signOut(),
          delete_account: () => this.deleteAccount(),
        };
        if (!(actionId in childActions)) {
          console.error(`[AUTH] - No action, "${actionId}"`);
          return;
        }
        return childActions[actionId]();
      },
      /**
       * @deprecated since v0.16.27
       * Use `auth: sign_in_google` instead
       * */
      google_auth: async () => await this.signIn("google.com"),
    });
  }

  /** Keep id of auth user info in contact fields for db lookup*/
  private addStorageEntry(auth_user: IAuthUser) {
    this.localStorageService.setProtected("AUTH_USER_ID", auth_user.uid);
    this.localStorageService.setProtected("AUTH_USER_NAME", auth_user.name || "");
    this.localStorageService.setProtected("AUTH_USER_FAMILY_NAME", auth_user.family_name || "");
    this.localStorageService.setProtected("AUTH_USER_GIVEN_NAME", auth_user.given_name || "");
    this.localStorageService.setProtected("AUTH_USER_PICTURE", auth_user.picture || "");
  }

  /**
   * Sync localStorage auth fields to current provider auth state. Used explicitly as well as in effect
   * to avoid race conditions between action list and auth state change.
   * See https://github.com/IDEMSInternational/open-app-builder/pull/3328
   */
  public syncStorageToAuthState() {
    const authUser = this.provider.authUser();
    if (authUser) {
      this.addStorageEntry(authUser);
    } else {
      this.clearUserData();
    }
  }

  private clearUserData() {
    this.localStorageService.removeProtected("AUTH_USER_ID");
    this.localStorageService.removeProtected("AUTH_USER_NAME");
    this.localStorageService.removeProtected("AUTH_USER_FAMILY_NAME");
    this.localStorageService.removeProtected("AUTH_USER_GIVEN_NAME");
    this.localStorageService.removeProtected("AUTH_USER_PICTURE");
  }
}
