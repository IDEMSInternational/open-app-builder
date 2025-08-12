import {
  Component,
  computed,
  HostBinding,
  Inject,
  inject,
  InjectionToken,
  input,
  OnDestroy,
  OnInit,
  signal,
  Signal,
} from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";
import { RowService } from "../services/row.service";
import { cloneParameters, Parameters } from "./parameters";
import { NamespaceService } from "../services/namespace.service";

export const ROW_PARAMETERS = new InjectionToken<Parameters>("ROW_PARAMETERS");

@Component({
  selector: "oab-row-base",
  template: ``, // template is empty, to be overridden by child components
})
export abstract class RowBaseComponent<TParams extends Parameters> implements OnInit, OnDestroy {
  public row = input.required<FlowTypes.TemplateRow>();
  public namespace = input("");
  public name = computed(() =>
    this.namespaceService.getFullName(this.namespace(), this.row().name)
  );
  public value: Signal<any>;
  public condition = signal(true);
  public parameters: TParams;
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

  constructor(@Inject(ROW_PARAMETERS) parameters: TParams) {
    if (parameters) {
      this.parameters = cloneParameters(parameters);
    }
  }

  /**
   * All RowBaseComponent implementations should call this method (`super.ngOnInit();`) in their ngOnInit lifecycle hook.
   */
  ngOnInit(): void {
    const row = this.row();

    this.value = this.variableStore.asSignal(this.name());
    this.condition.set(this.rowService.evaluateCondition(row, this.namespace()));

    // Initialize the evaluator with a context
    this.setParameters();
    this.setDependencies();
    this.watchDependencies();

    // Set default value
    this.variableStore.set(this.name(), this.rowService.evaluateValue(row, this.namespace()));
  }

  /*
   * Sets the rows value and updates the variable store.
   */
  public setValue(value: any): void {
    this.row().value = value;
    this.variableStore.set(
      this.name(),
      this.rowService.evaluateValue(this.row(), this.namespace())
    );
  }

  private setParameters() {
    if (!this.parameters) return;
    const rowParams = this.row().parameter_list;

    Object.keys(this.parameters).forEach((key) => {
      const param = this.parameters[key];

      if (rowParams && rowParams.hasOwnProperty(param.name)) {
        const value = this.rowService.evaluateParameter(this.row(), param.name, this.namespace());
        this.parameters[key].setValue(value);
      }
    });
  }

  private setDependencies() {
    this.dependantVariables = this.rowService.getDependencies(this.row(), "local");
  }

  private watchDependencies() {
    if (!this.dependantVariables || this.dependantVariables.length === 0) return;

    this.dependantVariables.forEach((fieldName) => {
      const row = this.row();
      // if the field name already includes a namespace, we assume this is
      // referring to a variable in a child template?
      // todo: this is not actually an expression it's a fullname e.g. @local.something.something_else
      const name = this.namespaceService.getFullName(this.namespace(), fieldName) as string;

      const subscribe = this.variableStore.watch(name).subscribe(() => {
        this.variableStore.set(this.name(), this.rowService.evaluateValue(row, this.namespace()));
        this.condition.set(this.rowService.evaluateCondition(row, this.namespace()));
        this.setParameters();
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
