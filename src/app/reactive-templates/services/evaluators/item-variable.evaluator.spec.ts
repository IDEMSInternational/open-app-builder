import { ItemVariableEvaluator } from "./item-variable.evaluator";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/evaluators/item-variable.evaluator.spec.ts
 */

describe("ItemVariableEvaluator", () => {
  let subject: ItemVariableEvaluator;

  beforeEach(() => {
    subject = new ItemVariableEvaluator();
  });

  it("converts item paths in script expressions", () => {
    const expression = "item.foo.bar + item.count";

    expect(subject.evaluate(expression, "script")).toBe("loop.item.foo.bar + loop.item.count");
  });

  it("converts item paths inside string template placeholders", () => {
    const expression = "Value: ${item.foo.bar}";

    expect(subject.evaluate(expression, "string")).toBe("Value: ${loop.item.foo.bar}");
  });

  it("does not rewrite already qualified loop.item paths", () => {
    const expression = "loop.item.foo + item.bar";

    expect(subject.evaluate(expression, "script")).toBe("loop.item.foo + loop.item.bar");
  });

  it("does not rewrite plain text outside string placeholders", () => {
    const expression = "item.foo should stay text";

    expect(subject.evaluate(expression, "string")).toBe(expression);
  });

  it("returns non-string values as-is", () => {
    expect(subject.evaluate(42, "script")).toBe(42);
    expect(subject.evaluate(true, "string")).toBe(true);
  });
});
