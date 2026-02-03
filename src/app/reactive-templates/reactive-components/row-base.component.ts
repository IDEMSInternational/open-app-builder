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
import { ActivatedRoute, Router } from "@angular/router";
import { EvaluationService } from "../services/evaluation.service";
import { IRow, RowRegistry } from "../services/row.registry";

export const ROW_PARAMETERS = new InjectionToken<Parameters>("ROW_PARAMETERS");

export function navParamPrefix(url: string): string {
  return `navParam_${url}_`;
}

@Component({
  selector: "oab-row-base",
  template: ``, // template is empty, to be overridden by child components
  standalone: false,
})
export abstract class RowBaseComponent<TParams extends Parameters>
  implements OnInit, OnDestroy, IRow
{
  public row = input.required<FlowTypes.TemplateRow>();
  public namespace = input("");
  public name = computed(() =>
    this.namespaceService.getFullName(this.namespace(), this.row().name)
  );

  /**
   * The current evaluated value of the row, based on its expression with tokens replaced.
   * This may not be the same as the value stored in the variable store if further processing is needed (e.g. executing a data query).
   */
  public value: Signal<any>;

  /**
   * The current 'raw' expression of the row, used to calculate its value.
   */
  private _expression: WritableSignal<string | number | boolean> = signal("");
  public expression = this._expression.asReadonly();

  public condition = signal(true);
  public params = inject(ROW_PARAMETERS) as TParams;
  public onInitialised = input<(() => void) | undefined>(undefined);

  protected variableStore = inject(VariableStore);
  protected evaluationService = inject(EvaluationService);
  protected namespaceService = inject(NamespaceService);
  protected actionService = inject(ActionService);
  protected rowRegistry = inject(RowRegistry);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);

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
    this.init();
  }

  public init(): void {
    const row = this.row();

    this.value = this.variableStore.asSignal(this.name());

    // If there is a value in session storage that matches this row's name, use that to override the expression
    let url = this.router.url.split("?")[0];
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    const paramKey = `${navParamPrefix(url)}${this.name()}`;
    const sessionValue = sessionStorage.getItem(paramKey);

    this._expression.set(sessionValue ?? row.value);
    this.condition.set(
      this.evaluationService.evaluateExpression(row.condition ?? true, this.namespace())
    );

    this.setParams();
    this.watchParamDependencies();
    this.watchConditionDependencies();
    this.watchValueDependencies();

    this.rowRegistry.register(this);

    // Set default value
    this.storeValue().then(() => {
      this.onInitialised()?.();
    });
  }

  /*
   * Sets the rows expression value and updates the variable store.
   */
  public setExpression(expression: any): void {
    this._expression.set(expression);
    this.watchValueDependencies();

    this.storeValue();
  }

  public triggerActions(trigger: string) {
    this.actionService.handleActions(this, trigger, this.namespace());
  }

  // Override to transform the value before storing in variable store.
  // e.g. To execute a data query and store the results as the value
  protected async computeStoredValue(value: any): Promise<any> {
    return value;
  }

  // Store the evaluated value of the row in the variable store.
  private async storeValue() {
    const value = this.evaluationService.evaluateExpression(this.expression(), this.namespace());
    const computedValue = await this.computeStoredValue(value);

    this.variableStore.set(this.name(), computedValue);
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

  private watchValueDependencies() {
    this.unsubscribeValueDependencies();

    const dependencies = this.evaluationService
      .getDependencies(this.expression(), this.namespace())
      .filter((d) => d !== this.name()); // avoid self-dependency

    let sub = this.variableStore.watchMultiple(dependencies).subscribe(async () => {
      await this.storeValue();
    });

    this.valueDependencySubscriptions.push(sub);
  }

  private watchConditionDependencies() {
    this.unsubscribeConditionDependencies();

    const condition = this.row().condition;

    if (condition === null || condition === undefined) {
      return;
    }

    let sub = this.variableStore
      .watchMultiple(this.evaluationService.getDependencies(condition, this.namespace()))
      .subscribe(() => {
        this.condition.set(this.evaluationService.evaluateExpression(condition, this.namespace()));
      });
    this.conditionDependencySubscriptions.push(sub);
  }

  private watchParamDependencies() {
    this.unsubscribeParamDependencies();
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
