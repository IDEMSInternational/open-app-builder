import { TestBed } from "@angular/core/testing";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { MockDataEvaluationService } from "src/app/shared/services/data/data-evaluation.service.spec";
import { ServerService } from "src/app/shared/services/server/server.service";
import { MockServerService } from "src/app/shared/services/server/server.service.spec";
import { TemplateCalcService } from "./template-calc.service";

/** Mock class instance for use in tests */
export class MockTemplateCalcService extends TemplateCalcService {
  constructor() {
    super(new MockServerService() as any, new MockDataEvaluationService() as any);
  }
}

/**
 * Unit tests for TemplateCalcService
 * yarn ng test --include src\app\shared\components\template\services\template-calc.spec.ts
 */
describe("TemplateCalcService", () => {
  let service: TemplateCalcService;
  let serverService: ServerService;
  let dataEvaluationService: DataEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TemplateCalcService,
        { provide: ServerService, useValue: new MockServerService() },
        { provide: DataEvaluationService, useValue: new MockDataEvaluationService() },
        // { provide: TemplateCalcService, useValue: new MockTemplateCalcService() },
      ],
    });
    service = TestBed.inject(TemplateCalcService);
    serverService = TestBed.inject(ServerService);
    dataEvaluationService = TestBed.inject(DataEvaluationService);
  });

  // Ensure mock implementations working for dependent services
  it("test service setup", () => {
    expect(serverService).toBeTruthy();
    expect(serverService.app_user_id).toEqual("test_1234");
    expect(dataEvaluationService).toBeTruthy();
    expect(dataEvaluationService.data?.app_day).toEqual(5);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // Test global constants populated
  // NOTE - currently these are not really used, just a couple hardcoded values in service
  it("generates global constants", () => {
    const { globalConstants } = service.getCalcContext();
    expect(globalConstants).toEqual({ test_var: "hello" });
  });

  // Test global functions defined
  it("generates global functions", () => {
    const { globalFunctions } = service.getCalcContext();
    const globalFunctionNames = Object.keys(globalFunctions);
    expect(globalFunctionNames.length).toBeGreaterThan(0);
  });

  // Test global `now()` function can execute and return date object
  it("executes global now function", () => {
    const { globalFunctions } = service.getCalcContext();
    const res = globalFunctions.now();
    expect(res instanceof Date).toEqual(true);
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
