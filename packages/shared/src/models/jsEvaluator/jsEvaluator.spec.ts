import { JSEvaluator } from "./jsEvaluator";

describe("JS Evaluator", () => {
  const evaluator = new JSEvaluator();
  evaluator.setGlobalContext({
    constants: { a: 1, b: 2 },
    functions: {
      isEven: (n) => n % 2 === 0,
    },
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
});
