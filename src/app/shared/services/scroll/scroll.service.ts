import { Injectable, NgZone } from "@angular/core";
import { ViewportScroller } from "@angular/common";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ScrollService extends SyncServiceBase {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private viewportScroller: ViewportScroller,
    private ngZone: NgZone
  ) {
    super("Scroll");
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      scroll_top: async (action) => {
        let {} = action as {};
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
      console.log("[SCROLL_TOP] Scrolled visible ion-content to top");
    } else {
      console.warn("[SCROLL_TOP] No scrollable inner div found in visible ion-content");
    }
  }
}
