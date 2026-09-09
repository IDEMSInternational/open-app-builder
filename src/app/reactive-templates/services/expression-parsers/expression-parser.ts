import { inject, Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";
import { ListExpressionParser } from "./list.expression-parser";
import { NamespaceExpressionParser } from "./namespace.expression-parser";
import { ItemVariableExpressionParser } from "./item-variable.expression-parser";
import { LegacyVariableExpressionParser } from "./legacy-variable.expression-parser";
import { DependencySanitizerExpressionParser } from "./dependency-sanitizer.expression-parser";
import { NumericSegmentExpressionParser } from "./numeric-segment.expression-parser";

export interface IExpressionParser {
  parse(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType
  ): string | number | boolean;
}

@Injectable({ providedIn: "root" })
export class ExpressionParser implements IExpressionParser {
  private listExpressionParser: ListExpressionParser = inject(ListExpressionParser);
  private namespaceExpressionParser: NamespaceExpressionParser = inject(NamespaceExpressionParser);
  private itemVariableExpressionParser: ItemVariableExpressionParser = inject(
    ItemVariableExpressionParser
  );
  private legacyVariableExpressionParser: LegacyVariableExpressionParser = inject(
    LegacyVariableExpressionParser
  );
  private dependencySanitizerExpressionParser: DependencySanitizerExpressionParser = inject(
    DependencySanitizerExpressionParser
  );
  private numericSegmentExpressionParser: NumericSegmentExpressionParser = inject(
    NumericSegmentExpressionParser
  );

  public parse(
    expression: string | number | boolean,
    namespace: string,
    valueType: ValueType
  ): string | number | boolean {
    let parsedExpression = expression;

    parsedExpression = this.legacyVariableExpressionParser.parse(parsedExpression, valueType);
    parsedExpression = this.itemVariableExpressionParser.parse(parsedExpression, valueType);
    parsedExpression = this.dependencySanitizerExpressionParser.parse(parsedExpression, valueType);
    parsedExpression = this.namespaceExpressionParser.parse(parsedExpression, namespace);
    parsedExpression = this.listExpressionParser.parse(parsedExpression);
    parsedExpression = this.numericSegmentExpressionParser.parse(
      parsedExpression,
      namespace,
      valueType
    );

    return parsedExpression;
  }
}
