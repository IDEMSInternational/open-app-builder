import { Component, computed, effect, forwardRef, Signal, signal, untracked } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { RowListComponent } from "../../row-list.component";

/** A `plh_course_sub_item` rendered anywhere within the accordion (directly or via a loop) */
export interface CourseSubItem {
  element: HTMLElement;
  visible: Signal<boolean>;
  completed: Signal<boolean>;
}

const parameters = () =>
  defineParameters({
    completed: new Parameter("completed", false),
    imageAsset: new Parameter("image_asset", ""),
    imageAlignment: new Parameter<"bottom" | "center" | "centre" | "">("image_alignment", "bottom"),
    locked: new Parameter("locked", false),
    open: new Parameter("open", false),
    title: new Parameter("title", ""),
    subItemsName: new Parameter("sub_items_name", ""),
  });

/**
 * A collapsible course (module) header showing progress through its sub-items (lessons).
 * Reactive port of `plh_course_accordion` (`packages/components/plh/course-accordion`).
 */
@Component({
  selector: "oab-course-accordion",
  templateUrl: "./course-accordion.component.html",
  styleUrls: ["./course-accordion.component.scss"],
  imports: [IonicModule, TemplatePipesModule, forwardRef(() => RowListComponent)],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class CourseAccordionComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  public isOpen = signal(false);

  /** Mutually exclusive state: locked > completed > default */
  public state = computed<"locked" | "completed" | "default">(() => {
    if (this.params.locked.value()) return "locked";
    if (this.params.completed.value()) return "completed";
    return "default";
  });

  public imageAlignment = computed(() => {
    const alignment = this.params.imageAlignment.value();
    return alignment === "center" || alignment === "centre" ? alignment : "bottom";
  });

  /** Sub-items registered by child `plh_course_sub_item` rows */
  private subItems = signal<CourseSubItem[]>([]);
  private visibleSubItems = computed(() => this.subItems().filter((item) => item.visible()));

  public subItemsTotal = computed(() => this.visibleSubItems().length);
  public subItemsCompleted = computed(
    () => this.visibleSubItems().filter((item) => item.completed()).length
  );
  public progressPercent = computed(() => {
    const total = this.subItemsTotal();
    return total ? Math.round((this.subItemsCompleted() / total) * 100) : 0;
  });

  constructor() {
    super();
    // Follow the `open` parameter whenever it changes; the user can still toggle in between
    effect(() => {
      const open = this.params.open.value();
      untracked(() => this.isOpen.set(open));
    });
  }

  public toggleOpen(): void {
    if (!this.params.locked.value()) {
      this.isOpen.update((open) => !open);
    }
  }

  public registerSubItem(subItem: CourseSubItem): void {
    this.subItems.update((subItems) => [...subItems, subItem]);
  }

  public unregisterSubItem(element: HTMLElement): void {
    this.subItems.update((subItems) => subItems.filter((item) => item.element !== element));
  }
}
