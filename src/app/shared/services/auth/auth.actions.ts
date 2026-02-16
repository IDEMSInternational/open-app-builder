import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { AuthService } from "./auth.service";

export class AuthActionFactory {
  constructor(private service: AuthService) {}

  public auth: IActionHandler = async ({ args }) => {
    const [actionId] = args;

    const sign_in_google = async () => await this.service.signIn("google.com");
    const sign_in_apple = async () => await this.service.signIn("apple.com");
    const sign_out = async () => await this.service.signOut();
    const delete_account = async () => await this.service.deleteAccount();

    const childActions = {
      sign_in_google,
      sign_in_apple,
      sign_out,
      delete_account,
    };

    if (!(actionId in childActions)) {
      console.error(`[AUTH] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId]();
  };

  /**
   * @deprecated since v0.16.27
   * Use `auth: sign_in_google` instead
   * */
  public google_auth: IActionHandler = async () => await this.service.signIn("google.com");
}
