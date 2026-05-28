import { inject, Injectable } from "@angular/core";
import { ValueType } from "../../reactive-components/row-base.component";
import { TemplateLiteralEvaluator } from "./template-literal.evaluator";
import { JavascriptEvaluator } from "./javascript.evaluator";

@Injectable({ providedIn: "root" })
export class ExpressionEvaluator {
  private templateLiteralEvaluator = inject(TemplateLiteralEvaluator);
  private javascriptEvaluator = inject(JavascriptEvaluator);

  private context: any = {};

  public evaluate(expression: string | number | boolean, valueType: ValueType): any {
    if (valueType === "string") {
      this.templateLiteralEvaluator.setContext(this.context);
      return this.templateLiteralEvaluator.evaluate(expression);
    } else if (valueType === "script" || valueType === "list") {
      this.javascriptEvaluator.setContext(this.context);
      return this.javascriptEvaluator.evaluate(expression);
    }
    return expression;
  }

  public setContext(context: any) {
    this.context = context;
  }
}
