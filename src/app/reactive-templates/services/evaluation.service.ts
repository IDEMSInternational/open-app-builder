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
      this.namespaceService.getNamespacedExpression(namespace, this.parseExpression(expression))
    );
  }

  /**
   * Parses the given expression into a structured format.
   * array format:
   *   key: name_1 | value: This is value 1;
   *   key: name_2 | value: This is value 2;
   *   key: name_3 | value: This is value 3;
   *
   * todo: more expression types e.g. object/json and a more robust parsing system.
   * todo: Improve expressions by changing the syntax, maybe expressions can more closely
   *       resemble javascript string interpolation expressions.
   *
   * @param expression The expression to parse, which may represent an array of objects in a custom string format.
   * @returns
   */
  private parseExpression(expression: string | number | boolean | any) {
    // Detect array type expression: lines with 'key: ... | key2: ...;' format
    if (typeof expression === "string") {
      // Split by semicolon, filter out empty lines
      const lines = expression
        .split(";")
        .map((line) => line.trim())
        .filter((line) => line);
      // Check if there are multiple lines that contain at least one ':'
      const isArrayOfObjectsType = lines.length > 1 && lines.every((line) => line.includes(":"));
      if (isArrayOfObjectsType) {
        return lines.map((line) => {
          const obj: { [key: string]: string } = {};
          // Split by '|', then parse each key-value pair
          line.split("|").forEach((part) => {
            const [key, ...rest] = part.split(":");
            if (key && rest.length > 0) {
              const value = rest.join(":").trim();
              if (value !== "") {
                obj[key.trim()] = value;
              }
            }
          });
          return obj;
        });
      }
    }
    // Fallback: return as-is for string, boolean, number
    return expression;
  }
}
