import { Component, Signal, signal, effect } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TemplateNavService } from "../../services/template-nav.service";

interface INavigationBarButton {
  image: string | null;
  name?: string | null;
  target_template: string | null;
  text?: string | null;
}

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  button_list: coerce.objectArray<INavigationBarButton>([
    { image: null, name: null, target_template: null, text: null },
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

  constructor(private templateNavService: TemplateNavService) {
    super();

    // Update lastActiveButton when template changes and matches a button
    effect(() => {
      const template = this.templateNavService.currentTemplateName();
      const params = this.params();
      if (params.persistHighlight && template) {
        const matchingButton = params.buttonList.find(
          (button) => button.targetTemplate === template
        );
        if (matchingButton) {
          this.lastActiveButton.set(matchingButton.targetTemplate);
        }
      }
    });
  }
}
