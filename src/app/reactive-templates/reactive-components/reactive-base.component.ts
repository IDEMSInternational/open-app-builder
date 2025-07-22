import { Component, input, OnInit, Optional, signal, Signal } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { RowService } from "../services/row-service";

export class Parameter<T> {
  name: string;
  value: T;
}

export class Parameters {
  [key: string]: Parameter<any>;
}

@Component({
  selector: "oab-base",
  template: ``,
})
export abstract class ReactiveBaseComponent implements OnInit {
  public row = input.required<FlowTypes.TemplateRow>();

  public name: string;
  public value: Signal<any>;
  public condition: Signal<boolean>;
  public parameters: any = {};
  public actions;

  private evaluator = new AppDataEvaluator();
  private dependantVariables: string[];

  // todo: use service location to simplify components
  constructor(
    @Optional() private variableStore: VariableStore,
    @Optional() private params: Parameters,
    @Optional() private rowService: RowService
  ) {}

  ngOnInit(): void {
    this.name = this.row()._nested_name;
    this.value = this.variableStore.asSignal(this.row()._nested_name);

    // Initialize the evaluator with a context
    this.setParameters(this.params);
    this.setDependencies();
    this.watchDependencies();

    // set default value
    this.variableStore.set(this.name, this.rowService.evaluate(this.row()));

    // todo: Add listeners for condition dependencies
    //       reevaluate
    // todo: Add listeners for parameter dependencies
    //       reevaluate
  }

  public setValue(value: any): void {
    this.variableStore.set(this.name, value);
  }

  private setParameters(parameters: Parameters) {
    const rowParams = this.row().parameter_list;

    Object.keys(parameters).forEach((key) => {
      const param = parameters[key];

      if (!rowParams || !rowParams.hasOwnProperty(param.name)) {
        this.parameters[key] = signal(param.value);
        return;
      }

      this.parameters[key] = signal(this.castToType(rowParams[param.name], param.value));
    });
  }

  private setDependencies() {
    this.dependantVariables = this.rowService.getDependencies(this.row(), "local");
  }

  private watchDependencies() {
    if (!this.dependantVariables || this.dependantVariables.length === 0) return;

    this.dependantVariables.forEach((fieldName) => {
      this.variableStore.watch(fieldName).subscribe((value) => {
        this.variableStore.set(this.name, this.rowService.evaluate(this.row()));
      });
    });
  }

  // todo: implement this properly, somewhere else
  private castToType(value: any, reference: any): any {
    const type = typeof reference;
    if (value === undefined || value === null) return reference;

    switch (type) {
      case "number":
        return Number(value);
      case "boolean":
        return value === "true" || value === true;
      case "string":
        return String(value);
      default:
        return value;
    }
  }
}
