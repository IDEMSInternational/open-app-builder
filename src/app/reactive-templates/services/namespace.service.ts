import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class NamespaceService {
  constructor() {}

  public getFullName(namespace: string, name: string): string {
    return namespace ? `${namespace}.${name}` : name;
  }

  public getNamespacedExpression(
    namespace: string,
    expression: string | number | boolean
  ): string | number | boolean {
    if (typeof expression === "string" && namespace) {
      return expression.replaceAll("@local.", `@local.${namespace}.`);
    }

    return expression;
  }
}
