import { Injectable } from '@angular/core';
import { TEMPLATE } from 'src/app/shared/services/data/data.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private localStorageService: LocalStorageService) {
    this.initialiseGlobals();
  }

  initialiseGlobals() {
    TEMPLATE.forEach((template) => {
      template.rows?.forEach((row) => {
        if (row.type === "set_global") {
          this.setGlobal(row.name, row.value);
        }
      });
    });
  }

  getGlobal(key: string): string {
    return this.localStorageService.getString("template_global." + key);
  }

  setGlobal(key: string, value: string) {
    this.localStorageService.setString("template_global." + key, value);
  }
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
