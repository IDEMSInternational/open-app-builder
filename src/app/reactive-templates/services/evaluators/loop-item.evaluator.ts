import { inject, Injectable } from "@angular/core";
import { RowRegistry } from "../row.registry";

@Injectable({ providedIn: "root" })
export class LoopItemEvaluator {
  private rowRegistry = inject(RowRegistry);
  private tokenAliases = [
    ["@item", "loop.item"],
    ["@index", "loop.index"],
    ["@first", "loop.first"],
    ["@last", "loop.last"],
    ["@count", "loop.count"],
    ["@is_first", "loop.is_first"],
    ["@is_last", "loop.is_last"],
  ] as const;

  public evaluate(expression: string | number | boolean, namespace: string): any {
    const loopInfo = this.getLoopInfo(namespace);

    if (typeof expression !== "string" || !loopInfo || !this.rowRegistry.has(loopInfo.loop)) {
      return expression;
    }

    let result = expression;

    for (const [token, alias] of this.tokenAliases) {
      result = result.replace(new RegExp(`${token}\\b`, "g"), alias);
    }

    return result;
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
}
