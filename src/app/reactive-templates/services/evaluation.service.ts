import { FlowTypes } from "packages/data-models/flowTypes";
import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";
import { RowService } from "./row.service";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  private evaluator = new AppDataEvaluator();

  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService,
    private rowService: RowService
  ) {}

  public evaluateExpression(
    row: FlowTypes.TemplateRow,
    expression: string | number | boolean,
    namespace: string
  ): string | boolean {
    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));
    return this.evaluate(expression, namespace);
  }

  public evaluateCondition(row: FlowTypes.TemplateRow, namespace: string): boolean {
    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));
    let condition = row.condition ?? true;

    return this.evaluate(condition, namespace) as boolean;
  }

  public evaluateParameter(
    row: FlowTypes.TemplateRow,
    parameterName: string,
    namespace: string
  ): any {
    if (!row.parameter_list || !row.parameter_list[parameterName]) {
      return null;
    }

    const parameterValue = row.parameter_list[parameterName];
    if (!parameterValue) return null;

    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));
    return this.evaluate(parameterValue, namespace);
  }

  public evaluateActions(row: FlowTypes.TemplateRow, trigger: string, namespace: string) {
    const actions = row.action_list?.filter((a) => a.trigger === trigger);

    if (!actions || !actions.length) return [];

    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));

    return actions.map((a) => {
      return { ...a, args: this.evaluateArgs(a.args, namespace), rawArgs: a.args };
    });
  }

  public createExecutionContext(row: FlowTypes.TemplateRow, namespace: string): any {
    const context = { local: {} };
    const dependantVariables = this.rowService.getDependencies(row, "local", namespace);

    dependantVariables.forEach((dependencyName) => {
      context.local[dependencyName] = this.variableStore.get(dependencyName);
    });

    return context;
  }

  private evaluateArgs(args: any[], namespace: string): any {
    return args.map((arg) =>
      this.evaluator.evaluate(this.namespaceService.getNamespacedExpression(namespace, arg))
    );
  }

  private evaluate(expression: string | number | boolean, namespace: string): string | boolean {
    return this.evaluator.evaluate(
      this.namespaceService.getNamespacedExpression(namespace, expression)
    );
  }
}
