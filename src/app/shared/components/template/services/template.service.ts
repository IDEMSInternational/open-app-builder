import { Injectable } from '@angular/core';
import { GLOBAL, TEMPLATE } from 'src/app/shared/services/data/data.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  globals = {};

  constructor(private localStorageService: LocalStorageService) {
    this.initialiseGlobals();
  }

  initialiseGlobals() {
    GLOBAL.forEach((flow) => {
      flow.rows?.forEach((row) => {
        if (row.type === "declare_field_default") {
          if (this.getField(row.name) === null) {
            this.setField(row.name, row.value);
          }
        } else {
          this.setGlobal(row.name, row.value);
        }
      });
    });
  }

  getField(key: string): string {
    return this.localStorageService.getString("rp-contact-field." + key);
  }

  setField(key: string, value: string): void {
    this.localStorageService.setString("rp-contact-field." + key, value);
  }

  getGlobal(key: string): string {
    return this.globals[key];
  }

  setGlobal(key: string, value: string) {
    this.globals[key] = value;
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
