import { Injectable } from "@angular/core";
import { ContextCreatorService } from "./context-creator.service";
import { VariableReference, STORE_TYPES } from "../stores/store";
import { ValueType } from "../reactive-components/row-base.component";
import { DependencyExtractorService } from "./dependency-extractor.service";
import { ExpressionParser } from "./expression-parsers/expression-parser";
import { ExpressionEvaluator } from "./evaluators/expression-evaluator";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  constructor(
    private contextCreator: ContextCreatorService,
    private dependencyExtractor: DependencyExtractorService,
    private expressionParser: ExpressionParser,
    private expressionEvaluator: ExpressionEvaluator
  ) {}

  public evaluateExpression<T>(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): T {
    const parsedExpression = this.expressionParser.parse(expression, namespace, valueType);
    const context = this.createExecutionContext(parsedExpression, namespace, valueType);

    this.expressionEvaluator.setContext(context);
    return this.expressionEvaluator.evaluate(parsedExpression, valueType) as T;
  }

  // todo: Cache the results per expression+namespace, to avoid recalculating dependencies.
  public getDependencies(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): VariableReference[] {
    if (typeof expression !== "string") return [];

    const parsedExpression = this.expressionParser.parse(expression, namespace, valueType);
    return this.getDependenciesInternal(parsedExpression, namespace, valueType);
  }

  private getDependenciesInternal(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): VariableReference[] {
    if (typeof expression !== "string") return [];

    const dependencies = this.dependencyExtractor.extractVariableReferences(expression, valueType);

    if (!dependencies || !dependencies.length) return [];

    let filteredDependencies = dependencies.filter(
      (dependency): dependency is VariableReference =>
        !!dependency.name && (STORE_TYPES as readonly string[]).includes(dependency.type)
    );

    return filteredDependencies;
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
  private createExecutionContext(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType
  ): any {
    let dependencies = this.getDependenciesInternal(expression, namespace, valueType);

    return this.contextCreator.createContext(dependencies, namespace);
  }
}
