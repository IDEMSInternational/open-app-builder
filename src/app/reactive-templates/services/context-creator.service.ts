import { Injectable } from "@angular/core";
import { VariableReference } from "../stores/store";
import { VariableStore } from "../stores/variable-store";
import { RowRegistry } from "./row.registry";

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
  constructor(
    private variableStore: VariableStore,
    private rowRegistry: RowRegistry
  ) {}

  public createContext(
    dependencies: VariableReference[],
    namespace: string
  ): {
    local: Record<string, any>;
    global: Record<string, any>;
    system: Record<string, any>;
    loop: Record<string, any>;
  } {
    const context = {
      local: {} as Record<string, any>,
      global: {} as Record<string, any>,
      system: {} as Record<string, any>,
      loop: this.createLoopContext(namespace),
    };

    dependencies.forEach((dependency) => {
      const value = this.variableStore.get(dependency);
      this.assignValue(context[dependency.type], dependency, value);
    });

    return context;
  }

  private createLoopContext(namespace: string): Record<string, any> {
    const loopInfo = this.getLoopInfo(namespace);

    if (!loopInfo) {
      return {};
    }

    const loopReference = { name: loopInfo.loop, type: "local" as const };

    if (!this.variableStore.has(loopReference) || !this.rowRegistry.has(loopInfo.loop)) {
      return {};
    }

    const loopValues = this.variableStore.get(loopReference);

    if (!Array.isArray(loopValues)) {
      return {};
    }

    const loopRow = this.rowRegistry.get(loopInfo.loop);
    const index = loopRow.params.index.value();

    const numericIndex = index
      ? loopValues.findIndex((item) => item[index] === loopInfo.index)
      : Number(loopInfo.index);

    const itemValue = loopValues[numericIndex];

    return {
      item: itemValue,
      index: loopInfo.index,
      count: loopValues.length,
      first: loopValues.at(0),
      last: loopValues.at(-1),
      is_first: numericIndex === 0,
      is_last: numericIndex === loopValues.length - 1,
    };
  }

  private getLoopInfo(namespace: string): { loop: string; index: string } | null {
    const tokens = namespace.split(".");

    if (tokens.length < 2) {
      return null;
    }

    return {
      loop: tokens.slice(0, -1).join("."),
      index: tokens[tokens.length - 1],
    };
  }

  private assignValue(
    target: Record<string, any>,
    dependency: VariableReference,
    value: unknown
  ): void {
    const path = dependency.name.split(".");
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
