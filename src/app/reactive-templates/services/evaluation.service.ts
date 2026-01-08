import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";
import { extractDynamicEvaluators } from "packages/data-models/functions";
import { ListEvaluator } from "./evaluators/list.evaluator";
import { LoopItemEvaluator } from "./evaluators/loop-item.evaluator";
import { NamespaceEvaluator } from "./evaluators/namespace.evaluator";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  private appDataEvaluator = new AppDataEvaluator();

  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService,
    private listEvaluator: ListEvaluator,
    private itemEvaluator: LoopItemEvaluator,
    private namespaceEvaluator: NamespaceEvaluator
  ) {}

  public evaluateExpression<T>(expression: string | number | boolean, namespace: string): T {
    let evaluatedExpression = expression;

    // todo: replace appDataEvaluator with more evaluators e.g. localEvaluator, javascriptEvaluator, jsonEvaluator etc.
    // todo: instead of setting execution context here, pass it into all evaluator.evaluate as a parameter, or is context simply the variableStore?
    this.appDataEvaluator.setExecutionContext(this.createExecutionContext(expression, namespace));

    evaluatedExpression = this.itemEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.listEvaluator.evaluate(evaluatedExpression);
    evaluatedExpression = this.namespaceEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.appDataEvaluator.evaluate(evaluatedExpression);

    return evaluatedExpression as T;
  }

  // todo: Cache the results per expression+namespace, to avoid recalculating dependencies.
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
}
