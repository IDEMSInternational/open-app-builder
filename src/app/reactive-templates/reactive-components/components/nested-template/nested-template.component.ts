import { AfterViewChecked, Component, forwardRef } from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";

@Component({
  selector: "oab-nested-template",
  templateUrl: "./nested-template.component.html",
  styleUrls: ["./nested-template.component.scss"],
  standalone: true,
  imports: [forwardRef(() => ReactiveTemplateComponent)],
})
export class NestedTemplateComponent extends ReactiveBaseComponent implements AfterViewChecked {
  constructor() {
    super({}); // Has no parameters
  }

  ngAfterViewChecked(): void {
    // Override variable values after all child rows in the nested template have been created
    for (const row of this.row().rows) {
      this.variableStore.set(
        this.namespaceService.getFullName(this.name(), row.name),
        this.rowService.evaluateValue(row, this.namespace())
      );
    }
  }
}
