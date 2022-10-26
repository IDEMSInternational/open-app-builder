/**
 * Utility class to allow safe evaluation of javascript expressions
 * Enable parsing of expressions containing context and global variables and functions
 * within a JS environment
 * @example
 * ```
 * const evaluator = new JSEvaluator()
 * evaluator.setGlobalContext(
 *  {
 *    constants:{a:5, b:7})
 *    functions:isEven(n)=>n%2===0},
 *  }
 *
 * const expression1 = "Math.min(a,b)"
 * evaluator.evaluate(expression1)
 * // 5
 *
 * const expression2 = "isEven(this.inputNumber)"
 * evaluator.evaluate(expression2,{inputNumber:5})
 * // false
 * ```
 * */
export class JSEvaluator {
  private evaluationContextBase: string;

  constructor() {
    this.setGlobalContext({});
  }

  /**
   * Specify global functions and constants that can be directly evaluated in expression
   * @param context functions and contexts to make available within global scope of function execution
   * @example
   * ```
   * {
   *  constants:{ a: 1, b:2 },
   *  functions:{ isEven: (n) => n%2 === 0 }
   * }
   **/
  setGlobalContext(context: { functions?: IFunctionHashmap; constants?: any }) {
    const constantString = Object.entries(context.constants ?? {})
      .filter(([name]) => this.isValidVariableName(name))
      .map(
        ([name, value]) =>
          // convert global constants to variable strings, adding quotation marks for string types
          `var ${name} = ${this.parseContextValue(value)}`
      )
      .join(";");
    // convert global functions to variable strings. Note, cannot simply parse function.toString() as optimiser
    // strips names and just leaves all as anonymous functions
    const functionString = Object.entries(context.functions ?? {})
      .map(([name, fn]) => `var ${name} = ${fn}`)
      .join(";");
    this.evaluationContextBase = `"use strict"; ${constantString}; ${functionString}; return`;

    return this;
  }
  /**
   * Evaluate a string expression in javascript
   * @param expression string to evaluate
   * @param executionContext variable to bind to `this` context, e.g. if expression contains `this.name`
   * @returns
   */
  evaluate(expression: string, executionContext = {}) {
    const funcString = `${this.evaluationContextBase} (${expression});`;
    try {
      const func = new Function(funcString);
      const evaluated = func.apply(executionContext);
      return evaluated;
    } catch (error) {
      // still throw error so that calling function can decide how to handle, e.g. attempt string replace
      throw error;
    }
  }

  /** Check if a proposed variable name is valid in javascript */
  private isValidVariableName(name: string) {
    // adapted from https://stackoverflow.com/a/1661249/5693245
    const regex = /^[a-z_$][0-9a-z_$]*$/i;
    return regex.test(name);
    // TODO - could also check to ensure not a reserved word (https://www.w3schools.com/js/js_reserved.asp)
  }

  /** When evaluating function constants any strings should be quoted and object/arrays stringified */
  private parseContextValue(value: any) {
    if (value) {
      if (typeof value === "object") value = JSON.stringify(value);
      if (typeof value === "string") return `'${value}'`;
    }
    return value;
  }
}

/** Generic object containing list of functions */
export type IFunctionHashmap = { [function_name: string]: (...args: any) => any };

/** Generic object containing list of variables. Note - only simple types can be parsed */
export type IConstantHashmap = { [constant_name: string]: string | number | boolean };
