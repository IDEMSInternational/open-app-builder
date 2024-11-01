import { effect, Injectable, WritableSignal } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { ScreenOrientation, OrientationLockType } from "@capacitor/screen-orientation";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { ActivatedRoute } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { distinctUntilChanged, filter, map } from "rxjs";

// Supported orientation types
const ORIENTATION_TYPES: OrientationLockType[] = ["portrait", "landscape"];

type IOrientationType = (typeof ORIENTATION_TYPES)[number];

@Injectable({
  providedIn: "root",
})
export class ScreenOrientationService extends SyncServiceBase {
  private orientation: WritableSignal<IOrientationType>;
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private route: ActivatedRoute
  ) {
    super("Screen Orientation Service");
    effect(() => {
      console.log(`[SCREEN ORIENTATION] - Orientation: ${this.orientation()}`);
      this.setOrientation(this.orientation());
    });
    this.initialise();
  }

  async initialise() {
    // TODO: also check if any templates actually use screen orientation metadata?
    // Or maybe have a toggle to enable "landscape_mode" at deployment config level
    if (Capacitor.isNativePlatform()) {
      const currentOrientation = await this.getOrientation();
      this.orientation.set(currentOrientation);
      this.watchOrientationParam();
    }
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

  private async getOrientation() {
    return (await ScreenOrientation.orientation()).type;
  }

  private watchOrientationParam() {
    this.route.queryParamMap
      .pipe(
        map((params) =>
          params.get("landscape") === "true" ? "landscape" : ("portrait" as IOrientationType)
        ),
        distinctUntilChanged(),
        filter((targetOrientation) => targetOrientation !== this.orientation())
      )
      .subscribe((targetOrientation: OrientationType) => {
        this.orientation.set(targetOrientation);
      });
  }
}
