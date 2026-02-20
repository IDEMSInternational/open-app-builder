import { Component, computed } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  completed: coerce.boolean(false),
  title: coerce.string(""),
  locked: coerce.boolean(false),
  highlighted: coerce.boolean(false),
}));

@Component({
  selector: "plh-course-sub-item",
  templateUrl: "./course-sub-item.component.html",
  styleUrls: ["./course-sub-item.component.scss"],
  standalone: false,
})
export class PlhCourseSubItemComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** priority: locked > completed > highlighted */
  public state = computed<"locked" | "completed" | "highlighted" | "default">(() => {
    const p = this.params();
    if (p.locked) return "locked";
    if (p.completed) return "completed";
    if (p.highlighted) return "highlighted";
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

  public handleClick() {
    if (this.params().locked) return;
    this.triggerActions("click");
  }
}
