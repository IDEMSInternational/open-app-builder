/********************************************************************************************
 *  Test Code
 *******************************************************************************************/

function test() {
  const inputArgs = {
    expression: "this.local.app_day",
    thisCtx: { local: { app_day: 5 } },
    globalFunctions: {},
    globalConstants: {},
  };
  const expectedOutput = 5;
  const args: any[] = Object.values(inputArgs);
  // @ts-ignore (ignore type error from args spread)
  const result = evaluateJSExpression(...args);
  console.log(result);
  return result === expectedOutput ? "PASS" : "FAIL";
}
console.log(test());

/********************************************************************************************
 *  App Code
 *******************************************************************************************/
function evaluateJSExpression(
  expression: string,
  thisCtxt = {},
  globalFunctions: IFunctionHashmap = {},
  globalConstants: IConstantHashmap = {}
): any {
  const globalConstString = Object.entries(globalConstants)
    .map(
      ([name, value]) =>
        // convert global constants to variable strings, adding quotation marks for string types
        `var ${name} = ${typeof value === "string" ? `'${value}'` : value}`
    )
    .join(";");
  // convert global functions to variable strings. Note, cannot simply parse function.toString() as optimiser
  // strips names and just leaves all as anonymous functions
  const globalString = Object.entries(globalFunctions)
    .map(([name, fn]) => `var ${name} = ${fn}`)
    .join(";");
  const funcString = `"use strict"; ${globalConstString}; ${globalString}; return (${expression});`;
  try {
    const func = new Function(funcString);
    const evaluated = func.apply(thisCtxt);
    return evaluated;
  } catch (error) {
    // console.warn('Could not evaluate expression', { expression, error, thisCtxt, globalFunctions, funcString })
    // still throw error so that calling function can decide how to handle, e.g. attempt string replace
    throw error;
  }
}

/** Generic object containing list of functions */
type IFunctionHashmap = { [function_name: string]: (...args: any) => any };

/** Generic object containing list of variables. Note - only simple types can be parsed */
type IConstantHashmap = { [constant_name: string]: string | number | boolean };
