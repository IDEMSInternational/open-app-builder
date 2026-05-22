import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JavascriptEvaluator {
  private context: any = {};

  public evaluate(expression: string | number | boolean): any {
    try {
      return Function(
        ...Object.keys(this.context),
        `return (${expression});`
      )(...Object.values(this.context));
    } catch (error) {
      console.error("Failed to evaluate expression", { expression, error });
      return undefined;
    }
  }

  public setContext(context: any) {
    this.context = context;
  }
}
