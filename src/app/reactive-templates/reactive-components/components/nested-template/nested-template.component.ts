import { Component, effect, forwardRef, OnInit, viewChild } from "@angular/core";
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
export class NestedTemplateComponent extends RowBaseComponent<null> implements OnInit {
  private reactiveTemplate = viewChild.required(ReactiveTemplateComponent);

  constructor() {
    super();

    effect(
      () => {
        if (this.reactiveTemplate().initialised()) {
          this.onTemplateInitialized();
        }
      },
      { allowSignalWrites: true }
    );
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.watchChildDependencies();
  }

  private onTemplateInitialized() {
    for (const row of this.row().rows) {
      this.setTemplateVariable(row);
    }
  }

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
      this.evaluationService.evaluateExpression(row.value, this.namespace())
    );
  }
}
