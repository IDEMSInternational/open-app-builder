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

@Injectable({ providedIn: "root" })
export class EvaluationService {
  constructor(
    private namespaceService: NamespaceService,
    private contextCreator: ContextCreatorService,
    private listEvaluator: ListEvaluator,
    private namespaceEvaluator: NamespaceEvaluator,
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
    let evaluatedExpression = expression;

    if (valueType === "string" || valueType === "script") {
      evaluatedExpression = this.legacyVariableEvaluator.evaluate(evaluatedExpression, valueType);
    }

    const context = this.createExecutionContext(evaluatedExpression, namespace, valueType);

    evaluatedExpression = this.namespaceEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.listEvaluator.evaluate(evaluatedExpression);

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
    const normalizedExpression =
      valueType === "string" || valueType === "script"
        ? this.legacyVariableEvaluator.evaluate(expression, valueType)
        : expression;

    if (typeof normalizedExpression !== "string") return [];

    const dependencies = this.dependencyExtractor.extractVariableReferences(
      normalizedExpression,
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
