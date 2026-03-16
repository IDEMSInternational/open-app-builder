import { Component, effect, forwardRef, OnDestroy, OnInit, signal, viewChild } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { FlowTypes } from "packages/data-models";
import { Subscription } from "rxjs";

@Component({
  selector: "oab-nested-template",
  templateUrl: "./nested-template.component.html",
  styleUrls: ["./nested-template.component.scss"],
  imports: [forwardRef(() => ReactiveTemplateComponent)],
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
})
export class NestedTemplateComponent extends RowBaseComponent<null> implements OnInit, OnDestroy {
  private reactiveTemplate = viewChild.required(ReactiveTemplateComponent);
  private childDependencySubscriptions: Subscription[] = [];
  private templateInitialised = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this.reactiveTemplate().initialised() && !this.templateInitialised()) {
        this.onTemplateInitialised();
        this.templateInitialised.set(true);
      }
    });
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.watchChildDependencies();
  }

  private onTemplateInitialised() {
    for (const row of this.row().rows) {
      this.setChildExpression(row);
    }
  }

  /**
   * TODO: Can these child dependencies change at runtime?
   */
  private watchChildDependencies() {
    for (const row of this.row().rows) {
      let sub = this.variableStore
        .watchMultiple(this.evaluationService.getDependencies(row.value, this.namespace()))
        .subscribe(() => {
          this.setChildExpression(row);
        });
      this.childDependencySubscriptions.push(sub);
    }
  }

  // For nested variables we always replace the expression because they depend on parent variables
  // So in this context they are dynamic but in the child context they are static.
  private setChildExpression(row: FlowTypes.TemplateRow) {
    const rowFullName = this.namespaceService.getFullName(this.name(), row.name);

    if (this.rowRegistry.has(rowFullName)) {
      const value = this.evaluationService.evaluateExpression(row.value, this.namespace());
      this.rowRegistry.get(rowFullName)?.setExpression(value);
    }
  }

  private unsubscribeChildDependencies() {
    this.childDependencySubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribeChildDependencies();
  }
}
