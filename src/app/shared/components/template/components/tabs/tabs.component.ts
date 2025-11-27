import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  stretch_tab_buttons: coerce.boolean(),
}));

@Component({
  selector: "plh-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
})
export class TmplTabsComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  // Get label from child tab row's value
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
