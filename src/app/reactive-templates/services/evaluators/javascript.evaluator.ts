import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class JavascriptEvaluator {
  private context: any = {};

  public evaluate(expression: string | number | boolean): any {
    return Function(
      ...Object.keys(this.context),
      `return (${expression});`
    )(...Object.values(this.context));
  }

  public setContext(context: any) {
    this.context = context;
  }
}
