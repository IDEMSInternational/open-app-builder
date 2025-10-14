import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";
import { extractDynamicEvaluators } from "packages/data-models/functions";
import { ArrayOfObjectsParser } from "./type-parsers/array-of-objects.parser";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  private evaluator = new AppDataEvaluator();

  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService,
    private arrayOfObjectsParser: ArrayOfObjectsParser
  ) {}

  public evaluateExpression<T>(expression: string | number | boolean, namespace: string): T {
    return this.evaluate(expression, namespace) as T;
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

  private evaluate(expression: string | number | boolean, namespace: string): string | boolean {
    this.evaluator.setExecutionContext(this.createExecutionContext(expression, namespace));

    return this.evaluator.evaluate(
      this.namespaceService.getNamespacedExpression(
        namespace,
        this.arrayOfObjectsParser.parseExpression(expression)
      )
    );
  }
}
