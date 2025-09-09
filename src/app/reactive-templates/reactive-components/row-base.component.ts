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
  WritableSignal,
} from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { VariableStore } from "../stores/variable-store";
import { Parameters } from "./parameters";
import { NamespaceService } from "../services/namespace.service";
import { ActionService } from "../services/action.service";
import { Subscription } from "rxjs";
import { EvaluationService } from "../services/evaluation.service";
import { RowRegistry } from "../services/row.registry";

export const ROW_PARAMETERS = new InjectionToken<Parameters>("ROW_PARAMETERS");

export interface IRow {
  name: Signal<string>;
  value: Signal<any>;
  setExpression(expression: any): void;
}

@Component({
  selector: "oab-row-base",
  template: ``, // template is empty, to be overridden by child components
})
export abstract class RowBaseComponent<TParams extends Parameters>
  implements OnInit, OnDestroy, IRow
{
  public row = input.required<FlowTypes.TemplateRow>();
  public namespace = input("");
  public name = computed(() =>
    this.namespaceService.getFullName(this.namespace(), this.row().name)
  );
  public value: Signal<any>;
  public expression: WritableSignal<string | number | boolean> = signal("");
  public condition = signal(true);
  public params = inject(ROW_PARAMETERS) as TParams;
  public onInitialised = input<(() => void) | undefined>(undefined);

  protected variableStore = inject(VariableStore);
  protected evaluationService = inject(EvaluationService);
  protected namespaceService = inject(NamespaceService);
  protected actionService = inject(ActionService);
  protected rowRegistry = inject(RowRegistry);

  private valueDependencySubscriptions: Subscription[] = [];
  private conditionDependencySubscriptions: Subscription[] = [];
  private paramsDependencySubscriptions: Subscription[] = [];

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
    this.expression = signal(row.value);
    this.condition.set(this.evaluationService.evaluateCondition(row, this.namespace()));

    this.setParams();
    this.watchParamDependencies();
    this.watchConditionDependencies();
    this.watchValueDependencies();

    this.rowRegistry.register(this);

    // Set default value
    this.variableStore.set(
      this.name(),
      this.evaluationService.evaluateExpression(this.expression(), this.namespace())
    );
    this.onInitialised()?.();
  }

  /*
   * Sets the rows expression value and updates the variable store.
   */
  public setExpression(expression: any): void {
    this.expression.set(expression);
    this.watchValueDependencies();

    this.variableStore.set(
      this.name(),
      this.evaluationService.evaluateExpression(this.expression(), this.namespace())
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
        const paramExpression = rowParams[param.name];
        const value = this.evaluationService.evaluateExpression(paramExpression, this.namespace());
        this.params[key].setValue(value);
      }
    });
  }

  /** TODO: this now only deals with value dependencies, need to do parameter and condition ones  */
  private watchValueDependencies() {
    this.unsubscribeValueDependencies();
    let sub = this.variableStore
      .watchMultiple(this.evaluationService.getDependencies(this.expression(), this.namespace()))
      .subscribe(() => {
        this.variableStore.set(
          this.name(),
          this.evaluationService.evaluateExpression(this.expression(), this.namespace())
        );
      });

    this.valueDependencySubscriptions.push(sub);
  }

  private watchConditionDependencies() {
    let sub = this.variableStore
      .watchMultiple(
        this.evaluationService.getDependencies(this.row().condition ?? true, this.namespace())
      )
      .subscribe(() => {
        this.condition.set(this.evaluationService.evaluateCondition(this.row(), this.namespace()));
      });
    this.conditionDependencySubscriptions.push(sub);
  }

  private watchParamDependencies() {
    const rowParams = this.row().parameter_list;

    if (!rowParams) return;

    let dependencies = Object.keys(rowParams).flatMap((name) => {
      return this.evaluationService.getDependencies(rowParams[name], this.namespace());
    });

    let sub = this.variableStore.watchMultiple(dependencies).subscribe(() => {
      this.setParams();
    });
    this.paramsDependencySubscriptions.push(sub);
  }

  private unsubscribeValueDependencies() {
    this.valueDependencySubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private unsubscribeConditionDependencies() {
    this.conditionDependencySubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private unsubscribeParamDependencies() {
    this.paramsDependencySubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeValueDependencies();
    this.unsubscribeConditionDependencies();
    this.unsubscribeParamDependencies();

    this.rowRegistry.unregister(this.name());
  }
}
