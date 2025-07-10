import { Component, input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";

@Component({
  selector: "oab-base",
  template: ``,
})
export class ReactiveBaseComponent implements OnInit {
  public row = input<FlowTypes.TemplateRow>();
  public name;

  public value;
  public condition;
  public parameters;
  public actions;

  constructor(private variableStore: VariableStore) {}

  ngOnInit(): void {
    this.name = this.row()._nested_name;
    this.value = this.variableStore.asSignal(this.row()._nested_name);
    this.watchValueDependencies();

    // todo: Add listeners for condition dependencies
    //       reevaluate
    // todo: Add listeners for parameter dependencies
    //       reevaluate
  }

  private watchValueDependencies() {
    const dynamicFields = this.row()._dynamicFields?.value;

    if (!Array.isArray(dynamicFields)) return;

    const localFieldNames = dynamicFields
      .filter((field: any) => field.type === "local")
      .map((field: any) => field.fieldName);

    localFieldNames.forEach((fieldName) => {
      this.variableStore.watch(fieldName).subscribe((value) => {
        // Update the value based on the fieldName
        const rowValue = value;
        // todo: dynamically evaluate row value;
        this.variableStore.set(this.name, rowValue);
      });
    });
  }
}
