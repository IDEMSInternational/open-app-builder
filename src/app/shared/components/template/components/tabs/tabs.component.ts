import {
  Component,
  computed,
  signal,
  afterNextRender,
  ChangeDetectionStrategy,
} from "@angular/core";
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

  // ============================================================================
  // WORKAROUND: MatTabGroup initialization timing issue
  // ============================================================================
  // TODO: Workaround added in https://github.com/IDEMSInternational/open-app-builder/pull/3248
  //       Consider removing this workaround when core Angular and/or Angular Material/related
  //       libraries are updated. See https://github.com/IDEMSInternational/open-app-builder/issues/3234
  //       Issue: MatTabGroup can fail to initialize properly if created before DOM elements
  //       are available, attempting to add handlers to non-existent elements.
  //       See: https://github.com/IDEMSInternational/open-app-builder/issues/3256
  //
  // To remove:
  // 1. Delete the viewReady signal and shouldRenderTabs computed below
  // 2. Remove the afterNextRender call from constructor
  // 3. Remove the @if (shouldRenderTabs()) wrapper in tabs.component.html (replace with @if (tabRows().length > 0))
  // 4. Remove [disableRipple]="true" from mat-tab-group in tabs.component.html
  // 5. Test according to instructions in https://github.com/IDEMSInternational/open-app-builder/issues/3256
  // ============================================================================
  private viewReady = signal(false);

  public shouldRenderTabs = computed(() => {
    return this.viewReady() && this.tabRows().length > 0;
  });

  constructor() {
    super();
    // Defer rendering until after Angular's first render cycle completes
    afterNextRender(() => this.viewReady.set(true));
  }
  // ============================================================================
  // END WORKAROUND
  // ============================================================================
}
