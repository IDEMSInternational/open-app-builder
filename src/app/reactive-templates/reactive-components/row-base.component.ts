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
  WritableSignal,
} from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { NamespaceService } from "../services/namespace.service";
import { ActionService } from "../services/action.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EvaluationService } from "../services/evaluation.service";
import { IRow, RowRegistry } from "../services/row.registry";
import { IStore, StoreType } from "../stores/store";
import { VariableStore } from "../stores/variable-store";
import {
  defineAuthorParameterSchema,
  InferParamSchemaType,
  parseTemplateParameterList,
} from "src/app/shared/components/template/utils";

// re-export for simplified imports
export { defineAuthorParameterSchema } from "src/app/shared/components/template/utils";

export function navParamPrefix(url: string): string {
  return `navParam_${url}_`;
}

@Component({
  selector: "oab-row-base",
  template: ``, // template is empty, to be overridden by child components
  standalone: false,
})
export abstract class RowBaseComponent implements OnInit, OnDestroy, IRow {
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

  /**
   * Evaluated parameter_list values keyed by their author-provided (snake_case) name.
   * Updated by `setParams()` whenever the underlying row expression dependencies change.
   * Consumed by the `params` computed signal of subclasses created via `RowBaseComponentWithParams`.
   */
  protected _evaluatedParameterList: WritableSignal<Record<string, any>> = signal({});

  /**
   * Type-safe, computed view over the row's author-defined parameter_list.
   * Default implementation returns an empty object; subclasses created via
   * `RowBaseComponentWithParams(schema)` override this with a typed signal.
   */
  public params: Signal<Record<string, any>> = computed(() => ({}));

  public onInitialised = input<(() => void) | undefined>(undefined);

  protected variableStore: IStore = inject(VariableStore);
  protected evaluationService = inject(EvaluationService);
  protected namespaceService = inject(NamespaceService);
  protected actionService = inject(ActionService);
  protected rowRegistry = inject(RowRegistry);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected storeType: StoreType = "local";

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

    this.watchParamDependencies();
    this.watchConditionDependencies();
    this.watchValueDependencies();

    // Set default value
    this.storeValue().then(() => {
      this.onInitialised()?.();
    });
  }

  public init(): void {
    const row = this.row();

    this.value = this.variableStore.asSignal({ name: this.name(), type: this.storeType });

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

    this.rowRegistry.register(this);
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
  protected async storeValue() {
    const value = this.evaluationService.evaluateExpression(this.expression(), this.namespace());
    const computedValue = await this.computeStoredValue(value);

    this.variableStore.set({ name: this.name(), type: this.storeType }, computedValue);
  }

  /**
   * Evaluate every entry in the row's author parameter_list and store the result on
   * `_evaluatedParameterList`. The downstream `params` computed signal re-parses these
   * values through the component's zod schema to produce a type-safe view.
   */
  private setParams() {
    const rowParams = this.row().parameter_list ?? {};
    const evaluated: Record<string, any> = {};
    for (const key of Object.keys(rowParams)) {
      evaluated[key] = this.evaluationService.evaluateExpression(rowParams[key], this.namespace());
    }
    this._evaluatedParameterList.set(evaluated);
  }

  protected watchValueDependencies() {
    this.unsubscribeValueDependencies();

    const dependencies = this.evaluationService
      .getDependencies(this.expression(), this.namespace())
      .filter((d) => d.name !== this.name());

    if (!dependencies || !dependencies.length) {
      return;
    }

    let sub = this.variableStore.watchMultiple(dependencies).subscribe(async () => {
      await this.storeValue();
    });

    this.valueDependencySubscriptions.push(sub);
  }

  protected watchConditionDependencies() {
    this.unsubscribeConditionDependencies();

    const condition = this.row().condition;

    if (condition === null || condition === undefined) {
      return;
    }

    const dependencies = this.evaluationService.getDependencies(condition, this.namespace());

    if (!dependencies || !dependencies.length) {
      return;
    }

    const sub = this.variableStore.watchMultiple(dependencies).subscribe(() => {
      this.condition.set(this.evaluationService.evaluateExpression(condition, this.namespace()));
    });
    this.conditionDependencySubscriptions.push(sub);
  }

  protected watchParamDependencies() {
    this.unsubscribeParamDependencies();
    const rowParams = this.row().parameter_list;

    if (!rowParams) return;

    let dependencies = Object.keys(rowParams).flatMap((name) => {
      return this.evaluationService.getDependencies(rowParams[name], this.namespace());
    });

    if (!dependencies || !dependencies.length) {
      return;
    }

    const sub = this.variableStore.watchMultiple(dependencies).subscribe(() => {
      this.setParams();
      this.storeValue();
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

/**
 * Utility function that handles extending the RowBaseComponent and automatically parsing
 * the row's author parameter_list using the provided schema, exposing the result as a
 * type-safe `this.params()` computed signal.
 *
 * @param schema - author parameter_list schema, created using `defineAuthorParameterSchema`
 *
 * @example
 * ```
 * const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
 *   string_param: coerce.string(""),
 * }));
 *
 * class MyComponent extends RowBaseComponentWithParams(AuthorSchema) {
 *   // ...
 *   doSomething() {
 *     const { stringParam } = this.params();
 *   }
 * }
 * ```
 */
export function RowBaseComponentWithParams<
  ParamSchema extends ReturnType<typeof defineAuthorParameterSchema>,
>(schema: ParamSchema) {
  abstract class WithParamsBase extends RowBaseComponent {
    public override params: Signal<InferParamSchemaType<ParamSchema>> = computed(() =>
      parseTemplateParameterList(this._evaluatedParameterList(), schema)
    );

    // declare static type to allow extracting type via `typeof MyComponent.Params` (not used at runtime)
    declare static Params: InferParamSchemaType<ParamSchema>;
  }
  return WithParamsBase;
}
