import { effect, Injectable } from "@angular/core";
import { ScreenOrientation } from "@capacitor/screen-orientation";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { Capacitor } from "@capacitor/core";
import { TemplateMetadataService } from "../../components/template/services/template-metadata.service";
import { SyncServiceBase } from "../syncService.base";
import { environment } from "src/environments/environment";

/** List of possible orientations provided by authors */
const SCREEN_ORIENTATIONS = ["portrait", "landscape", "unlock"] as const;

export type IScreenOrientation = (typeof SCREEN_ORIENTATIONS)[number];

@Injectable({
  providedIn: "root",
})
export class ScreenOrientationService extends SyncServiceBase {
  /** Actively locked screen orientation */
  private lockedOrientation: IScreenOrientation | undefined;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private templateMetadataService: TemplateMetadataService
  ) {
    super("Screen Orientation Service");

    // TODO: expose a property at deployment config level to enable "landscape_mode" to avoid unnecessary checks
    // AND/OR: check on init if any templates actually use screen orientation metadata?
    const isEnabled = Capacitor.isNativePlatform() || !environment.production;

    if (isEnabled) {
      // Add handlers to set orientation on action
      this.registerTemplateActionHandlers();
      // Set orientation when template parameter orientation changes
      effect(async () => {
        const { orientation } = this.templateMetadataService.parameterList();
        this.setOrientation(orientation);
      });
    }
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      screen_orientation: async ({ args }) => {
        const [targetOrientation] = args;
        this.setOrientation(targetOrientation);
      },
    });
  }

  public async setOrientation(orientation: IScreenOrientation) {
    // avoid re-locking same orientation
    if (orientation === this.lockedOrientation) return;

    this.lockedOrientation = orientation;

    if (orientation && orientation !== "unlock") {
      if (SCREEN_ORIENTATIONS.includes(orientation)) {
        console.log(`[SCREEN ORIENTATION] - Lock ${orientation}`);
        return ScreenOrientation.lock({ orientation });
      } else {
        console.error(`[SCREEN ORIENTATION] - Invalid orientation: ${orientation}`);
      }
    } else {
      console.log(`[SCREEN ORIENTATION] - Unlock`);
      return ScreenOrientation.unlock();
    }
  }
}
