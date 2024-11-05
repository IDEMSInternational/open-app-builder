import { effect, Injectable } from "@angular/core";
import { ScreenOrientation, OrientationLockType } from "@capacitor/screen-orientation";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { Capacitor } from "@capacitor/core";
import { TemplateMetadataService } from "../../components/template/services/template-metadata.service";
import { SyncServiceBase } from "../syncService.base";

// Supported orientation types
const ORIENTATION_TYPES = ["portrait", "landscape"] as const;

type IOrientationType = (typeof ORIENTATION_TYPES)[number];

@Injectable({
  providedIn: "root",
})
export class ScreenOrientationService extends SyncServiceBase {
  private enabled: boolean;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private templateMetadataService: TemplateMetadataService
  ) {
    super("Screen Orientation Service");

    // TODO: expose a property at deployment config level to enable "landscape_mode" to avoid unnecessary checks
    // AND/OR: check on init if any templates actually use screen orientation metadata?
    this.enabled = Capacitor.isNativePlatform();

    if (this.enabled) {
      effect(() => {
        const targetOrientation =
          this.templateMetadataService.parameterList().orientation || "portrait";
        if (targetOrientation && ORIENTATION_TYPES.includes(targetOrientation)) {
          this.setOrientation(targetOrientation);
        }
      });
    }
    this.initialise();
  }

  async initialise() {
    if (this.enabled) {
      this.registerTemplateActionHandlers();
    }
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

  public async setOrientation(orientation: IOrientationType) {
    console.log(`[SCREEN ORIENTATION] - Setting to ${orientation}`);
    return await ScreenOrientation.lock({ orientation: orientation as OrientationLockType });
  }

  private async getOrientation() {
    return (await ScreenOrientation.orientation()).type;
  }
}
