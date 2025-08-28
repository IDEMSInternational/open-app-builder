import { AfterViewChecked, Component, forwardRef, OnInit } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { FlowTypes } from "packages/data-models";

@Component({
  selector: "oab-nested-template",
  templateUrl: "./nested-template.component.html",
  styleUrls: ["./nested-template.component.scss"],
  standalone: true,
  imports: [forwardRef(() => ReactiveTemplateComponent)],
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
})
export class NestedTemplateComponent
  extends RowBaseComponent<null>
  implements AfterViewChecked, OnInit
{
  private initialised = false;

  public override ngOnInit(): void {
    super.ngOnInit();

    this.watchChildDependencies();
  }

  /*
   * Lifecycle hook that is called after the view has been checked.
   * This is where we can override variable values after all child rows
   * in the nested template have been processed.
   *
   * 'this.initialised' ensures that this only executes once.
   */
  public ngAfterViewChecked(): void {
    if (this.initialised) return;

    // Override variable values after all child rows in the nested template have been created
    for (const row of this.row().rows) {
      this.setTemplateVariable(row);
    }

    this.initialised = false;
  }

  /*
   * Watches dependencies of all child rows and updates
   * equivalent inner template variables when their values change
   */
  private watchChildDependencies() {
    for (const row of this.row().rows) {
      const subs = this.rowService.watchDependencies(row, "local", this.namespace(), () => {
        this.setTemplateVariable(row);
      });
      this.subscriptions.push(...subs);
    }
  }

  private setTemplateVariable(row: FlowTypes.TemplateRow) {
    this.variableStore.set(
      this.namespaceService.getFullName(this.name(), row.name),
      this.rowService.evaluateValue(row, this.namespace())
    );
  }
}
