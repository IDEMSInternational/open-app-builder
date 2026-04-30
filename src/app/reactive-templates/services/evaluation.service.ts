import { Injectable } from "@angular/core";
import { NamespaceService } from "./namespace.service";
import { ContextCreatorService } from "./context-creator.service";
import { ListEvaluator } from "./evaluators/list.evaluator";
import { LoopItemEvaluator } from "./evaluators/loop-item.evaluator";
import { NamespaceEvaluator } from "./evaluators/namespace.evaluator";
import { VariableReference, STORE_TYPES } from "../stores/store";
import { TemplateLiteralEvaluator } from "./evaluators/template-literal.evaluator";
import { JavascriptEvaluator } from "./evaluators/javascript.evaluator";
import { ValueType } from "../reactive-components/row-base.component";

@Injectable({ providedIn: "root" })
export class EvaluationService {
  constructor(
    private namespaceService: NamespaceService,
    private contextCreator: ContextCreatorService,
    private listEvaluator: ListEvaluator,
    private loopItemEvaluator: LoopItemEvaluator,
    private namespaceEvaluator: NamespaceEvaluator,
    private templateLiteralEvaluator: TemplateLiteralEvaluator,
    private javascriptEvaluator: JavascriptEvaluator
  ) {}

  public evaluateExpression<T>(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType = "string"
  ): T {
    let evaluatedExpression = expression;

    const context = this.createExecutionContext(expression, namespace, valueType);

    evaluatedExpression = this.namespaceEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.loopItemEvaluator.evaluate(evaluatedExpression, namespace);
    evaluatedExpression = this.listEvaluator.evaluate(evaluatedExpression);

    if (valueType === "string") {
      this.templateLiteralEvaluator.setContext(context);
      evaluatedExpression = this.templateLiteralEvaluator.evaluate(evaluatedExpression);
    } else if (valueType === "script") {
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

    const dependencies =
      valueType === "script"
        ? this.extractScriptDependencies(expression)
        : this.extractDependencies(expression);

    if (!dependencies || !dependencies.length) return [];

    return dependencies
      .map((dependency) => {
        const [type, ...pathSegments] = dependency.split(".");
        return {
          type,
          name: pathSegments
            .join(".")
            .replace("parameter_list.", "")
            .replace(/[#!&|,]/g, ""),
        };
      })
      .filter(
        (dependency): dependency is VariableReference =>
          (STORE_TYPES as readonly string[]).includes(dependency.type) && !!dependency.name
      )
      .map((dependency) => {
        const name = dependency.name.replace("parameter_list.", "").replace(/[#!&|,]/g, "");
        return {
          type: dependency.type,
          name: this.namespaceService.getFullName(namespace, name),
        } as VariableReference;
      });
  }

  /** Extracts all variable references from `${...}` blocks in a template literal string.
   * Matches dot-notation paths inside each block, ignoring surrounding operators or literals.
   * e.g. "my string ${local.somevar + 1} is ${local.somevar2}" returns ["local.somevar", "local.somevar2"]
   * e.g. "${local.somevar.nested}" returns ["local.somevar.nested"]
   */
  public extractDependencies(expression: string): string[] {
    const results: string[] = [];
    const blockRegex = /\$\{([^}]+)\}/g;
    const varRegex = /[a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)+/g;
    for (const blockMatch of expression.matchAll(blockRegex)) {
      for (const varMatch of blockMatch[1].matchAll(varRegex)) {
        results.push(varMatch[0]);
      }
    }
    return results;
  }

  /** Extracts all variable references from a plain JavaScript expression. */
  public extractScriptDependencies(expression: string): string[] {
    const matches = expression.match(/[a-zA-Z_$][a-zA-Z0-9_$]*(?:\.[a-zA-Z_$][a-zA-Z0-9_$]*)+/g);
    return matches ?? [];
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
      this.getDependencies(expression, namespace, valueType)
    );
  }
}
