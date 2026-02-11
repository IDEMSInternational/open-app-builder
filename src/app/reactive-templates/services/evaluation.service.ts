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
    private loopItemEvaluator: LoopItemEvaluator,
    private namespaceEvaluator: NamespaceEvaluator
  ) {}

  public evaluateExpression<T>(expression: string | number | boolean, namespace: string): T {
    let evaluatedExpression = expression;

    // todo: replace appDataEvaluator with more evaluators e.g. localEvaluator, javascriptEvaluator, jsonEvaluator etc.
    // todo: instead of setting execution context here, pass it into all evaluator.evaluate as a parameter, or is context simply the variableStore?
    const context = this.createExecutionContext(expression, namespace);
    this.appDataEvaluator.setExecutionContext(context);

    evaluatedExpression = this.namespaceEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.loopItemEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.listEvaluator.evaluate(evaluatedExpression);
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

  // Adds dependencies to the execution context by breaking down the dot notation
  // e.g. outerLoop.key_1.innerLoopData becomes
  // context = {
  //   local: {
  //     outerLoop: {
  //       key_1: {
  //         innerLoopData: value
  //       }
  //     }
  //   }
  // }
  private createExecutionContext(expression: string | number | boolean, namespace: string): any {
    const context = { local: {} };

    this.getDependencies(expression, namespace).forEach((dependencyName) => {
      const value = this.variableStore.get(dependencyName);
      const path = dependencyName.split(".");
      let cursor = context.local as Record<string, any>;

      path.forEach((segment, index) => {
        const isLeaf = index === path.length - 1;

        if (isLeaf) {
          cursor[segment] = value;
          return;
        }

        if (cursor[segment] == null) {
          cursor[segment] = {};
        } else if (typeof cursor[segment] !== "object") {
          // Existing value is a non-object (primitive, string, array, etc.).
          // Do not overwrite it; stop processing this dependency path.
          return;
        }

        cursor = cursor[segment];
      });
    });

    return context;
  }
}
