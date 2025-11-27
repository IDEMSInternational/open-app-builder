import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  animation_duration_ms: coerce.number(200),
  stretch_tab_buttons: coerce.boolean(),
}));

@Component({
  selector: "plh-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
})
export class TmplTabsComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  animationDuration = computed(() => `${this.params().animationDurationMs}ms`);

  // Get label for button from child tab row's value
  getTabLabel(childRow: any): string {
    if (childRow.type !== "tab") {
      console.error(
        `[Tabs Component] Unexpected row type "${childRow.type}" in tabs component. Only "tab" rows are allowed as direct children of "tabs". Row name: ${childRow.name}`
      );
      return "";
    }
    return childRow.value || "";
  }
}
