import { Component, Signal, computed } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, scan } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { extractTemplateNameFromUrl } from "../../utils/template-utils";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

interface INavigationBarButton {
  image: string | null;
  name?: string | null;
  targetTemplate: string | null;
  text?: string | null;
}

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  button_list: coerce.objectArray<INavigationBarButton>([
    { image: null, name: null, targetTemplate: null, text: null },
  ]),
  variant: coerce.allowedValues(["text_primary_contrast", "text_primary"], "text_primary_contrast"),
  /** When true, the highlighting of the last active button is persisted when the user navigates away from the page. */
  persist_highlight: coerce.boolean(false),
}));

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
  standalone: false,
})
export class TmplNavigationBarComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** The target template of the last active button (used when persist_highlight is enabled) */
  lastActiveButton: Signal<string | null>;

  constructor(private router: Router) {
    super();

    // Track active button template from navigation events using scan to accumulate state
    const activeButtonFromNavigation$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => extractTemplateNameFromUrl(this.router.url)),
      scan<string | null, string | null>((lastActive, currentTemplate) => {
        const params = this.params();
        if (params.persistHighlight && currentTemplate) {
          return this.findMatchingButtonTemplate(params.buttonList, currentTemplate);
        }
        return lastActive;
      }, null)
    );

    // Convert navigation-based updates to signal
    const activeButtonFromNavigation = toSignal(activeButtonFromNavigation$, {
      initialValue: null,
    });

    // Combine with initial state check using computed
    // This ensures we check the initial URL after component is fully initialized
    this.lastActiveButton = computed(() => {
      const fromNavigation = activeButtonFromNavigation();
      if (fromNavigation !== null) {
        return fromNavigation;
      }
      // Check current URL for initial state
      const currentTemplate = extractTemplateNameFromUrl(this.router.url);
      const params = this.params();
      if (params.persistHighlight && currentTemplate) {
        return this.findMatchingButtonTemplate(params.buttonList, currentTemplate);
      }
      return null;
    });
  }

  /** Find the targetTemplate of a button that matches the given template name */
  private findMatchingButtonTemplate(
    buttonList: INavigationBarButton[],
    templateName: string
  ): string | null {
    const matchingButton = buttonList.find((button) => button.targetTemplate === templateName);
    return matchingButton?.targetTemplate ?? null;
  }
}
