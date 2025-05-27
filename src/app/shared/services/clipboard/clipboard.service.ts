import { Injectable } from "@angular/core";
import { Clipboard } from "@capacitor/clipboard";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";
import { Dialog } from "@capacitor/dialog";

interface IClipboardActionParams {
  text?: string;
  message?: string;
}

@Injectable({
  providedIn: "root",
})
export class ClipboardService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("Clipboard");
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      copy: async (action) => {
        let { params } = action as { params: IClipboardActionParams };
        if (params) {
          await this.handleCopy(params);
        } else {
          return console.error("[COPY] No params provided to `copy` action");
        }
      },
    });
  }

  private async handleCopy(params: IClipboardActionParams) {
    try {
      await Clipboard.write({
        string: params.text,
      });
      if (params.message) {
        await Dialog.alert({
          message: params.message,
        });
      }
    } catch (error) {
      console.error("[COPY] Error copying to clipboard", error);
    }
  }
}
