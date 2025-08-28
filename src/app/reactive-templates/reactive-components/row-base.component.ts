import {
  Component,
  computed,
  HostBinding,
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
import { Parameters } from "./parameters";
import { NamespaceService } from "../services/namespace.service";
import { ActionService } from "../services/action.service";
import { Subscription } from "rxjs";

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
  public params = inject(ROW_PARAMETERS) as TParams;

  private dependantVariables: string[] = [];

  protected variableStore = inject(VariableStore);
  protected rowService = inject(RowService);
  protected namespaceService = inject(NamespaceService);
  protected actionService = inject(ActionService);

  protected subscriptions: Subscription[] = [];

  @HostBinding("style.display")
  get displayStyle() {
    return this.condition() ? "" : "none";
  }

  /**
   * All RowBaseComponent implementations should call this method (`super.ngOnInit();`) in their ngOnInit lifecycle hook.
   */
  ngOnInit(): void {
    const row = this.row();

    this.value = this.variableStore.asSignal(this.name());
    this.condition.set(this.rowService.evaluateCondition(row, this.namespace()));

    this.setParams();
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

  public triggerActions(trigger: string) {
    this.actionService.handleActions(this.row(), trigger, this.namespace());
  }

  private setParams() {
    if (!this.params) return;
    const rowParams = this.row().parameter_list;

    Object.keys(this.params).forEach((key) => {
      const param = this.params[key];

      if (rowParams && rowParams.hasOwnProperty(param.name)) {
        const value = this.rowService.evaluateParameter(this.row(), param.name, this.namespace());
        this.params[key].setValue(value);
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
        this.setParams();
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
