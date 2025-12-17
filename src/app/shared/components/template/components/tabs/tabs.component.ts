import { ChangeDetectionStrategy, Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Duration of tab transition animations in milliseconds. Set to 0 to disable animations. Default 200ms */
  animation_duration_ms: coerce.number(200),
  /** When true, tab buttons are not stretched to fill available width. Default false */
  compact_buttons: coerce.boolean(false),
  /**
   * When true, animate the change in height of the tab group when the active tab content changes. Default true
   * Dev note: the associated property exposed by Angular Material is misleadingly documented, see:
   * https://github.com/angular/components/issues/7255#issuecomment-464602008
   * */
  animate_height: coerce.boolean(true),
  /** When true, tab content is preserved when switching tabs (not destroyed/recreated). Default true (recommended) */
  preserve_content: coerce.boolean(true),
  /** Zero-based index of the initially selected tab. Default 0 */
  selected_index: coerce.number(0),
}));

@Component({
  selector: "plh-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplTabsComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  animationDuration = computed(() => `${this.params().animationDurationMs}ms`);

  public tabRows = computed(() => {
    return this.rows()
      .filter((row) => row.type === "tab")
      .map((tabRow) => ({
        label: tabRow.parameter_list?.label || tabRow.value || tabRow.name || "",
        childRows: tabRow.rows || [],
        name: tabRow.name,
      }));
  });
}
