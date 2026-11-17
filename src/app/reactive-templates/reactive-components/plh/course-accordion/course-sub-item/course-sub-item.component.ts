import { Component, computed, inject, OnDestroy, OnInit } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { defineParameters, Parameter } from "../../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../../row-base.component";
import { CourseAccordionComponent } from "../course-accordion.component";

const parameters = () =>
  defineParameters({
    completed: new Parameter("completed", false),
    title: new Parameter("title", ""),
    locked: new Parameter("locked", false),
    highlighted: new Parameter("highlighted", false),
    completedText: new Parameter("completed_text", "Completed"),
    lockedText: new Parameter("locked_text", "Locked"),
  });

/**
 * A single lesson row within a course accordion.
 * Reactive port of `plh_course_sub_item` (`packages/components/plh/course-accordion/course-sub-item`).
 */
@Component({
  selector: "oab-course-sub-item",
  templateUrl: "./course-sub-item.component.html",
  styleUrls: ["./course-sub-item.component.scss"],
  imports: [IonicModule, UpperCasePipe],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class CourseSubItemComponent
  extends RowBaseComponent<ReturnType<typeof parameters>>
  implements OnInit, OnDestroy
{
  /** The enclosing accordion, which counts its sub-items to show progress */
  private accordion = inject(CourseAccordionComponent, { optional: true });

  /** Mutually exclusive state: locked > completed > highlighted > default */
  public state = computed<"locked" | "completed" | "highlighted" | "default">(() => {
    if (this.params.locked.value()) return "locked";
    if (this.params.completed.value()) return "completed";
    if (this.params.highlighted.value()) return "highlighted";
    return "default";
  });

  public iconName = computed(() => {
    switch (this.state()) {
      case "locked":
        return "lock-closed-outline";
      case "completed":
        return "checkmark-circle-outline";
      default:
        return "chevron-forward-circle-outline";
    }
  });

  public ngOnInit(): void {
    super.ngOnInit();
    this.accordion?.registerSubItem({
      element: this.elementRef.nativeElement,
      visible: this.condition,
      completed: this.params.completed.value,
    });
  }

  public handleClick(): void {
    if (this.params.locked.value()) return;
    this.triggerActions("click");
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.accordion?.unregisterSubItem(this.elementRef.nativeElement);
  }
}
