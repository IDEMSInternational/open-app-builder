import { Component, computed, input } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "plh-lesson-button",
  templateUrl: "./lesson-button.component.html",
  styleUrls: ["./lesson-button.component.scss"],
  standalone: false,
})
export class LessonButtonComponent extends TemplateBaseComponent {
  completed = input(false);
  title = input("");
  locked = input(false);
  highlighted = input(false);

  /** priority: locked > completed > highlighted */
  public state = computed<"locked" | "completed" | "highlighted" | "default">(() => {
    if (this.locked()) return "locked";
    if (this.completed()) return "completed";
    if (this.highlighted()) return "highlighted";
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
    if (this.locked()) return;
    this.triggerActions("click");
  }
}
