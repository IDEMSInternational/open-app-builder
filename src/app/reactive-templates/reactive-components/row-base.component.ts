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
import { RowService } from "../services/row.service";
import { Parameters } from "./parameters";
import { NamespaceService } from "../services/namespace.service";
import { ActionService } from "../services/action.service";
import { Subscription } from "rxjs";
import { EvaluationService } from "../services/evaluation.service";

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
  public expression: WritableSignal<string | number | boolean> = signal("");
  public condition = signal(true);
  public params = inject(ROW_PARAMETERS) as TParams;
  public onInitialised = input<(() => void) | undefined>(undefined);

  protected variableStore = inject(VariableStore);
  protected rowService = inject(RowService);
  protected evaluationService = inject(EvaluationService);
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
    this.expression = signal(row.value);
    this.condition.set(this.evaluationService.evaluateCondition(row, this.namespace()));

    this.setParams();
    this.watchDependencies();

    // Set default value
    this.variableStore.set(
      this.name(),
      this.evaluationService.evaluateExpression(row, this.expression(), this.namespace())
    );
    this.onInitialised()?.();
  }

  /*
   * Sets the rows expression value and updates the variable store.
   */
  public setExpression(expression: any): void {
    this.expression.set(expression);
    this.variableStore.set(
      this.name(),
      this.evaluationService.evaluateExpression(this.row(), this.expression(), this.namespace())
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
        const value = this.evaluationService.evaluateParameter(
          this.row(),
          param.name,
          this.namespace()
        );
        this.params[key].setValue(value);
      }
    });
  }

  private watchDependencies() {
    this.rowService.watchDependencies(this.row(), "local", this.namespace(), (name) => {
      this.variableStore.set(
        this.name(),
        this.evaluationService.evaluateExpression(this.row(), this.expression(), this.namespace())
      );
      this.condition.set(this.evaluationService.evaluateCondition(this.row(), this.namespace()));
      this.setParams();
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
