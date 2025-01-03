import { effect, Injectable, Injector, signal } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DeploymentService } from "../deployment/deployment.service";
import { AuthProviderBase } from "./providers/base.auth";
import { AsyncServiceBase } from "../asyncService.base";
import { getAuthProvider } from "./providers";
import { IAuthUser } from "./types";
import { filter, firstValueFrom, tap } from "rxjs";
import { TemplateService } from "../../components/template/services/template.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { ServerService } from "../server/server.service";

@Injectable({
  providedIn: "root",
})
export class AuthService extends AsyncServiceBase {
  /** Auth provider used */
  private provider: AuthProviderBase;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private localStorageService: LocalStorageService,
    private deploymentService: DeploymentService,
    private injector: Injector,
    private templateService: TemplateService,
    private serverService: ServerService
  ) {
    super("Auth");
    this.provider = getAuthProvider(this.config.provider);
    this.registerInitFunction(this.initialise);
    effect(async () => {
      const authUser = this.provider.authUser();
      await this.checkProfileRestore(authUser);
      this.addStorageEntry(authUser);
      // perform immediate sync if user signed in to ensure data backed up
      if (authUser) {
        this.serverService.syncUserData();
      }
    });
  }

  private get config() {
    return this.deploymentService.config.auth || {};
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    this.registerTemplateActionHandlers();
    if (this.config.enforceLoginTemplate) {
      // NOTE - Do not await the enforce login to allow other services to initialise in background
      this.enforceLogin(this.config.enforceLoginTemplate);
    }
  }

  private async checkProfileRestore(authUser?: IAuthUser) {
    if (!authUser) return;
    const existingUser = this.localStorageService.getProtected("AUTH_USER_ID");
    if (existingUser) return;
    // no existingUser user, should check if authUser exists on server and prompt restore
    // TODO - handle
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
    await firstValueFrom(
      authUser$.pipe(
        tap((authUser) => console.log("auth user", authUser)),
        filter((value: IAuthUser | null) => !!value)
      )
    );
    await modal.dismiss();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      auth: async ({ args }) => {
        const [actionId] = args;
        const childActions = {
          sign_in_google: async () => await this.provider.signInWithGoogle(),
          sign_out: async () => await this.provider.signOut(),
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
      google_auth: async () => {
        return await this.provider.signInWithGoogle();
      },
    });
  }

  /** Keep id of auth user info in contact fields for db lookup*/
  private addStorageEntry(auth_user?: IAuthUser) {
    if (auth_user) {
      this.localStorageService.setProtected("AUTH_USER_ID", auth_user.uid);
    } else {
      this.localStorageService.removeProtected("AUTH_USER_ID");
    }
  }
}
