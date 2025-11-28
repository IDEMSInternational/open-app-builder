import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { FlowTypes } from "data-models";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  animation_duration_ms: coerce.number(200),
  compact_buttons: coerce.boolean(),
}));

@Component({
  selector: "plh-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
})
export class TmplTabsComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  animationDuration = computed(() => `${this.params().animationDurationMs}ms`);

  public tabRows = computed(() => {
    return this.rows()
      .filter((row) => row.type === "tab")
      .map((tabRow) => ({
        label: tabRow.parameter_list?.label || tabRow.value || tabRow.name,
        childRows: tabRow.rows || [],
        name: tabRow.name,
      }));
  });
}
