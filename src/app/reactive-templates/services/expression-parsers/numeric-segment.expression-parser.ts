import { Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";
import { IExpressionParser } from "./expression-parser";

@Injectable({ providedIn: "root" })
export class NumericSegmentExpressionParser implements IExpressionParser {
  private readonly variablePathWithNumericSegmentsPattern =
    /\b(?:local|global|system|loop)(?:\.[A-Za-z0-9_$]+|\[[^\]]+\])+/g;

  public parse(
    expression: string | number | boolean,
    _namespace: string,
    _valueType: ValueType
  ): string | number | boolean {
    if (typeof expression !== "string") {
      return expression;
    }

    return expression.replace(this.variablePathWithNumericSegmentsPattern, (path) =>
      path.replace(/\.([0-9][\w$]*)(?=\.|$)/g, (_match, segment: string) => `["${segment}"]`)
    );
  }
}
