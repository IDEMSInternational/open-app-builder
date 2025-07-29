import {
  Component,
  computed,
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
import { RowService } from "../services/row.service";
import { Parameters } from "./parameters";
import { NamespaceService } from "../services/namespace.service";

@Component({
  selector: "oab-base",
  template: ``, // template is empty, to be overridden by child components
})
export abstract class ReactiveBaseComponent implements OnInit, OnDestroy {
  public row = input.required<FlowTypes.TemplateRow>();
  public namespace = input("");
  public name = computed(() => this.namespaceService.get(this.namespace(), this.row().name));
  public value: Signal<any>;
  public condition = signal(true);
  public parameters: any = {};
  public actions; // todo: implement actions

  private dependantVariables: string[] = [];

  protected variableStore = inject(VariableStore);
  protected rowService = inject(RowService);
  protected namespaceService = inject(NamespaceService);

  protected subscriptions = [];

  @HostBinding("style.display")
  get displayStyle() {
    return this.condition() ? "" : "none";
  }

  constructor(private params: Parameters) {}

  /**
   * All ReactiveBaseComponent implementations should call this method (`super.ngOnInit();`) in their ngOnInit lifecycle hook.
   */
  ngOnInit(): void {
    const row = this.row();

    this.value = this.variableStore.asSignal(this.name());
    this.condition.set(this.rowService.evaluateCondition(row));

    // Initialize the evaluator with a context
    this.setParameters(this.params);
    this.setDependencies();
    this.watchDependencies();

    // Set default value
    this.variableStore.set(this.name(), this.rowService.evaluate(row));
  }

  /*
   * Sets the rows value and updates the variable store.
   */
  public setValue(value: any): void {
    this.row().value = value;
    this.variableStore.set(this.name(), this.rowService.evaluate(this.row()));
  }

  private setParameters(parameters: Parameters) {
    const rowParams = this.row().parameter_list;

    Object.keys(parameters).forEach((key) => {
      const param = parameters[key];

      if (!rowParams || !rowParams.hasOwnProperty(param.name)) {
        // Set default value if parameter is not defined in row
        this.parameters[key] = signal(param.value);
        return;
      }

      const value = this.rowService.evaluateParameter(this.row(), param.name);
      this.parameters[key] = signal(param.cast(value));
    });
  }

  private updateParameters(): void {
    Object.keys(this.parameters).forEach((key) => {
      const param = this.parameters[key];
      const value = this.rowService.evaluateParameter(this.row(), key);
      param.set(value);
    });
  }

  private setDependencies() {
    this.dependantVariables = this.rowService.getDependencies(this.row(), "local");
  }

  private watchDependencies() {
    if (!this.dependantVariables || this.dependantVariables.length === 0) return;

    this.dependantVariables.forEach((fieldName) => {
      const row = this.row();
      // if the field name already includes a namespace, maybe we assume this is
      // referring to a variable in a child template?
      const name = this.namespaceService.isNamespaced(fieldName)
        ? fieldName
        : this.namespaceService.get(this.namespace(), fieldName);

      const subscribe = this.variableStore.watch(name).subscribe(() => {
        this.variableStore.set(this.name(), this.rowService.evaluate(row));
        this.condition.set(this.rowService.evaluateCondition(row));
        this.updateParameters();
      });
      this.subscriptions.push(subscribe);
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
