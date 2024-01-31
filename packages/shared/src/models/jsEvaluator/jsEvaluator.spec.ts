import { JSEvaluator } from "./jsEvaluator";

const constants = {
  a: 1,
  b: 2,
  nestedConstant: { array: [1] },
};
const functions = {
  isEven: (n) => n % 2 === 0,
};

describe("JS Evaluator", () => {
  let evaluator: JSEvaluator;
  beforeEach(() => {
    evaluator = new JSEvaluator();
    evaluator.setGlobalContext({ constants, functions });
  });

  it("expression: Math.min(5,7)", () => {
    expect(evaluator.evaluate("Math.min(5,7)")).toEqual(5);
  });
  it("function: isEven(9)", () => {
    expect(evaluator.evaluate("isEven(9)")).toEqual(false);
  });
  it("this context: 'Hello '+this.nested.name", () => {
    expect(evaluator.evaluate("'Hello '+this.nested.name", { nested: { name: "Ada" } })).toEqual(
      "Hello Ada"
    );
  });
  it("Supports parse of nested global constants", () => {
    expect(evaluator.evaluate("JSON.parse(nestedConstant).array[0]")).toEqual(1);
  });
  it("ignores invalid names for context variables", () => {
    const invalidConstants = { "invalid:name": "ignored", "invalid-name": "ignored" };
    evaluator.setGlobalContext({ constants: { ...invalidConstants, ...constants } });
    expect(evaluator.evaluate("Math.min(a,b)")).toEqual(1);
  });
  it("throws when using reserved names for variables", () => {
    const invalidConstants = { default: "hello", new: "test" };
    evaluator.setGlobalContext({ constants: { ...invalidConstants, ...constants } });
    expect(() => evaluator.evaluate("Math.min(a,b)")).toThrowError("Unexpected token 'default'");
  });
  it("handles escape characters", () => {
    // Case 1 - evaluation string with linebreak
    expect(evaluator.evaluate("'Hello\n'+this.name", { name: "Ada" })).toEqual("Hello\nAda");
    // Case 2 - this context with linebreak
    expect(evaluator.evaluate("'Hello'+this.name", { name: "\nAda" })).toEqual("Hello\nAda");
    // Case 3 - global constant with linebreak
    evaluator.setGlobalContext({ constants: { name: "\nAda" } });
    expect(evaluator.evaluate("'Hello'+name", { name: "\nAda" })).toEqual("Hello\nAda");
  });
  it("handles special characters", () => {
    // Case 1 - single quotation (used to wrap string values in evaluator)
    evaluator.setGlobalContext({ constants: { name: "Ada'" } });
    expect(evaluator.evaluate("'Hello '+name")).toEqual("Hello Ada'");
  });
});
