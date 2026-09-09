import { Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";
import { IExpressionParser } from "./expression-parser";

@Injectable({ providedIn: "root" })
export class ItemVariableExpressionParser implements IExpressionParser {
  private readonly itemVariablePattern = /\bitem(?:\.[a-zA-Z_$][\w$]*)+/g;
  private readonly templateExpressionPattern = /\$\{([^}]*)\}/g;

  public parse(
    expression: string | number | boolean,
    valueType: ValueType
  ): string | number | boolean {
    if (typeof expression !== "string") {
      return expression;
    }

    if (valueType === "string") {
      return expression.replace(this.templateExpressionPattern, (match, templateExpression) => {
        const normalizedExpression = this.normalize(templateExpression);
        return normalizedExpression === templateExpression ? match : `\${${normalizedExpression}}`;
      });
    }

    return this.normalize(expression);
  }

  private normalize(expression: string): string {
    return expression.replace(this.itemVariablePattern, (match, index, source) => {
      const previousCharacter = index > 0 ? source[index - 1] : "";
      const isAlreadyQualified = previousCharacter === ".";

      if (isAlreadyQualified) {
        return match;
      }

      return `loop.${match}`;
    });
  }
}
