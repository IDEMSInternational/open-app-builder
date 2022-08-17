/** Utility class to allow safe evaluation of javascript expressionss */
export class JSEvaluator {
  private evaluationContextBase: string;

  /**
   * Specify global functions and constants that can be directly evaluated in expression
   * @param context functions and contexts to make available within global scope of function execution
   * @example
   * ```
   * {
   *  constants:{ a: 1, b:2 },
   *  functions:{ isEven: (n) => n%2 === 0 }
   * }
   * // Can be used in later expression
   * Math.min(a+b) // 3
   * isEven(b) // true
   * ```
   * E.g. can evaluate `Math.min(a+b)` with context
   * E.g. can evaluae `isEven(a)` with context {constants:{a:4},functions:{isEven:(n)=>n%2===0}}
   **/
  setGlobalContext(context: { functions?: IFunctionHashmap; constants?: IConstantHashmap }) {
    const constantString = Object.entries(context.constants ?? {})
      .map(
        ([name, value]) =>
          // convert global constants to variable strings, adding quotation marks for string types
          `var ${name} = ${typeof value === "string" ? `'${value}'` : value}`
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
      // console.warn('Could not evaluate expression', { expression, error, thisCtxt, globalFunctions, funcString })
      // still throw error so that calling function can decide how to handle, e.g. attempt string replace
      throw error;
    }
  }
}

/** Generic object containing list of functions */
export type IFunctionHashmap = { [function_name: string]: (...args: any) => any };

/** Generic object containing list of variables. Note - only simple types can be parsed */
export type IConstantHashmap = { [constant_name: string]: string | number | boolean };
