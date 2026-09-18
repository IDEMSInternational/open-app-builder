import { Injectable } from "@angular/core";
import { ValueType } from "../reactive-components/row-base.component";

@Injectable({ providedIn: "root" })
export class JavascriptEvaluator {
  private context: any = {};

  public evaluate(expression: string | number | boolean, valueType: ValueType): any {
    const raw = typeof expression === "string" ? expression : String(expression);
    const safeTemplate = raw.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
    const expressionBody =
      valueType === "string" ? `return \`${safeTemplate}\`;` : `return (${raw});`;
    const body = `"use strict"; ${expressionBody}`;

    return this.evaluateBody(body, expression);
  }

  public setContext(context: any) {
    this.context = context;
  }

  private evaluateBody(body: string, expression: string | number | boolean): any {
    try {
      return Function(...Object.keys(this.context), body)(...Object.values(this.context));
    } catch (error) {
      console.error("Failed to evaluate expression", { expression, error });
      return undefined;
    }
  }
}
