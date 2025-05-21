import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";

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
      scroll_top: async () => {
        await this.handleScrollTop();
      },
    });
  }

  private async handleScrollTop() {
    const contents = Array.from(document.querySelectorAll("ion-content")) as HTMLElement[];
    const visible = contents.find((c) => c.offsetParent !== null);
    const scrollable = visible?.shadowRoot?.querySelector(
      "div.inner-scroll.scroll-y"
    ) as HTMLElement;

    if (scrollable) {
      scrollable.scrollTop = 0;
      console.log("[SCROLL] Scrolled visible ion-content to top");
    } else {
      console.warn("[SCROLL] No scrollable inner div found in visible ion-content");
    }
  }
}
