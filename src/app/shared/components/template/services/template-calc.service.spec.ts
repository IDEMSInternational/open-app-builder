import { ICalcContext, TemplateCalcService } from "./template-calc.service";

const EMPTY_CALC_CONTEXT: ICalcContext = {
  thisCtxt: {},
  globalConstants: {},
  globalFunctions: {},
};

export class MockTemplateCalcService implements Partial<TemplateCalcService> {
  private calcContext: ICalcContext;
  constructor(mockCalcContext?: Partial<ICalcContext>) {
    this.calcContext = { ...EMPTY_CALC_CONTEXT, ...mockCalcContext };
  }

  public async ready(): Promise<boolean> {
    return true;
  }

  public getCalcContext(): ICalcContext {
    return this.calcContext;
  }
}

/**
 * TODO - Add testing data and methods
 * 
 * Temp methods below used when testing locally in quokka
 * 

  const functions = [
  function pick_random(items: any[] = []) {
    console.log("picking random from arr");
    try {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      return randomItem;
    } catch (error) {
      console.error("[pick_random] error", { items, error });
      return items;
    }
  },
  function lookup_text(items: { name: string; text: string }[], name: string) {
    console.log("looking up text", items, name);
    try {
      const foundItem = items.find((el) => el.name === name);
      return foundItem ? foundItem.text : name;
    } catch (error) {
      console.error("[lookup_text] error", { items, name, error });
      return name;
    }
  },
];

const tests = [
  //    "Math.random()",
  //   "calc_1: 3\ncalc_2: 31\ncalc_3: 2",
  //   "pick_random()",
  //   "Math.max(this.local.example_calc_1,this.local.example_calc_2,this.local.example_calc_3)",
  "this.local.number_1", // TODO - test this.local.this.local.some_field
  //   "this.local.relative_1",
  //   "hello: this.local.number_1",
  //   "hello: this.local.number_1 + this.local.number_2", // will not work
  //   "this.local.number_1 * this.local.number_2 > 5",
  // TODO - "this.fields.non_existant_field"
  // TODO - include more values that fail to check fails gracefully (e.g. no accidental infinite loops or thrown errors)
];
const thisCtxt = getCtxt();
const results = {};

tests.forEach((str, i) => {
  const evaluated = evaluate(str);
  results[i] = { evaluated, type: typeof evaluated };
});
console.table(results);

function evaluate(str: string) {
  // line break characters can mess up so handle separately
  // make sure to not map a single line string as this will make the return type always string
  const lines = str.split("\n");
  return lines.length > 1
    ? lines.map((s) => evaluateJSExpression(s, thisCtxt, functions)).join("")
    : evaluateJSExpression(str, thisCtxt, functions);
}

const t1 = new Function(`"use strict"; return (${tests[0]})`).apply({});
console.log("t1", t1, typeof t1);

console.log(evaluateJSExpression(tests[0]));

function evaluateJSExpression(
  expression: string,
  thisCtxt = {},
  globalFunctions: ((...args: any) => any)[] = []
): any {
  const globalString = globalFunctions.map((fn) => fn.toString()).join(";");
  const funcString = `"use strict"; ${globalString}; return (${expression});`;
  const func = new Function(funcString);

  return func.apply(thisCtxt);
}

function getCtxt() {
  return {
    calc: (v) => v,
    local: {
      example_calc_1: 1,
      example_calc_2: 2,
      example_calc_3: false,
      number_1: 1,
      number_2: 2,
      arr_1: ["hello", "world"],
      obj_1: { hello: "world" },
      str_1: "hello",
      str_2: "world",
      bool_1: true,
      bool_2: false,
      relative_1: "this.local.number_1",
    },
  };
}

 */
