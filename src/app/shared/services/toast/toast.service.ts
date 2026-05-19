import { Injectable } from "@angular/core";
import { Toast } from "@capacitor/toast";
import { SyncServiceBase } from "../syncService.base";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

interface IToastActionParams {
  message?: string;
  /**
   * Either 'short' (2000ms) or 'long' (3500ms).
   * Arbitrary ms values are not supported by the Capacitor API (a restriction of the native platforms).
   * @default 'short'
   */
  duration?: "short" | "long";
  /**
   * On Android 12 and newer, all toasts are always shown at the bottom regardless of this value.
   * @default 'bottom'
   */
  position?: "bottom" | "center" | "top";
}

@Injectable({
  providedIn: "root",
})
export class ToastService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("Toast");
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      toast: async (action) => {
        let { params } = action as { params: IToastActionParams };
        if (params) {
          await this.handleToast(params);
        } else {
          return console.error("[TOAST] No params provided to `toast` action");
        }
      },
    });
  }

  private async handleToast(params: IToastActionParams) {
    try {
      if (params.message) {
        await Toast.show({
          text: params.message,
          duration: params.duration,
          position: params.position,
        });
      }
    } catch (error) {
      console.error("[TOAST] Error displaying toast", error);
    }
  }
}
