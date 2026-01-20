import { Component, effect, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
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
  lastActiveButton = signal<string | null>(null);
  /** Signal tracking the current template name from router navigation events (used when persist_highlight is enabled) */
  private currentTemplateSignal: ReturnType<typeof toSignal<string | null>> | null = null;

  constructor(private router: Router) {
    super();

    const initialTemplate = extractTemplateNameFromUrl(this.router.url);
    this.currentTemplateSignal = toSignal(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => extractTemplateNameFromUrl(this.router.url))
      ),
      { initialValue: initialTemplate }
    );

    // Track route changes when persist_highlight is enabled
    effect(() => {
      if (this.params().persistHighlight) {
        // Update active button on navigation
        const currentTemplate = this.currentTemplateSignal();
        if (currentTemplate) {
          this.updateActiveButton(currentTemplate);
        }
      }
    });
  }

  private updateActiveButton(currentTemplate: string) {
    for (const button of this.params().buttonList) {
      if (button.targetTemplate === currentTemplate) {
        this.lastActiveButton.set(button.targetTemplate);
        return;
      }
    }
  }

  isPersistedActive(button: INavigationBarButton, lastActive: string | null): boolean {
    return (
      this.params().persistHighlight && lastActive !== null && button.targetTemplate === lastActive
    );
  }
}
