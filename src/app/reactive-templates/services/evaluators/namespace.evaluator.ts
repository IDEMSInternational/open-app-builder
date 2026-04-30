import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NamespaceEvaluator {
  public evaluate(
    expression: string | number | boolean,
    namespace: string
  ): string | number | boolean {
    if (typeof expression === "string" && namespace) {
      // replace all occurrences of .local with .local.namespace within template literal expressions (e.g. ${...})
      return expression.replace(/\$\{[^}]+\}/g, (match) =>
        match.replaceAll(".local", `.local.${namespace}`)
      );
    }

    return expression;
  }
}
