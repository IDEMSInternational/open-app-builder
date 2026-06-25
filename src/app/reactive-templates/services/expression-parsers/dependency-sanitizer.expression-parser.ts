import { Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";
import { IExpressionParser } from "./expression-parser";

@Injectable({ providedIn: "root" })
export class DependencySanitizerExpressionParser implements IExpressionParser {
  private readonly parameterListPrefixPattern = /parameter_list\./g;
  private readonly invalidDependencyCharactersPattern = /[#!&|,]/g;

  public parse(
    expression: string | number | boolean,
    _valueType: ValueType
  ): string | number | boolean {
    if (typeof expression !== "string") {
      return expression;
    }

    return expression.replace(this.parameterListPrefixPattern, "");
  }

  public sanitizeName(name: string): string {
    return name
      .replace(this.parameterListPrefixPattern, "")
      .replace(this.invalidDependencyCharactersPattern, "");
  }
}
