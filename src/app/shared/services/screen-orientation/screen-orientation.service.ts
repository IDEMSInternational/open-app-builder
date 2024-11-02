import { effect, Injectable, signal } from "@angular/core";
import { ScreenOrientation, OrientationLockType } from "@capacitor/screen-orientation";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { ActivatedRoute } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { distinctUntilChanged, filter, map } from "rxjs";
import { AsyncServiceBase } from "../asyncService.base";

// Supported orientation types
const ORIENTATION_TYPES: OrientationLockType[] = ["portrait", "landscape"];

type IOrientationType = (typeof ORIENTATION_TYPES)[number];

@Injectable({
  providedIn: "root",
})
export class ScreenOrientationService extends AsyncServiceBase {
  private orientation = signal<IOrientationType>("portrait");
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private route: ActivatedRoute
  ) {
    super("Screen Orientation Service");
    effect(() => {
      this.setOrientation(this.orientation());
    });
    this.registerInitFunction(this.initialise);
  }

  async initialise() {
    // TODO: expose a property at deployment config level to enable "landscape_mode" to avoid unnecessary checks
    // AND/OR: check on init if any templates actually use screen orientation metadata?
    if (Capacitor.isNativePlatform()) {
      const currentOrientation = await this.getOrientation();
      this.orientation.set(currentOrientation);
      this.watchOrientationParam();
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
