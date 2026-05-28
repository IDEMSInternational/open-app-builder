import { DependencySanitizerEvaluator } from "./dependency-sanitizer.evaluator";

/**
 * Run only this test file via:
 * yarn ng test --watch=false --browsers=ChromeHeadless --include src/app/reactive-templates/services/evaluators/dependency-sanitizer.evaluator.spec.ts
 */

describe("DependencySanitizerEvaluator", () => {
  let subject: DependencySanitizerEvaluator;

  beforeEach(() => {
    subject = new DependencySanitizerEvaluator();
  });

  it("removes parameter_list prefix from string expressions", () => {
    expect(subject.evaluate("${parameter_list.foo}", "string")).toBe("${foo}");
  });

  it("returns non-string values as-is", () => {
    expect(subject.evaluate(1, "script")).toBe(1);
    expect(subject.evaluate(false, "list")).toBe(false);
  });

  it("sanitizes dependency names", () => {
    expect(subject.sanitizeName("parameter_list.foo#bar|baz,qux!"))
      .withContext("should remove parameter_list prefix and invalid separator characters")
      .toBe("foobarbazqux");
  });
});
