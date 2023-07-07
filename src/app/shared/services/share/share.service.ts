import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { Share, ShareOptions } from "@capacitor/share";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { ErrorHandlerService } from "../error-handler/error-handler.service";

@Injectable({
  providedIn: "root",
})
export class ShareService extends SyncServiceBase {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private errorHandler: ErrorHandlerService
  ) {
    super("Share");
    this.initialise();
  }

  private initialise() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      share: async ({ args }) => await this.share({ text: args[0] }),
    });
  }

  async share(options: ShareOptions) {
    const { value: canShare } = await Share.canShare();
    if (canShare) {
      try {
        const { activityType } = await Share.share(options);
        console.log("[SHARE] Content shared to", activityType);
      } catch (error) {
        if (error.message === "Abort due to cancellation of share.") {
          console.log("[SHARE] Share cancelled by user");
        }
        this.errorHandler.handleError(error);
      }
    } else console.error("[SHARE] Sharing is not supported on this device");
  }
}
