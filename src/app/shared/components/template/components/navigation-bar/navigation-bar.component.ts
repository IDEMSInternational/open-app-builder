import { Component, signal, effect, inject, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { TemplateMetadataService } from "../../services/template-metadata.service";

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
}));

@Component({
  selector: "plh-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
  standalone: false,
})
export class TmplNavigationBarComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** Index of link to highlight within navigation bar */
  public activeLinkIndex = signal(0);

  private templateMetaService = inject(TemplateMetadataService);

  private targetTemplates = computed(() => this.params().buttonList.map((v) => v.targetTemplate));

  constructor() {
    super();

    effect(() => {
      // When user navigates to a section matching the nav button target
      // set as the current highlighted section
      const templateName = this.templateMetaService.templateName();
      const targetTemplates = this.targetTemplates();
      const updatedSection = targetTemplates.findIndex((name) => name === templateName);
      if (updatedSection > -1) {
        this.activeLinkIndex.set(updatedSection);
      }
    });
  }
}
