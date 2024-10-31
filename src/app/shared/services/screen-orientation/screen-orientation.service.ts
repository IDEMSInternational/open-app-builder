import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { ScreenOrientation, OrientationLockType } from "@capacitor/screen-orientation";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

const ORIENTATION_TYPES: OrientationLockType[] = ["portrait", "landscape"];

@Injectable({
  providedIn: "root",
})
export class ScreenOrientationService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("Screen Orientation Service");
    this.initialise();
  }

  initialise() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      screen_orientation: async ({ args }) => {
        const [targetOrientation] = args;
        if (ORIENTATION_TYPES.includes(targetOrientation)) {
          this.setOrientation(targetOrientation);
        } else {
          console.error(`[SCREEN ORIENTATION] - Invalid orientation: ${targetOrientation}`);
        }
      },
    });
  }

  private async setOrientation(orientation: OrientationLockType) {
    return await ScreenOrientation.lock({ orientation });
  }
}
