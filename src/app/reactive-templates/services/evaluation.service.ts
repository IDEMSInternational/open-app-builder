import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";
import { NamespaceService } from "./namespace.service";
import { ContextCreatorService } from "./context-creator.service";
import { extractDynamicEvaluators } from "packages/data-models/functions";
import { ListEvaluator } from "./evaluators/list.evaluator";
import { LoopItemEvaluator } from "./evaluators/loop-item.evaluator";
import { NamespaceEvaluator } from "./evaluators/namespace.evaluator";
import { VariableReference, STORE_TYPES } from "../stores/store";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  private appDataEvaluator = new AppDataEvaluator();

  constructor(
    private namespaceService: NamespaceService,
    private contextCreator: ContextCreatorService,
    private listEvaluator: ListEvaluator,
    private loopItemEvaluator: LoopItemEvaluator,
    private namespaceEvaluator: NamespaceEvaluator
  ) {}

  public evaluateExpression<T>(expression: string | number | boolean, namespace: string): T {
    let evaluatedExpression = expression;

    // todo: replace appDataEvaluator with more evaluators e.g. localEvaluator, javascriptEvaluator, jsonEvaluator etc.
    const context = this.createExecutionContext(expression, namespace);
    this.appDataEvaluator.setExecutionContext(context);

    evaluatedExpression = this.namespaceEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.loopItemEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.listEvaluator.evaluate(evaluatedExpression);
    evaluatedExpression = this.appDataEvaluator.evaluate(evaluatedExpression);

    return evaluatedExpression as T;
  }

  // todo: Cache the results per expression+namespace, to avoid recalculating dependencies.
  public getDependencies(
    expression: string | number | boolean,
    namespace: string
  ): VariableReference[] {
    if (typeof expression !== "string") return [];

    // todo: Use extractDynamicFields for complex objects like arrays & json.
    const dependencies = extractDynamicEvaluators(expression as string);

    if (!dependencies || !dependencies.length) return [];

    return dependencies
      .filter((dependency) => (STORE_TYPES as readonly string[]).includes(dependency.type))
      .map((dependency) => {
        const name = dependency.matchedExpression // we can't use fieldName because it doesn't allow nesting (TODO: fix or replace extractDynamicEvaluators)
          .replace(`@${dependency.type}.`, "")
          .replace("parameter_list.", "")
          .replace(/[#!&|,]/g, "");
        return {
          type: dependency.type,
          name: this.namespaceService.getFullName(namespace, name),
        } as VariableReference;
      });
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
    return this.contextCreator.createContext(this.getDependencies(expression, namespace));
  }
}
