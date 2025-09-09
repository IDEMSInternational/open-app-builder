import { FlowTypes } from "packages/data-models/flowTypes";
import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";
import { extractDynamicEvaluators } from "packages/data-models/functions";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  private evaluator = new AppDataEvaluator();

  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService
  ) {}

  /** Each evaluation will now check it's dependencies which could be inefficient
   *  as we already know them (could pass them in)
   */
  public evaluateExpression(
    expression: string | number | boolean,
    namespace: string
  ): string | boolean {
    this.evaluator.setExecutionContext(this.createExecutionContext(expression, namespace));
    return this.evaluate(expression, namespace);
  }

  public evaluateCondition(row: FlowTypes.TemplateRow, namespace: string): boolean {
    let condition = row.condition ?? true;

    return this.evaluate(condition, namespace) as boolean;
  }

  public evaluateActions(row: FlowTypes.TemplateRow, trigger: string, namespace: string) {
    const actions = row.action_list?.filter((a) => a.trigger === trigger);

    if (!actions || !actions.length) return [];

    return actions.map((a) => {
      return { ...a, args: this.evaluateArgs(a.args, namespace), rawArgs: a.args };
    });
  }

  public getDependencies(expression: string | number | boolean, namespace: string): string[] {
    if (typeof expression !== "string") return [];

    // todo: Use extractDynamicFields for complex objects like arrays & json.
    const dependencies = extractDynamicEvaluators(expression as string);

    if (!dependencies || !dependencies.length) return [];

    return dependencies
      .filter((d) => d.type === "local") // just deal with @local dependencies for now
      .map((dependency) =>
        dependency.matchedExpression // we can't use fieldName because it doesn't allow nesting (TODO: fix or replace extractDynamicEvaluators)
          .replace(`@${dependency.type}.`, "")
          .replace("parameter_list.", "")
          .replace(/[#!&|,]/g, "")
      )
      .map((dependency) => this.namespaceService.getFullName(namespace, dependency));
  }

  private createExecutionContext(expression: string | number | boolean, namespace: string): any {
    const context = { local: {} };

    this.getDependencies(expression, namespace).forEach((dependencyName) => {
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
    this.evaluator.setExecutionContext(this.createExecutionContext(expression, namespace));

    return this.evaluator.evaluate(
      this.namespaceService.getNamespacedExpression(namespace, expression)
    );
  }
}
