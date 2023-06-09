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
            const [text] = shareArgs;
            await this.share({ text: String(text) });
          },
          url: async () => {
            const [url] = shareArgs;
            await this.share({ url });
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
    const { value: canShare } = await Share.canShare();
    if (canShare) {
      try {
        const { activityType } = await Share.share(options);
        console.log("[SHARE] Content shared to", activityType);
      } catch {
        console.log("[SHARE] Share cancelled");
      }
    } else console.error("[SHARE] Sharing is not supported on this device");
  }
}
