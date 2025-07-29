import { AfterViewChecked, Component, computed, forwardRef, OnInit } from "@angular/core";
import { ReactiveBaseComponent } from "../../reactive-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";

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
  public nestedNamespace = computed(() => this.namespaceService.get(this.namespace(), this.name()));

  constructor() {
    super({}); // Has no parameters
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewChecked(): void {
    // Override variable values after all child rows in the nested template have been created
    // todo: Also need to override the row expression.
    for (const row of this.row().rows) {
      this.variableStore.set(
        this.nestedNamespace() + "." + row.name,
        this.rowService.evaluate(row)
      );
    }
  }
}
