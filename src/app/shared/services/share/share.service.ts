import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { Share, ShareOptions } from "@capacitor/share";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

@Injectable({
  providedIn: "root",
})
export class ShareService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("Share");
    this.initialise();
  }

  private initialise() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      share: async ({ args }) => {
        const [actionId, ...shareArgs] = args;
        const childActions = {
          text: async () => {
            const [text, title, dialogTitle] = shareArgs;
            this.share({ text, title, dialogTitle });
          },
        };
        if (!(actionId in childActions)) {
          console.error("'share' does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  async share(options: ShareOptions) {
    await Share.share(options);
  }
}
