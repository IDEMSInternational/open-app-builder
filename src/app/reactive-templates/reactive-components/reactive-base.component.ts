import {
  Component,
  HostBinding,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
  Signal,
} from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";
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
  template: ``, // template is empty, to be overridden by child components
})
export abstract class ReactiveBaseComponent implements OnInit, OnDestroy {
  public row = input.required<FlowTypes.TemplateRow>();

  public name: string;
  public value: Signal<any>;
  public condition = signal(true);
  public parameters: any = {};
  public actions;

  private dependantVariables: string[] = [];

  protected variableStore = inject(VariableStore);
  protected rowService = inject(RowService);

  private subscriptions = [];

  @HostBinding("style.display")
  get displayStyle() {
    return this.condition() ? "" : "none";
  }

  constructor(private params: Parameters) {}

  ngOnInit(): void {
    const row = this.row();

    this.name = row._nested_name;
    this.value = this.variableStore.asSignal(row._nested_name);
    this.condition.set(this.rowService.evaluateCondition(row));

    // Initialize the evaluator with a context
    this.setParameters(this.params);
    this.setDependencies();
    this.watchDependencies();

    // Set default value
    this.variableStore.set(this.name, this.rowService.evaluate(row));
  }

  /*
   * Sets the rows value and updates the variable store.
   */
  public setValue(value: any): void {
    this.row().value = value;
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
      const row = this.row();
      const subscribe = this.variableStore.watch(fieldName).subscribe(() => {
        this.variableStore.set(this.name, this.rowService.evaluate(row));
        this.condition.set(this.rowService.evaluate(row));
      });
      this.subscriptions.push(subscribe);
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

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
