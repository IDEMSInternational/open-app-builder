import { Injectable } from "@angular/core";
import { NamespaceService } from "./namespace.service";
import { ContextCreatorService } from "./context-creator.service";
import { ListEvaluator } from "./evaluators/list.evaluator";
import { NamespaceEvaluator } from "./evaluators/namespace.evaluator";
import { VariableReference, STORE_TYPES } from "../stores/store";
import { TemplateLiteralEvaluator } from "./evaluators/template-literal.evaluator";
import { JavascriptEvaluator } from "./evaluators/javascript.evaluator";
import { ValueType } from "../reactive-components/row-base.component";
import { DependencyExtractorService } from "./dependency-extractor.service";
import { LegacyVariableEvaluator } from "./evaluators/legacy-variable.evaluator";
import { ItemVariableEvaluator } from "./evaluators/item-variable.evaluator";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  constructor(
    private namespaceService: NamespaceService,
    private contextCreator: ContextCreatorService,
    private listEvaluator: ListEvaluator,
    private namespaceEvaluator: NamespaceEvaluator,
    private itemVariableEvaluator: ItemVariableEvaluator,
    private legacyVariableEvaluator: LegacyVariableEvaluator,
    private templateLiteralEvaluator: TemplateLiteralEvaluator,
    private javascriptEvaluator: JavascriptEvaluator,
    private dependencyExtractor: DependencyExtractorService
  ) {}

  public evaluateExpression<T>(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): T {
    let evaluatedExpression = this.parseExpression(expression, namespace, valueType);

    const context = this.createExecutionContext(evaluatedExpression, namespace, valueType);

    if (valueType === "string") {
      this.templateLiteralEvaluator.setContext(context);
      evaluatedExpression = this.templateLiteralEvaluator.evaluate(evaluatedExpression);
    } else if (valueType === "script" || valueType === "list") {
      this.javascriptEvaluator.setContext(context);
      evaluatedExpression = this.javascriptEvaluator.evaluate(evaluatedExpression);
    }

    return evaluatedExpression as T;
  }

  // todo: Cache the results per expression+namespace, to avoid recalculating dependencies.
  public getDependencies(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): VariableReference[] {
    if (typeof expression !== "string") return [];

    const parsedExpression = this.parseExpression(expression, namespace, valueType);
    const dependencies = this.dependencyExtractor.extractVariableReferences(
      parsedExpression,
      valueType
    );

    if (!dependencies || !dependencies.length) return [];

    return dependencies
      .filter(
        (dependency): dependency is VariableReference =>
          !!dependency.name && (STORE_TYPES as readonly string[]).includes(dependency.type)
      )
      .map((dependency) => {
        const name = dependency.name.replace("parameter_list.", "").replace(/[#!&|,]/g, "");
        return {
          type: dependency.type,
          name: this.namespaceService.getFullName(namespace, name),
        } as VariableReference;
      });
  }

  private parseExpression(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): any {
    let parsedExpression = expression;

    parsedExpression = this.legacyVariableEvaluator.evaluate(parsedExpression, valueType);
    parsedExpression = this.itemVariableEvaluator.evaluate(parsedExpression, valueType);
    parsedExpression = this.namespaceEvaluator.evaluate(parsedExpression, namespace);
    parsedExpression = this.listEvaluator.evaluate(parsedExpression);

    return parsedExpression;
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
    return this.contextCreator.createContext(
      this.getDependencies(expression, namespace, valueType).filter(
        (dependency): dependency is VariableReference =>
          (STORE_TYPES as readonly string[]).includes(dependency.type)
      ),
      namespace
    );
  }
}
