import { Injectable } from "@angular/core";
import { ValueType } from "../reactive-components/row-base.component";

/**
 * Template literal tag for string values. An unset (null or undefined) value adds no text,
 * and a value made only of unset variables is undefined rather than "undefined".
 */
function joinText(strings: TemplateStringsArray, ...values: unknown[]) {
  const isUnset = (value: unknown) => value === undefined || value === null;
  if (values.length && strings.every((s) => s === "") && values.every(isUnset)) {
    return undefined;
  }
  return strings.reduce((text, s, i) => {
    const value = values[i - 1];
    return i === 0 ? s : text + (isUnset(value) ? "" : String(value)) + s;
  }, "");
}

@Injectable({ providedIn: "root" })
export class JavascriptEvaluator {
  private context: any = {};

  public evaluate(expression: string | number | boolean, valueType: ValueType): any {
    const context = this.context;
    const raw = typeof expression === "string" ? expression : String(expression);
    const safeTemplate = raw.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
    const expressionBody =
      valueType === "string" ? `return joinText\`${safeTemplate}\`;` : `return (${raw});`;
    const body = `"use strict"; ${expressionBody}`;

    const value = this.evaluateBody(body, expression);
    return value;
  }

  public setContext(context: any) {
    this.context = context;
  }

  private evaluateBody(body: string, expression: string | number | boolean): any {
    try {
      // The compiled body can't see this module, so `joinText` is passed in like the context
      return Function(
        "joinText",
        ...Object.keys(this.context),
        body
      )(joinText, ...Object.values(this.context));
    } catch (error) {
      console.warn("Failed to evaluate expression", { expression, error });
      return undefined;
    }
  }
}
