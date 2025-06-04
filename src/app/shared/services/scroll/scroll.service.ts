import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";

type ScrollPosition = "top" | "bottom";
interface IScrollActionParams {
  /**
   * Duration of the scroll animation in milliseconds
   */
  duration?: number;
}

@Injectable({
  providedIn: "root",
})
export class ScrollService extends SyncServiceBase {
  constructor(private templateActionRegistry: TemplateActionRegistry) {
    super("Scroll");
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      scroll: async ({ args, params }) => {
        const [actionId] = args as [ScrollPosition];
        const { duration } = (params as IScrollActionParams) || {};
        const childActions = {
          top: async () => await this.handleScroll("top", duration),
          bottom: async () => await this.handleScroll("bottom", duration),
        };
        if (!(actionId in childActions)) {
          console.error(`[SCROLL] - No action, "${actionId}"`);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  /**
   * Scrolls the visible ion-content to the top or bottom
   * @param position - "top" or "bottom"
   * @param duration - Duration of the scroll animation in milliseconds
   */
  private async handleScroll(position: ScrollPosition, duration: number = 0) {
    const contents = Array.from(
      document.querySelectorAll("ion-content")
    ) as HTMLIonContentElement[];
    const visible = contents.find((c) => c.offsetParent !== null);
    if (visible) {
      if (position === "top") {
        await visible.scrollToTop(duration);
      } else if (position === "bottom") {
        await visible.scrollToBottom(duration);
      } else {
        console.error(`[SCROLL] - Invalid scroll position, "${position}"`);
        return;
      }
      console.log(`[SCROLL] - Scrolled visible ion-content to ${position}`);
    } else {
      console.warn("[SCROLL] - No visible ion-content found");
    }
  }
}
