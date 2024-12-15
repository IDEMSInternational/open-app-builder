import { effect, Injectable, Injector, signal } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DeploymentService } from "../deployment/deployment.service";
import { AuthProviderBase } from "./providers/base.auth";
import { AsyncServiceBase } from "../asyncService.base";
import { getAuthProvider } from "./providers";
import { IAuthUser } from "./types";
import { toObservable } from "@angular/core/rxjs-interop";
import { filter, firstValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService extends AsyncServiceBase {
  public authUser = signal<IAuthUser | null>(null);

  /** Auth provider used */
  private provider: AuthProviderBase;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private localStorageService: LocalStorageService,
    private deploymentService: DeploymentService,
    private injector: Injector
  ) {
    super("Auth");
    this.provider = getAuthProvider(this.deploymentService.config.auth?.provider);
    this.registerInitFunction(this.initialise);
    effect(async () => {
      const authUser = this.provider.authUser();
      console.log("[Auth User]", authUser);
      this.addStorageEntry(authUser);
    });
  }

  /** Return a promise that resolves only after a signed in user defined */
  public async waitForUserSignedIn() {
    const authUser$ = toObservable(this.authUser);
    return firstValueFrom(authUser$.pipe(filter((value: IAuthUser | null) => !!value)));
  }

  private async initialise() {
    await this.provider.initialise(this.injector);
    this.registerTemplateActionHandlers();
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

  /** Keep a subset of auth user info in contact fields for db lookup*/
  private addStorageEntry(user?: IAuthUser) {
    if (user) {
      const { uid } = user;
      this.localStorageService.setProtected("APP_AUTH_USER", JSON.stringify({ uid }));
    } else {
      this.localStorageService.removeProtected("APP_AUTH_USER");
    }
  }
}
