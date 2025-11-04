import { Component, effect, forwardRef, OnDestroy, OnInit, viewChild } from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { FlowTypes } from "packages/data-models";
import { Subscription } from "rxjs";

@Component({
  selector: "oab-nested-template",
  templateUrl: "./nested-template.component.html",
  styleUrls: ["./nested-template.component.scss"],
  standalone: true,
  imports: [forwardRef(() => ReactiveTemplateComponent)],
  providers: [{ provide: ROW_PARAMETERS, useValue: null }],
})
export class NestedTemplateComponent extends RowBaseComponent<null> implements OnInit, OnDestroy {
  private reactiveTemplate = viewChild.required(ReactiveTemplateComponent);
  private childDependencySubscriptions: Subscription[] = [];
  private templateInitialised = false;

  constructor() {
    super();

    effect(
      () => {
        if (this.reactiveTemplate().initialised() && !this.templateInitialised) {
          this.onTemplateInitialised();
          this.templateInitialised = true;
        }
      },
      { allowSignalWrites: true }
    );
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.watchChildDependencies();
  }

  private onTemplateInitialised() {
    for (const row of this.row().rows) {
      this.setChildVariable(row);
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
          this.setChildVariable(row);
        });
      this.childDependencySubscriptions.push(sub);
    }
  }

  private setChildVariable(row: FlowTypes.TemplateRow) {
    const dependencies = this.evaluationService.getDependencies(row.value, this.namespace());
    const isStaticValue = dependencies && dependencies.length === 0;

    if (isStaticValue) {
      this.setChildExpression(row);
    } else {
      this.setChildValue(row);
    }
  }

  private setChildExpression(row: FlowTypes.TemplateRow) {
    const rowFullName = this.namespaceService.getFullName(this.name(), row.name);
    if (this.rowRegistry.has(rowFullName)) {
      this.rowRegistry.get(rowFullName)?.setExpression(row.value);
    }
  }

  private setChildValue(row: FlowTypes.TemplateRow) {
    this.variableStore.set(
      this.namespaceService.getFullName(this.name(), row.name),
      this.evaluationService.evaluateExpression(row.value, this.namespace())
    );
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
