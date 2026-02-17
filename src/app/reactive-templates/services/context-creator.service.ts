import { Injectable } from "@angular/core";
import { VariableStore } from "../stores/variable-store";

/**
 * The ContextCreatorService is responsible for constructing the execution context for evaluators based on the dependencies they declare.
 * It takes a list of dependency names (which may be in dot notation for nested properties) and retrieves their values from the VariableStore.
 * The service then builds a nested context object that reflects the structure implied by the dot notation, allowing evaluators to access dependencies in a structured way.
 * For example, if an evaluator declares dependencies ["user.name", "user.age"], and the VariableStore has values for "user.name" and "user.age",
 * the ContextCreatorService will produce a context like:
 * {
 *    local: {
 *     user: {
 *      name: "Alice",
 *      age: 30
 *     }
 *    }
 * }
 * This allows evaluators to access these dependencies as context.local.user.name and context.local.user.age. */
@Injectable({ providedIn: "root" })
export class ContextCreatorService {
  constructor(private variableStore: VariableStore) {}

  public createContext(dependencyNames: string[]): { local: Record<string, any> } {
    const context = { local: {} as Record<string, any> };

    dependencyNames.forEach((dependencyName) => {
      const value = this.variableStore.get(dependencyName);
      this.assignValue(context.local, dependencyName, value);
    });

    return context;
  }

  private assignValue(target: Record<string, any>, dependencyName: string, value: unknown): void {
    const path = dependencyName.split(".");
    let cursor = target;

    path.forEach((segment, index) => {
      const isLeaf = index === path.length - 1;

      if (isLeaf) {
        cursor[segment] = value;
        return;
      }

      if (!cursor[segment] || typeof cursor[segment] !== "object") {
        cursor[segment] = {};
      }

      cursor = cursor[segment];
    });
  }
}
