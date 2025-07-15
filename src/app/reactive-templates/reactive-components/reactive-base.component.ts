import { Component, input, OnInit, Signal } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";

@Component({
  selector: "oab-base",
  template: ``,
})
export class ReactiveBaseComponent implements OnInit {
  public row = input.required<FlowTypes.TemplateRow>();

  public name: string;
  public value: Signal<any>;
  public condition: Signal<boolean>;
  public parameters;
  public actions;

  private evaluator = new AppDataEvaluator();
  private dependantVariables: string[];

  constructor(private variableStore: VariableStore) {}

  ngOnInit(): void {
    this.name = this.row()._nested_name;
    this.value = this.variableStore.asSignal(this.row()._nested_name);

    // Initialize the evaluator with a context
    this.setDependencies();
    this.watchDependencies();

    // todo: Add listeners for condition dependencies
    //       reevaluate
    // todo: Add listeners for parameter dependencies
    //       reevaluate
  }

  private setDependencies() {
    const dynamicFields = this.row()._dynamicFields?.value;

    if (!Array.isArray(dynamicFields)) return;

    this.dependantVariables = dynamicFields
      .filter((field: any) => field.type === "local")
      .map((field: any) => field.fieldName);
  }

  private watchDependencies() {
    if (!this.dependantVariables || this.dependantVariables.length === 0) return;

    this.dependantVariables.forEach((fieldName) => {
      this.variableStore.watch(fieldName).subscribe((value) => {
        // Update the value based on the fieldName
        this.evaluator.setExecutionContext(this.getExecutionContext());
        const rowValue = this.evaluator.evaluate(value);
        // todo: dynamically evaluate row value;
        this.variableStore.set(this.name, rowValue);
      });
    });
  }

  private getExecutionContext(): any {
    const context = {
      local: {},
    };

    this.dependantVariables.forEach((fieldName) => {
      context.local[fieldName] = this.variableStore.get(fieldName);
    });
  }
}
