import { Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";

@Injectable({ providedIn: "root" })
export class LegacyVariableEvaluator {
  private readonly legacyPatterns: Array<{
    pattern: RegExp;
    toReplacement: (match: string) => string;
  }> = [
    {
      pattern: /@local(?:\.[a-zA-Z_$][\w$]*)+/g,
      toReplacement: (match) => match.slice(1),
    },
    {
      pattern: /@item(?:\.[a-zA-Z_$][\w$]*)*/g,
      toReplacement: (match) => {
        const path = match.slice("@item".length);
        return path ? `loop${path}` : "loop.item";
      },
    },
    {
      pattern: /@(?:first|last)(?:\.[a-zA-Z_$][\w$]*)*/g,
      toReplacement: (match) => `loop.${match.slice(1)}`,
    },
    {
      pattern: /@(?:count|is_first|is_last|index)\b/g,
      toReplacement: (match) => `loop.${match.slice(1)}`,
    },
  ];

  public evaluate(
    expression: string | number | boolean,
    valueType: ValueType
  ): string | number | boolean {
    if (typeof expression !== "string") {
      return expression;
    }

    return this.legacyPatterns.reduce(
      (result, { pattern, toReplacement }) =>
        result.replace(pattern, (match, index, source) => {
          if (this.shouldSkipReplacement(index, source)) {
            return match;
          }

          const normalizedExpression = toReplacement(match);

          if (valueType === "script" || valueType === "list") {
            return normalizedExpression;
          }

          return `\${${normalizedExpression}}`;
        }),
      expression
    );
  }

  private shouldSkipReplacement(index: number, source: string): boolean {
    const previousCharacter = index > 0 ? source[index - 1] : "";
    const isPartOfAnotherToken = !!previousCharacter && /[\w.]/.test(previousCharacter);
    const isInsideTemplatePlaceholder = source.slice(Math.max(0, index - 2), index) === "${";

    return isPartOfAnotherToken || isInsideTemplatePlaceholder;
  }
}
