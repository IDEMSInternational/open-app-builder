import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class TemplateLiteralEvaluator {
  private context: any = {};

  public evaluate(expression: string | number | boolean | any): any {
    // For now, we only have the ListEvaluator that can parse structured expressions.
    // In the future, we can add more evaluators for different expression types (e.g. JavaScript expressions, JSON expressions, etc.)
    return this.evaluateTemplateLiteral(expression);
  }

  public setContext(context: any) {
    this.context = context;
  }

  private evaluateTemplateLiteral(expression: string): string {
    return Function(
      ...Object.keys(this.context),
      `return \`${expression}\`;`
    )(...Object.values(this.context));
  }
}
