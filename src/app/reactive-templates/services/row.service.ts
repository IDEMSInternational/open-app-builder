import { FlowTypes } from "packages/data-models/flowTypes";
import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";

@Injectable({ providedIn: "root" })
export class RowService {
  private evaluator = new AppDataEvaluator();

  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService
  ) {}

  public getDependencies(row: FlowTypes.TemplateRow, type: string): string[] {
    const dynamicDependencies = row._dynamicDependencies;
    if (!dynamicDependencies) return [];

    return Object.keys(dynamicDependencies)
      .filter((reference) => reference.startsWith(`@${type}.`))
      .map((reference) => reference.replace(`@${type}.`, ""));
  }

  public evaluateValue(row: FlowTypes.TemplateRow, namespace: string): any {
    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));
    return this.evaluate(row.value, namespace);
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
    const actions = row.action_list.filter((a) => a.trigger === trigger);

    this.evaluator.setExecutionContext(this.createExecutionContext(row, namespace));

    return actions.map((a) => {
      return { ...a, args: this.evaluateArgs(a.args, namespace) };
    });
  }

  private createExecutionContext(row: FlowTypes.TemplateRow, namespace: string): any {
    const context = { local: {} };
    const dependantVariables = this.getDependencies(row, "local");

    dependantVariables.forEach((fieldName) => {
      let fullName = this.namespaceService.getFullName(namespace, fieldName) as string;

      context.local[fullName] = this.variableStore.get(fullName);
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
