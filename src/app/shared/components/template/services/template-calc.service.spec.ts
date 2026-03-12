import { TestBed } from "@angular/core/testing";
import { TemplateCalcService } from "./template-calc.service";
import { Device } from "@capacitor/device";
import { MockDataEvaluationService } from "src/app/shared/services/data/data-evaluation.service.mock.spec";
import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.mock.spec";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { CORE_CALC_FUNCTIONS } from "./template-calc-functions/core-calc-functions";
import { PLH_CALC_FUNCTIONS } from "./template-calc-functions/plh-calc-functions";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/template-calc.service.spec.ts
 */
describe("TemplateCalcService", () => {
  let service: TemplateCalcService;

  beforeEach(async () => {
    spyOn(Device, "getInfo").and.returnValue(
      Promise.resolve({
        model: "test",
        platform: "web",
        operatingSystem: "windows",
        osVersion: "10",
        manufacturer: "test",
        isVirtual: true,
        webViewVersion: "1.0",
      } as any)
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DataEvaluationService,
          useValue: new MockDataEvaluationService(),
        },
        {
          provide: LocalStorageService,
          useValue: new MockLocalStorageService(),
        },
      ],
    });
    service = TestBed.inject(TemplateCalcService);
    await service.ready();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("[Deprecated] populates window.calc with calc functions", () => {
    const { calc } = service["windowWithCalc"];
    expect(Object.keys(calc)).toEqual([
      ...Object.keys(CORE_CALC_FUNCTIONS),
      ...Object.keys(PLH_CALC_FUNCTIONS),
    ]);
  });

  it("populates window.date_fns with date_fns lib", () => {
    const { date_fns } = service["windowWithCalc"];
    expect(date_fns.hoursToMilliseconds(1)).toEqual(3600000);
  });

  it("Gets calc context", () => {
    const calcContext = service.getCalcContext();
    const { globalConstants, globalFunctions, thisCtxt } = calcContext;
    // global constants and functions are passed by service
    expect(globalConstants).toEqual({});
    // global functions should be same as window but without 3rd party
    expect(Object.keys(globalFunctions)).toEqual([
      ...Object.keys(CORE_CALC_FUNCTIONS),
      ...Object.keys(PLH_CALC_FUNCTIONS),
    ]);
    // By default a handful of specific app data context fields always populated
    expect(Object.keys(thisCtxt)).toEqual([
      "calc",
      "app_day",
      "app_first_launch",
      "app_user_id",
      "device_info",
    ]);
  });

  it("evaluates @calc statements", async () => {
    const res = await service.evaluate("@calc(2*2)");
    expect(res).toEqual(4);
  });

  it("evaluates @calc statements with window functions", async () => {
    const res = await service.evaluate("@calc(window.date_fns.hoursToMilliseconds(1))", {});
    expect(res).toEqual(3600000);
  });

  it("evaluates @calc statements with local context", async () => {
    // NOTE - `@local` expression should be converted to `this.local` in template-parser
    const res = await service.evaluate("@calc(this.local.test_string)", {
      local: { test_string: "hello" },
    });
    expect(res).toEqual("hello");
  });
});

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
