import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NamespaceEvaluator {
  public evaluate(
    expression: string | number | boolean,
    namespace: string
  ): string | number | boolean {
    if (typeof expression === "string" && namespace) {
      return expression.replaceAll("@local.", `@local.${namespace}.`);
    }

    return expression;
  }
}
