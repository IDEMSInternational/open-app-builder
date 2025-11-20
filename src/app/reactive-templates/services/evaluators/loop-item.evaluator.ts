import { inject, Injectable } from "@angular/core";
import { VariableStore } from "../../stores/variable-store";
import { RowRegistry } from "../row.registry";

@Injectable({ providedIn: "root" })
export class LoopItemEvaluator {
  private tokens = ["@item", "@index", "@first", "@last", "@count"];
  private variableStore = inject(VariableStore);
  private rowRegistry = inject(RowRegistry);

  public evaluate(expression: string | number | boolean, namespace: string): any {
    // todo: add @first & @last (@length?)
    if (
      typeof expression !== "string" ||
      !this.tokens.some((token) => expression.includes(token))
    ) {
      return expression;
    }

    const loopInfo = this.getLoopInfo(namespace);

    if (!loopInfo) {
      return expression;
    }

    const loopExists = this.variableStore.has(loopInfo.loop);

    if (!loopExists) {
      return expression;
    }

    const loopValues = this.variableStore.get(loopInfo.loop);

    if (!Array.isArray(loopValues)) {
      return expression;
    }

    if (!this.rowRegistry.has(loopInfo.loop)) {
      return expression;
    }

    const loopRow = this.rowRegistry.get(loopInfo.loop);
    const index = loopRow.params.index.value();

    const itemValue = index
      ? loopValues.filter((item) => item[index] === loopInfo.index)[0]
      : loopValues[loopInfo.index];

    let result = expression;

    // Replace all @index with the actual index value
    if (expression.includes("@index")) {
      result = result.replace(/@index\b/g, String(loopInfo.index));
    }

    // Replace all @count with the amount of items in the loop
    if (expression.includes("@count")) {
      result = result.replace(/@count\b/g, String(loopValues.length));
    }

    // Replace all @first with first item.
    if (result.includes("@first")) {
      const firstValue = loopValues.at(0);
      result = this.replaceToken("@first", result, firstValue);
    }

    // Replace all @last with last item.
    if (result.includes("@last")) {
      const lastValue = loopValues.at(-1);
      result = this.replaceToken("@last", result, lastValue);
    }

    // Replace all @item.<key> with itemValue[key]
    if (result.includes("@item")) {
      result = this.replaceToken("@item", result, itemValue);
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

  private replaceToken(token: string, expression: string, itemValue: any): string {
    const regexWithAccessor = new RegExp(`${token}\\.([a-zA-Z0-9_]+)`, "g");
    const regexWithoutAccessor = new RegExp(`${token}\\b`, "g");

    let returnValue = expression;

    returnValue = returnValue.replace(regexWithAccessor, (match, key) => {
      if (Object.prototype.hasOwnProperty.call(itemValue, key)) {
        return itemValue[key];
      }
      // If key not found, leave as is
      return match;
    });

    returnValue = returnValue.replace(regexWithoutAccessor, String(itemValue));

    return returnValue;
  }
}
