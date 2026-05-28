import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NamespaceEvaluator {
  private readonly localVariablePattern = /\blocal(?:\.[a-zA-Z_$][\w$]*)+/g;

  public evaluate(
    expression: string | number | boolean,
    namespace: string
  ): string | number | boolean {
    if (typeof expression !== "string" || !namespace) {
      return expression;
    }

    return expression.replace(this.localVariablePattern, (match, index, source) => {
      const previousCharacter = index > 0 ? source[index - 1] : "";
      const isPartOfPropertyChain = previousCharacter === ".";
      const isAlreadyNamespaced =
        match === `local.${namespace}` || match.startsWith(`local.${namespace}.`);

      if (isPartOfPropertyChain || isAlreadyNamespaced) {
        return match;
      }

      return `local.${namespace}${match.slice("local".length)}`;
    });
  }
}
