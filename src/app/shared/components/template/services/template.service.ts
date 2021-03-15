import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
/**
 * Note - currently this service is not required as just holds legacy code
 * (which may be useful in the future)
 */
export class TemplateService {
  constructor() {}
}

// if (this.row) {
//   if (typeof this.row.hidden === "string") {
//     this.hidden = this.evaluateBooleanExpression(this.row.hidden);
//   } else {
//     this.hidden = this.row.hidden;
//   }
// }

// private evaluateBooleanExpression(expression: string | boolean): boolean {
//   if (typeof expression === "boolean") {
//     return expression;
//   }
//   const result = this.evalJSExpression(expression);
//   if (result === true || result === "true") {
//     return true;
//   } else {
//     return false;
//   }
// }

/**
 * Create a dynamic function to parse the calculation expression without
 * the nees for `eval()` operator
 */
// private evalJSExpression(str: string) {
//   try {
//     const args = "__local, str";
//     const body = `'use strict'; return (${str.replace(/@local\./g, "__local.")})`;
//     const result = new Function(args, body).apply(null, [this.localVariables, str]);
//     console.log(body, "evals to ", result);
//     return result;
//   } catch (ex) {
//     console.log("Error ? ", ex);
//     return str;
//   }
// }
