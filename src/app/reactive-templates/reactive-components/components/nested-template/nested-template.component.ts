import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  forwardRef,
  OnInit,
  viewChild,
} from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { After } from "v8";

@Component({
  selector: "oab-nested-template",
  templateUrl: "./nested-template.component.html",
  styleUrls: ["./nested-template.component.scss"],
  standalone: true,
  imports: [forwardRef(() => ReactiveTemplateComponent)],
})
export class NestedTemplateComponent
  extends ReactiveBaseComponent
  implements OnInit, AfterViewChecked
{
  constructor() {
    super({}); // Has no parameters
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewChecked(): void {
    // Override the variable value after all child rows in the nested template have been created
    // todo: Also need to override the row expression.
    for (const row of this.row().rows) {
      this.variableStore.set(row.name, this.rowService.evaluate(row));
    }
  }
}
